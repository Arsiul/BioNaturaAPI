import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import registroRoutes from './routes/registroRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api/material', registroRoutes);

// Levantar servidor
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en puerto 3000');
});