import {appDataSource}from './data-source'
import 'reflect-metadata'

export const iniciar = async () => {
    try {
        await appDataSource.initialize();
        console.log("Base de datos iniciada");
    } catch (ex) {
        console.error("Error al iniciar la base de datos", ex);
    }
};

// export const iniciar= async()=>{
//     try{
//         await appDataSource.initialize();
//         console.log("Base de datos iniciada")
//         return
//     }
//     catch(ex){

//     }

// }