import { Router } from 'express';
import { login, register, getProfile, getDatesByUser, updatePassword, updateProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Login
router.post('/login', login);

// Registrar usuarios
router.post('/register', register);

// Obtener perfil (protegido)
router.get('/profile', verifyToken, getProfile);
router.get('/date', verifyToken, getDatesByUser);
// Actualizar perfil
router.put('/profile/update', verifyToken, updateProfile);

// Actualizar contraseña
router.put('/profile/password', verifyToken, updatePassword);


export default router;