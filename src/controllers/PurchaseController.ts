import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Purchase } from '../models/Purchase';

class PurchaseController {
  async getAllPurchases(req: Request, res: Response) {
    const purchaseRepository = getRepository(Purchase);
    const purchases = await purchaseRepository.find({ relations: ['detallesCompra'] });
    res.json(purchases);
  }

  async getPurchaseById(req: Request, res: Response) {
    const purchaseId = parseInt(req.params.id, 10);
    const purchaseRepository = getRepository(Purchase);
    const purchase = await purchaseRepository.findOne({ where: { id: purchaseId }, relations: ['detallesCompra'] });

    if (!purchase) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    res.json(purchase);
  }

  async createPurchase(req: Request, res: Response) {
    const { descripcion, nombreCliente, precioTotal, totalProductos, usuarioCreacion, usuarioActualizacion, activo } = req.body;
    const purchaseRepository = getRepository(Purchase);

    const newPurchase = purchaseRepository.create({
      descripcion,
      nombreCliente,
      precioTotal,
      totalProductos,
      fechaCreacion: new Date().toISOString(), // Guardar la fecha de hoy
      usuarioCreacion,
      fechaActualizacion: new Date().toISOString(), // Guardar la fecha de hoy
      usuarioActualizacion,
      activo
    });

    await purchaseRepository.save(newPurchase);
    res.json(newPurchase);
  }

  async updatePurchase(req: Request, res: Response) {
    const purchaseId = parseInt(req.params.id, 10);
    const { descripcion, nombreCliente, precioTotal, totalProductos, usuarioCreacion, usuarioActualizacion, activo } = req.body;

    const purchaseRepository = getRepository(Purchase);
    const purchase = await purchaseRepository.findOne({ where: { id: purchaseId }, relations: ['detallesCompra'] });

    if (!purchase) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    purchase.descripcion = descripcion || purchase.descripcion;
    purchase.nombreCliente = nombreCliente || purchase.nombreCliente;
    purchase.precioTotal = precioTotal || purchase.precioTotal;
    purchase.totalProductos = totalProductos || purchase.totalProductos;    
    purchase.usuarioCreacion = usuarioCreacion; // Puedes ajustar esto según tu lógica de usuario
    purchase.usuarioActualizacion = usuarioActualizacion; // Puedes ajustar esto según tu lógica de usuario
    purchase.activo = activo; // Puedes ajustar esto según tu lógica de usuario

    await purchaseRepository.save(purchase);
    res.json(purchase);
  }

  async deletePurchase(req: Request, res: Response) {
    const purchaseId = parseInt(req.params.id, 10);
    const purchaseRepository = getRepository(Purchase);
    const purchase = await purchaseRepository.findOne({ where: { id: purchaseId } });

    if (!purchase) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    await purchaseRepository.remove(purchase);
    res.json({ message: 'Compra eliminada correctamente' });
  }
}

export default new PurchaseController();
