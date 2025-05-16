import { Plaga } from "../entities/Plaga";
import { appDataSource } from "../config/data-source";

export const detectarPlagaPorSintomas = async (descripcionUsuario: string): Promise<Plaga[]> => {
  const plagas = await appDataSource.manager.find(Plaga);

  return plagas.filter(plaga =>
    plaga.sintomas.toLowerCase().split(',').some(sintoma =>
      descripcionUsuario.toLowerCase().includes(sintoma.trim())
    )
  );
};
export function detectarPlaga(imagenBase64: string) {
  const posibles = [
    {
      plaga_detectada: 'Langosta del Desierto',
      confianza: 92.5,
      solucion: 'Aplicar biopesticida X durante la mañana'
    },
    {
      plaga_detectada: 'Mosca Blanca',
      confianza: 87.1,
      solucion: 'Colocar trampas amarillas adhesivas'
    },
    {
      plaga_detectada: 'Pulgón',
      confianza: 90.3,
      solucion: 'Aplicar jabón potásico o neem'
    },
  ];

  const random = Math.floor(Math.random() * posibles.length);
  return posibles[random];
}
