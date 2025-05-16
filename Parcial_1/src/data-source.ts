import { DataSource } from "typeorm";
import { Usuario } from "./models/user";
import { View } from "./models/view";
import { Plaga } from "./models/plaga";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "tu_usuario",     // cambia esto
    password: "tu_contraseña",  // cambia esto
    database: "mi_proyecto",    // cambia esto al nombre de tu BD
    synchronize: true,
    logging: true,
    entities: [Usuario, View, Plaga],
    migrations: [],
    subscribers: [],
});


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
