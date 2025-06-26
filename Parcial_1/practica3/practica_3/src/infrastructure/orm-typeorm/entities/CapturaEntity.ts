import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('capturas')
export class CapturaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imagenUrl!: string;

  @Column()
  fecha!: Date;

  @Column()
  plagaId!: number;

  @Column()
  ubicacion!: string;
}
