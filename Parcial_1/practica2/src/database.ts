import { appDataSource } from './config/data-source'
import 'reflect-metadata'

export const iniciar = async () => {
  try {
    await appDataSource.initialize();
    console.log("📦 Base de datos conectada correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar la base de datos:", error);
  }
}


// export const iniciar= async()=>{
//     try{
//         await appDataSource.initialize();
//         console.log("Base de datos iniciada")
//         return
//     }
//     catch(ex){

//     }

// }