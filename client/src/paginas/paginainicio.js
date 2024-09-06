import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import CajaOferta from '../componentes/cajaoferta';
import Buscador from '../componentes/buscador';
import Paginacion from '../componentes/paginacion';
import Inserciones from '../componentes/numero_observaciones';
import Selectores from '../componentes/selectores';
import Logo from '../imagenes/logo.png';

function PaginaInicio() {
    const [resultados, setResultados] = useState([]);
    const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalOfertas, setTotalOfertas] = useState(0);
    const [ofertasPorPagina, setOfertasPorPagina] = useState(14); // Ahora esto es dinámico
    const [filtros, setFiltros] = useState({
        palabraClave: '',
        lugar: 'lugar',
        empresa: 'empresa'
    });

    const listaDepartamentos = useMemo(() => [
        'Arequipa', 'Lima', 'Cusco', 'Puno', 'Apurimac', 'Amazonas', 'Ancash', 'Ayacucho', 
        'Cajamarca', 'Callao', 'Huancavelica', 'Huanuco', 'Ica', 'Junin', 'La Libertad', 
        'Lambayeque', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'San Martin', 
        'Tacna', 'Tumbes', 'Ucayali','Peru'
    ], []);

    // Cambiar el número de ofertas por página según el tamaño de la pantalla
    useEffect(() => {
        const ajustarOfertasPorPagina = () => {
            if (window.innerWidth <= 768) {
                setOfertasPorPagina(10); // Si la pantalla es menor o igual a 768px, usa 10 ofertas por página
            } else {
                setOfertasPorPagina(14); // De lo contrario, usa 14 ofertas por página
            }
        };

        // Ejecutar al cargar la página
        ajustarOfertasPorPagina();

        // Agregar listener para redimensionar la pantalla
        window.addEventListener('resize', ajustarOfertasPorPagina);

        // Limpiar listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', ajustarOfertasPorPagina);
        };
    }, []);

    useEffect(() => {
        const fetchOfertas = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://buscadorempleos-1.onrender.com/obtenerOfertas');
                setResultados(response.data);
                setTotalOfertas(response.data.length);
                setPaginaActual(1);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOfertas();
    }, []);

    const departamentosFiltrados = useMemo(() => {
        const departamentos = [...new Set(resultadosFiltrados.map(oferta => {
            return listaDepartamentos.find(departamento => oferta.lugar.includes(departamento));
        }))];
        return departamentos.filter(Boolean).sort((a, b) => a.localeCompare(b));
    }, [resultadosFiltrados, listaDepartamentos]);

    const empresasFiltradas = useMemo(() => {
        return [...new Set(resultadosFiltrados.map(oferta => oferta.nom_empresa))];
    }, [resultadosFiltrados]);

    useEffect(() => {
        const filtrarResultados = () => {
            const { palabraClave, lugar, empresa } = filtros;

            const resultadosFiltrados = resultados.filter(oferta => {
                const cumplePalabraClave = palabraClave ? oferta.nom_oferta.toLowerCase().includes(palabraClave.toLowerCase()) : true;

                const cumpleLugar = lugar && lugar !== 'lugar'
                    ? oferta.lugar.toLowerCase().includes(lugar.toLowerCase())
                    : listaDepartamentos.some(departamento => oferta.lugar.includes(departamento));

                const cumpleEmpresa = empresa && empresa !== 'empresa' ? oferta.nom_empresa.toLowerCase().includes(empresa.toLowerCase()) : true;

                return cumplePalabraClave && cumpleLugar && cumpleEmpresa;
            });

            setResultadosFiltrados(resultadosFiltrados);
            setTotalOfertas(resultadosFiltrados.length);
            setPaginaActual(1);

        };

        filtrarResultados();
    }, [resultados, filtros, listaDepartamentos]);

    const handleCambiarPagina = useCallback((nuevaPagina) => {
        setPaginaActual(nuevaPagina);
    }, []);

    const handleLinkSeleccionado = useCallback((link) => {
        console.log("Link seleccionado:", link);
    }, []);

    const handleFiltroChange = useCallback((nombreFiltro, valor) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [nombreFiltro]: valor
        }));
    }, []);

    const totalPaginas = useMemo(() => Math.ceil(totalOfertas / ofertasPorPagina), [totalOfertas, ofertasPorPagina]);
    const indexOfLastOffer = paginaActual * ofertasPorPagina;
    const indexOfFirstOffer = indexOfLastOffer - ofertasPorPagina;
    const ofertasMostradas = useMemo(() => resultadosFiltrados.slice(indexOfFirstOffer, indexOfLastOffer), [resultadosFiltrados, indexOfFirstOffer, indexOfLastOffer]);

    return (
        <div className='pagina-inicio'>
            <img className='imagenlogo' src={Logo} alt="Logo Buscojobs" />
            <div className='portada'>
                <div className='contentform'>
                    <h1>Abre la Puerta a Nuevas <span style={{ color: '#47b72f' }}>Oportunidades</span></h1>
                    <h3>Explora tu primer empleo ideal</h3>
                </div>
            </div>

            <Inserciones />

            <Buscador onBuscar={(palabra) => handleFiltroChange('palabraClave', palabra)} />
            <Selectores
                onSelectLugar={(selectedLugar) => handleFiltroChange('lugar', selectedLugar)}
                onSelectEmpresa={(selectedEmpresa) => handleFiltroChange('empresa', selectedEmpresa)}
                empresas={empresasFiltradas}
                lugar={filtros.lugar}
                empresa={filtros.empresa}
                departamentos={departamentosFiltrados}
            />

            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            )}
            {error && <div>Error: {error.message}</div>}
            <div className='main-content'>
                <div className='totalofertas'>{totalOfertas} Empleos</div>
                <div className='side-content'>
                    {ofertasMostradas.length > 0 ? (
                        ofertasMostradas.map((oferta_laboral, index) => (
                            <CajaOferta
                                key={index}
                                oferta_laboral={oferta_laboral}
                                navigateToLink={handleLinkSeleccionado}
                            />
                        ))
                    ) : (
                        <div>No se encontraron ofertas.</div>
                    )}
                </div>
            </div>
            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={handleCambiarPagina}
            />
        </div>
    );
}

export default PaginaInicio;
