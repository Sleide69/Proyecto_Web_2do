import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;
}


// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
// import { view } from "./view";


// @Entity()
// export class User{
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     name!: string;

//     @Column()
//     email!: string;

//     @OneToMany(()=> view, (view:view)=> view.user)
//     views!: view[];
// }