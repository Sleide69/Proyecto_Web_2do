import { DataSource } from 'typeorm';
import { Plaga } from '../entities/Plaga';
import { Captura } from '../entities/Captura';
import { ProcesamientoIA } from '../entities/ProcesamientoIA';
import { Notificacion } from '../entities/Notificacion';
import { Usuario } from '../entities/usuario';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Emelec123*',
  database: 'plagasdb',
  synchronize: true,
  logging: true,
  entities: [Plaga, Captura, ProcesamientoIA, Notificacion, Usuario],
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
