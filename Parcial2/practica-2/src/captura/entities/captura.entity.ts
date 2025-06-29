import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Captura {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imagen!: string;

  @Column()
  ubicacion!: string;

  @Column()
  fecha!: Date;

  @Column()
  plagaDetectada!: boolean;
}
