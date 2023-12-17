import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

class AuthController {
  async login(req: Request, res: Response) {
    const { correoElectronico, contraseña } = req.body;

    // Verificar las credenciales del usuario
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { correoElectronico } });

    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign({ userId: user.id, correoElectronico: user.correoElectronico }, 'secreto', { expiresIn: '1h' });

    res.json({ token });
  }

  async register(req: Request, res: Response) {
    const { nombre, correoElectronico, contraseña } = req.body;

    // Verificar si el usuario ya existe
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { correoElectronico } });

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear un nuevo usuario
    const newUser = userRepository.create({
      nombre,
      correoElectronico,
      contraseña: hashedPassword,
      usuarioCreacion: new Date().toISOString(), // Guardar la fecha de hoy
      usuarioActualizacion: new Date().toISOString(), // Guardar la fecha de hoy
    });

    await userRepository.save(newUser);

    res.json({ message: 'Registro exitoso' });
  }

  async getUserId(req: Request, res: Response) {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
      // Decodificar el token
      const decodedToken: any = jwt.verify(token, 'secreto');

      // Obtener el ID del usuario desde el token
      const userId = decodedToken.userId;

      res.json({ userId });
    } catch (error) {
      res.status(401).json({ message: 'Token inválido', error: error });
    }
  }



  // Puedes agregar más métodos según las necesidades de autenticación y registro
}

export default new AuthController();
