import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio!: number;

  @Column()
  categoria!: string;

  @Column()
  fabricante!: string;

  @Column('int')
  cantidadExistencia!: number;

  @Column()
  unidadMedida!: string;

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

  @Column('longblob')
  imagen!: Buffer;

  // Agregar dos campos adicionales según tus necesidades

  // Puedes agregar relaciones con otras entidades aquí si es necesario
}
