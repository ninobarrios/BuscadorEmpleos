import React, { Suspense } from 'react';

const Footer = React.lazy(() => import('../componentes/footer'));

function comopostular() {
    return (
        <div className='cp'>
            <div className='portadacp'>
                <h2>¿Listo para encontrar tu <span style={{ color: '#47b72f' }}>empleo ideal?</span></h2>
                <p>Sigue estos pasos para presentar tu postulación
                    de manera exitosa <br></br>y destacar entre los candidatos.</p>
            </div>
            
            <Suspense fallback={<div className="loading"><div className="spinner"></div></div>}>
                <Footer />
            </Suspense>

        </div>
    )
}

export default comopostular
