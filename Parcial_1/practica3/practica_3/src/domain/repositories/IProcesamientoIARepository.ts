import { ProcesamientoIA } from "../entities/ProcesamientoIA";

export interface IProcesamientoIARepository {
  crear(procesamiento: ProcesamientoIA): Promise<ProcesamientoIA>;
  obtenerPorCaptura(capturaId: string): Promise<ProcesamientoIA | null>;
  listar(): Promise<ProcesamientoIA[]>;
}
