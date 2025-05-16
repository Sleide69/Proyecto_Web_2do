// import { createTypeReferenceDirectiveResolutionCache, escapeLeadingUnderscores } from "typescript";

// let saludo:string = "hello world"
// console.log(saludo)

// const student: Istudent={
//     id:1102,
//     nombre:'Fab',
//     correo:'fabianaa@gmail.com',
//     direccion:'su casa',
// }

// interface Istudent {
//     id:number;
//     nombre:string;
//     correo:string;
//     direccion:string;
//     calificacion?:number; //el ? significa que calificaciones esta en el sistema pero no es "obligatorio"
// }

// const students:Istudent[]=[
//     {
//         id:1102,
//         nombre:'fab',
//         correo: 'fabianaa@gmail.com',
//         direccion:'su casa',
//     }
// ]
// students.push({id:1102, nombre:"fab", correo:"fabianaa@gmail.com", direccion:"en mi casa"});

// students.push(student)

// function agregar(student: Istudent):void{
//     students.push(student);
// }

// const estudiante1:Istudent={id:2, nombre:'', correo:'', direccion:''}
// agregar(student)

// function agregar2(parm:Istudent, callback:(student:Istudent)=>void)
// {
//     students.push(parm)
//     callback(parm)
// }

// const estudianteA2: Istudent = {id:2, nombre:'', correo:'', direccion:''}

// agregar2(estudianteA2, (parm:Istudent)=>console.log);

// function agregar3(parm:Istudent):Promise<Istudent>
// {
//     return new Promise((resolve)=>{
//         students.push(parm);
//         setTimeout(()=>{
//             resolve(parm)

//         },
//         1000
//         )
//     },
//     )
    
// }

// agregar3(estudiante1).then((Istudent)=>
// {
//     console.log(student);
// })


/*async function main() {
    try
    {
        await agregar3(estudiante1)
    }
    catch(ex){

    }
    finally
    {

    }
}
main()*/
// import { log } from "console";
// import { consult, consultALL, deleteuser, insertarUser, update } from "./crud";
// import {iniciar}from './database'

// async function main() {
//     await iniciar()
//     const walter = await insertarUser ("Walter", "Walter@gmail.com", 12345)
//     // console.log(walter)
//     const newuser = await consultALL();
//     console.log("usuario consultado: ", newuser);
//     const userOne= await consult(walter.id)
//     console.log(userOne)
//     const userupdata=await update(walter.id,"Juan","Perris");
//     console.log(userupdata)   
//     const userdelete= await deleteuser(walter.id);
//     console.log(userdelete)
// }
// main ()

// import { consultarPorId, consultarTodos, eliminarUsuario, insertarUsuario, actualizarUsuario } from "../crud";
import { iniciar } from "../database";
import { appDataSource } from '../data-source'
import { detectarPlagaPorSintomas } from "./detector";


appDataSource.initialize().then(() => {
  console.log('DB conectada correctamente')
})

async function main() {
    await iniciar();

    // const nuevo = await insertarUsuario("Walter", "walter@gmail.com");
    // console.log("Insertado:", nuevo);

    const posiblesPlagas = await detectarPlagaPorSintomas("hojas amarillas con puntos negros");
    console.log("Coincidencias encontradas:", posiblesPlagas);

    // const todos = await consultarTodos();
    // console.log("Todos:", todos);

    // const uno = await consultarPorId(nuevo.id);
    // console.log("Uno:", uno);

    // const actualizado = await actualizarUsuario(nuevo.id, "Juan", "perris@gmail.com");
    // console.log("Actualizado:", actualizado);

    // const eliminado = await eliminarUsuario(nuevo.id);
    // console.log("Eliminado:", eliminado);
}

main();
