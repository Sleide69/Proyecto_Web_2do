export class ProcesamientoIA {
  constructor(
    public id: string,
    public capturaId: string,
    public resultado: string,
    public confianza: number,
    public modeloUsado: string,
    public fechaProcesamiento: Date
  ) {}
}
