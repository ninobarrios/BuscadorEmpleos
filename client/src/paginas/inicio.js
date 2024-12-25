import React, { useState, useMemo, useCallback, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../componentes/estiloscomponentes.css'
import portadaImg from '../imagenes/portada.avif';

import CajaOferta from '../componentes/cajaoferta';
import Paginacion from '../componentes/paginacion';
import Selectores from '../componentes/selectores';
import Footer from '../componentes/footer';
import ComoPostular from './comopostular';





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
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Función para alternar la expansión/cierre de cada pregunta
    const toggleAnswer = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Si ya está expandido, lo colapsa, si no, lo expande
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
                    Te mostramos las ofertas laborales del día de hoy, pero si quieres ver todas las prácticas vigentes menores a 20 días de antigüedad.
                    {/*<a
                        href="https://www.practicasuniversitariasperu.com/todas_las_ofertas"
                        className="link"
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{ color: '#47b72f' }}>
                        Ver todas las ofertas
                    </a>.*/}
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
            {/*<a className='alink' href="/todas_las_ofertas">Ver todas las ofertas</a>*/}
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
            <ComoPostular />
            <div className='msgdcrp'>
                <h2> <span style={{ color: 'white' }}>Método de Búsqueda</span> Efectivo</h2>

            </div>
            <div className='msgdcrp_ctn'>

                <header>
                    <h1>Cómo Buscar Trabajo de Forma Inteligente en un Mercado Competitivo</h1>
                    <p>Optimiza tu tiempo y encuentra las mejores oportunidades laborales</p>
                </header>

                <div class="container">

                    <p>En el entorno laboral actual, dinámico y altamente competitivo, muchos buscan empleo a través de plataformas como LinkedIn, Indeed y diversas bolsas de trabajo online. Aunque estas plataformas son útiles, la abundancia de opciones puede convertirse en un obstáculo si no se gestionan de manera efectiva. Con tantas ofertas disponibles, es fácil sentirse perdido o abrumado, perdiendo de vista aquellas que se ajustan a tu perfil profesional.</p>

                    <h3>La Clave: Tener un Método de Búsqueda Efectivo</h3>
                    <p>¿Por qué es tan importante tener un método claro? No solo facilita encontrar las oportunidades adecuadas, sino que también optimiza tu tiempo y recursos. De acuerdo con estudios recientes, más del 70% de las ofertas de empleo no se publican públicamente, sino que se llenan a través de redes de contacto y recomendaciones. Esto significa que, además de usar las plataformas más conocidas, es vital tener una estrategia para acceder a esas oportunidades "ocultas".</p>

                    <h3>Principales Retos en la Búsqueda de Empleo</h3>
                    <ol>
                        <li><strong>Diversidad de Plataformas:</strong> Cada plataforma tiene su propio conjunto de ofertas y funciones. Navegar por varias de ellas puede ser tedioso, especialmente cuando estás buscando la misma oferta en distintos lugares.
                            <em> Ejemplo:</em> Imagina que estás buscando un puesto de pasante en marketing. Si solo revisas LinkedIn, podrías pasar por alto oportunidades en sitios como Indeed o bolsas locales de empleo, que podrían tener vacantes perfectas para ti.
                        </li>
                        <li><strong>Pérdida de Oportunidades Valiosas:</strong> El no tener un enfoque organizado y centralizado puede llevarte a perder ofertas clave. Muchas veces, las empresas publican vacantes en plataformas menos populares, lo que puede resultar en oportunidades que no encuentras si solo te enfocas en los grandes portales.
                            <em> Ejemplo:</em> Una empresa podría estar buscando un pasante en análisis de datos y publicar la oferta en un portal menos conocido. Si no revisas estos sitios, podrías dejar pasar una excelente oportunidad.
                        </li>
                    </ol>

                    <h3>Consejos para Optimizar Tu Búsqueda de Empleo</h3>
                    <ul class="tips-list">
                        <li><strong>Organiza tu tiempo y recursos:</strong> Dedica bloques de tiempo específicos a revisar las plataformas de empleo más relevantes, pero también asegúrate de explorar redes sociales y portales más especializados que podrían ofrecerte un acceso exclusivo a vacantes.</li>
                        <li><strong>Construye tu red de contactos:</strong> Recuerda que las recomendaciones y contactos son fundamentales. Utiliza plataformas como LinkedIn para conectar con profesionales de tu industria. Las oportunidades ocultas a menudo se llenan por referencias internas.</li>
                        <li><strong>Personaliza tu CV y carta de presentación:</strong> Cada vez que postules a un empleo, adapta tu currículum y carta de presentación a las características de la oferta. No hay nada peor que enviar un CV genérico que no resalte tus puntos fuertes para el puesto específico.</li>
                        <li><strong>Mantén una actitud proactiva:</strong> No te limites a postularte, también toma la iniciativa de contactar con reclutadores o empleadores para hacer un seguimiento sobre tu postulación. Esto puede ser clave para diferenciarte.</li>
                    </ul>

                </div>

                <header>
                    <h1>Recopilación Centralizada de Ofertas Laborales</h1>
                    <p>Te ayudamos a encontrar las mejores oportunidades de empleo en un solo lugar</p>
                </header>

                <div class="container">
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
                </div>
                <h4>Consejos para Enfrentar tu Entrevista de Trabajo con Confianza</h4>

                <p>Las entrevistas de trabajo son una parte esencial del proceso de selección, y a menudo son el paso final antes de conseguir ese tan ansiado empleo. Aunque es normal sentir nervios, recuerda que la entrevista es también una oportunidad para mostrar lo mejor de ti mismo. A continuación, te damos algunos consejos prácticos que no solo te ayudarán a prepararte de manera efectiva, sino que también te inspirarán a abordar esta experiencia con la mejor actitud:</p>

                <ul>
                    <li><strong>Prepárate bien para la entrevista:</strong> La preparación es la clave para el éxito. Investiga a fondo la empresa, su misión, visión y valores, además de los detalles específicos del puesto al que te estás postulando. Cuanto más sepas sobre la organización, mejor podrás adaptar tus respuestas a lo que buscan. Además, piensa en ejemplos concretos de tu experiencia pasada que puedan ilustrar tus habilidades, logros y cómo has superado desafíos en el pasado. Este tipo de preparación no solo te ayudará a sentirte más seguro, sino que también te permitirá transmitir confianza y conocimiento durante la entrevista.</li>

                    <li><strong>Practica tus respuestas:</strong> La práctica hace al maestro. Reflexiona sobre las preguntas más comunes en entrevistas, como "¿Cuál es tu mayor fortaleza?", "¿Por qué quieres trabajar con nosotros?", "¿Dónde te ves en cinco años?" o "¿Qué te motiva a dar lo mejor de ti?". Tener respuestas preparadas no significa memorizar un guion, sino tener claro lo que quieres comunicar. Al practicar, ganarás seguridad en tu capacidad para responder con calma y claridad. Esto dejará una impresión positiva, mostrando que eres una persona reflexiva y bien preparada.</li>

                    <li><strong>Destaca tus habilidades blandas:</strong> Si bien las habilidades técnicas son importantes, las empresas valoran enormemente las habilidades blandas, como la comunicación, el trabajo en equipo, la adaptabilidad y la resolución de problemas. Estos atributos son fundamentales para el éxito en cualquier entorno de trabajo. Asegúrate de compartir ejemplos de cómo has demostrado estas habilidades en tu vida académica, voluntariado o en otras experiencias previas. Si logras transmitir que eres una persona capaz de relacionarse y trabajar bien con otros, esto te hará destacar frente a los demás candidatos.</li>

                    <li><strong>Haz preguntas inteligentes:</strong> Las entrevistas no solo son una oportunidad para que los empleadores te conozcan a ti, sino también para que tú conozcas a la empresa. Al final de la entrevista, cuando te pregunten si tienes alguna duda, no dudes en hacer preguntas inteligentes y bien pensadas sobre la empresa o el puesto. Preguntar sobre la cultura organizacional, los retos del puesto o las oportunidades de crecimiento demuestra que te has tomado el tiempo para investigar y que realmente estás interesado en la vacante. Además, esto refleja tu actitud proactiva y tu deseo de tomar decisiones informadas sobre tu futuro laboral.</li>
                </ul>

                <h3>Cómo Prepararte para una Entrevista Virtual: La Nueva Realidad</h3>

                <p>Las entrevistas de trabajo virtuales han llegado para quedarse, y, aunque son más convenientes, también requieren una preparación distinta. Si bien es posible que ya estés acostumbrado a las videollamadas, hay algunos detalles específicos que debes tener en cuenta para que todo salga bien. A continuación, te damos algunas recomendaciones:</p>

                <ul>
                    <li><strong>Verifica tu equipo y conexión:</strong> Antes de la entrevista, asegúrate de que tu cámara y micrófono funcionen correctamente. Haz una prueba de conexión a internet para evitar problemas técnicos. La calidad de la imagen y el sonido es crucial para que tu entrevistador pueda conocerte mejor, sin distracciones.</li>

                    <li><strong>Elige un entorno adecuado:</strong> La ubicación en la que realices la entrevista es igualmente importante. Busca un lugar tranquilo, bien iluminado y sin distracciones. Asegúrate de que el fondo sea apropiado y profesional; si es posible, utiliza un fondo neutro. La primera impresión cuenta, y un entorno organizado y bien preparado demuestra que te tomas en serio la entrevista.</li>

                    <li><strong>Domina las herramientas de videoconferencia:</strong> Familiarízate con la plataforma que se utilizará para la entrevista (como Zoom, Microsoft Teams o Google Meet). Si nunca has usado alguna de estas herramientas, realiza una prueba con un amigo o familiar antes de la entrevista. Asegúrate de saber cómo unirte a la llamada, activar y desactivar el micrófono, y compartir tu pantalla si es necesario. Cuanto más cómodo te sientas con la tecnología, más tranquilo estarás durante la entrevista.</li>
                </ul>

                <h4>Estudio de Cursos para Mejorar tu Perfil Profesional</h4>

                <p>El aprendizaje constante es una de las claves para destacar en el competitivo mercado laboral. A medida que te preparas para tu primer empleo, es esencial que sigas mejorando tus habilidades, tanto técnicas como blandas. A continuación, te damos algunos consejos sobre cómo estudiar y mejorar tu perfil profesional:</p>

                <ul>
                    <li><strong>Identifica tus áreas de mejora:</strong> Evalúa tus fortalezas y debilidades, y determina qué habilidades o conocimientos te gustaría fortalecer. ¿Hay algún área técnica que puedas mejorar, como programación, análisis de datos o marketing digital? ¿O tal vez deseas desarrollar habilidades blandas como la comunicación o el liderazgo? Saber en qué áreas mejorar es el primer paso para tomar acción.</li>

                    <li><strong>Aprovecha cursos gratuitos y certificados:</strong> Hay muchas plataformas en línea que ofrecen cursos gratuitos y certificados que puedes agregar a tu currículum. Coursera, Udemy, edX y Khan Academy son solo algunos ejemplos de sitios donde puedes acceder a material educativo de alta calidad en diversas áreas. Si estás interesado en tecnología, por ejemplo, podrías tomar cursos de desarrollo web o diseño UX/UI. Las certificaciones son una excelente forma de destacar y demostrar a los empleadores que has invertido tiempo en mejorar tus habilidades.</li>

                    <li><strong>Mantén tus habilidades actualizadas:</strong> Las tendencias y tecnologías evolucionan rápidamente, y lo que aprendiste hace unos años puede volverse obsoleto. Si eres programador, por ejemplo, es importante que te mantengas actualizado con los lenguajes de programación más recientes o las nuevas herramientas que se utilizan en la industria. Siempre hay algo nuevo que aprender, así que haz de la educación continua un hábito.</li>

                    <li><strong>Participa en proyectos prácticos:</strong> La teoría es importante, pero lo que realmente te ayudará a destacar son tus proyectos prácticos. Ya sea desarrollando una página web, creando contenido para redes sociales o diseñando una app, participar en proyectos reales te permite aplicar tus conocimientos en situaciones reales. Esto no solo mejora tus habilidades, sino que también te da ejemplos concretos que puedes compartir durante tus entrevistas. ¡No tengas miedo de aprender haciendo!</li>
                </ul>



                <h3>Ventajas de Usar Nuestra Plataforma</h3>

                <p>En un entorno competitivo como el actual, aprovechar las mejores herramientas para encontrar empleo es clave. Nuestra plataforma está diseñada para ofrecerte ventajas únicas que te permitirán optimizar tu tiempo y aumentar tus oportunidades. A continuación, te mostramos cómo podemos ayudarte:</p>

                <ul>
                    <li><strong>Ahorra Tiempo:</strong> Al centralizar todas las ofertas laborales en un solo lugar, no tendrás que perder tiempo buscando en múltiples sitios web. Podrás concentrarte en lo más importante: prepararte para las entrevistas y avanzar en tu carrera profesional.</li>

                    <li><strong>Aumenta tus Oportunidades:</strong> Al no depender de una sola plataforma, tendrás acceso a una amplia variedad de ofertas, lo que aumenta las posibilidades de encontrar el trabajo ideal. Cuantas más oportunidades explores, más fácil será dar con el puesto que se alinee con tus intereses y metas profesionales.</li>

                    <li><strong>Acceso a Ofertas Exclusivas:</strong> Muchas veces, las mejores oportunidades laborales se publican solo en plataformas específicas. Al usar nuestro servicio, te aseguras de no perder ninguna oferta exclusiva, aumentando tu acceso a trabajos que podrían ser ideales para ti.</li>
                </ul>

                <h2>Comparativa de Ventajas: Buscar en Varios Buscadores de Empleo vs. Buscar Solo en un Buscador de Empleo</h2>

                <p>En la siguiente tabla, te mostramos una comparativa entre buscar en múltiples buscadores de empleo y limitarte a uno solo. Conocer estas diferencias te ayudará a tomar decisiones más informadas durante tu búsqueda laboral.</p>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Ventajas</th>
                                <th>Buscar en Varios Buscadores de Empleo</th>
                                <th>Buscar Solo en un Buscador de Empleo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Acceso a más oportunidades</td>
                                <td>Mayor variedad de ofertas, ya que cada plataforma tiene su propio conjunto de anuncios exclusivos.</td>
                                <td>Limitación de ofertas, ya que solo estás expuesto a los anuncios de una plataforma.</td>
                            </tr>
                            <tr>
                                <td>Cobertura geográfica</td>
                                <td>Posibilidad de encontrar ofertas en diversas regiones, países e incluso a nivel global.</td>
                                <td>Restricción a la región o área geográfica de una sola plataforma.</td>
                            </tr>
                            <tr>
                                <td>Acceso a plataformas exclusivas</td>
                                <td>Algunas ofertas solo están disponibles en plataformas específicas, lo que te da más oportunidades.</td>
                                <td>Puedes perder oportunidades exclusivas que solo están en otras plataformas.</td>
                            </tr>
                            <tr>
                                <td>Personalización de búsqueda</td>
                                <td>Las plataformas ofrecen diferentes filtros de búsqueda, lo que te permite personalizar tu búsqueda de manera más flexible y efectiva.</td>
                                <td>Menos flexibilidad en la personalización, ya que dependes solo de los filtros de un sitio.</td>
                            </tr>
                            <tr>
                                <td>Visibilidad de ofertas más recientes</td>
                                <td>Al revisar varias plataformas, accedes a ofertas más recientes y actualizadas, lo que te da una ventaja competitiva.</td>
                                <td>Es posible que algunas ofertas no se actualicen tan rápidamente, limitando tu acceso a las vacantes más recientes.</td>
                            </tr>
                            <tr>
                                <td>Tiempo de búsqueda</td>
                                <td>Aunque invertirás algo más de tiempo revisando diversas plataformas, este esfuerzo te permitirá encontrar una mayor cantidad de oportunidades.</td>
                                <td>Revisar solo un sitio ahorra tiempo, pero te limita a menos opciones y oportunidades.</td>
                            </tr>
                            <tr>
                                <td>Facilidad de gestión</td>
                                <td>Gestionar varias cuentas o alertas puede ser más complejo, pero te brinda mayor visibilidad y control sobre tu búsqueda.</td>
                                <td>Una sola cuenta es más fácil de gestionar, pero limita tu acceso a la diversidad de ofertas.</td>
                            </tr>
                            <tr>
                                <td>Diversidad en tipos de empleo</td>
                                <td>Podrás encontrar una mayor variedad de tipos de empleo, desde trabajos temporales hasta freelance o de tiempo completo.</td>
                                <td>Si la plataforma está especializada, puedes estar limitado a un tipo específico de trabajo.</td>
                            </tr>
                            <tr>
                                <td>Actualización constante</td>
                                <td>Algunos buscadores actualizan sus ofertas con mayor rapidez, asegurándote de estar al tanto de las oportunidades más frescas.</td>
                                <td>Puedes tener retrasos en la actualización de las ofertas en la plataforma.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <h2>Consejos para Mejorar tu Perfil Profesional Online</h2>

                <h4>Optimiza tu Currículum y Perfil en Línea</h4>
                <p>Tu currículum y perfil en línea son las primeras impresiones que los reclutadores tienen de ti, por lo que es esencial que estén bien estructurados y optimizados. A continuación, algunos consejos prácticos para mejorar estos dos elementos clave:</p>

                <ul>
                    <li><strong>Actualización constante:</strong> Asegúrate de que tu currículum y perfil estén siempre al día. Si acabas de completar un curso relevante o un proyecto importante, añádelo inmediatamente. Por ejemplo, si acabas de finalizar un curso en "Desarrollo Front-End" en una plataforma como Coursera, inclúyelo para destacar tus habilidades actualizadas.</li>
                    <li><strong>Usa palabras clave:</strong> Para aumentar la visibilidad de tu perfil, utiliza palabras clave que los reclutadores podrían estar buscando. Por ejemplo, si trabajas en marketing digital, palabras clave como "SEO", "Google Analytics", "estrategias de contenido" te ayudarán a ser encontrado más fácilmente.</li>
                    <li><strong>Claridad y concisión:</strong> Tanto tu currículum como tu perfil en LinkedIn deben ser fáciles de leer. Evita el uso de párrafos largos o jerga innecesaria. Un ejemplo de un currículum conciso sería: “Responsable del aumento de tráfico web en un 30% mediante estrategias SEO”, en lugar de “Desarrollé y ejecuté varias estrategias SEO para aumentar el tráfico de la web.”</li>
                </ul>

                <h4>Solicita Recomendaciones</h4>
                <p>Las recomendaciones de tus antiguos empleadores o compañeros de trabajo pueden ser un punto de diferenciación clave. Este tipo de respaldo proporciona una visión externa de tus capacidades y actitudes laborales, lo que puede darle a tu perfil un toque más humano y creíble.</p>

                <ul>
                    <li><strong>Cómo pedir recomendaciones:</strong> Cuando solicites una recomendación, sé específico sobre lo que te gustaría que se mencionara. Por ejemplo, si trabajaste en un proyecto en equipo, pídele a tu supervisor que hable sobre tu habilidad para colaborar y tu enfoque proactivo.</li>
                    <li><strong>Casos prácticos:</strong> Imagina que estás buscando un trabajo en desarrollo web. Si tu jefe anterior comenta en tu recomendación: “Juan mostró una gran capacidad para aprender nuevas tecnologías rápidamente, lo que resultó en la finalización exitosa del proyecto X utilizando JavaScript y React”, esto destacaría tus habilidades técnicas clave.</li>
                </ul>

                <h4>Participa en Grupos y Foros Profesionales</h4>
                <p>La participación activa en comunidades online y grupos de redes sociales relacionadas con tu industria te puede dar acceso a valiosas oportunidades y consejos. Estar involucrado en estos grupos te permite aumentar tu visibilidad y estar al tanto de vacantes que no siempre se publican en bolsas de trabajo tradicionales.</p>

                <ul>
                    <li><strong>Ejemplo de participación efectiva:</strong> Si eres diseñador UX/UI, puedes unirte a grupos de LinkedIn o Slack dedicados a diseño web o desarrollo de productos digitales. Además de recibir consejos sobre las últimas tendencias, también puedes encontrar proyectos colaborativos o incluso vacantes laborales exclusivas.</li>
                    <li><strong>Redes de contacto:</strong> Participar en foros profesionales también te ayuda a construir relaciones. Si tienes una conversación enriquecedora sobre diseño responsivo con un miembro del grupo, es posible que él o ella te refiera para una vacante que nunca verías en otros sitios.</li>
                </ul>

                <h3>Tendencias y Nuevas Oportunidades en el Mercado Laboral</h3>
                <p>El mercado laboral está cambiando rápidamente, y mantenerse informado sobre las últimas tendencias te permitirá anticiparte a las nuevas oportunidades. Las áreas tecnológicas, como el desarrollo de inteligencia artificial, análisis de datos y ciberseguridad, son algunas de las más dinámicas y prometedoras.</p>

                <h4>Habilidades en Alta Demanda:</h4>
                <ul>
                    <li><strong>Tecnología y Datos:</strong> Las industrias están buscando cada vez más profesionales con conocimientos en <em>big data</em>, <em>análisis de datos</em> y <em>desarrollo de software</em>. Por ejemplo, si eres un analista de datos, aprender herramientas como <strong>Python</strong>, <strong>SQL</strong> y <strong>Tableau</strong> te permitirá acceder a una amplia gama de ofertas en áreas tecnológicas y financieras.</li>

                    <li><strong>Gestión de Proyectos:</strong> Habilidades en <em>metodologías ágiles</em> como <strong>Agile</strong> o <strong>Scrum</strong> están muy solicitadas, especialmente en sectores como la tecnología y el desarrollo empresarial. Si tienes experiencia liderando proyectos con equipos multidisciplinarios, resalta tus logros en estas metodologías. Un ejemplo sería: "Lideré un equipo de 8 personas utilizando Scrum para entregar un software 3 semanas antes del plazo".</li>

                    <li><strong>Comunicación Digital:</strong> Con el aumento del trabajo remoto, la comunicación efectiva en plataformas digitales es una habilidad indispensable. Por ejemplo, si trabajas en marketing, saber cómo usar herramientas de colaboración como <strong>Slack</strong> o <strong>Trello</strong> para organizar campañas puede ser un diferenciador clave. Además, ser capaz de comunicarte de manera efectiva a través de <em>email marketing</em> y redes sociales es crucial para maximizar el impacto de las campañas de marketing digital.</li>
                </ul>




                <h3>Estrategias para Evaluar el Ajuste Cultural</h3>
                <p>El ajuste cultural es un factor clave que muchas empresas consideran, además de las habilidades técnicas. Asegurarte de que una empresa tenga una cultura que se alinee con tus valores y estilo de trabajo es crucial para tu bienestar y éxito a largo plazo. Aquí te ofrecemos algunos pasos detallados y prácticos para evaluar el ajuste cultural de una empresa:</p>

                <ul>
                    <li><strong>Visita la página web y redes sociales de la empresa:</strong> Antes de postularte, tómate el tiempo para investigar sobre la misión, visión y valores de la empresa. Muchas empresas tienen una sección en su sitio web donde detallan su cultura laboral, sus principios y su enfoque en el bienestar de los empleados. Por ejemplo, si una empresa resalta la innovación como uno de sus valores clave, y te apasiona trabajar en un entorno creativo, esto podría ser un buen indicio de que el ajuste cultural es positivo.</li>
                    <li><strong>Lee comentarios en sitios de reseñas de empleadores:</strong> Plataformas como <a href="https://www.glassdoor.com">Glassdoor</a> y <a href="https://www Indeed.com">Indeed</a> permiten a los empleados actuales y pasados dejar comentarios sobre su experiencia laboral. Este tipo de retroalimentación te dará una visión honesta y realista sobre el ambiente de trabajo. Por ejemplo, si muchos empleados mencionan que la empresa tiene un excelente equilibrio entre vida laboral y personal, y eso es algo que valoras, entonces podría ser una buena señal de que la empresa se alinea con tus necesidades.</li>
                    <li><strong>Haz preguntas durante la entrevista:</strong> No tengas miedo de preguntar sobre la cultura laboral durante la entrevista. Pregunta sobre cómo la empresa maneja el trabajo en equipo, el enfoque hacia el bienestar de los empleados y las oportunidades de crecimiento. Por ejemplo, puedes preguntar: "¿Cómo describirían los empleados actuales el ambiente de trabajo aquí?" o "¿Cuáles son las oportunidades para el desarrollo profesional dentro de la empresa?". Esto no solo te ayudará a entender mejor la cultura, sino que también demostrará tu interés genuino en formar parte de un lugar donde puedas prosperar.</li>
                </ul>

                <h3>Estudio de Cursos para Mejorar tu Perfil Profesional</h3>
                <p>El aprendizaje continuo es fundamental para mejorar tu perfil profesional, y los cursos adecuados pueden marcar la diferencia en tu carrera. Aquí te dejamos más detalles sobre cómo elegir los cursos más relevantes y cómo estos pueden ayudarte a mejorar tus habilidades:</p>

                <ul>
                    <li><strong>Certificaciones Relevantes:</strong> Más allá de los cursos convencionales, obtener certificaciones de instituciones reconocidas puede ser un gran impulso para tu carrera. Por ejemplo, si estás en el área de marketing digital, obtener una certificación en Google Analytics o Google Ads es un excelente medio para mejorar tu perfil y destacar frente a otros candidatos. Estas certificaciones son valoradas porque demuestran que tienes conocimientos actualizados y específicos sobre herramientas y tecnologías relevantes.</li>
                    <li><strong>Cursos de Soft Skills:</strong> Las habilidades blandas son esenciales en el entorno laboral actual. Muchas veces, las empresas buscan candidatos que no solo tengan habilidades técnicas, sino también la capacidad de trabajar en equipo, resolver problemas de manera efectiva, tener empatía y una comunicación asertiva. Un curso sobre habilidades de comunicación, liderazgo o gestión del tiempo puede marcar una gran diferencia. Por ejemplo, si trabajas en un entorno colaborativo, saber cómo comunicarte de manera efectiva y cómo resolver conflictos de forma constructiva puede ser más valioso que conocer solo las herramientas técnicas del puesto.</li>
                    <li><strong>Ejemplo práctico:</strong> Imagina que trabajas en tecnología y decides hacer un curso en "Comunicación Asertiva". Luego, en tu próximo proyecto en equipo, puedes aplicar lo aprendido para manejar desacuerdos de manera productiva, lo que no solo mejora el ambiente de trabajo, sino que también te posiciona como un líder dentro del equipo. Esto te puede abrir nuevas oportunidades de crecimiento profesional.</li>
                </ul>











                <section className="faq">
                    <h3>Preguntas Frecuentes (FAQ) sobre la Búsqueda de Empleo</h3>

                    {/* Pregunta 1 */}
                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 0 ? "true" : "false"}
                            onClick={() => toggleAnswer(0)}
                        >
                            1. ¿Cómo puedo empezar mi búsqueda de empleo?
                        </button>
                        {expandedIndex === 0 && (
                            <div className="faq-answer">
                                <p>
                                    Para comenzar, lo más importante es reflexionar sobre el tipo de empleo que deseas. ¿Qué habilidades tienes?
                                    ¿Qué tipo de ambiente te gustaría trabajar? Define claramente tus metas laborales y luego crea un currículum bien
                                    estructurado que refleje tu experiencia y habilidades clave. No olvides optimizar tu perfil en plataformas de
                                    empleo como LinkedIn, Indeed o Glassdoor, asegurándote de que tu información esté actualizada. Además, es
                                    fundamental ser constante y organizado, ya que la búsqueda de empleo puede ser un proceso largo y desafiante. Dedica
                                    tiempo cada día para buscar ofertas, postularte a ellas y hacer seguimiento a tus aplicaciones.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 1 ? "true" : "false"}
                            onClick={() => toggleAnswer(1)}
                        >
                            2. ¿Qué debo incluir en mi currículum para destacar?
                        </button>
                        {expandedIndex === 1 && (
                            <div className="faq-answer">
                                <p>
                                    Un currículum bien estructurado debe incluir tu información personal (nombre, dirección, contacto), un resumen
                                    profesional que resuma tus principales logros y tu especialización, y luego una lista de tu experiencia laboral,
                                    destacando logros cuantificables (como aumentar las ventas en un 20% o gestionar un equipo de 5 personas). Además,
                                    es importante incluir tus habilidades clave (técnicas y blandas), tu formación académica, y cualquier curso o
                                    certificación relevante. Recuerda adaptar tu currículum para cada oferta laboral, utilizando palabras clave que
                                    aparezcan en la descripción del puesto, lo que aumentará las posibilidades de que tu currículum pase los filtros
                                    automáticos de los reclutadores.
                                </p>
                            </div>
                        )}
                    </div>




                    {/* Pregunta 3 */}
                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 2 ? "true" : "false"} // Establece el estado de expansión para la pregunta 3
                            onClick={() => toggleAnswer(2)} // Llama a la función toggle con el índice 2
                        >
                            3. ¿Cuánto tiempo debo dedicar cada día a la búsqueda de empleo?
                        </button>
                        {expandedIndex === 2 && (
                            <div className="faq-answer">
                                <p>
                                    La búsqueda de empleo es un proceso que requiere tiempo y esfuerzo. Aunque no hay una regla estricta, es
                                    recomendable dedicar al menos 1-2 horas al día para realizar una búsqueda activa. Esto incluye revisar ofertas de
                                    trabajo en varias plataformas, adaptar tu currículum y carta de presentación para cada puesto, y realizar un
                                    seguimiento de las aplicaciones enviadas. Es importante ser constante y no desanimarse, ya que el proceso puede
                                    tomar tiempo. Para mantener la motivación, establece metas diarias, como enviar un número específico de solicitudes
                                    o investigar un número determinado de empresas.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pregunta 4 */}
                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 3 ? "true" : "false"} // Establece el estado de expansión para la pregunta 4
                            onClick={() => toggleAnswer(3)} // Llama a la función toggle con el índice 3
                        >
                            4. ¿Cómo puedo mejorar mi perfil de LinkedIn?
                        </button>
                        {expandedIndex === 3 && (
                            <div className="faq-answer">
                                <p>
                                    LinkedIn es una herramienta poderosa para la búsqueda de empleo, por lo que es crucial tener un perfil bien
                                    optimizado. Comienza con una foto de perfil profesional y una portada que refleje tu campo de trabajo. Tu título
                                    debe ser claro y específico (por ejemplo, “Desarrollador Front-end con experiencia en React”). En el resumen,
                                    escribe un párrafo atractivo que resuma tu experiencia, tus habilidades y lo que te apasiona hacer. Asegúrate de que
                                    tu experiencia esté bien detallada, incluyendo proyectos relevantes y logros alcanzados. Además, pide
                                    recomendaciones a compañeros de trabajo o supervisores anteriores, ya que estas pueden aumentar tu credibilidad.
                                    Conéctate con profesionales de tu industria y participa activamente en grupos relevantes para mejorar tu visibilidad.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 4 ? "true" : "false"}
                            onClick={() => toggleAnswer(4)}
                        >
                            5. ¿Cómo encontrar trabajos que se ajusten a mi nivel de experiencia?
                        </button>
                        {expandedIndex === 4 && (
                            <div className="faq-answer">
                                <p>
                                    Para encontrar trabajos adecuados a tu nivel de experiencia, utiliza los filtros disponibles en las plataformas de
                                    empleo. La mayoría de los sitios de búsqueda permiten filtrar ofertas según la experiencia requerida (junior, intermedio,
                                    senior). Si eres recién graduado, busca ofertas que mencionen “sin experiencia previa” o que ofrezcan prácticas. Si ya
                                    tienes experiencia, busca ofertas que se ajusten a tu nivel y asegúrate de resaltar tus logros relevantes. También, lee
                                    detenidamente la descripción del trabajo para asegurarte de que realmente se ajusta a tu perfil antes de aplicar. A
                                    veces, los roles de nivel intermedio pueden ser accesibles aunque no tengas toda la experiencia mencionada, especialmente
                                    si posees habilidades transferibles o una gran disposición para aprender.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 5 ? "true" : "false"}
                            onClick={() => toggleAnswer(5)}
                        >
                            6. ¿Es útil el networking en la búsqueda de empleo?
                        </button>
                        {expandedIndex === 5 && (
                            <div className="faq-answer">
                                <p>
                                    El networking es una de las estrategias más efectivas en la búsqueda de empleo. De hecho, muchas ofertas de trabajo no
                                    se publican públicamente y se llenan a través de recomendaciones internas o redes de contactos. Conectarte con
                                    profesionales de tu industria, asistir a eventos de networking, y ser activo en plataformas como LinkedIn puede abrirte
                                    puertas a oportunidades que no están disponibles en otras plataformas de empleo tradicionales. Participa en debates y
                                    contribuye con tu conocimiento en grupos profesionales, lo que aumentará tu visibilidad. No tengas miedo de contactar a
                                    reclutadores o personas que trabajen en empresas que te interesan. Un mensaje educado y bien redactado puede ser el inicio
                                    de una relación profesional valiosa.
                                </p>
                            </div>
                        )}
                    </div>


                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 6 ? "true" : "false"}
                            onClick={() => toggleAnswer(6)}
                        >
                            7. ¿Debo postularme a trabajos aunque no cumpla con todos los requisitos?
                        </button>
                        {expandedIndex === 6 && (
                            <div className="faq-answer">
                                <p>
                                    Si bien es importante que tu perfil se ajuste en gran medida a los requisitos del trabajo, no dejes que los pequeños
                                    detalles te detengan de postularte. Muchas empresas valoran las habilidades transferibles, el potencial de crecimiento y
                                    la actitud sobre la experiencia exacta. Si cumples con la mayoría de los requisitos y tienes la capacidad o las ganas de
                                    aprender lo que falta, postúlate. Asegúrate de resaltar cómo tu experiencia previa y tus habilidades pueden aportar valor
                                    a la empresa. A veces, una actitud positiva y la disposición para aprender pueden ser más valiosas que tener experiencia
                                    en todos los aspectos del puesto.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 7 ? "true" : "false"}
                            onClick={() => toggleAnswer(7)}
                        >
                            8. ¿Cómo puedo destacar en una entrevista de trabajo?
                        </button>
                        {expandedIndex === 7 && (
                            <div className="faq-answer">
                                <p>
                                    Una entrevista es tu oportunidad para mostrar tu personalidad, habilidades y cómo puedes contribuir a la empresa. Prepárate
                                    bien investigando sobre la empresa, su misión, cultura y los detalles del puesto. Practica las preguntas comunes como “¿Cuáles
                                    son tus fortalezas y debilidades?” o “¿Por qué quieres trabajar con nosotros?”. Además, prepara ejemplos concretos que
                                    demuestren tus habilidades y logros pasados. Durante la entrevista, sé puntual, viste adecuadamente según la cultura de la
                                    empresa, y demuestra entusiasmo por el puesto. No olvides hacer preguntas inteligentes al final de la entrevista, esto
                                    demostrará tu interés genuino y te ayudará a conocer mejor el lugar de trabajo.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 8 ? "true" : "false"}
                            onClick={() => toggleAnswer(8)}
                        >
                            9. ¿Qué debo hacer si no obtengo respuestas a mis postulaciones?
                        </button>
                        {expandedIndex === 8 && (
                            <div className="faq-answer">
                                <p>
                                    No te desanimes. En muchos casos, las empresas reciben una gran cantidad de solicitudes y puede que no respondan a todas.
                                    Revisa si tu currículum y carta de presentación están bien adaptados al puesto, y si no es así, mejora esos documentos. También
                                    puedes enviar un seguimiento educado al reclutador, agradeciendo la oportunidad de aplicar y preguntando sobre el estado de tu
                                    solicitud. Además, sigue buscando otras oportunidades y mantén una actitud positiva, ya que una de las claves para el éxito en
                                    la búsqueda de empleo es la persistencia.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 9 ? "true" : "false"}
                            onClick={() => toggleAnswer(9)}
                        >
                            10. ¿Qué habilidades son más demandadas actualmente en el mercado laboral?
                        </button>
                        {expandedIndex === 9 && (
                            <div className="faq-answer">
                                <p>
                                    Las habilidades más demandadas varían según la industria, pero algunas de las más solicitadas a nivel global incluyen habilidades
                                    tecnológicas como programación (Python, JavaScript), análisis de datos, inteligencia artificial, y ciberseguridad. Además, las
                                    habilidades en gestión de proyectos, como las metodologías ágiles (Scrum, Kanban), son muy valoradas, especialmente en el sector
                                    tecnológico. También, la comunicación digital, marketing en redes sociales y trabajo en equipo son habilidades esenciales para
                                    muchas posiciones en marketing, ventas y desarrollo empresarial. A medida que las tecnologías y las tendencias cambian, es
                                    fundamental seguir aprendiendo y actualizar tus habilidades de acuerdo con las demandas del mercado.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 10 ? "true" : "false"}
                            onClick={() => toggleAnswer(10)}
                        >
                            11. ¿Cómo mejorar mi empleabilidad sin experiencia laboral previa?
                        </button>
                        {expandedIndex === 10 && (
                            <div className="faq-answer">
                                <p>
                                    Si no tienes experiencia laboral directa, enfócate en resaltar habilidades transferibles adquiridas en la universidad,
                                    prácticas, voluntariados o proyectos personales. Participa en proyectos freelance, toma cursos en línea y busca prácticas que
                                    te permitan adquirir experiencia práctica. Además, trabajar en habilidades blandas como la comunicación, la resolución de problemas
                                    y la gestión del tiempo también es crucial. Muchas empresas están dispuestas a contratar a personas sin experiencia si muestran
                                    un buen potencial y disposición para aprender.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 11 ? "true" : "false"}
                            onClick={() => toggleAnswer(11)}
                        >
                            12. ¿Debería utilizar más de una plataforma para buscar empleo?
                        </button>
                        {expandedIndex === 11 && (
                            <div className="faq-answer">
                                <p>
                                    Sí, utilizar varias plataformas de búsqueda de empleo puede aumentar tus oportunidades. Algunas plataformas como LinkedIn se
                                    enfocan más en perfiles profesionales y networking, mientras que otras como Indeed, Glassdoor o portales locales pueden tener
                                    ofertas que no están disponibles en otras plataformas. Es recomendable crear alertas personalizadas en varias de estas plataformas
                                    para asegurarte de no perder oportunidades relevantes. Además, algunas empresas publican ofertas solo en plataformas específicas,
                                    por lo que no limitarse a una sola opción aumenta tus posibilidades de encontrar el trabajo adecuado.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 12 ? "true" : "false"}
                            onClick={() => toggleAnswer(12)}
                        >
                            13. ¿Cuáles son los mejores consejos para una entrevista virtual?
                        </button>
                        {expandedIndex === 12 && (
                            <div className="faq-answer">
                                <p>
                                    Las entrevistas virtuales requieren preparación adicional. Primero, asegúrate de que tu equipo (cámara, micrófono, internet)
                                    esté funcionando correctamente. Elige un lugar tranquilo y bien iluminado, donde no haya distracciones. Practica con la herramienta
                                    de videoconferencia que usarás (Zoom, Google Meet, etc.), y asegúrate de estar cómodo con sus funcionalidades. Viste profesionalmente
                                    y mantén contacto visual con la cámara. Finalmente, prepara ejemplos específicos de tu experiencia que puedas compartir durante la entrevista.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 13 ? "true" : "false"}
                            onClick={() => toggleAnswer(13)}
                        >
                            14. ¿Cómo puedo mejorar mi carta de presentación?
                        </button>
                        {expandedIndex === 13 && (
                            <div className="faq-answer">
                                <p>
                                    Tu carta de presentación debe ser personalizada para cada puesto al que te postules. Comienza con una introducción breve donde
                                    menciones cómo te enteraste del puesto y por qué te interesa. A continuación, describe tus habilidades y logros clave que te hacen
                                    un buen candidato para el trabajo. Concluye agradeciendo al reclutador por su tiempo y expresando tu interés en discutir tu candidatura
                                    más a fondo. Recuerda que debe ser concisa, clara y sin errores gramaticales o de formato.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 14 ? "true" : "false"}
                            onClick={() => toggleAnswer(14)}
                        >
                            15. ¿Qué debo hacer si me rechazan después de una entrevista?
                        </button>
                        {expandedIndex === 14 && (
                            <div className="faq-answer">
                                <p>
                                    Recibir una respuesta negativa es una parte normal del proceso de búsqueda de empleo, pero no te desanimes. Pide retroalimentación
                                    a la empresa, si es posible, para entender en qué áreas podrías mejorar para futuras entrevistas. Aprovecha esta oportunidad para
                                    reflexionar sobre tu desempeño y aprender de la experiencia. Mantén una actitud positiva, ya que cada entrevista es una oportunidad
                                    de crecimiento y preparación para la próxima oferta.
                                </p>
                            </div>
                        )}
                    </div>



                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 15 ? "true" : "false"}
                            onClick={() => toggleAnswer(15)}
                        >
                            16. ¿Es importante personalizar mi solicitud para cada puesto?
                        </button>
                        {expandedIndex === 15 && (
                            <div className="faq-answer">
                                <p>
                                    Sí, personalizar tu solicitud para cada puesto es crucial. Asegúrate de que tu currículum, carta de presentación y perfil de
                                    LinkedIn estén adaptados específicamente para el trabajo al que te postulas. Utiliza palabras clave de la descripción del trabajo
                                    y destaca tus habilidades y experiencias que son relevantes para ese puesto en particular. Esto aumentará tus posibilidades de ser
                                    seleccionado para una entrevista.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 16 ? "true" : "false"}
                            onClick={() => toggleAnswer(16)}
                        >
                            17. ¿Qué hago si no tengo experiencia en la industria que me interesa?
                        </button>
                        {expandedIndex === 16 && (
                            <div className="faq-answer">
                                <p>
                                    Si deseas cambiar de industria, resalta las habilidades transferibles que has adquirido en trabajos anteriores, como la
                                    comunicación, gestión de proyectos o habilidades técnicas. Considera la posibilidad de realizar cursos de especialización o
                                    certificaciones que te permitan adquirir las competencias necesarias. Las prácticas o trabajos voluntarios también son una
                                    excelente manera de ganar experiencia en el nuevo campo.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 17 ? "true" : "false"}
                            onClick={() => toggleAnswer(17)}
                        >
                            18. ¿Cómo puedo mantenerme motivado durante la búsqueda de empleo?
                        </button>
                        {expandedIndex === 17 && (
                            <div className="faq-answer">
                                <p>
                                    La búsqueda de empleo puede ser un proceso largo y a veces desalentador. Para mantenerte motivado, establece metas claras y
                                    alcanzables, como aplicar a un número específico de empleos cada semana. Celebra pequeños logros, como obtener una entrevista o
                                    recibir una respuesta positiva. Mantente en contacto con tus redes de apoyo y busca oportunidades de formación continua. Recuerda
                                    que la persistencia es clave para encontrar el empleo ideal.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 18 ? "true" : "false"}
                            onClick={() => toggleAnswer(18)}
                        >
                            19. ¿Cómo puedo negociar el salario cuando me hagan una oferta?
                        </button>
                        {expandedIndex === 18 && (
                            <div className="faq-answer">
                                <p>
                                    La negociación salarial es una habilidad clave. Antes de recibir una oferta, investiga cuál es el salario promedio para el puesto
                                    y la industria. Si la oferta inicial es más baja de lo esperado, no dudes en preguntar si hay espacio para mejorar la cifra,
                                    mencionando tus habilidades y logros que justifican una mayor compensación. Asegúrate de considerar todos los beneficios adicionales
                                    (vacaciones, seguros, bonos) antes de tomar una decisión.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <button
                            className="faq-title"
                            aria-expanded={expandedIndex === 19 ? "true" : "false"}
                            onClick={() => toggleAnswer(19)}
                        >
                            20. ¿Es posible encontrar trabajo en mi área sin tener experiencia previa?
                        </button>
                        {expandedIndex === 19 && (
                            <div className="faq-answer">
                                <p>
                                    Sí, es posible. Muchas empresas están dispuestas a contratar a personas con potencial, incluso si no tienen experiencia directa. Las
                                    claves son la formación continua, las prácticas profesionales y la disposición para aprender. Además, participa en proyectos
                                    colaborativos, voluntariado o incluso trabajos freelance para ganar experiencia práctica. Demuestra tu motivación y tu deseo de
                                    desarrollarte profesionalmente, lo que puede ser más valioso que la experiencia previa en algunos casos.
                                </p>
                            </div>
                        )}
                    </div>

                </section>

                <p>En resumen, nuestra misión es ayudarte a navegar el vasto mar de ofertas laborales, reduciendo la posibilidad de que te pierdas de ninguna oportunidad valiosa. Al adoptar un método de búsqueda efectivo y aprovechar nuestra plataforma, estás un paso más cerca de encontrar la práctica profesional o el trabajo ideal que te ayudará a construir tu futuro.</p>

                <p><strong>¡Comienza tu búsqueda hoy y descubre todas las ofertas que tenemos para ti!</strong></p>

            </div>
            <Footer />
        </div>
    );
}

export default Inicio;
