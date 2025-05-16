import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { View } from "./view";
import { Plaga } from "../entities/Plaga"; // Agrega esta línea

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nombre!: string;

    @Column({ nullable: false })
    correo!: string;

    @OneToMany(() => View, (view) => view.usuario)
    vistas!: View[];

    @OneToMany(() => Plaga, (plaga: Plaga) => plaga.usuario)
    plagas!: Plaga[];

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