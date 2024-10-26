import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estiloscomponentes.css';

function NumeroObservaciones() {
    const [conteo, setConteo] = useState(0);
    const [conteo2, setConteo2] = useState(0);
    const [conteo3, setConteo3] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerConteos = async () => {
            setLoading(true);
            try {
                const [responseDiaAnterior, responseSemana, responseTotal] = await Promise.all([
                    axios.get('https://buscadorempleos.onrender.com/contarObservacionesDiaAnterior'),
                    axios.get('https://buscadorempleos.onrender.com/contarObservacionesSemana'),
                    axios.get('https://buscadorempleos.onrender.com/contarObservacionesTotal')
                ]);

                setConteo(responseDiaAnterior.data.count || 0);
                setConteo2(responseSemana.data.count || 0);
                setConteo3(responseTotal.data.count || 0);
            } catch (err) {
                console.error("Error al obtener los conteos:", err);
                setError("Error al obtener los conteos. Intenta de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        obtenerConteos();
    }, []);

    if (loading) {
        return <div className="loading" style={{ margin: '50px' }}><div className="spinner"></div></div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='total_observaciones'>
            <div className='inserciones'>
                <div className='dia'>
                    <p>{conteo.toLocaleString('es-PE')}</p>
                    <h5>Ofertas laborales hoy</h5>
                </div>
                <div className='semana'>
                    <p>{conteo2.toLocaleString('es-PE')}</p>
                    <h5>Ofertas laborales últimos 7 días</h5>
                </div>
                <div className='total'>
                    <p>{conteo3.toLocaleString('es-PE')}</p>
                    <h5>Total ofertas menores a 20 días</h5>
                </div>
            </div>
        </div>
    );
}

export default NumeroObservaciones;
