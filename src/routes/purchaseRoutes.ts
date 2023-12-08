import express from 'express';
import PurchaseController from '../controllers/PurchaseController';

const router = express.Router();

// Rutas de gestión de compras
router.get('/purchases', PurchaseController.getAllPurchases);
router.get('/purchases/:id', PurchaseController.getPurchaseById);
router.post('/purchases', PurchaseController.createPurchase);
router.put('/purchases/:id', PurchaseController.updatePurchase);
router.delete('/purchases/:id', PurchaseController.deletePurchase);

export default router;
