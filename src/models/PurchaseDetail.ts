import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Purchase } from './Purchase';

@Entity('purchase_details')
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.detallesCompra)
  purchase!: Purchase;

  @Column()
  producto!: string;

  @Column()
  orden!: number;

  @Column()
  usuarioCreacion!: string;

  @UpdateDateColumn()
  fechaActualizacion!: Date;

  // Puedes agregar campos adicionales según tus necesidades

  @CreateDateColumn()
  fechaCreacion!: Date;
}
