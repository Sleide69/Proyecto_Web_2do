let nombre_variable: string='inicialisacion'

console.log(nombre_variable)

const estudiante: IEstudiante={
    id:1,
    nombre:'pepillo',
    edad:22,
    tipo_sangre:'AB+',
    donante:true,
    calificacion:7.5,
}

interface IEstudiante{
    id:number,
    nombre:string,
    edad:number,
    tipo_sangre:string,
    donante:boolean,
    calificacion?:number,
}

const estudiantes: IEstudiante[]=[
    {
    id:1,
    nombre:'pepillo',
    edad:22,
    tipo_sangre:'AB+',
    donante:true,
    calificacion:7.5,
    },

    {
    id:2,
    nombre:'Ermeldegilda',
    edad:20,
    tipo_sangre:'O+',
    donante:false,
    calificacion:8.2,
    },

    {
    id:3,
    nombre:'Ruberto',
    edad:19,
    tipo_sangre:'B+',
    donante:true,
    calificacion:6,   
    },
]
estudiantes.push({id:1, nombre:'pepillo',edad:22,tipo_sangre:'AB+',donante:true,calificacion:7.5})
estudiantes.push(estudiante);

function agregar(estudiantes);