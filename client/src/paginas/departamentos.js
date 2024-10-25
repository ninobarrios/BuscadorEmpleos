import React, { useEffect, useMemo, useState, useCallback, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import '../componentes/estiloscomponentes.css';

const CajaOferta = lazy(() => import('../componentes/cajaoferta'));
const Paginacion = lazy(() => import('../componentes/paginacion'));
const Footer = lazy(() => import('../componentes/footer'));

const ofertasCache = {};

const Departamentos = () => {
    const { departamento } = useParams();
    const navigate = useNavigate();
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [selectedDepartamento, setSelectedDepartamento] = useState(departamento || "Arequipa");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalOfertas, setTotalOfertas] = useState(0);
    const ofertasPorPagina = 14;

    const departamentos = [
        "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
        "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín",
        "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios",
        "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna",
        "Tumbes", "Ucayali"
    ];

    const fetchOfertas = useCallback(async (dep) => {
        // Return cached offers if available
        if (ofertasCache[dep]) {
            const cachedOfertas = ofertasCache[dep];
            setOfertas(cachedOfertas);
            setTotalOfertas(cachedOfertas.length);
            setPaginaActual(1);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://buscadorempleos.onrender.com/selecionardepartamento/${dep}`);
            ofertasCache[dep] = response.data;
            setOfertas(response.data);
            setTotalOfertas(response.data.length);
            setPaginaActual(1);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (departamento) {
            fetchOfertas(departamento);
        } else {
            navigate(`/departamentos/Arequipa`);
        }
    }, [departamento, fetchOfertas, navigate]);

    const handleDepartamentoChange = (dep) => {
        setSelectedDepartamento(dep);
        navigate(`/departamentos/${dep}`);
        fetchOfertas(dep);
    };

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            handleDepartamentoChange(selectedOption.value);
        }
    };

    const handleCambiarPagina = useCallback(nuevaPagina => {
        setPaginaActual(nuevaPagina);
    }, []);

    const totalPaginas = useMemo(() => Math.ceil(totalOfertas / ofertasPorPagina), [totalOfertas]);
    const indexOfLastOffer = paginaActual * ofertasPorPagina;
    const indexOfFirstOffer = indexOfLastOffer - ofertasPorPagina;
    const ofertasMostradas = useMemo(() => ofertas.slice(indexOfFirstOffer, indexOfLastOffer), [ofertas, indexOfFirstOffer, indexOfLastOffer]);
    const options = departamentos.map(dep => ({ value: dep, label: dep }));

    return (
        <div>
            <div className='btn_departamentos'>
                <div className='desktop-buttons'>
                    {departamentos.map((dep, index) => (
                        <button
                            key={index}
                            onClick={() => handleDepartamentoChange(dep)}
                            className={`carrera-button ${selectedDepartamento === dep ? 'active' : ''}`}
                        >
                            {dep}
                        </button>
                    ))}
                </div>
                <div className='selectores mobile-dropdown'>
                    <Select
                        options={options}
                        value={options.find(option => option.value === selectedDepartamento)}
                        onChange={handleSelectChange}
                        className='select-lugar'
                        classNamePrefix="select-lugar"
                    />
                </div>
            </div>
            <h1 style={{ textAlign: 'center', width: '70%', margin: '10px 15%' }}>
                Ofertas Laborales en <span style={{ color: '#2ab004', textTransform: 'capitalize' }}>{selectedDepartamento}</span>
            </h1>
            <div style={{ textAlign: 'center' }}>{totalOfertas.toLocaleString('es-PE')} Empleos Vigentes</div>

            <div className='contenidoprincipal'>
                <div className='contenedordecajas'>
                    {loading ? (
                        <div className="loading">
                            <div className="spinner" style={{ marginBottom: '900px', marginTop: '100px' }}></div>
                        </div>
                    ) : (
                        <>
                            {error && <p>Error al cargar las ofertas: {error.message}</p>}
                            {ofertasMostradas.length > 0 ? (
                                ofertasMostradas.map((oferta, index) => (
                                    <CajaOferta key={oferta.id || index} oferta_laboral={oferta} />
                                ))
                            ) : (
                                <p>No hay ofertas disponibles para este departamento.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Suspense fallback={<div>Loading pagination...</div>}>
                <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onCambiarPagina={handleCambiarPagina}
                />
            </Suspense>
            <Suspense fallback={<div className="loading"><div className="spinner"></div></div>}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default Departamentos;
