import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plaga {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  tipo!: string;

  @Column()
  descripcion!: string;

  @Column()
  nivelRiesgo!: string;
}
