import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ShoppingCart } from '../models/ShoppingCart';
import { User } from '../models/User';
import { Product } from '../models/Product';

class ShoppingCartController {
    async addToCart(req: Request, res: Response) {
        try {
            const { productId, quantity, userId } = req.body;

            const userRepository = getRepository(User);
            const productRepository = getRepository(Product);
            const shoppingCartRepository = getRepository(ShoppingCart);

            // Verificar si ya hay un carrito existente para el usuario y producto
            let shoppingCart = await shoppingCartRepository.findOne({
                where: { userId, productId },
            });

            if (shoppingCart) {
                // Si el carrito ya existe, actualizar la cantidad
                shoppingCart.quantity += quantity;
            } else {
                // Si no existe, crear un nuevo carrito
                shoppingCart = shoppingCartRepository.create({
                    userId,
                    productId,
                    quantity,
                });
            }

            await shoppingCartRepository.save(shoppingCart);

            res.json({ message: 'Producto agregado al carrito correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async removeFromCart(req: Request, res: Response) {
        try {
            const { productId, userId } = req.body;

            const userRepository = getRepository(User);
            const productRepository = getRepository(Product);
            const shoppingCartRepository = getRepository(ShoppingCart);


            // Verificar si ya hay un carrito existente para el usuario y producto
            let shoppingCart = await shoppingCartRepository.findOne({
                where: { userId, productId },
            });

            if (shoppingCart) {
                // Si el carrito existe, eliminarlo
                await shoppingCartRepository.remove(shoppingCart);
                res.json({ message: 'Producto eliminado del carrito correctamente' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado en el carrito' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async getShoppingCartByUserId(req: Request, res: Response) {
        try {
            const userId = req.body.userId; // Obtener el userId de los parámetros de la ruta

            const shoppingCartRepository = getRepository(ShoppingCart);

            // Buscar todos los elementos de un userId específico
            const shoppingCartItems = await shoppingCartRepository.find({
                where: { userId },
            });

            res.json(shoppingCartItems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

  // Otros métodos según las necesidades del carrito de compras


export default new ShoppingCartController();
