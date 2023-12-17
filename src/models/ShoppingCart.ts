import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('shopping_carts')
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number; // Identificador del usuario

  @Column()
  productId!: number; // Identificador del producto

  @Column()
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
