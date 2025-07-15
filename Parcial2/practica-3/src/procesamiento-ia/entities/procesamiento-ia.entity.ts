import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProcesamientoIa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capturaId: number; // referencia a Captura

  @Column()
  resultado: string; // plaga detectada, por ejemplo: "Pulgón", "Ninguna", etc.

  @Column('float')
  confianza: number; // porcentaje de certeza, ej: 0.92

  @Column()
  fechaProcesamiento: string; // YYYY-MM-DD HH:mm
}
