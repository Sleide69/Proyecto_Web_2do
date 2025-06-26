// Entidad del dominio que representa una Plaga

export class Plaga {
  constructor(
    public id: string,           // ID único (puede ser generado por la BD)
    public nombre: string,       // Nombre de la plaga
    public tipo: string,         // Tipo de plaga (insecto, hongo, etc.)
    public descripcion: string   // Descripción general de la plaga
  ) {}
}
