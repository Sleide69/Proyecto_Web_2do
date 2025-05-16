import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { Captura } from './Captura';
  import { Notificacion } from './Notificacion';
  
  @Entity()
  export class ProcesamientoIA {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @OneToOne(() => Captura, captura => captura.procesamiento)
    @JoinColumn()
    captura!: Captura;
  
    @Column()
    plaga_detectada!: string;
  
    @Column('float')
    confianza!: number;
  
    @Column('text')
    solucion!: string;
  
    @Column()
    procesado_en!: Date;
  
    @OneToMany(() => Notificacion, n => n.ia)
    notificaciones!: Notificacion[];
  }
  