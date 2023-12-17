import express from 'express';
import ProductController from '../controllers/ProductController';

const router = express.Router();

// Rutas de gestión de productos
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);

// Ajusta el límite según tus necesidades solo para la ruta de creación de productos
router.post('/products', express.json({ limit: '50mb' }), ProductController.createProduct);

// Ajusta el límite según tus necesidades solo para la ruta de actualización de productos
router.put('/products/:id', express.json({ limit: '50mb' }), ProductController.updateProduct);

// Ruta para buscar productos por categoría (máximo 5)
router.get('/products/category/:category', ProductController.getProductsByCategory);

// Ruta para buscar todos los productos por categoría
router.get('/products/category/all/:category', ProductController.getProductsByCategory);


router.delete('/products/:id', ProductController.deleteProduct);

export default router;
