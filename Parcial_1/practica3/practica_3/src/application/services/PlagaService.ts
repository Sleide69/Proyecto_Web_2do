import { IPlagaRepository } from "../../domain/repositories/IPlagaRepository";
import { Plaga } from "../../domain/entities/Plaga";


export class PlagaService {
  constructor(private readonly repo: IPlagaRepository) {}

  crear(nombre: string, tipo: string, descripcion: string): Promise<Plaga> {
    const nueva = new Plaga("", nombre, tipo, descripcion);
    return this.repo.crear(nueva);
  }

  listar(): Promise<Plaga[]> {
    return this.repo.listar();
  }
}
