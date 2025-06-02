import { Request, Response } from "express";
import { appDataSource } from "../config/data-source";
import { Usuario } from "../entities/usuario";

const usuarioRepo = appDataSource.getRepository(Usuario);

const registrarUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const nuevo = usuarioRepo.create({ email, password });
  await usuarioRepo.save(nuevo);

  const todos = await usuarioRepo.find();
  console.log("Usuarios registrados:");
  todos.forEach(u => console.log(`📩 ${u.email}`));

  res.status(201).json({ mensaje: "Usuario registrado correctamente", usuario: nuevo });
};

const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usuario = await usuarioRepo.findOneBy({ email, password });

  if (usuario) {
    return res.json({ mensaje: "Login exitoso", usuario });
  } else {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }
};

export default {
  registrarUsuario,
  loginUsuario
};
