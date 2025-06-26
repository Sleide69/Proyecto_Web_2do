import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mensaje!: string;

  @Column()
  tipo!: string;

  @Column()
  fecha!: Date;

  @Column({ nullable: true })
  plagaId?: number;
}
