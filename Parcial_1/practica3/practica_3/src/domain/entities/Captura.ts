export class Captura {
    constructor(
      public id: string,
      public urlImagen: string,
      public fecha: Date,
      public ubicacion: string,
      public plagaId: string // Relación con la entidad Plaga
    ) {}
  }
  