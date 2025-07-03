const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba para API
app.get('/api', (req, res) => {
  res.json({ message: 'API de Actividad 12 funcionando correctamente' });
});

// Servir la página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Servir archivos estáticos
app.use(express.static('public'));

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores 500
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 