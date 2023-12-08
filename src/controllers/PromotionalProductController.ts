import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PromotionalProduct } from '../models/PromotionalProduct';

class PromotionalProductController {
  async getAllPromotionalProducts(req: Request, res: Response) {
    const promotionalProductRepository = getRepository(PromotionalProduct);
    const promotionalProducts = await promotionalProductRepository.find();
    res.json(promotionalProducts);
  }

  async getPromotionalProductById(req: Request, res: Response) {
    const promotionalProductId = parseInt(req.params.id, 10);
    const promotionalProductRepository = getRepository(PromotionalProduct);
    const promotionalProduct = await promotionalProductRepository.findOne({ where: { id: promotionalProductId } });

    if (!promotionalProduct) {
      return res.status(404).json({ message: 'Producto promocional no encontrado' });
    }

    res.json(promotionalProduct);
  }

  async createPromotionalProduct(req: Request, res: Response) {
    const {
      nombre,
      descripcion,
      precioPromocion,
      fechaInicioPromocion,
      fechaFinPromocion,
      activo
    } = req.body;
    const promotionalProductRepository = getRepository(PromotionalProduct);

    const newPromotionalProduct = promotionalProductRepository.create({
      nombre,
      descripcion,
      precioPromocion,
      fechaInicioPromocion,
      fechaFinPromocion,
      activo,
      usuarioCreacion: 'system', // Puedes ajustar esto según tu lógica de usuario
      usuarioActualizacion: 'system', // Puedes ajustar esto según tu lógica de usuario
    });

    await promotionalProductRepository.save(newPromotionalProduct);
    res.json(newPromotionalProduct);
  }

  async updatePromotionalProduct(req: Request, res: Response) {
    const promotionalProductId = parseInt(req.params.id, 10);
    const {
      nombre,
      descripcion,
      precioPromocion,
      fechaInicioPromocion,
      fechaFinPromocion,
      activo
    } = req.body;

    const promotionalProductRepository = getRepository(PromotionalProduct);
    const promotionalProduct = await promotionalProductRepository.findOne({ where: { id: promotionalProductId } });

    if (!promotionalProduct) {
      return res.status(404).json({ message: 'Producto promocional no encontrado' });
    }

    promotionalProduct.nombre = nombre || promotionalProduct.nombre;
    promotionalProduct.descripcion = descripcion || promotionalProduct.descripcion;
    promotionalProduct.precioPromocion = precioPromocion || promotionalProduct.precioPromocion;
    promotionalProduct.fechaInicioPromocion = fechaInicioPromocion || promotionalProduct.fechaInicioPromocion;
    promotionalProduct.fechaFinPromocion = fechaFinPromocion || promotionalProduct.fechaFinPromocion;
    promotionalProduct.activo = activo; // Puedes ajustar esto según tu lógica de usuario

    await promotionalProductRepository.save(promotionalProduct);
    res.json(promotionalProduct);
  }

  async deletePromotionalProduct(req: Request, res: Response) {
    const promotionalProductId = parseInt(req.params.id, 10);
    const promotionalProductRepository = getRepository(PromotionalProduct);
    const promotionalProduct = await promotionalProductRepository.findOne({ where: { id: promotionalProductId } });

    if (!promotionalProduct) {
      return res.status(404).json({ message: 'Producto promocional no encontrado' });
    }

    await promotionalProductRepository.remove(promotionalProduct);
    res.json({ message: 'Producto promocional eliminado correctamente' });
  }
}

export default new PromotionalProductController();
