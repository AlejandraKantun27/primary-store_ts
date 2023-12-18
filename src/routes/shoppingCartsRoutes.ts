import express from 'express';
import ShoppingCartController from '../controllers/ShoppingCartController';

const router = express.Router();

// Rutas de gestión de carrito de compras
router.post('/add-to-cart', ShoppingCartController.addToCart);
router.delete('/remove-from-cart/:productId', ShoppingCartController.removeFromCart);

// Agregar nueva ruta para obtener elementos de un userId específico
router.get('/get-by-user', ShoppingCartController.getShoppingCartByUserId);

// Otras rutas según las necesidades del carrito de compras

export default router;