export class Notificacion {
    constructor(
      public id: string,
      public mensaje: string,
      public fecha: Date,
      public enviada: boolean,
      public capturaId: string // Relación con Captura
    ) {}
  }
  