import { ProcesamientoIA } from "../../../domain/entities/ProcesamientoIA";
import { IProcesamientoIARepository } from "../../../domain/repositories/IProcesamientoIARepository";
import { ProcesamientoIAModel } from "../models/ProcesamientoIAModel";

export class ProcesamientoIARepositoryMongoose implements IProcesamientoIARepository {
  async crear(proc: ProcesamientoIA): Promise<ProcesamientoIA> {
    const nuevo = new ProcesamientoIAModel({
      capturaId: proc.capturaId,
      resultado: proc.resultado,
      confianza: proc.confianza,
      modeloUsado: proc.modeloUsado,
      fechaProcesamiento: proc.fechaProcesamiento,
    });

    const doc = await nuevo.save();

    return new ProcesamientoIA(
      doc._id.toString(),
      doc.capturaId,
      doc.resultado,
      doc.confianza,
      doc.modeloUsado,
      doc.fechaProcesamiento
    );
  }

  async listar(): Promise<ProcesamientoIA[]> {
    const docs = await ProcesamientoIAModel.find().lean();
    return docs.map((doc: any) => new ProcesamientoIA(
      doc._id.toString(),
      doc.capturaId,
      doc.resultado,
      doc.confianza,
      doc.modeloUsado,
      doc.fechaProcesamiento
    ));
  }

  async obtenerPorCaptura(capturaId: string): Promise<ProcesamientoIA | null> {
    const doc = await ProcesamientoIAModel.findOne({ capturaId }).lean();
    if (!doc) return null;
  
    return new ProcesamientoIA(
      doc._id.toString(),
      doc.capturaId,
      doc.resultado,
      doc.confianza,
      doc.modeloUsado,
      doc.fechaProcesamiento
    );
  }
  
}
