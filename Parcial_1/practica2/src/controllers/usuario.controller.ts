import { Request, Response } from "express";
import { appDataSource } from "../config/data-source";
import { Usuario } from "../entities/usuario";

const usuarioRepo = appDataSource.getRepository(Usuario);

export const registrarUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const nuevo = usuarioRepo.create({ email, password });
    await usuarioRepo.save(nuevo);

    const todos = await usuarioRepo.find();
    console.log("Usuarios registrados:");
    todos.forEach(u => console.log(`📩 ${u.email}`));

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevo
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  //const { email="sdf", password="sdf" } = req.body;
  //try {
    return res.status(200).json({usuario:"sdfsdf"})
  //  const usuario = await usuarioRepo.findOne({ where:{email } });
  //  if (usuario== null) {
  //    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  //  }
  //  return res.status(200).json({ mensaje: "Login exitoso", usuario });
  //} 
  //catch (error) {
  //  console.error("Error en login:", error);
  //  return res.status(500).json({ mensaje: "Error interno del servidor" });
  //}
};
