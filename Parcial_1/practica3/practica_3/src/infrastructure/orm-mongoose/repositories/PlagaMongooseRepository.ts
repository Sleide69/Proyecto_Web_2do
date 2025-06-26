import { Plaga } from "../../../domain/entities/Plaga";
import { IPlagaRepository } from "../../../domain/repositories/IPlagaRepository";
import { PlagaModel } from "../models/PlagaModel";

export class PlagaRepositoryMongoose implements IPlagaRepository {
  async crear(plaga: Plaga): Promise<Plaga> {
    const nueva = await new PlagaModel({
      nombre: plaga.nombre,
      descripcion: plaga.descripcion,
      tipo: plaga.tipo
    }).save();

    return new Plaga(nueva._id.toString(), nueva.nombre, nueva.descripcion, nueva.tipo);
  }

  async listar(): Promise<Plaga[]> {
    const docs = await PlagaModel.find().lean();
    return docs.map((doc: any) => 
      new Plaga(doc._id.toString(), doc.nombre, doc.descripcion, doc.tipo)
    );
  }

  async buscarPorId(id: string): Promise<Plaga | null> {
    const doc = await PlagaModel.findById(id).lean();
    if (!doc) return null;
    return new Plaga(doc._id.toString(), doc.nombre, doc.descripcion, doc.tipo);
  }

  async eliminar(id: string): Promise<void> {
    await PlagaModel.findByIdAndDelete(id);
  }
}
