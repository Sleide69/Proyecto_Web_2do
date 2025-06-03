import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notificaciones')
export class NotificacionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mensaje!: string;

  @Column()
  usuarioEmail!: string;

  @Column()
  fecha!: Date;

  @Column()
  enviada!: boolean;

  @Column()
  capturaId!: string;
}
