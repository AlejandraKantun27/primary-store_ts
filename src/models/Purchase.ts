import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { PurchaseDetail } from './PurchaseDetail';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column()
  nombreCliente!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioTotal!: number;

  @Column('int')
  totalProductos!: number;

  @CreateDateColumn()
  fechaCreacion!: Date;

  @Column()
  usuarioCreacion!: string;

  @UpdateDateColumn()
  fechaActualizacion!: Date;

  @Column()
  usuarioActualizacion!: string;

  @Column({ default: true })
  activo!: boolean;

  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.purchase, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  detallesCompra!: PurchaseDetail[];

  // Puedes agregar dos campos adicionales según tus necesidades

  // Puedes agregar relaciones con otras entidades aquí si es necesario
}
