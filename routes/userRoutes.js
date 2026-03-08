import { Router } from 'express';
import { login, register, getProfile, getDatesByUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Login
router.post('/login', login);

// Registrar usuarios
router.post('/register', register);

// Obtener perfil (protegido)
router.get('/profile', verifyToken, getProfile);
router.get('/date', verifyToken, getDatesByUser);


export default router;