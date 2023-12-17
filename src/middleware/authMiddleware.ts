import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Decodificar el token y agregar la información del usuario a la solicitud
    const decodedToken: any = jwt.verify(token, 'secreto');
    req.user = { userId: decodedToken.userId };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido', error: error.message });
  }
};

export default authMiddleware;
