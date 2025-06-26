import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("plagas")
export class PlagaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  tipo!: string;
}
