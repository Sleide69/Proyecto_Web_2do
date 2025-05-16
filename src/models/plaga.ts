import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,OneToMany } from "typeorm";
import { Usuario } from "./user";
import { View } from './view';

@Entity()
export class Plaga {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  sintomas!: string;

  @Column()
  tratamiento!: string;

  @Column({ nullable: true })
  imagenReferencia!: string; // ruta o URL

  @Column({ nullable: true })
  severidad!: string; // leve, moderada, severa
  
  @ManyToOne(() => Usuario, (user: Usuario) => user.plagas)
  usuario!: Usuario;

  @OneToMany(() => View, (view) => view.plaga)
  vistas!: View[];

}
