import { Captura } from "../../domain/entities/Captura";
import { ICapturaRepository } from "../../domain/repositories/ICapturaRepository";
import { v4 as uuidv4 } from "uuid";

export class CrearCaptura {
  constructor(private readonly capturaRepo: ICapturaRepository) {}

  async ejecutar(data: {
    urlImagen: string;
    fecha: Date;
    ubicacion: string;
    plagaId: string;
  }): Promise<Captura> {
    const nuevaCaptura = new Captura(
      uuidv4(),
      data.fecha,
      data.urlImagen,
      data.ubicacion,
      Number(data.plagaId)
    );    
    return await this.capturaRepo.crear(nuevaCaptura);
  }
}
