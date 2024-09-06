// Requiere dotenv para cargar las variables del archivo .env
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'https://buscadorempleos-1.onrender.com', // Dominio de producción
        'http://localhost:3000' // Dominio de desarrollo local
    ],
    methods: ['GET', 'POST']
}));


// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Rutas
app.get("/obtenerOfertas", (req, res) => {
    connection.query("SELECT * FROM `ofertas_laborales` ORDER BY RAND()", (err, results) => {
        if (err) {
            res.status(500).send("Error retrieving data from database");
        } else {
            res.json(results);
        }
    });
});


app.get('/sugerencias', (req, res) => {
    const palabra = req.query.palabra || '';

    if (palabra.length === 0) {
        return res.json([]);
    }

    const sql = `
        SELECT DISTINCT nom_oferta, link_pagina
        FROM ofertas_laborales 
        WHERE nom_oferta COLLATE utf8mb4_unicode_ci LIKE ? 
           OR link_pagina COLLATE utf8mb4_unicode_ci LIKE ? 
        LIMIT 10;
    `;

    // Ejecutar la consulta con dos parámetros
    connection.query(sql, [`%${palabra}%`, `%${palabra}%`], (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta:', error);
            return res.status(500).json({ error: 'Error al obtener sugerencias' });
        }
        const sugerencias = results.map(row => row.nom_oferta);
        res.json(sugerencias);
    });
});


app.get('/contarObservacionesDiaAnterior', (req, res) => {
    const query = `SELECT COUNT(*) AS count FROM ofertas_laborales WHERE fecha = (SELECT MAX(fecha) FROM ofertas_laborales);`;
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Error");
        } else {
            res.json(results[0]);
        }
    });
});

app.get('/contarObservacionesSemana', (req, res) => {
    const query = `        SELECT COUNT(*) AS count         FROM ofertas_laborales AS ol         JOIN ( 
            SELECT fecha 
            FROM ofertas_laborales 
            GROUP BY fecha 
            ORDER BY fecha DESC 
            LIMIT 7 
        ) AS f 
        ON ol.fecha = f.fecha;
    `;
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Error");
        } else {
            res.json(results[0]);
        }
    });
});

app.get('/contarObservacionesTotal', (req, res) => {
    const query = `SELECT COUNT(*) AS count FROM ofertas_laborales;`;
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Error");
        } else {
            res.json(results[0]);
        }
    });
});

app.get('/carreraprofesional/:nombrecarrera', (req, res) => {
    const nombreCarrera = req.params.nombrecarrera;

    const query = `
        SELECT * 
        FROM ofertas_laborales 
        WHERE nom_oferta LIKE ? 
           OR link_pagina LIKE ?;
    `;

    connection.query(query, [`%${nombreCarrera}%`, `%${nombreCarrera}%`], (err, results) => {
        if (err) {
            res.status(500).send("Error");
        } else {
            res.json(results); // Devolver todos los resultados que coincidan
        }
    });
});







// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
