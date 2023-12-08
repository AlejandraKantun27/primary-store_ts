import express from 'express';
import ProductController from '../controllers/ProductController';

const router = express.Router();

// Rutas de gestión de productos
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router;
