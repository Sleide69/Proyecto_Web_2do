import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { view } from "./view";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @OneToMany(()=> view, (view:view)=> view.user)
    views!: view[];
}