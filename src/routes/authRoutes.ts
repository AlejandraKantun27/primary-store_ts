import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// Rutas de autenticación
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export default router;
