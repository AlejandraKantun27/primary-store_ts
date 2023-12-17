import express from 'express';
import ShoppingCartController from '../controllers/ShoppingCartController';

const router = express.Router();

// Rutas de gestión de carrito de compras
router.post('/add-to-cart', ShoppingCartController.addToCart);
router.delete('/remove-from-cart/:productId', ShoppingCartController.removeFromCart);

// Otras rutas según las necesidades del carrito de compras

export default router;