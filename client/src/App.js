import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './componentes/estiloscomponentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Asegúrate de importar Bootstrap JS
import Logo from './imagenes/logo.avif';
// Páginas
import Inicio from './paginas/inicio';
import Departamentos from './paginas/departamentos';
import Carreras from './paginas/carreras';
import PaginaInicio from './paginas/paginainicio';
import Comopostular from './paginas/comopostular';

// Componente Navbar
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para manejar la apertura/cierre del menú
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Función para cerrar el menú al hacer clic en un enlace
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
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={isMenuOpen ? "true" : "false"}
                    aria-label="Toggle navigation"
                    onClick={toggleMenu}
                >
                    <img src="https://img.icons8.com/m_rounded/200/FFFFFF/menu.png" alt="Menú" style={{ width: '30px', height: '30px' }} />
                </button>

                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={handleNavItemClick} end>Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/departamentos" onClick={handleNavItemClick}>Departamentos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/carreras" onClick={handleNavItemClick}>Carreras</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/todas_las_ofertas" onClick={handleNavItemClick}>Todas las Ofertas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/como_postular" onClick={handleNavItemClick}>¿Cómo Postular?</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/departamentos" element={<Navigate to="/departamentos/Arequipa" />} />
                <Route path="/departamentos/:departamento" element={<Departamentos />} />
                <Route path="/carreras" element={<Navigate to="/carreras/Administración" />} />
                <Route path="/carreras/:carrera" element={<Carreras />} />
                <Route path="/todas_las_ofertas" element={<PaginaInicio />} />
                <Route path="/como_postular" element={<Comopostular />} />
            </Routes>
        </Router>
    );
}

export default App;
