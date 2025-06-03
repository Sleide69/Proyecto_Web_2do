export class Captura {
  imagenUrl: string | undefined;
  constructor(
    public id: string,
    public fecha: Date,
    public urlImagen: string,
    public ubicacion: string,
    public plagaId: number
  ) {}
}
