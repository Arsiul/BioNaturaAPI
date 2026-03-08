import express from 'express';
import { crearAsistencia } from '../controllers/asistenciaController.js';

const router = express.Router();

router.post('/registrar', crearAsistencia);

export default router;