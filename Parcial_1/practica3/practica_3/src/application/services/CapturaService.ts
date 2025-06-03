import { ICapturaRepository } from "../../domain/repositories/ICapturaRepository";
import { Captura } from "../../domain/entities/Captura";

export class CapturaService {
  constructor(private readonly capturaRepo: ICapturaRepository) {}

  async listarCapturas(): Promise<Captura[]> {
    return this.capturaRepo.listar();
  }

  async capturasPorPlaga(plagaId: string): Promise<Captura[]> {
    return this.capturaRepo.buscarPorPlaga(plagaId);
  }
}
