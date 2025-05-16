import { appDataSource } from '../config/data-source';
import { Plaga } from '../entities/Plaga';

const cargarPlagas = async () => {
  await appDataSource.initialize();
  const repo = appDataSource.getRepository(Plaga);

  const plagas = [
    { nombre: "Pulgón", especie: "Insecto que afecta hojas", peligrosa: true, ubicacion: "Insecticida orgánico" },
    { nombre: "Mosca Blanca", especie: "Causa daño en cultivos", peligrosa: false, ubicacion: "Trampas adhesivas" },
    { nombre: "Araña Roja", especie: "Afecta producción", peligrosa: true, ubicacion: "Azufre mojable" },
    { nombre: "Trips", especie: "Perfora hojas", peligrosa: false, ubicacion: "Aceite de neem" },
    { nombre: "Minador", especie: "Forma galerías en hojas", peligrosa: false, ubicacion: "Control biológico" },
  ];

  for (const p of plagas) {
    const plaga = repo.create(p);
    await repo.save(plaga);
  }

  console.log("✅ Plagas insertadas");
  process.exit(0);
};

cargarPlagas();
