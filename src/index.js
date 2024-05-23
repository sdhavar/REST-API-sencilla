const express = require('express');
require('express-async-errors'); // Necesario para el manejo de errores asincrónicos
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../src/config');
const authenticateToken = require('../src/auth');
const validateEvent = require('../src/eventValidation');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Ruta para generar un token (solo para prueba, en un caso real se necesitaría un sistema de autenticación)
app.post('/login', (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    const user = { name: username };
    const accessToken = jwt.sign(user, SECRET_KEY);
    res.json({ accessToken });
});

// Endpoint para registrar eventos (con autenticación y validación)
app.post('/events', authenticateToken, validateEvent, (req, res) => {
    const event = req.body;

    // Aquí podrías agregar lógica para guardar el evento en una base de datos

    console.log('Evento recibido:', event);
    res.status(201).json({ message: 'Event registered successfully' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
