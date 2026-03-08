import express from 'express';
import { crearRegistro } from '../controllers/registroController.js';

const router = express.Router();

router.post('/registrar', crearRegistro);

export default router;