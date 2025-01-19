import { Router } from "express";
import { UsuarioController } from "../controllers/usuarios.js";
//vamos a crear una ruta para todas las consultas que vayan al recurso usuarios

//exportamos el router para la inyeccion de dependencia de modelo, para recibir por parametro el modelo
export const createUsuariosrouter = (usuarioModel) => {
  const usuariosRouter = Router();
  //conexiones aceptadas para acceder a la API fuera del dominio

  //instanciamos el movie controller ya que utiliza un constructor que pide
  //que controlador usara,esto para tener en practica la inyeccion de dependencias
  const usuarioController = new UsuarioController(usuarioModel);

  usuariosRouter.get("/", usuarioController.getAll);

  usuariosRouter.post("/", usuarioController.create);

  usuariosRouter.patch("/", usuarioController.update);

  usuariosRouter.delete("/", usuarioController.delete);

  return usuariosRouter;
};
