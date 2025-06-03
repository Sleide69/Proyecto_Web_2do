import { IPlagaRepository } from "../../domain/repositories/IPlagaRepository";
import { Plaga } from "../../domain/entities/Plaga";
import { v4 as uuidv4 } from "uuid";

export class CrearPlaga {
  constructor(private readonly plagaRepo: IPlagaRepository) {}

  async ejecutar(datos: { nombre: string; tipo: string; descripcion: string }): Promise<Plaga> {
    const nuevaPlaga = new Plaga(uuidv4(), datos.nombre, datos.tipo, datos.descripcion);
    return await this.plagaRepo.crear(nuevaPlaga);
  }
}
