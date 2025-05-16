import { appDataSource } from "./data-source";
import { Usuario } from "../src/models/user";

export const insertarUsuario = async (nombre: string, correo: string) => {
    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.correo = correo;
    return await appDataSource.manager.save(usuario);
};

export const consultarTodos = async () => {
    return await appDataSource.manager.find(Usuario, { relations: ['vistas'] });
};

export const consultarPorId = async (id: number) => {
    return await appDataSource.manager.findOne(Usuario, { where: { id }, relations: ['vistas'] });
};

export const actualizarUsuario = async (id: number, nombre: string, correo: string) => {
    const usuario = await consultarPorId(id);
    if (usuario) {
        usuario.nombre = nombre;
        usuario.correo = correo;
        return await appDataSource.manager.save(usuario);
    }
    return null;
};

export const eliminarUsuario = async (id: number) => {
    const usuario = await consultarPorId(id);
    if (usuario) {
        return await appDataSource.manager.remove(usuario);
    }
    return null;
};
// import { View } from "typeorm";
// import {appDataSource} from "./data-source";
// import { User } from "./models/user";

// export const insertarUser = async (name: string, email: string, id:number)=>{
//     const user1= new User();
//     user1.email= email
//     user1.name= name
//     user1.id=  id
//     return await appDataSource.manager.save(user1)
// }

// export const consultALL = async ()=>{
//     return await appDataSource.manager.find(User)
// }

// export const consult=async (id: number)=>{
//     return await appDataSource.manager.findOne(User,{where:{id}}) 
// }

// export const update=async (id:number,name: string, email: string)=>{
//     const user2 = await consult (id);
//     if (user2){
//         user2.email=email;
//         user2.name=name;
//         return await appDataSource.manager.save(user2)
//     }
//     return null;

// }

// export const deleteuser=async(id:number)=>{
//     const user2= await consult(id);
//     if (user2){
//         return await appDataSource.manager.remove(user2);
//     }
//     return null
// }

// export const createView= async (view:string, userid:number)=>{
//     const usuario = await consult(userid);
//     if (usuario){
//         const newview= new View()
//         newview.view = view
//     }
// }
