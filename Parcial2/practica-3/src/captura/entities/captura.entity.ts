import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Captura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: string; // fecha de la captura, en formato YYYY-MM-DD

  @Column()
  imagenUrl: string; // enlace de la imagen

  @Column()
  descripcion: string; // breve descripción

  @Column({ default: false })
  procesada: boolean; // indica si ya fue procesada por la IA
}
