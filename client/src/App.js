import React, { useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './componentes/estiloscomponentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Logo from './imagenes/logo.avif';
const Inicio = React.lazy(() => import('./paginas/inicio'));
const Departamentos = React.lazy(() => import('./paginas/departamentos'));
const Carreras = React.lazy(() => import('./paginas/carreras'));
const PaginaInicio = React.lazy(() => import('./paginas/paginainicio'));
const ComoPostular = React.lazy(() => import('./paginas/comopostular'));
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleNavItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" onClick={handleNavItemClick}>
                    <img className='imagenlogo' src={Logo} alt="Portada" loading="lazy" />
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <img src="https://img.icons8.com/m_rounded/200/FFFFFF/menu.png" alt="Menú" style={{ width: '30px', height: '30px' }} />
                </button>

                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={handleNavItemClick} end>Inicio</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/departamentos" onClick={handleNavItemClick}>Departamentos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/carreras" onClick={handleNavItemClick}>Carreras</NavLink>
                        </li>}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/todas_las_ofertas" onClick={handleNavItemClick}>Todas las Ofertas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/como_postular" onClick={handleNavItemClick}>¿Cómo Postular?</NavLink>
                        </li>*/}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

function App() {
    return (
        <>
            <Navbar />
            <React.Suspense fallback={<div style={{textAlign:'center'}}>Cargando...</div>}>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/departamentos" element={<Navigate to="/departamentos/Arequipa" />} />
                    <Route path="/departamentos/:departamento" element={<Departamentos />} />
                    <Route path="/carreras" element={<Navigate to="/carreras/Administración" />} />
                    <Route path="/carreras/:carrera" element={<Carreras />} />
                    <Route path="/todas_las_ofertas" element={<PaginaInicio />} />
                    <Route path="/como_postular" element={<ComoPostular />} />
                </Routes>
            </React.Suspense>
        </>
    );
}

export default App;
