import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bumeran from '../imagenes/bumeran.png';
import indeed from '../imagenes/indeed.png';
import linkedin from '../imagenes/Linkedin.png';
import MTEP from '../imagenes/computrabajo.png'; 
import Ubi from '../imagenes/ubi.png';
import Convocatorias from '../imagenes/convocatorias_2024.png';
import Buscojobs from '../imagenes/buscojobs.JPG';
import './estiloscomponentes.css'

const plataformaImages = {
    Indeed: indeed,
    'Convocatorias de Trabajo': Convocatorias,
    Buscojobs: Buscojobs,
    Linkedin: linkedin,
    Computrabajo: MTEP,
    Bumeran: bumeran,
};

const CajaOferta = ({ oferta_laboral }) => {
    const [copied, setCopied] = useState(false);

    const handleButtonClick = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón active el clic en el contenedor

        if (oferta_laboral.plataforma === 'Computrabajo') {
            navigator.clipboard.writeText(oferta_laboral.link_pagina)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000); // Muestra "Copiado" por 2 segundos
                })
                .catch(err => console.error('Error al copiar el enlace', err));
        } else {
            // Para otras plataformas, redirigir directamente
            window.open(oferta_laboral.link_pagina, '_blank');
        }
    };

    const capitalizeFirstLetter = (text) => {
        if (!text) return ''; // Si text es undefined o null, retorna una cadena vacía
        return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    const platformImage = plataformaImages[oferta_laboral.plataforma] || null;

    return (
        <div className='boxcajaoferta'>
            <h2>{capitalizeFirstLetter(oferta_laboral.nom_oferta)}</h2>
            <div className='division'></div>
            <div className='empresa'>
                <h3>{capitalizeFirstLetter(oferta_laboral.nom_empresa)}</h3>
            </div>
            <div className='lugar'>
                <img src={Ubi} alt="Ubicación" />
                <h3>{oferta_laboral.lugar}</h3>
            </div>
            <div className='foto_plataforma'>
                {platformImage && (
                    <img src={platformImage} alt={`Logo ${oferta_laboral.plataforma}`} />
                )}
            </div>

            <button className='btn-official' onClick={handleButtonClick}>
                {oferta_laboral.plataforma === 'Computrabajo' ? 'Copiar enlace' : 'Postular aquí'}
            </button>
            
            {copied && (
                <div style={{
                    backgroundColor: '#48b72f', 
                    color: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', // Centrar en la pantalla
                    zIndex: 1000, // Asegúrate de que esté encima de otros elementos
                    transition: 'opacity 0.5s',
                    opacity: copied ? 1 : 0,
                }}>
                    ¡Enlace Copiado!
                </div>
            )}
        </div>
    );
};

CajaOferta.propTypes = {
    oferta_laboral: PropTypes.shape({
        nom_oferta: PropTypes.string.isRequired,
        nom_empresa: PropTypes.string.isRequired,
        lugar: PropTypes.string.isRequired,
        link_pagina: PropTypes.string.isRequired,
        plataforma: PropTypes.string.isRequired,
    }).isRequired,
};

export default CajaOferta;
