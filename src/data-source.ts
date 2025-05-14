import {User} from "./models/user"
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const appDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
    entities: [User],
    migrations:[],
    subscribers:[], 
})
