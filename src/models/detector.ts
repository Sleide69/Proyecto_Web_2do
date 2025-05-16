import { Plaga } from "./plaga";
import { appDataSource } from "../data-source";

export const detectarPlagaPorSintomas = async (descripcionUsuario: string): Promise<Plaga[]> => {
  const plagas = await appDataSource.manager.find(Plaga);

  return plagas.filter(plaga =>
    plaga.sintomas.toLowerCase().split(',').some(sintoma =>
      descripcionUsuario.toLowerCase().includes(sintoma.trim())
    )
  );
};
