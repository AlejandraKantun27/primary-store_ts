import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  correoElectronico!: string;

  @Column()
  contraseña!: string;

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

  // Agregar dos campos adicionales según tus necesidades

  // Puedes agregar relaciones con otras entidades aquí si es necesario
}
