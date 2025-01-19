//import { this.movieModel } from "../views/usuario.js";
import { validarUsuario, validarUsuarioParcial } from "../usuariosSchema.js";

export class UsuarioController {
  constructor(movieModel) {
    this.movieModel = movieModel;
  }
  getAll = async (req, res) => {
    const { id, accesorios } = req.query; // sacamos el valor de id de la URL
    let usuarioResultado;
    if (id) {
      usuarioResultado = await this.movieModel.getById(id);
      console.log(
        `Se ha devuelto al usuario con id: ${id} el `,
        new Date().toString()
      );
      return res.status(200).json(usuarioResultado);
    }
    if (accesorios) {
      usuarioResultado = await this.movieModel.getAll(accesorios);
      console.log(
        `Se ha devuelto al usuario con el accesorio ${accesorios} el `,
        new Date().toString()
      );
      return res.status(200).json(usuarioResultado);
    } else {
      usuarioResultado = await this.movieModel.getAll();
    }

    res.status(200).json(usuarioResultado);
    console.log(
      "Se ha entregado los datos de USUARIOS a traves de una solicitud GET"
    );
  };

  create = async (req, res) => {
    const usuarioValidado = validarUsuario(req.body);
    if (usuarioValidado.error) {
      return res
        .status(400)
        .json({ erro: JSON.parse(usuarioValidado.error.message) });
    }
    const nuevoUsuario = await this.movieModel.create(usuarioValidado.data);
    res.status(201).json(nuevoUsuario);
    console.log(
      `Se ha agregado con exito al usuario en `,
      new Date().toString()
    );
  };
  delete = async (req, res) => {
    const { id } = req.query;
    const result = await this.movieModel.delete(id);

    if (result == false) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({ message: "Usuario eliminado" });
    console.log(`Se ha eliminado al usuario ${id}`);
  };

  update = async (req, res) => {
    const { id } = req.query;
    const resultado = validarUsuarioParcial(req.body);
    const updatedUsuario = await this.movieModel.update(id, resultado.data);
    if (updatedUsuario) {
      return res.json({ message: "Usuario modificado" });
    } else {
      return res
        .status(404)
        .json({ message: "ocurrio un error al editar el usuario" });
    }
  };
}
