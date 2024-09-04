// src/componentes/Paginacion.js
import React from 'react';

function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
    const generarNumerosPagina = () => {
        const rangoDePaginacion = 5;
        let paginas = [];
        const startPage = Math.max(1, paginaActual - Math.floor(rangoDePaginacion / 2));
        const endPage = Math.min(startPage + rangoDePaginacion - 1, totalPaginas);

        if (startPage > 2) {
        
            if (startPage > 3);
        }

        for (let i = startPage; i <= endPage; i++) {
            paginas.push(i);
        }

        if (endPage < totalPaginas - 1) {
            if (endPage < totalPaginas - 2);
         
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
