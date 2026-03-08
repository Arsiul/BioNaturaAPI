import express from 'express';
import { crearAsistencia, getAsistenciaById } from '../controllers/asistenciaController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registrar', crearAsistencia);
router.get('/listar', verifyToken,getAsistenciaById);

export default router;