export class Notificacion {
  usuarioEmail: string | undefined;
  constructor(
    public id: string,
    public mensaje: string,
    public fecha: Date,
    public destinatario: string,
    public enviada: boolean,
    public capturaId: string
  ) {}
}
