import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'; 
import CajaOferta from '../componentes/cajaoferta';
import Paginacion from '../componentes/paginacion';
import Footer from '../componentes/footer';
import '../componentes/estiloscomponentes.css'

function Carreras() {
    const { carrera } = useParams();
    const navigate = useNavigate();
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCarrera, setSelectedCarrera] = useState(carrera || "Administración");
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalOfertas, setTotalOfertas] = useState(0);
    const [ofertasPorPagina] = useState(14); 

    const diccionarios = useMemo(() => ({
        Administración: ['administracion', 'Administrador', 'logistica', 'nominas', 'creditos y cobranzas', 'comercial', 'costos', 'planeamiento', 'trade'],
        Arquitectura: ['Arquitectura'],
        Biología: ['Biologia', 'Microbiologia'],
        Ciencia_de_la_Computación: ['Ciencia de la Computacion', 'programacion', 'base de datos', 'Ciberseguridad', 'cloud', 'programador', 'estructuras de datos'],
        Ciencia_Política: ['Politica'],
        Ciencias_de_la_Comunicación: ['comunicacion', 'Periodismo', 'Audiovisuales', 'relaciones publicas', 'comunicador social', 'redes sociales', 'comunicador', 'periodista'],
        Contabilidad: ['Contabilidad', 'impuestos', 'contable', 'costos', 'creditos y cobranzas'],
        Derecho: ['Derecho', 'abogado', 'litigio', 'legal', 'abogada'],
        Economía: ['Economia', 'finanzas', 'mercado', 'inversion', 'nominas', 'creditos y cobranzas', 'comercial'],
        Educación: ['Educacion', 'docente', 'profesor', 'profesora'],
        Enfermería: ['Enfermeria', 'enfermera'],
        Estadística: ['Estadistica'],
        Farmacia_y_Bioquímica: ['farmacia', 'bioquimica', 'laboratorio'],
        Gastronomía: ['Gastronomia', 'gastronomica', 'gastronomico', 'cocinero', 'cocinera', 'cocina'],
        Hotelería_y_Turismo: ['Hoteleria', 'turismo', 'turistico'],
        Ingeniería_Agrícola: ['Ingenieria Agricola', 'Ingeniero Agronomo', 'agronomia', 'agronomo', 'agronomia', 'agroindustrial', 'Ingenieria Agronoma'],
        Ingeniería_Ambiental: ['Ingenieria Ambiental', 'ambiental', 'SHEQ'],
        Ingeniería_de_Industrias_alimentarias: ['alimentaria'],
        Ingeniería_Civil: ['Ingenieria Civil', 'civil', 'urbano', 'urbana'],
        Ingeniería_de_Minas: ['Ingeniería de Minas', 'mina', 'mineria', 'minero', 'SHEQ'],
        Ingeniería_de_Sistemas: ['Ingeniería de Sistemas', 'Ingeniero de sistemas', 'Ing Sistemas', 'Ing. sistemas', 'react', 'programación', 'angular', 'sql', 'data', 'devops', ' ti ', 'php', 'soporte tecnico', 'Seguridad de la Informacion', 'Analisis De Datos', 'cloud', 'Data Analytics', 'Mysql'],
        Ingeniería_Eléctrica: ['electrica', 'electricista', 'Transformadores', 'electronica', 'electronico', 'ING. ELECTRICA'],
        Ingeniería_Industrial: ['Ingenieria Industrial', 'Industrial', 'Ing industrial', 'Ing. Industrial', 'logistica', 'nominas', 'creditos y cobranzas', 'comercial', 'costos', 'planeamiento', 'trade'],
        Ingeniería_Mecánica: ['mecanica', 'mecanico'],
        Ingeniería_Mecatrónica: ['mecatronica', 'mecatronica'],
        Ingeniería_Química: ['quimica', 'quimico'],
        Marketing: ['Marketing', 'Publicidad', ' marca ', 'Branding', 'trade'],
        Medicina: ['Medicina'],
        Medicina_Veterinaria: ['Veterinaria', 'veterinario', 'zootecnia'],
        Negocios_Internacionales: ['Negocios Internacionales', 'comercio', 'exportacion', 'comercial', 'aduanas', 'logistica'],
        Nutrición: ['Nutricion'],
        Odontología: ['Odontologia', 'dental'],
        Psicología: ['Psicologia', 'psicologo', 'psicologa', 'seleccion'],
        Publicidad_y_multimedia: ['publicidad', 'multimedia'],
        Recursos_Humanos: ['Recursos humanos', 'seleccion'],
        Ventas: ['Ventas'],
        Almacén: ['almacen', 'inventarios', 'carga'],
        Diseñador_Grafico: ['diseñador grafico', 'grafico', 'diseño gráfico'],
    }), []);

    const fetchOfertas = useCallback(async (carre) => {
        setLoading(true);
        setError(null);

        const palabrasClave = diccionarios[carre]?.join('|') || '';
        try {
            const response = await axios.get(`https://buscadorempleos.onrender.com/selecionarcarrera/${palabrasClave}`);
            setOfertas(response.data);
            setTotalOfertas(response.data.length);
            setPaginaActual(1);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [diccionarios]);

    useEffect(() => {
        if (carrera) {
            fetchOfertas(carrera);
        } else {
            navigate(`/carreras/Administracion`);
        }
    }, [carrera, fetchOfertas, navigate]);

    const handleButtonClick = (carre) => {
        setSelectedCarrera(carre);
        navigate(`/carreras/${carre}`);
        fetchOfertas(carre);
    };

    const handleLinkSeleccionado = useCallback(link => console.log("Link seleccionado:", link), []);

    const handleCambiarPagina = useCallback(nuevaPagina => setPaginaActual(nuevaPagina), []);
    const totalPaginas = useMemo(() => Math.ceil(totalOfertas / ofertasPorPagina), [totalOfertas, ofertasPorPagina]);

    const indexOfLastOffer = paginaActual * ofertasPorPagina;
    const indexOfFirstOffer = indexOfLastOffer - ofertasPorPagina;
    const ofertasMostradas = useMemo(() => ofertas.slice(indexOfFirstOffer, indexOfLastOffer), [ofertas, indexOfFirstOffer, indexOfLastOffer]);

    const carrerasKeys = Object.keys(diccionarios);

    const opcionesCarreras = carrerasKeys.map(carrera => ({
        value: carrera,
        label: carrera.replace(/_/g, ' ')
    }));

    return (
        <div>
            <div className='btn_departamentos amtah'>
                <div className='desktop-buttons'>
                    {carrerasKeys.map((carre, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(carre)}
                            className={`carrera-button ${selectedCarrera === carre ? 'active' : ''}`}
                        >
                            {carre.replace(/_/g, ' ')}
                        </button>
                    ))}
                </div>

                <div className='selectores mobile-dropdown'>
                    <Select
                        value={opcionesCarreras.find(option => option.value === selectedCarrera)} 
                        onChange={(selectedOption) => handleButtonClick(selectedOption.value)} 
                        options={opcionesCarreras} 
                        className="select-lugar" 
                        classNamePrefix="select-lugar" 
                    />
                </div>
            </div>

            <h1 style={{ textAlign: 'center' }}>Ofertas Laborales en <span style={{ color: '#2ab004', textTransform: 'capitalize' }}>{selectedCarrera.replace(/_/g, ' ')}</span></h1>
            <div style={{ textAlign: 'center' }}>{totalOfertas.toLocaleString('es-PE')} Empleos Vigentes</div>

            <div className='contenidoprincipal'>
                <div className='contenedordecajas'>
                    {loading && <div className="loading"><div className="spinner" style={{ marginBottom: '900px',marginTop:'100px' }}></div></div>}
                    {error && <p>Error al cargar las ofertas: {error.message}</p>}
                    {ofertasMostradas.length > 0 ? (
                        ofertasMostradas.map((oferta, index) => (
                            <CajaOferta 
                            key={index} 
                            oferta_laboral={oferta} 
                            navigateToLink={handleLinkSeleccionado}
                            />
                        ))
                    ) : (
                        !loading && <p>No se encontraron ofertas para esta carrera.</p>
                    )}
                </div>
            </div>

            {totalPaginas > 1 &&
                <Paginacion totalPaginas={totalPaginas}
                    paginaActual={paginaActual}
                    onCambiarPagina={handleCambiarPagina} />}
            <Footer />
        </div>
    );
}

export default Carreras;
