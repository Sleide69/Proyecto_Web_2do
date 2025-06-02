import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Captura } from './Captura';

@Entity()
export class Plaga {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  especie!: string;

  @Column()
  peligrosa!: boolean;

  @Column()
  ubicacion!: string;

  @Column()
  sintomas!: string;


  @OneToMany(() => Captura, captura => captura.plaga)
  capturas!: Captura[];
}

// import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,OneToMany } from "typeorm";
// import { Usuario } from "../models/user";
// import { View } from '../models/view';

// @Entity()
// export class Plaga {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column()
//   nombre!: string;

//   @Column()
//   descripcion!: string;

//   @Column()
//   sintomas!: string;

//   @Column()
//   tratamiento!: string;

//   @Column({ nullable: true })
//   imagenReferencia!: string; // ruta o URL

//   @Column({ nullable: true })
//   severidad!: string; // leve, moderada, severa
  
//   @ManyToOne(() => Usuario, (user: Usuario) => user.plagas)
//   usuario!: Usuario;

//   @OneToMany(() => View, (view) => view.plaga)
//   vistas!: View[];

// }
