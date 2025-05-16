import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Usuario } from './models/user'
import { View } from './models/view'
import { Plaga } from './models/plaga'

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Emelec123*',
  database: 'plagasdb',
  synchronize: true,
  logging: true,
  entities: [Usuario, View, Plaga],
})




// import {User} from "./models/user"
// import 'reflect-metadata'
// import { DataSource } from 'typeorm'

// export const appDataSource = new DataSource({
//     type: 'sqlite',
//     database: 'database.sqlite',
//     synchronize: true,
//     logging: true,
//     entities: [User],
//     migrations:[],
//     subscribers:[], 
// })
