import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// Rutas de autenticación
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
// Ruta para obtener el ID del usuario mediante el token
router.get('/getUserId', AuthController.getUserId);

export default router;
