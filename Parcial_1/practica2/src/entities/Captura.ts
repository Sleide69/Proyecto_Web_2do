import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { Plaga } from './Plaga';
  import { ProcesamientoIA } from './ProcesamientoIA';
  
  @Entity()
  export class Captura {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    imagen!: string;
  
    @Column()
    fecha!: Date;
  
    @ManyToOne(() => Plaga, plaga => plaga.capturas, { nullable: true })
    plaga!: Plaga;
  
    @OneToOne(() => ProcesamientoIA, ia => ia.captura)
    procesamiento!: ProcesamientoIA;
  }
  