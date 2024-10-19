import React, { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../componentes/estiloscomponentes.css';
import portadaImg from '../imagenes/portada.avif';

const Selectores = React.lazy(() => import('../componentes/selectores'));
const Footer = React.lazy(() => import('../componentes/footer'));
const CajaOferta = React.lazy(() => import('../componentes/cajaoferta'));
const Buscador = React.lazy(() => import('../componentes/buscador'));
const Paginacion = React.lazy(() => import('../componentes/paginacion'));
const Inserciones = React.lazy(() => import('../componentes/numero_observaciones'));

function Inicio() {
    const [resultados, setResultados] = useState([]);
    const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalOfertas, setTotalOfertas] = useState(0);
    const [ofertasPorPagina, setOfertasPorPagina] = useState(14);
    const [filtros, setFiltros] = useState({ palabraClave: '', lugar: '', empresa: '', carrera: '' });

    const listaDepartamentos = useMemo(() => [
        'Arequipa', 'Lima', 'Cusco', 'Puno', 'Apurimac', 'Amazonas', 'Ancash', 'Ayacucho',
        'Cajamarca', 'Callao', 'Huancavelica', 'Huanuco', 'Ica', 'Junin', 'La Libertad',
        'Lambayeque', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'San Martin',
        'Tacna', 'Tumbes', 'Ucayali', 'Peru'
    ], []);

    const opcionesCarrera = useMemo(() => [
        { value: '', label: 'Seleccionar Carrera' },
        { value: 'Administración', label: 'Administración' },
        { value: 'Arquitectura', label: 'Arquitectura' },
        { value: 'Biología', label: 'Biología' },
        { value: 'Ciencia_de_la_Computación', label: 'Ciencia de la Computación' },
        { value: 'Ciencia_Política', label: 'Ciencia Política' },
        { value: 'Ciencias_de_la_Comunicación', label: 'Ciencias de la Comunicación' },
        { value: 'Contabilidad', label: 'Contabilidad' },
        { value: 'Derecho', label: 'Derecho' },
        { value: 'Diseñador_Grafico', label: 'Diseño Gráfico' },
        { value: 'Economía', label: 'Economía' },
        { value: 'Educación', label: 'Educación' },
        { value: 'Enfermería', label: 'Enfermería' },
        { value: 'Estadística', label: 'Estadística' },
        { value: 'Farmacia_y_Bioquímica', label: 'Farmacia y Bioquímica' },
        { value: 'Gastronomía', label: 'Gastronomía' },
        { value: 'Historia', label: 'Historia' },
        { value: 'Hotelería_y_Turismo', label: 'Hotelería y Turismo' },
        { value: 'Ingeniería_Agrícola', label: 'Ingeniería Agronómica y Agrícola' },
        { value: 'Ingeniería_Ambiental', label: 'Ingeniería Ambiental' },
        { value: 'Ingeniería_Civil', label: 'Ingeniería Civil' },
        { value: 'Ingeniería_de_Industrias_alimentarias', label: 'Ingeniería de Industria Alimentaria' },
        { value: 'Ingeniería_de_Minas', label: 'Ingeniería de Minas' },
        { value: 'Ingeniería_de_Sistemas', label: 'Ingeniería de Sistemas' },
        { value: 'Ingeniería_Eléctrica', label: 'Ingeniería Eléctrica' },
        { value: 'Ingeniería_Industrial', label: 'Ingeniería Industrial' },
        { value: 'Ingeniería_Mecánica', label: 'Ingeniería Mecánica' },
        { value: 'Ingeniería_Mecatrónica', label: 'Ingeniería Mecatrónica' },
        { value: 'Ingeniería_Química', label: 'Ingeniería Química' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Medicina', label: 'Medicina' },
        { value: 'Medicina_Veterinaria', label: 'Medicina Veterinaria' },
        { value: 'Negocios_Internacionales', label: 'Negocios Internacionales' },
        { value: 'Nutrición', label: 'Nutrición' },
        { value: 'Odontología', label: 'Odontología' },
        { value: 'Psicología', label: 'Psicología' },
        { value: 'Publicidad_y_multimedia', label: 'Publicidad y Multimedia' },
        { value: 'Recursos_Humanos', label: 'Recursos Humanos' },
        { value: 'Ventas', label: 'Ventas' },
        { value: 'Almacén', label: 'Almacén' },
    ], []);

    const departamentosFiltrados = useMemo(() => {
        const departamentos = [...new Set(resultadosFiltrados.map(oferta =>
            listaDepartamentos.find(departamento => oferta.lugar.includes(departamento))
        ))];
        return departamentos.filter(Boolean).sort((a, b) => a.localeCompare(b));
    }, [resultadosFiltrados, listaDepartamentos]);

    useEffect(() => {
        const ajustarOfertasPorPagina = () => {
            setOfertasPorPagina(window.innerWidth <= 768 ? 10 : 20);
        };

        ajustarOfertasPorPagina();
        window.addEventListener('resize', ajustarOfertasPorPagina);
        return () => window.removeEventListener('resize', ajustarOfertasPorPagina);
    }, []);

    useEffect(() => {
        const fetchOfertas = async () => {
            setLoading(true);
            const cachedData = localStorage.getItem('ofertasLaboralesHoy');
    
            if (cachedData) {
                // Si hay datos en el caché, se usan
                const data = JSON.parse(cachedData);
                setResultados(data);
                setResultadosFiltrados(data);
                setTotalOfertas(data.length);
                setPaginaActual(1);
            } else {
                try {
                    const response = await axios.get('https://buscadorempleos.onrender.com/Ofertas-Laborales-hoy');
                    setResultados(response.data);
                    setResultadosFiltrados(response.data);
                    setTotalOfertas(response.data.length);
                    setPaginaActual(1);
                    localStorage.setItem('ofertasLaboralesHoy', JSON.stringify(response.data));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
    
            setLoading(false);
        };
    
        fetchOfertas();
    }, []);
    

    const empresasFiltradas = useMemo(() => (
        [...new Set(resultadosFiltrados.map(oferta => oferta.nom_empresa))]
    ), [resultadosFiltrados]);

    useEffect(() => {
        const filtrarResultados = () => {
            const { palabraClave, lugar, empresa, carrera } = filtros;
            let filtrados = resultados;

            if (palabraClave) {
                filtrados = filtrados.filter(oferta =>
                    oferta.nom_oferta.toLowerCase().includes(palabraClave.toLowerCase())
                );
            }
            if (lugar) {
                filtrados = filtrados.filter(oferta =>
                    oferta.lugar.toLowerCase().includes(lugar.toLowerCase())
                );
            }
            if (empresa) {
                filtrados = filtrados.filter(oferta =>
                    oferta.nom_empresa.toLowerCase().includes(empresa.toLowerCase())
                );
            }

            // Filtra por carrera
            const diccionarios = {
                Administración: ['administracion', 'administrador', 'logistica', 'nominas', 'creditos y cobranzas', 'comercial', 'costos', 'planeamiento', 'trade'],
                Arquitectura: ['arquitectura'],
            };

            if (carrera) {
                filtrados = filtrados.filter(oferta =>
                    diccionarios[carrera]?.some(term =>
                        oferta.nom_oferta.toLowerCase().includes(term.toLowerCase())
                    )
                );
            }

            setResultadosFiltrados(filtrados);
            setTotalOfertas(filtrados.length);
            setPaginaActual(1);
        };

        filtrarResultados();
    }, [resultados, filtros]);

    const handleCambiarPagina = useCallback(nuevaPagina => setPaginaActual(nuevaPagina), []);
    const handleLinkSeleccionado = useCallback(link => console.log("Link seleccionado:", link), []);

    const handleFiltroChange = useCallback((nombreFiltro, valor) => {
        setFiltros(prevFiltros => ({ ...prevFiltros, [nombreFiltro]: valor }));
    }, []);

    const totalPaginas = useMemo(() => Math.ceil(totalOfertas / ofertasPorPagina), [totalOfertas, ofertasPorPagina]);
    const indexOfLastOffer = paginaActual * ofertasPorPagina;
    const indexOfFirstOffer = indexOfLastOffer - ofertasPorPagina;
    const ofertasMostradas = useMemo(() => resultadosFiltrados.slice(indexOfFirstOffer, indexOfLastOffer), [resultadosFiltrados, indexOfFirstOffer, indexOfLastOffer]);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#47b72f' : '#d0d0d0',
            boxShadow: state.isFocused ? '0 0 0 1px #47b72f' : null,
            '&:hover': {
                borderColor: '#47b72f',
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#47b72f' : state.isFocused ? '#e0f7e9' : provided.backgroundColor,
            color: state.isSelected ? 'white' : provided.color,
            '&:hover': {
                backgroundColor: '#e0f7e9',
            },
        }),
    };

    return (
        <div className='pagina-inicio'>
            <div className='portada'>
                <img src={portadaImg} alt='Portada' loading="lazy" />
                <div className='contentform'>
                    <h1>Oportunidades <span style={{ color: 'white' }}>Laborales</span></h1>
                    <h3>Descubre oportunidades laborales para estudiantes y recién egresados en diversas carreras técnicas y profesionales.</h3>
                </div>
            </div>

            <Suspense fallback={<div className="loading"><div className="spinner"></div></div>}>
                <Inserciones />
                <Buscador onBuscar={palabra => handleFiltroChange('palabraClave', palabra)} />
            </Suspense>

            <div className='selectores'>
                <Select
                    className='select-lugar'
                    styles={customStyles}
                    options={opcionesCarrera}
                    onChange={e => handleFiltroChange('carrera', e.value)}
                    value={opcionesCarrera.find(option => option.value === filtros.carrera)}
                    placeholder="Selecciona una carrera"
                    aria-label="Selecciona una carrera"
                />
            </div>

            <Suspense fallback={<div className="loading"><div className="spinner"></div></div>}>
                <Selectores
                    onSelectLugar={selectedLugar => handleFiltroChange('lugar', selectedLugar)}
                    onSelectEmpresa={selectedEmpresa => handleFiltroChange('empresa', selectedEmpresa)}
                    empresas={empresasFiltradas}
                    lugar={filtros.lugar}
                    empresa={filtros.empresa}
                    departamentos={departamentosFiltrados}
                />
            </Suspense>

            <div className='totalofertas'>{totalOfertas.toLocaleString('es-PE')} Empleos Hoy</div>
            <div className='contenidoprincipal'>
                <div className='contenedordecajas'>
                    <Suspense fallback={<div className="loading"><div className="spinner"></div></div>}>
                        {loading ? (
                            <div className="loading"><div className="spinner"></div></div>
                        ) : (
                            ofertasMostradas.length > 0 ? (
                                ofertasMostradas.map((oferta_laboral, index) => (
                                    <CajaOferta
                                        key={index}
                                        oferta_laboral={oferta_laboral}
                                        navigateToLink={handleLinkSeleccionado}
                                    />
                                ))
                            ) : (
                                <div>Error: No hay ofertas disponibles.</div>
                            )
                        )}
                    </Suspense>
                </div>
            </div>

            <Suspense fallback={<div className="loading"><div className="spinner"></div></div>}>
                <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onPageChange={handleCambiarPagina}
                />
                <Footer />
            </Suspense>
        </div>
    );
}

export default Inicio;
