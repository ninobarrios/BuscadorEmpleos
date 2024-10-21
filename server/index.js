// Requiere dotenv para cargar las variables del archivo .env
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(cors());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: 100000,
    ssl: {
        rejectUnauthorized: true 
    },
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0 
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
    connection.release(); 
});

app.get("/Ofertas-Laborales", (req, res) => {
    const query = "SELECT plataforma, nom_oferta, nom_empresa, lugar, link_pagina FROM `ofertas_laborales` ORDER BY `fecha` DESC, RAND();";
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send("Error al obtener ofertas");
        }
        res.json(results);
    });
});
app.get("/Ofertas-Laborales-hoy", (req, res) => {
    const query = "SELECT plataforma, nom_oferta, nom_empresa, lugar, link_pagina FROM ofertas_laborales WHERE fecha = (SELECT MAX(fecha) FROM ofertas_laborales) ORDER BY RAND();";
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send("Error al obtener ofertas");
        }
        res.json(results);
    });
});


app.get('/sugerencias', (req, res) => {
    const palabra = req.query.palabra || '';

    if (palabra.length === 0) {
        return res.json([]);  
    }

    const sql = `
        SELECT DISTINCT nom_oferta
        FROM ofertas_laborales 
        WHERE nom_oferta COLLATE utf8mb4_unicode_ci LIKE ? 
        LIMIT 10;
    `;

    pool.query(sql, [`%${palabra}%`], (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta de sugerencias:', error);
            return res.status(500).json({ error: 'Error al obtener sugerencias' });
        }
        const sugerencias = results.map(row => row.nom_oferta);
        res.json(sugerencias);
    });
});

app.get('/contarObservacionesDiaAnterior', (req, res) => {
    const query = `SELECT COUNT(*) AS count FROM ofertas_laborales WHERE DATE(fecha) = ( SELECT DATE(MAX(fecha)) FROM ofertas_laborales );`;
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            return res.status(500).send("Error al contar observaciones del día anterior");
        }
        res.json(results[0]);
    });
});

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
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            return res.status(500).send("Error al contar observaciones de la semana");
        }
        res.json(results[0]);
    });
});

app.get('/contarObservacionesTotal', (req, res) => {
    const query = `SELECT COUNT(*) AS count FROM ofertas_laborales;`;
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            return res.status(500).send("Error al contar observaciones totales");
        }
        res.json(results[0]);
    });
});

app.get("/selecionardepartamento/:departamento", (req, res) => {
    const departamento = req.params.departamento; 
    const query = "SELECT plataforma, nom_oferta, nom_empresa, lugar, link_pagina FROM `ofertas_laborales` WHERE lugar LIKE ? ORDER BY `fecha` DESC, RAND();"; 
    const values = [`%${departamento}%`]; 

    pool.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send("Error al obtener ofertas");
        }
        res.json(results); 
    });
});
app.get("/selecionarcarrera/:carrera", (req, res) => {
    const carrera = req.params.carrera;  
    const query = `
        SELECT plataforma, nom_oferta, nom_empresa, lugar, link_pagina 
        FROM ofertas_laborales 
        WHERE nom_oferta REGEXP ? 
        ORDER BY fecha DESC, RAND();
    `;
    
    pool.query(query, [carrera], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send("Error al obtener ofertas");
        }
        res.json(results);
    });
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
