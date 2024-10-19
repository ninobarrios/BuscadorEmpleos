import React, { useState, useEffect } from 'react';
import './estiloscomponentes.css'

function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
    const [rangoDePaginacion, setRangoDePaginacion] = useState(5);
    useEffect(() => {
        const ajustarRangoPaginacion = () => {
            if (window.innerWidth <= 768) {
                setRangoDePaginacion(3); 
            } else {
                setRangoDePaginacion(9); 
            }
        };
        ajustarRangoPaginacion();

        window.addEventListener('resize', ajustarRangoPaginacion);

        return () => {
            window.removeEventListener('resize', ajustarRangoPaginacion);
        };
    }, []);

    const generarNumerosPagina = () => {
        let paginas = [];
        const startPage = Math.max(1, paginaActual - Math.floor(rangoDePaginacion / 2));
        const endPage = Math.min(startPage + rangoDePaginacion - 1, totalPaginas);

        for (let i = startPage; i <= endPage; i++) {
            paginas.push(i);
        }

        return paginas;
    };

    return (
        <div className="paginacion">
            <button
                onClick={() => onCambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
            >
                Anterior
            </button>
            <div className="numero-pagina">
                {generarNumerosPagina().map((num, index) =>
                    num === '...' ? (
                        <span key={index} className="puntos-suspensivos">...</span>
                    ) : (
                        <button
                            key={index}
                            className={num === paginaActual ? 'active' : ''}
                            onClick={() => onCambiarPagina(num)}
                        >
                            {num}
                        </button>
                    )
                )}
            </div>
            <button
                onClick={() => onCambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
            >
                Siguiente
            </button>
        </div>
    );
}

export default Paginacion;