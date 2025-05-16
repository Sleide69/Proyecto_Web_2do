import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user";
import { Plaga } from "../entities/Plaga";

@Entity()
export class View {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.vistas)
    usuario!: Usuario;


    @ManyToOne(() => Plaga, (plaga: Plaga) => plaga.vistas)
    plaga!: Plaga;

}

// import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
// import { User } from "./user";


// @Entity()
// export class view{
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     vista!: string;

//     @ManyToOne(()=> User,(user: User)=> user.views ) 
//     user!: User;

// }