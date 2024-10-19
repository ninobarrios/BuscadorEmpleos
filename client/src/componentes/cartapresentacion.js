import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartaPresentacion() {
    const [formData, setFormData] = useState({
        nombre: '',
        puesto: '',
        direccion: '',
        telefono: '',
        correo: '',
        fecha: '',
        destinatario: '',
        empresa: '',
        cuerpo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDownload = () => {
        const doc = new jsPDF();

        // Definir márgenes
        const marginTop = 25; // 2.5 cm
        const marginLeft = 25; // 2.5 cm
        const marginRight = 25; // 2.5 cm
        const lineHeight = 10; // Altura de línea
        const textWidth = doc.internal.pageSize.getWidth() - marginLeft - marginRight; // Ancho de texto permitido

        // Cambiar tipo y tamaño de letra para el nombre y puesto
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(22);
        const nombreWidth = doc.getTextWidth(formData.nombre);
        doc.text(formData.nombre, (doc.internal.pageSize.getWidth() - nombreWidth) / 2, marginTop); // Centrar nombre

        // Cambiar tamaño de letra para el puesto
        doc.setFontSize(16);
        const puestoWidth = doc.getTextWidth(formData.puesto);
        doc.text(formData.puesto, (doc.internal.pageSize.getWidth() - puestoWidth) / 2, marginTop + 10); // Centrar puesto

        // Cambiar tamaño de letra para el resto
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(12);
        doc.text(`Dirección: ${formData.direccion}`, marginLeft, marginTop + 30);
        doc.text(`Teléfono: ${formData.telefono}`, marginLeft, marginTop + 35);
        doc.text(`Correo: ${formData.correo}`, marginLeft, marginTop + 40);
        doc.text(`Fecha: ${formData.fecha}`, marginLeft, marginTop + 45);

        // Destinatario
        doc.text(`\nDestinatario: ${formData.destinatario}`, marginLeft, marginTop + lineHeight * 4.5);
        doc.text(`Empresa: ${formData.empresa}`, marginLeft, marginTop + lineHeight * 5.5);
        doc.text(`\nEstimado/a ${formData.destinatario},`, marginLeft, marginTop + lineHeight * 6);

        // Cuerpo de la carta - manejar el ajuste de línea
        const cuerpoTexto = `\n${formData.cuerpo}`;
        const cuerpoLineas = doc.splitTextToSize(cuerpoTexto, textWidth);
        doc.text(cuerpoLineas, marginLeft, marginTop + lineHeight * 7.5);

        // Cierre
        doc.text(`\nAgradezco su tiempo y consideración. Quedo atento/a a una respuesta.`, marginLeft, marginTop + lineHeight * 14);
        doc.text(`Atentamente,`, marginLeft, marginTop + lineHeight * 16);
        doc.text(`${formData.nombre}`, marginLeft, marginTop + lineHeight * 17);

        // Guardar el PDF
        doc.save('carta_presentacion.pdf');
    };

    return (
        <div className="formularioct">
            <form>
                <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Generador de <span style={{ color: '#47b72f' }}>Cartas de Presentacion</span></h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div className="form-group" style={{ flex: '1', marginRight: '10px' }}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder='Juan Torres'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ flex: '1', marginLeft: '10px' }}>
                        <label>Puesto:</label>
                        <input
                            type="text"
                            name="puesto"
                            className="form-control"
                            placeholder='Practicante Administrador'
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Dirección:</label>
                    <input type="text" name="direccion" className="form-control" placeholder='Lima - Cercado de Lima' onChange={handleChange} required />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div className="form-group" style={{ flex: '1', marginRight: '10px' }}>
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="telefono"
                            className="form-control"
                            placeholder='+51 999 999 999'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ flex: '1', marginLeft: '10px' }}>
                        <label>Fecha:</label>
                        <input
                            type="date"
                            name="fecha"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div className="form-group" style={{ flex: '1', marginRight: '10px' }}>
                        <label>Correo Electrónico:</label>
                        <input
                            type="email"
                            name="correo"
                            className="form-control"
                            placeholder='correo@mail.com'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ flex: '1', marginLeft: '10px' }}>
                        <label>Destinatario:</label>
                        <input
                            type="text"
                            name="destinatario"
                            className="form-control"
                            placeholder='Gerente Empresa Minera'
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Empresa:</label>
                    <input type="text" name="empresa" className="form-control" placeholder='Empresa Minera' onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Cuerpo de la Carta:</label>
                    <textarea name="cuerpo" className="form-control" placeholder='Me permito dirigirme a usted con el fin de expresar mi interés en la posición de [nombre del puesto] que se ofrece en [nombre de la empresa]. Con una sólida formación en [campo o estudios relacionados]  en el [campo o sector relevante], estoy convencido/a de que mis habilidades y cualificaciones se alinean perfectamente con las necesidades de su equipo...' style={{ height: '250px' }} onChange={handleChange} rows="5" required></textarea>
                </div>
                <button type="button" className="btn_form" onClick={handleDownload}>
                    Descargar Carta
                </button>
            </form>
        </div>
    );
}

export default CartaPresentacion;
