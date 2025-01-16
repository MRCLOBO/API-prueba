const usuarios = require("./usuarios.json");
function filtrarUsuarios(campo, valor) {
  const campoSolicitado = campo;
  const valorDeCampo = valor;
  const resultado = usuarios.filter((usuario) => usuario.id == valorDeCampo);

  return resultado;
}

module.exports = { filtrarUsuarios };
