import { insertarPlaga } from "./models/plaga-crud";

const cargarPlagas = async () => {
    await insertarPlaga("Pulgón", "Insecto que afecta hojas", "Alta", "Insecticida orgánico");
    await insertarPlaga("Mosca Blanca", "Causa daño en cultivos", "Media", "Trampas adhesivas");
    await insertarPlaga("Araña Roja", "Afecta producción", "Alta", "Azufre mojable");
    await insertarPlaga("Trips", "Perfora hojas", "Media", "Aceite de neem");
    await insertarPlaga("Minador", "Forma galerías en hojas", "Baja", "Control biológico");

    console.log("Plagas insertadas");
};

cargarPlagas();
