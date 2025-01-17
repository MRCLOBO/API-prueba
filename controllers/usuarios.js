import { UsuarioModel } from "../views/usuario.js";
import { validarUsuario, validarUsuarioParcial } from "../usuariosSchema.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url); //aqui le paso por parametro la ruta actual del archivo para que ejecuta todos los requires a partir de aqui
const usuarios = require("../usuarios.json");

export class UsuarioController {
  static async getAll(req, res) {
    const { id, accesorios } = req.query; // sacamos el valor de id de la URL

    if (id) {
      const usuarioFiltrado = await UsuarioModel.getById(id);
      console.log(
        `Se ha devuelto al usuario con id: ${id} el `,
        new Date().toString()
      );
      return res.status(200).json(usuarioFiltrado);
    }
    if (accesorios) {
      const usuarioFiltrado = await UsuarioModel.getAll(accesorios);
      console.log(
        `Se ha devuelto al usuario con el accesorio ${accesorios} el `,
        new Date().toString()
      );
      return res.status(200).json(usuarioFiltrado);
    }
    res.status(200).json(usuarios);
    console.log(
      "Se ha entregado los datos de USUARIOS a traves de una solicitud GET"
    );
  }

  static async create(req, res) {
    const usuarioValidado = validarUsuario(req.body);
    if (usuarioValidado.error) {
      return res
        .status(400)
        .json({ erro: JSON.parse(usuarioValidado.error.message) });
    }
    const nuevoUsuario = await UsuarioModel.create(usuarioValidado.data);
    res.status(201).json(nuevoUsuario);
    console.log(
      `Se ha agregado con exito al usuario en `,
      new Date().toString()
    );
  }
  static async delete(req, res) {
    const { id } = req.query;
    const result = await UsuarioModel.delete({ id });

    if (result == false) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({ message: "Usuario eliminado" });
    console.log(`Se ha eliminado al usuario ${id}`);
  }

  static async update(req, res) {
    const { id } = req.query;
    const resultado = validarUsuarioParcial(req.body);
    const updatedUsuario = await UsuarioModel.update({
      id,
      input: resultado.data,
    });
    return res.json(updatedUsuario);
  }
}
