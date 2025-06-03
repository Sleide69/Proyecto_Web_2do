import { ICapturaRepository } from "../../domain/repositories/ICapturaRepository";
import { IProcesamientoIARepository } from "../../domain/repositories/IProcesamientoIARepository";
import { ProcesamientoIA } from "../../domain/entities/ProcesamientoIA";
import { v4 as uuidv4 } from "uuid";

export class DetectarPlaga {
  constructor(
    private readonly capturaRepo: ICapturaRepository,
    private readonly procesamientoRepo: IProcesamientoIARepository
  ) {}

  async ejecutar(capturaId: string, modeloUsado: string): Promise<ProcesamientoIA> {
    const captura = await this.capturaRepo.buscarPorId(capturaId);
    if (!captura) {
      throw new Error("Captura no encontrada");
    }

    // Aquí iría la llamada a la IA real (API externa, servicio local, etc.)
    const resultado = "Plaga detectada: Pulgón"; // Simulación

    const procesamiento = new ProcesamientoIA(
      uuidv4(),
      capturaId,
      resultado,
      0.95, // Valor de confianza simulado
      modeloUsado,
      new Date()
    );

    return await this.procesamientoRepo.crear(procesamiento);
  }
}
