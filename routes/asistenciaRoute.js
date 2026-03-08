import express from 'express';
import { crearAsistencia, getAsistenciaById, marcarSalida, verificarPendiente } from '../controllers/asistenciaController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registrar', crearAsistencia);
router.put("/salida", verifyToken, marcarSalida);
router.get('/listar', verifyToken,getAsistenciaById);
router.get('/pendiente', verifyToken, verificarPendiente);

export default router;