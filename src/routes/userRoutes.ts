import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// Rutas de gestión de usuarios
router.get('/users', UserController.getAllUsers);
router.get('/user/:id', UserController.getUserById);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router;
