import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NumeroObservaciones() {
    const [conteo, setConteo] = useState(null);
    const [conteo2, setConteo2] = useState(null);
    const [conteo3, setConteo3] = useState(null);
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

                setConteo(responseDiaAnterior.data.count);
                setConteo2(responseSemana.data.count);
                setConteo3(responseTotal.data.count);
            } catch (err) {
                console.error("Error al obtener los conteos:", err);
                setError("Error al obtener los conteos");
            } finally {
                setLoading(false);
            }
        };

        obtenerConteos();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='total_observaciones'>
            <div className='inserciones'>
                <div className='dia'>
                    <p>{conteo !== null ? conteo : 'No disponible'}</p>
                    <h5>Ofertas Laborales Hoy</h5>
                </div>
                <div className='semana'>
                    <p>{conteo2 !== null ? conteo2 : 'No disponible'}</p>
                    <h5>Ofertas Laborales Esta Semana</h5>
                </div>
                <div className='total'>
                    <p>{conteo3 !== null ? conteo3 : 'No disponible'}</p>
                    <h5>Total Ofertas Laborales</h5>
                </div>
            </div>
        </div>
    );
}

export default NumeroObservaciones;
