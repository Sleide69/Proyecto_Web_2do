import { IPlagaRepository } from '../../../domain/repositories/IPlagaRepository';
import { Plaga } from '../../../domain/entities/Plaga';
import { PlagaModel } from '../models/PlagaModel';

export class PlagaMongooseRepository implements IPlagaRepository {
  async guardar(plaga: Plaga): Promise<void> {
    await PlagaModel.create(plaga);
  }

  async buscarPorId(id: number): Promise<Plaga | null> {
    const result = await PlagaModel.findOne({ _id: id }).lean();
    return result ? { ...result, id: result._id } : null;
  }
}
