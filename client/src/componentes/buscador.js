import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Buscador({ onBuscar, onSugerencias }) {
    const [palabraClave, setPalabraClave] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const inputRef = useRef(null);
    const sugerenciasRef = useRef(null);

    const fetchSugerencias = async (query) => {
        if (query.length > 2) {
            try {
                const response = await axios.get('http://localhost:3001/sugerencias', {
                    params: { palabra: query }
                });
                const nuevasSugerencias = response.data;
                setSugerencias(nuevasSugerencias);
                setMostrarSugerencias(nuevasSugerencias.length > 0);

                if (onSugerencias) {
                    onSugerencias(nuevasSugerencias);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSugerencias([]);
                setMostrarSugerencias(false);
            }
        } else {
            setSugerencias([]);
            setMostrarSugerencias(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setPalabraClave(value);
        fetchSugerencias(value);
    };

    const handleSuggestionClick = (sugerencia) => {
        console.log("Sugerencia seleccionada:", sugerencia);
        setPalabraClave(sugerencia);
        setMostrarSugerencias(false);
        if (onBuscar) {
            onBuscar(sugerencia); // Llama a onBuscar con la sugerencia seleccionada
        }
    };

    const handleClickOutside = (event) => {
        if (
            inputRef.current && !inputRef.current.contains(event.target) &&
            sugerenciasRef.current && !sugerenciasRef.current.contains(event.target)
        ) {
            setMostrarSugerencias(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="buscador">
            <h3>Buscar Oferta <span style={{ color: '#47b72f' }}>Laboral</span></h3>
            <div className='elementos_buscador'>


                <div ref={inputRef}>
                    <input
                        className="input_cajainiciobox"
                        type="text"
                        value={palabraClave}
                        onChange={handleChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                onBuscar(palabraClave);
                            }
                        }}
                        placeholder="Ingrese palabra clave"
                    />
                    {mostrarSugerencias && (
                        <ul className="sugerencias" ref={sugerenciasRef}>
                            {sugerencias.map((sugerencia, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(sugerencia)}>
                                    {sugerencia}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="btn_cajainiciobox" onClick={() => onBuscar(palabraClave)}>Buscar</button>
            </div>
        </div>
    );
}

export default Buscador;
