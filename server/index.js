require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conectar a la base de datos y manejar errores
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Rutas

// Ruta para obtener ofertas de trabajo
app.get("/Ofertas-Laborales", (req, res) => {
    const query = "SELECT plataforma, nom_oferta, nom_empresa, lugar, link_pagina FROM `ofertas_laborales` ORDER BY `fecha` DESC, `nom_empresa` ASC;";
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send("Error al obtener ofertas");
        }
        res.json(results);
    });
});

// Ruta para sugerencias basadas en la palabra clave
app.get('/sugerencias', (req, res) => {
    const palabra = req.query.palabra || '';

    if (palabra.length === 0) {
        return res.json([]);  // Si no hay palabra, devolvemos un array vacío
    }

    const sql = `
        SELECT DISTINCT nom_oferta
        FROM ofertas_laborales 
        WHERE nom_oferta COLLATE utf8mb4_unicode_ci LIKE ? 
        LIMIT 10;
    `;

    connection.query(sql, [`%${palabra}%`, `%${palabra}%`], (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta de sugerencias:', error);
            return res.status(500).json({ error: 'Error al obtener sugerencias' });
        }
        const sugerencias = results.map(row => row.nom_oferta);
        res.json(sugerencias);
    });
});

// Ruta para contar observaciones del día anterior
app.get('/contarObservacionesDiaAnterior', (req, res) => {
    const query = `SELECT COUNT(*) AS count FROM ofertas_laborales WHERE DATE(fecha_insercion) = ( SELECT DATE(MAX(fecha)) FROM ofertas_laborales );`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            return res.status(500).send("Error al contar observaciones del día anterior");
        }
        res.json(results[0]);
    });
});

// Ruta para contar observaciones de la última semana
app.get('/contarObservacionesSemana', (req, res) => {
    const query = `
        SELECT COUNT(*) AS count 
        FROM ofertas_laborales AS ol 
        JOIN (
            SELECT fecha 
            FROM ofertas_laborales 
            GROUP BY fecha 
            ORDER BY fecha DESC 
            LIMIT 7
        ) AS ultimas_fechas 
        ON ol.fecha = ultimas_fechas.fecha;
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            return res.status(500).send("Error al contar observaciones de la semana");
        }
        res.json(results[0]);
    });
});

// Ruta para contar el total de observaciones
app.get('/contarObservacionesTotal', (req, res) => {
    const query = `SELECT COUNT(*) AS count FROM ofertas_laborales;`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            return res.status(500).send("Error al contar observaciones totales");
        }
        res.json(results[0]);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
