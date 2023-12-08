import express from 'express';
import PromotionalProductController from '../controllers/PromotionalProductController';

const router = express.Router();

// Rutas de gestión de productos promocionales
router.get('/promotionalproducts', PromotionalProductController.getAllPromotionalProducts);
router.get('/promotionalproducts/:id', PromotionalProductController.getPromotionalProductById);
router.post('/promotionalproducts', PromotionalProductController.createPromotionalProduct);
router.put('/promotionalproducts/:id', PromotionalProductController.updatePromotionalProduct);
router.delete('/promotionalproducts/:id', PromotionalProductController.deletePromotionalProduct);

export default router;
