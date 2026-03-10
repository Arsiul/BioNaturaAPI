import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import registroRoutes from './routes/registroRoutes.js';
import asistenciaRoute from './routes/asistenciaRoute.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api/material', registroRoutes);
app.use('/api/asistencia', asistenciaRoute)

// Levantar servidor
app.listen(process.env.DB_PORT, '0.0.0.0', () => {
  console.log('Servidor corriendo en puerto 3000');
});