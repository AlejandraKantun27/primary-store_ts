import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../models/Product';

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  }

  async getProductById(req: Request, res: Response) {
    const productId = parseInt(req.params.id, 10);
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  }

  async createProduct(req: Request, res: Response) {
    const {
      nombre,
      descripcion,
      precio,
      categoria,
      fabricante,
      cantidadExistencia,
      unidadMedida,
      usuarioCreacion,
      usuarioActualizacion,
      activo,
      image,
    } = req.body;
    const productRepository = getRepository(Product);

    const newProduct = productRepository.create({
      nombre,
      descripcion,
      precio,
      categoria,
      fabricante,
      cantidadExistencia,
      unidadMedida,
      fechaCreacion: new Date(),
      usuarioCreacion,
      fechaActualizacion: new Date(),
      usuarioActualizacion,
      activo,
      image
    });

    await productRepository.save(newProduct);
    res.json(newProduct);
  }

  async updateProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id, 10);
    const {
      nombre,
      descripcion,
      precio,
      categoria,
      fabricante,
      cantidadExistencia,
      unidadMedida,
      activo,
      image,
    } = req.body;

    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar campos según la solicitud
    product.nombre = nombre || product.nombre;
    product.descripcion = descripcion || product.descripcion;
    product.precio = precio || product.precio;
    product.categoria = categoria || product.categoria;
    product.fabricante = fabricante || product.fabricante;
    product.cantidadExistencia = cantidadExistencia || product.cantidadExistencia;
    product.unidadMedida = unidadMedida || product.unidadMedida;
    product.activo = activo !== undefined ? activo : product.activo;
    product.image = image || product.image;

    // Actualizar la fecha de actualización
    product.fechaActualizacion = new Date();

    // Guardar los cambios en la base de datos
    await productRepository.save(product);

    res.json(product);
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id, 10);
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await productRepository.remove(product);
    res.json({ message: 'Producto eliminado correctamente' });
  }

  // ... (resto del controlador)

  async getProductsByCategory(req: Request, res: Response) {
    const category = req.params.category;
    const productRepository = getRepository(Product);

    try {
      const products = await productRepository.find({
        where: { categoria: category },
        take: 5, // Obtener como máximo 5 resultados
      });

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar productos por categoría', error: error.message });
    }
  }

  // ... (resto del controlador)

}

export default new ProductController();
