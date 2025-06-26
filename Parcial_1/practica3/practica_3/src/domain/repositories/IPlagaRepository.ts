import { Plaga } from "../entities/Plaga";

export interface IPlagaRepository {
  crear(plaga: Plaga): Promise<Plaga>;
  listar(): Promise<Plaga[]>;
  buscarPorId(id: string): Promise<Plaga | null>;
  eliminar(id: string): Promise<void>;
}
