import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user";


@Entity()
export class view{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    vista!: string;

    @ManyToOne(()=> User,(user: User)=> user.views ) 
    user!: User;

}