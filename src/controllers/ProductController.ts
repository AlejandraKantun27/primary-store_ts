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
    const { nombre, descripcion, precio, categoria, fabricante, cantidadExistencia, unidadMedida, usuarioCreacion, usuarioActualizacion, activo } = req.body;
    const productRepository = getRepository(Product);

    const newProduct = productRepository.create({
      nombre,
      descripcion,
      precio,
      categoria,
      fabricante,
      cantidadExistencia,
      unidadMedida,
      fechaCreacion: new Date().toISOString(), // Guardar la fecha de hoy
      usuarioCreacion,
      fechaActualizacion: new Date().toISOString(), // Guardar la fecha de hoy  
      usuarioActualizacion,
      activo
    });

    await productRepository.save(newProduct);
    res.json(newProduct);
  }

  async updateProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id, 10);
    const { nombre, descripcion, precio, categoria, fabricante, cantidadExistencia, unidadMedida, activo } = req.body;

    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar campos según la solicitud
    if (nombre) {
      product.nombre = nombre;
    }
    if (descripcion) {
      product.descripcion = descripcion;
    }
    if (precio) {
      product.precio = precio;
    }
    if (categoria) {
      product.categoria = categoria;
    }
    if (fabricante) {
      product.fabricante = fabricante;
    }
    if (cantidadExistencia) {
      product.cantidadExistencia = cantidadExistencia;
    }
    if (unidadMedida) {
      product.unidadMedida = unidadMedida;
    }
    if (activo !== undefined) {
      product.activo = activo;
    }

    // Actualizar la fecha de actualización
    product.usuarioActualizacion = new Date().toISOString();

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
}

export default new ProductController();
