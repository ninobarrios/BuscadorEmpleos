import React, { Suspense } from 'react';
//import { Link } from 'react-router-dom';

//const Footer = React.lazy(() => import('../componentes/footer'));
const CartaPresentacion = React.lazy(() => import('../componentes/cartapresentacion'));

function comopostular() {
    return (
        <div className='cp'>
            <div className='portadacp'>
                <h2>¿Listo para encontrar tu <span style={{ color: '#47b72f' }}>empleo ideal?</span></h2>
                <p>Sigue estos pasos para presentar tu postulación
                    de manera exitosa <br></br>y destacar entre los candidatos.</p>
            </div>
            <div className="tips-busqueda-container">
                <h2>Consejos de Busqueda</h2>
                <p style={{width:'80%'}}>
                    Al buscar empleo, es fundamental ingresar palabras clave relacionadas con tu carrera para asegurarte de no perderte ninguna oportunidad. Aquí tienes algunas sugerencias para diferentes campos:
                </p>
                <div className='imgtip'></div>
                <ul className="tips-list">
                    <li>
                        <h3>Ingeniería Agronómica</h3>
                        <p style={{width:'90%'}}>
                            Utiliza palabras clave como: <strong>'Ingeniería Agrícola', 'Ingeniero Agrónomo', 'Agronomía', 'Agroindustrial'</strong>.
                        </p>
                    </li>
                    <li>
                        <h3>Economía</h3>
                        <p>
                            Considera usar términos como: <strong>'finanzas', 'mercado', 'inversiones', 'nóminas', 'créditos y cobranzas'</strong>.
                        </p>
                    </li>
                    <li>
                        <h3>Ciencias de la Comunicación</h3>
                        <p>
                            Busca con palabras clave como: <strong>'comunicación', 'periodismo', 'audiovisuales', 'relaciones públicas', 'comunicador social', 'redes sociales', 'periodista'</strong>.
                        </p>
                    </li>
                </ul>
                <p>
                    <strong>Tip:</strong> Usa combinaciones específicas para ampliar tus opciones laborales y mejorar tus resultados en la búsqueda.
                </p>
            </div>
            <div className='inicimsg'>
                <h2>¡Tu futuro profesional comienza aquí!</h2>
                <p>En un mundo laboral competitivo, dar el primer
                    paso hacia tu empleo ideal puede parecer un
                    desafío. Pero no te preocupes, estamos aquí
                    para guiarte en cada etapa del proceso de postulación.</p>

                <p> A continuación, encontrarás una serie de pasos
                    sencillos que te ayudarán a postularte de manera
                    efectiva a las ofertas de empleo que más te interesen.
                    Desde la revisión de las oportunidades disponibles
                    hasta la preparación de tu currículum y carta de presentación, la cual puedes generar facilmente
                    en esta pagina.</p>

                <p> Recuerda, cada postulación es una oportunidad para
                    mostrar tu talento y habilidades. Así que,
                    ¡prepárate y comienza tu camino hacia nuevas oportunidades laborales!</p>
            </div>
            <h2 style={{ fontSize: '40px', textAlign: 'center', margin: '50px 0px' }}>Recomendaciones para <span style={{ color: '#47b72f' }}>Postular</span> </h2>

            <div className='stepbox'>
                <div className='steps'>
                    <h2>Prepara tu CV</h2>
                    <p>Actualiza tu currículum vitae (CV) con tu información
                        más reciente.
                        Incluye tus habilidades, experiencia laboral y
                        formación académica.
                        Considera personalizar tu CV para cada oferta de empleo.</p>
                </div>
                <div className='steps'>
                    <h2>Revisa las Ofertas de Empleo</h2>
                    <p>Navega por nuestras ofertas de empleo y selecciona las que más te interesen.
                        Puedes buscar y usar los filtros para buscar por carrera y por lugar de residencia.</p>
                </div>
                <div className='steps'>
                    <h2>Palabras clave</h2>
                    <p>Usa palabras clave específicas, habilidades técnicas,
                        ubicación, modalidad (remoto/presencial), nivel de
                        experiencia y sinónimos para mejorar las búsquedas de empleo.
                        
                        </p>
                </div>

                <div className='steps'>
                    <h2>Postulación</h2>
                    <p>Seleciona la oferta de tu interes e ingresa al link de la pagina de postulacion,
                        Asegúrate de leer detenidamente los requisitos y responsabilidades del puesto.
                    </p>
                </div>
                <div className='steps'>
                    <h2>Seguimiento</h2>
                    <p>Después de enviar tu postulación, realiza un seguimiento a través del correo
                        electrónico o la plataforma de la empresa si es posible.
                        Prepárate para una posible entrevista, investigando sobre la empresa y practicando tus respuestas.
                    </p>
                </div>
                <div className='steps'>
                    <h2>Mantente Positivo</h2>
                    <p>La búsqueda de empleo puede ser desafiante. Mantén una actitud positiva y continúa postulando a diferentes oportunidades.
                    </p>
                </div>
                <div className='steps'>
                    <h2>Tip: Escribe una Carta de Presentación</h2>
                    <p>Redacta una carta de presentación breve que destaque tu interés por el puesto.
                        Explica por qué eres un buen candidato y cómo puedes contribuir a la empresa.
                    </p>
                    <a href='#cartt' className='link-cartt'>Generar Carta de Presentación</a>
                </div>
            </div>
            <div className='pslahr'>
                <div className='pslahr_lef'>
                    <h2>¡Y postula ahora!</h2>
                    <h3>Ingresa a nuestro buscador</h3>
                </div>
               {/* <div className='pslahr_right'>
                    <Link to='/paginainicio' className='postular-link'>Buscar ahora!</Link>
                </div>*/}
            </div>

            <section className="ofertas-seccion">
                <h2>Ofertas en Números</h2>
                <div className="ofertas-contenido">
                    <div className="oferta-item">
                        <h3>+1. 000</h3>
                        <p>Ofertas Diarias</p>
                    </div>
                    <div className="linea-separador"></div>
                    <div className="oferta-item">
                        <h3>+6. 000</h3>
                        <p>Ofertas Semanales</p>
                    </div>
                    <div className="linea-separador"></div>
                    <div className="oferta-item">
                        <h3>+20. 000</h3>
                        <p>Ofertas Vigentes Menores a 20 Días</p>
                    </div>
                </div>
            </section>

            <div className='cartt' id='cartt'>
                <Suspense fallback={<div>Cargando generador de carta de presentacion...</div>}>

                    <CartaPresentacion />
                </Suspense>

            </div>

            <div className='cvbox'>
                <h2 style={{ textAlign: 'center' }}>Recomendaciones para tu CV</h2>
                <div className='ctnbox'>
                    <div className='csjcv'>
                        <h4>01</h4>
                        <div className='division3'></div>
                        <h3>Datos Personales y Contacto</h3>
                        <p>
                            Comienza con un encabezado que incluya tu nombre completo, número de teléfono y correo electrónico profesional. Si lo tienes, agrega un enlace a tu perfil de LinkedIn o a tu portafolio en línea.
                        </p>
                    </div>
                    <div className='csjcv '>
                        <h4>02</h4>
                        <div className='division3'></div>

                        <h3>Resumen Profesional u Objetivo</h3>
                        <p>
                            Redacta un breve párrafo que resalte tus habilidades, tu entusiasmo por aprender y tus objetivos profesionales. Esto debe captar la atención de quienes están buscando estudiantes o egresados para prácticas.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>03</h4>
                        <div className='division3'></div>
                        <h3>Experiencia o Logros</h3>
                        <p>
                            Si no tienes experiencia laboral previa, destaca tus logros académicos y cualquier proyecto relevante que hayas realizado. Menciona actividades extracurriculares o voluntariado que demuestren tus habilidades.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>04</h4>
                        <div className='division3'></div>
                        <h3>Educación</h3>
                        <p>
                            Enumera tus estudios, comenzando por el más reciente. Incluye el nombre de la institución, el título que estás obteniendo o has obtenido y las fechas de estudio. Si has participado en cursos o talleres, también añádelos.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>05</h4>
                        <div className='division3'></div>

                        <h3>Habilidades</h3>
                        <p>
                            Haz una lista de tus habilidades técnicas y blandas. Incluye habilidades relacionadas con tu campo de estudio y destrezas como comunicación, trabajo en equipo y liderazgo.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>06</h4>
                        <div className='division3'></div>

                        <h3>Certificaciones o Cursos</h3>
                        <p>
                            Incluye cualquier certificación o curso que hayas completado y que sea relevante para el puesto de prácticas. Esto puede incluir habilidades técnicas, idiomas o cursos de desarrollo personal.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>07</h4>
                        <div className='division3'></div>

                        <h3>Idiomas</h3>
                        <p>
                            Especifica tu nivel de fluidez en cada idioma. Usa términos comunes como "Básico", "Intermedio", "Avanzado" o "Nativo" para que sea claro tu dominio del idioma.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>08</h4>
                        <div className='division3'></div>

                        <h3>Formato y Diseño</h3>
                        <p>
                            Utiliza un diseño limpio y sencillo. Escoge tipografías legibles como Arial o Calibri. Limita los colores y evita imágenes distractivas. Asegúrate de que tu CV sea fácil de leer con un buen espaciado y uso de viñetas.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>09</h4>
                        <div className='division3'></div>

                        <h3>Personalización</h3>
                        <p>
                            Ajusta tu CV para cada práctica a la que postules, resaltando habilidades y experiencias que sean relevantes para el puesto específico.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>10</h4>
                        <div className='division3'></div>

                        <h3>Palabras Clave</h3>
                        <p>
                            Utiliza palabras clave del anuncio de la práctica en tu CV. Esto es importante para asegurarte de que tu CV sea visto por los reclutadores, especialmente si utilizan sistemas de seguimiento.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>11</h4>
                        <div className='division3'></div>

                        <h3>Revisión</h3>
                        <p>
                            Revisa cuidadosamente tu CV para corregir cualquier error gramatical o de ortografía. Pide a un amigo o mentor que lo lea y te dé su opinión.
                        </p>
                    </div>
                    <div className='csjcv'>
                        <h4>12</h4>
                        <div className='division3'></div>

                        <h3>Formato de Archivo</h3>
                        <p>
                            Envía tu CV en PDF para evitar problemas de formato y asegurarte de que se vea igual en todos los dispositivos.
                        </p>
                    </div>
                    
                </div>
            </div>

            
        </div>
    )
}

export default comopostular