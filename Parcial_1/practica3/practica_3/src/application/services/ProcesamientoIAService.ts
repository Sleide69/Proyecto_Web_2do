import { IProcesamientoIARepository } from "../../domain/repositories/IProcesamientoIARepository";
import { ProcesamientoIA } from "../../domain/entities/ProcesamientoIA";

export class ProcesamientoIAService {
  constructor(private readonly procesamientoRepo: IProcesamientoIARepository) {}

  async listarProcesamientos(): Promise<ProcesamientoIA[]> {
    return this.procesamientoRepo.listar();
  }

  async obtenerPorCaptura(capturaId: string): Promise<ProcesamientoIA | null> {
    return this.procesamientoRepo.obtenerPorCaptura(capturaId);
  }
}
