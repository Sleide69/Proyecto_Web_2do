import { Captura } from "../entities/Captura";

export interface ICapturaRepository {
  crear(captura: Captura): Promise<Captura>;
  listar(): Promise<Captura[]>;
  buscarPorId(id: string): Promise<Captura | null>;
  eliminar(id: string): Promise<void>;
  buscarPorPlaga(plagaId: string): Promise<Captura[]>;
}
