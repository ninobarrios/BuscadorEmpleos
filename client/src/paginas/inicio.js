import React, { useState, useMemo, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../componentes/estiloscomponentes.css'
import portadaImg from '../imagenes/portada.avif';

import CajaOferta from '../componentes/cajaoferta';
import Paginacion from '../componentes/paginacion';
import Selectores from '../componentes/selectores';
import Footer from '../componentes/footer';





function Inicio() {
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
                const response = await axios.get('https://buscadorempleos.onrender.com/Ofertas-Laborales-hoy');
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

            const diccionarios = {
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
                    <h1>Oportunidades <span style={{ color: 'white' }}>Laborales</span> </h1>
                    <h3>Descubre oportunidades laborales para estudiantes y recién egresados<br></br> en diversas carreras técnicas y profesionales.</h3>
                </div>
            </div>
            <div className='msgini'>
                <h1 style={{ color: '#47b72f' }}>¿Estás buscando prácticas profesionales?</h1>
                <p>En esta página encontrarás una amplia variedad de ofertas laborales dirigidas especialmente a estudiantes y recién egresados. Nuestro objetivo es ayudarte a encontrar la oportunidad que mejor se adapte a tu carrera y lugar de residencia.</p>
                <p>
                    Te mostramos las ofertas laborales del día de hoy, pero si quieres ver todas las prácticas vigentes menores a 20 días de antigüedad, dirígete a nuestro buscador:
                    <a
                        href="https://www.practicasuniversitariasperu.com/todas_las_ofertas"
                        className="link"
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{ color: '#47b72f' }}>
                        Ver todas las ofertas
                    </a>.
                </p>
                <p>Te ofrecemos una recopilación de ofertas de diferentes plataformas laborales, garantizando que no te pierdas ninguna oportunidad valiosa. Aquí podrás explorar opciones que te permitirán incursionar en el mundo laboral mientras continúas con tus estudios. Además, también encontrarás oportunidades para egresados que buscan su primera experiencia profesional.</p>
                <p><strong>¡No dejes pasar la oportunidad de dar el siguiente paso en tu carrera!</strong> Navega a través de nuestras ofertas y comienza tu camino hacia el éxito laboral.</p>
            </div>



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

            <div className='totalofertas'>{totalOfertas.toLocaleString('es-PE')} Ofertas laborale hoy</div>
            <a className='alink' href="/todas_las_ofertas">Ver todas las ofertas</a>
            <div className='contenidoprincipal'>
                <div className='contenedordecajas'>
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

            <div className='msgdcrp'>
                <h2> <span style={{ color: 'white' }}>Método de Búsqueda</span> Efectivo</h2>
                
            </div>
            <div className='msgdcrp_ctn'>

                    <p>En el actual entorno laboral, caracterizado por su dinamismo y competencia, muchas empresas han optado por publicar sus ofertas de trabajo a través de plataformas específicas, tales como LinkedIn, Indeed, y otras bolsas de trabajo en línea. Sin embargo, esta diversidad puede convertirse en un desafío significativo al momento de buscar empleo. Con tantas plataformas disponibles, es fácil sentirse abrumado y perder de vista oportunidades que podrían ajustarse perfectamente a tu perfil profesional.</p>

                    <h3>¿Por qué es Importante un Método de Búsqueda Efectivo?</h3>
                    <p>Un método de búsqueda efectivo no solo facilita la localización de ofertas laborales, sino que también optimiza el tiempo y los recursos que dedicas a esta tarea. Según estudios recientes, más del 70% de las ofertas laborales no se publican públicamente y son ocupadas a través de redes de contacto y recomendaciones. Esto significa que la búsqueda activa en plataformas específicas puede ser clave para acceder a oportunidades ocultas.</p>

                    <h3>Retos en la Búsqueda de Empleo</h3>
                    <ol>
                        <li><strong>Diversidad de Plataformas:</strong> Cada plataforma tiene su propio conjunto de ofertas y características. A menudo, los usuarios deben invertir tiempo buscando en múltiples sitios, lo que puede resultar tedioso y frustrante.
                            <em> Ejemplo: </em> Imagina que estás buscando un puesto de pasante en marketing. Publicas tu currículum en LinkedIn, pero también te registras en Indeed y en una bolsa de trabajo local. Cada plataforma puede tener ofertas diferentes, y si no revisas todas, podrías perder una oportunidad que encaje perfectamente con tus habilidades.</li>
                        <li><strong>Pérdida de Oportunidades:</strong> La falta de un enfoque centralizado puede llevar a perder oportunidades valiosas. Es posible que una oferta laboral que se ajuste a tus habilidades y experiencia esté disponible en una plataforma que no estás revisando.
                            <em> Ejemplo: </em> Una empresa puede estar buscando un pasante en análisis de datos, pero publica la oferta exclusivamente en una plataforma menos conocida. Si solo miras las grandes plataformas, podrías perder esta valiosa oportunidad.</li>
                    </ol>

                    <h3>Nuestro Enfoque: Recopilación Centralizada de Ofertas</h3>
                    <p>Para resolver estos problemas, en nuestra página hemos diseñado un enfoque que permite la recopilación de ofertas laborales de diversas plataformas en un solo lugar. Esto no solo ahorra tiempo, sino que también garantiza que tengas acceso a una amplia gama de oportunidades. Aquí hay algunos elementos clave de nuestro método:</p>

                    <ol>
                        <li><strong>Recopilación de Ofertas:</strong> Nos dedicamos a recoger ofertas laborales de múltiples plataformas, lo que te permite tener una visión integral de las oportunidades disponibles. Nuestro equipo se asegura de que cada oferta sea revisada y categorizada correctamente.</li>
                        <li><strong>Filtrado por Necesidades:</strong> Las ofertas están organizadas para que puedas filtrarlas según tus preferencias. Ya sea por ubicación, tipo de trabajo o requisitos específicos, puedes personalizar tu búsqueda para que se ajuste a tus necesidades.</li>
                        <li><strong>Actualización Constante:</strong> Nuestra base de datos se actualiza diariamente, asegurando que tengas acceso a las ofertas más recientes y relevantes. Esto es fundamental, ya que muchas ofertas son ocupadas rápidamente.</li>
                    </ol>

                    <h3>Ejemplos de Estrategias de Búsqueda Efectiva</h3>
                    <ul>
                        <li><strong>Establece Alertas de Empleo:</strong> Muchas plataformas permiten crear alertas de empleo personalizadas. Esto significa que recibirás notificaciones cuando se publiquen nuevas ofertas que se ajusten a tus criterios. Esta estrategia te ayuda a ser uno de los primeros en postularte.</li>
                        <li><strong>Usa Palabras Clave:</strong> Al buscar en plataformas laborales, utiliza palabras clave específicas relacionadas con el tipo de empleo que buscas. Por ejemplo, si buscas prácticas en desarrollo web, utiliza términos como "pasantía en desarrollo front-end" o "práctica en programación".</li>
                        <li><strong>Redes Sociales y Networking:</strong> No subestimes el poder del networking. A menudo, las ofertas de empleo se comparten a través de redes sociales. Conéctate con profesionales de tu área en LinkedIn y participa en grupos relacionados con tu carrera. Esto puede abrir puertas a oportunidades que no se publican en línea.</li>
                    </ul>

                    <h3>Ventajas de Usar Nuestra Plataforma</h3>
                    <ul>
                        <li><strong>Ahorra Tiempo:</strong> Al centralizar todas las ofertas laborales, puedes dedicar más tiempo a prepararte para entrevistas y menos tiempo buscando en diferentes sitios.</li>
                        <li><strong>Aumenta tus Oportunidades:</strong> Al no depender de una sola plataforma, aumentas tus posibilidades de encontrar el trabajo ideal que se alinee con tus objetivos de carrera.</li>
                        <li><strong>Acceso a Ofertas Exclusivas:</strong> Algunas ofertas laborales pueden ser exclusivas de plataformas específicas, y al usar nuestro servicio, te aseguras de no perderte ninguna.</li>
                    </ul>

                    <p>En resumen, nuestra misión es ayudarte a navegar el vasto mar de ofertas laborales, reduciendo la posibilidad de que te pierdas de ninguna oportunidad valiosa. Al adoptar un método de búsqueda efectivo y aprovechar nuestra plataforma, estás un paso más cerca de encontrar la práctica profesional o el trabajo ideal que te ayudará a construir tu futuro.</p>

                    <p><strong>¡Comienza tu búsqueda hoy y descubre todas las ofertas que tenemos para ti!</strong></p>

                </div>
            <Footer />
        </div>
    );
}

export default Inicio;
