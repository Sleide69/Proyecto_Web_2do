import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mensaje: string;

  @Column({ default: false })
  leida: boolean; // indica si el usuario la vio

  @Column()
  fechaEnvio: string; // formato YYYY-MM-DD HH:mm
}
