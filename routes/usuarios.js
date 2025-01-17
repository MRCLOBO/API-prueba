import { Router } from "express";
import { UsuarioController } from "../controllers/usuarios.js";
//vamos a crear una ruta para todas las consultas que vayan al recurso usuarios
export const usuariosRouter = Router();
//conexiones aceptadas para acceder a la API fuera del dominio

usuariosRouter.get("/", UsuarioController.getAll);

usuariosRouter.post("/", UsuarioController.create);

usuariosRouter.patch("/", UsuarioController.update);

usuariosRouter.delete("/", UsuarioController.delete);
