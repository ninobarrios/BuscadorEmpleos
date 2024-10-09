import React, { useState, useMemo, useCallback, useEffect } from 'react';
import axios from 'axios';
import CajaOferta from '../componentes/cajaoferta';
import Buscador from '../componentes/buscador';
import Paginacion from '../componentes/paginacion';
import Inserciones from '../componentes/numero_observaciones';
import Selectores from '../componentes/selectores';
import Logo from '../imagenes/logo.avif';
import Footer from '../componentes/footer';
import Select from 'react-select';
import '../componentes/estiloscomponentes.css'
function PaginaInicio() {
    const [resultados, setResultados] = useState([]);
    const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    const opcionesCarrera = [
        { value: '', label: 'Selecciona una carrera' },
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


    ];
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
            try {
                const response = await axios.get('https://buscadorempleos.onrender.com/Ofertas-Laborales');
                setResultados(response.data);
                setResultadosFiltrados(response.data);
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
    

    const empresasFiltradas = useMemo(() =>
        [...new Set(resultadosFiltrados.map(oferta => oferta.nom_empresa))],
        [resultadosFiltrados]
    );

    useEffect(() => {
        const filtrarResultados = () => {
            const { palabraClave, lugar, empresa, carrera } = filtros;
            let filtrados = resultados;

            // Filtra por palabra clave
            if (palabraClave) {
                filtrados = filtrados.filter(oferta =>
                    oferta.nom_oferta.toLowerCase().includes(palabraClave.toLowerCase())
                );
            }

            // Filtra por lugar
            if (lugar) {
                filtrados = filtrados.filter(oferta =>
                    oferta.lugar.toLowerCase().includes(lugar.toLowerCase())
                );
            }

            // Filtra por empresa
            if (empresa) {
                filtrados = filtrados.filter(oferta =>
                    oferta.nom_empresa.toLowerCase().includes(empresa.toLowerCase())
                );
            }

            // Filtra por carrera
            const diccionarios = {
                Administración: ['administracion', 'Administrador','logistica','nominas','creditos y cobranzas','comercial','costos','planeamiento','trade'],
                Arquitectura: ['Arquitectura'],
                Biología: ['Biologia', 'Microbiologia'],
                Ciencia_de_la_Computación: ['Ciencia de la Computacion', 'programacion', 'base de datos', 'Ciberseguridad','cloud','programador','estructuras de datos'],
                Ciencia_Política: ['Politica'],
                Ciencias_de_la_Comunicación: ['comunicacion', 'Periodismo', 'Audiovisuales', 'relaciones publicas', 'comunicador social', 'redes sociales', 'comunicador', 'periodista'],
                Contabilidad: ['Contabilidad', 'impuestos', 'contable','costos','creditos y cobranzas'],
                Derecho: ['Derecho', 'abogado', 'litigio', 'legal', 'abogada'],
                Economía: ['Economia', 'finanzas', 'mercado', 'inversion','nominas','creditos y cobranzas','comercial'],
                Educación: ['Educacion', 'docente', 'profesor', 'profesora'],
                Enfermería: ['Enfermeria', 'enfermera'],
                Estadística: ['Estadistica'],
                Farmacia_y_Bioquímica: ['farmacia', 'bioquimica', 'laboratorio'],
                Gastronomía: ['Gastronomia', 'gastronomica', 'gastronomico', 'cocinero', 'cocinera', 'cocina'],
                Hotelería_y_Turismo: ['Hoteleria', 'turismo', 'turistico'],
                Ingeniería_Agrícola: ['Ingenieria Agricola', 'Ingeniero Agronomo', 'agronomia', 'agronomo', 'agronomia', 'agroindustrial', 'Ingenieria Agronoma'],
                Ingeniería_Ambiental: ['Ingenieria Ambiental', 'ambiental','SHEQ'],
                Ingeniería_de_Industrias_alimentarias: ['alimentaria'],
                Ingeniería_Civil: ['Ingenieria Civil', 'civil', 'urbano', 'urbana'],
                Ingeniería_de_Minas: ['Ingeniería de Minas', 'mina', 'mineria', 'minero','SHEQ'],
                Ingeniería_de_Sistemas: ['Ingeniería de Sistemas', 'Ingeniero de sistemas', 'Ing Sistemas', 'Ing. sistemas', 'react', 'programación', 'angular', 'sql', 'data', 'devops', ' ti ', 'php', 'soporte tecnico', 'Seguridad de la Informacion', 'Analisis De Datos','cloud','Data Analytics','Mysql'],
                Ingeniería_Eléctrica: ['electrica', 'electricista', 'Transformadores', 'electronica', 'electronico','ING. ELECTRICA'],
                Ingeniería_Industrial: ['Ingenieria Industrial', 'Industrial', 'Ing industrial', 'Ing. Industrial','logistica','nominas','creditos y cobranzas','comercial','costos','planeamiento','trade'],
                Ingeniería_Mecánica: ['mecanica', 'mecanico'],
                Ingeniería_Mecatrónica: ['mecatronica', 'mecatronica'],
                Ingeniería_Química: ['quimica', 'quimico'],
                Marketing: ['Marketing', 'Publicidad', ' marca ', 'Branding','trade'],
                Medicina: ['Medicina'],
                Medicina_Veterinaria: ['Veterinaria', 'veterinario', 'zootecnia'],
                Negocios_Internacionales: ['Negocios Internacionales', 'comercio', 'exportacion', 'comercial', 'aduanas','logistica'],
                Nutrición: ['Nutricion'],
                Odontología: ['Odontologia', 'dental'],
                Psicología: ['Psicologia', 'psicologo', 'psicologa','seleccion'],
                Publicidad_y_multimedia: ['publicidad', 'multimedia'],
                Recursos_Humanos: ['Recursos humanos','seleccion'],
                Ventas: ['Ventas'],
                Almacén: ['almacen', 'inventarios','carga'],
                Diseñador_Grafico: ['diseñador grafico', 'grafico', 'diseño gráfico'],
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
            <img className='imagenlogo' src={Logo} alt="Logo Buscojobs" />
            <div className='portada'>
                <div className='contentform'>
                    <h1>La Puerta a <span style={{ color: '#47b72f' }}>Nuevas Oportunidades</span></h1>
                    <h3>Explora tu primer empleo, para Estudiantes y Egresados</h3>
                </div>
            </div>
            <Inserciones />
            <Buscador onBuscar={palabra => handleFiltroChange('palabraClave', palabra)} />

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


            <Selectores
                onSelectLugar={selectedLugar => handleFiltroChange('lugar', selectedLugar)}
                onSelectEmpresa={selectedEmpresa => handleFiltroChange('empresa', selectedEmpresa)}
                empresas={empresasFiltradas}
                lugar={filtros.lugar}
                empresa={filtros.empresa}
                departamentos={departamentosFiltrados}

            />

            <div className='totalofertas'>{totalOfertas.toLocaleString('es-PE')} Empleos</div>
            <div className='main-content'>
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
                        <div>
                            {loading && <div className="loading"><div className="spinner"></div></div>}
                            {error && <div>Error: {error.message}</div>}
                        </div>
                    )}
                </div>
            </div>
            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={handleCambiarPagina}
            />
            <Footer />
        </div>
    );
}

export default PaginaInicio;
