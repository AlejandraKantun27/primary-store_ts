import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import promotionalProductRoutes from './routes/promotionalProductRoutes';
import purchaseRoutes from './routes/purchaseRoutes';
import { ConnectionOptions } from 'typeorm';
import { User } from './models/User';
import { Product } from './models/Product';
import { PromotionalProduct } from './models/PromotionalProduct';
import { Purchase } from './models/Purchase';
import { PurchaseDetail } from './models/PurchaseDetail';

const app = express();

app.use(bodyParser.json({ limit: '50mb' })); // Ajusta el límite según tus necesidades


const PORT = process.env.PORT || 3000;

// Middleware
// Configuración del middleware CORS
const corsOptions = {
  origin: '*', // Acepta conexiones desde cualquier origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

createConnection({
  type: 'mysql',
  host: '3.135.182.134',
  port: parseInt('3306' || '3306', 10),
  username: 'root',
  password: 's3cr3t',
  database: 'primary_store',
  entities: [
    User,
    Product,
    PromotionalProduct,
    Purchase,
    PurchaseDetail
  ],
  synchronize: true,
}).then(() => {
  console.log('Conexión a la base de datos exitosa');
}).catch(error => {
  console.log('Error en la conexión a la base de datos:', error);
});


// Rutas
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', promotionalProductRoutes);
app.use('/api', purchaseRoutes);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(80, () => {
  console.log(`Servidor en ejecución en el puerto ${80}`);
});
