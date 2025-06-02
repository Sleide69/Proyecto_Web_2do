import { appDataSource } from "../config/data-source";
import { Plaga } from "../entities/Plaga";

// Crear plaga
// export const insertarPlaga = async (nombre: string, descripcion: string, sintomas: string, tratamiento: string, imagenReferencia?: string, severidad?: string) => {
//   const plaga = new Plaga();
//   plaga.nombre = nombre;
//   plaga.descripcion = descripcion;
//   plaga.sintomas = sintomas;
//   plaga.tratamiento = tratamiento;
//   plaga.imagenReferencia = imagenReferencia ?? '';
//   plaga.severidad = severidad ?? 'moderada';

//   return await appDataSource.manager.save(plaga);
// }

// Obtener todas las plagas
export const obtenerPlagas = async () => {
  return await appDataSource.manager.find(Plaga);
}

// Buscar plaga por ID
export const buscarPlaga = async (id: number) => {
  return await appDataSource.manager.findOne(Plaga, { where: { id } });
}

// Actualizar plaga
export const actualizarPlaga = async (id: number, datos: Partial<Plaga>) => {
  const plaga = await buscarPlaga(id);
  if (!plaga) return null;

  Object.assign(plaga, datos);
  return await appDataSource.manager.save(plaga);
}

// Eliminar plaga
export const eliminarPlaga = async (id: number) => {
  const plaga = await buscarPlaga(id);
  if (!plaga) return null;

  return await appDataSource.manager.remove(plaga);
}
