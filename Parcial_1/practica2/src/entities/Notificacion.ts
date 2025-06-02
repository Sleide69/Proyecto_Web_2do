import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProcesamientoIA } from './ProcesamientoIA';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProcesamientoIA, ia => ia.notificaciones)
  ia!: ProcesamientoIA;

  @Column()
  mensaje!: string;

  @Column()
  leido!: boolean;

  @Column()
  enviada_en!: Date;
}
