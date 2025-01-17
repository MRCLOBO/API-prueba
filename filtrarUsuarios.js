import { createRequire } from "node:module";
const require = createRequire(import.meta.url); //aqui le paso por parametro la ruta actual del archivo para que ejecuta todos los requires a partir de aqui
const usuarios = require("./usuarios.json");

export function filtrarUsuarios(campo, valor) {
  const campoSolicitado = campo;
  const valorDeCampo = valor;
  const resultado = usuarios.filter((usuario) => usuario.id == valorDeCampo);

  return resultado;
}
