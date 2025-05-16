import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Usuario } from "./user";
@Entity()
export class Plaga {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    descripcion!: string;

    @ManyToOne(() => Usuario, (user) => user.plagas)
    usuario!: Usuario;
}
