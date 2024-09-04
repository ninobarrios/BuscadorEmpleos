import React from 'react';
import bumeran from '../imagenes/bumeran.png';
import indeed from '../imagenes/indeed.png';
import linkedin from '../imagenes/Linkedin.png';
import MTEP from '../imagenes/computrabajo.png';
import Ubi from '../imagenes/ubi.png';
import Convocatorias from '../imagenes/convocatorias_2024.png';
import Buscojobs from '../imagenes/buscojobs.JPG';

const CajaOferta = ({ oferta_laboral, navigateToLink }) => {
    if (typeof navigateToLink !== 'function') {
        console.error('navigateToLink is not a function');
        return null;
    }

    const handleContainerClick = () => {
        navigateToLink(oferta_laboral.link_pagina);
    };

    const handleVisitOfficialPage = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón active el clic en el contenedor
        window.open(oferta_laboral.link_pagina, '_blank');
    };

    const capitalizeFirstLetter = (text) => {
        if (!text) return ''; // Si text es undefined o null, retorna una cadena vacía
        return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };
    
    return (
        <div className='boxcajaoferta' onClick={handleContainerClick}>
            <h2>{capitalizeFirstLetter(oferta_laboral.nom_oferta)}</h2>
            <div className='division'></div>
            <div className='empresa'>
                <h3>{capitalizeFirstLetter(oferta_laboral.nom_empresa)}</h3>
            </div>
            <div className='lugar'>
                <img src={Ubi} alt="Descripción de la imagen" />
                <h3>{oferta_laboral.lugar}</h3>
            </div>
            <div className='foto_plataforma'>
                {oferta_laboral.plataforma === 'Indeed' && (
                    <img src={indeed} alt="Logo Indeed" />
                )}
                {oferta_laboral.plataforma === 'Convocatorias de Trabajo' && (
                    <img src={Convocatorias} alt="Logo Convocatorias de Trabajo" />
                )}
                {oferta_laboral.plataforma === 'Buscojobs' && (
                    <img src={Buscojobs} alt="Logo Buscojobs" />
                )}
                {oferta_laboral.plataforma === 'Linkedin' && (
                    <img src={linkedin} alt="Logo Linkedin" />
                )}
                {oferta_laboral.plataforma === 'Computrabajo' && (
                    <img src={MTEP} alt="Logo Computrabajo" />
                )}
                {oferta_laboral.plataforma === 'Bumeran' && (
                    <img src={bumeran} alt="Logo Bumeran" />
                )}
            </div>
            <button className='btn-official' onClick={handleVisitOfficialPage}>
                Postular aqui
            </button>
        </div>
    );
    
};

export default CajaOferta;
