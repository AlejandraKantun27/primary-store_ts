import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('promotional_products')
export class PromotionalProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioPromocion!: number;

  @Column()
  fechaInicioPromocion!: Date;

  @Column()
  fechaFinPromocion!: Date;

  @Column({ default: true })
  activo!: boolean;

  // Agregar dos campos adicionales según tus necesidades

  @CreateDateColumn()
  fechaCreacion!: Date;

  @Column()
  usuarioCreacion!: string;

  @UpdateDateColumn()
  fechaActualizacion!: Date;

  @Column()
  usuarioActualizacion!: string;

  // Puedes agregar relaciones con otras entidades aquí si es necesario
}
