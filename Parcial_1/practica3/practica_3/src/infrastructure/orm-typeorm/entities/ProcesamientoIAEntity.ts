import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('procesamientos_ia')
export class ProcesamientoIAEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  capturaId!: number;

  @Column()
  resultado!: string;

  @Column()
  modeloUsado!: string;

  @Column()
  fecha!: Date;
}
