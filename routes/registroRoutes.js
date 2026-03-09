import express from 'express';
import { crearRegistro, getTopRegistro } from '../controllers/registroController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.post('/registrar', crearRegistro);
router.get('/top', verifyToken, getTopRegistro);

export default router;