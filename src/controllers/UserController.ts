import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    const { nombre, correoElectronico, contraseña } = req.body;
    const userRepository = getRepository(User);

    const newUser = userRepository.create({
      nombre,
      correoElectronico,
      contraseña,
      usuarioCreacion: 'system', // Puedes ajustar esto según tu lógica de usuario
      usuarioActualizacion: 'system', // Puedes ajustar esto según tu lógica de usuario
    });

    await userRepository.save(newUser);
    res.json(newUser);
  }

  async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const { nombre, correoElectronico, contraseña } = req.body;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.nombre = nombre || user.nombre;
    user.correoElectronico = correoElectronico || user.correoElectronico;
    user.contraseña = contraseña || user.contraseña;
    user.usuarioActualizacion = 'system'; // Puedes ajustar esto según tu lógica de usuario

    await userRepository.save(user);
    res.json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await userRepository.remove(user);
    res.json({ message: 'Usuario eliminado correctamente' });
  }
}

export default new UserController();
