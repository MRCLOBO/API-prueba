import { createRequire } from "node:module";
const require = createRequire(import.meta.url); //aqui le paso por parametro la ruta actual del archivo para que ejecuta todos los requires a partir de aqui
const usuarios = require("../usuarios.json");
import { randomUUID } from "node:crypto";
export class UsuarioModel {
  static getAll = async (accesorio) => {
    if (accesorio) {
      console.log(accesorio, "LLEGO LA CONDICION");
      return usuarios.filter((usuario) =>
        usuario.accesorios.some(
          (a) => a.toLowerCase() == accesorio.toLowerCase()
        )
      );
    }
    return usuarios;
  };

  static async getById(id) {
    const idDeUsuario = id;
    const resultado = usuarios.filter((usuario) => usuario.id == idDeUsuario);

    return resultado;
  }
  static async create(input) {
    const idUsuario = randomUUID();
    const usuarioAgregar = {
      id: idUsuario,
      ...input,
    };
    usuarios.push(usuarioAgregar);
    return usuarioAgregar;
  }
  static async delete({ id }) {
    const usuarioIndex = usuarios.findIndex((usuario) => usuario.id == id);
    if (usuarioIndex == -1) return false;
    usuarios.splice(usuarioIndex, 1);
    return true;
  }
  static async update({ id, input }) {
    const usuarioIndex = usuarios.findIndex((usuario) => usuario.id == id);
    if (usuarioIndex == -1) return false;
    usuarios[usuarioIndex] = {
      ...usuarios[usuarioIndex],
      ...input,
    };
    return usuarios[usuarioIndex];
  }
}
