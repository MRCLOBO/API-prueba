const express = require("express");
const usuarios = require("./usuarios.json");
const { filtrarUsuarios } = require("./filtrarUsuarios");
const { validarUsuario, validarUsuarioParcial } = require("./usuariosSchema");
const crypto = require("node:crypto");

const app = express();
app.disable("x-powered-by");

app.use(express.json()); // para transformar el body de la request de JSON a objeto
app.use((req, res, next) => {
  console.log("Se ha recibido una solicitud", new Date().toString());
  next();
});

//res.header("Access-Control-Allow-Origin", "http://localhost:8080");
// tambien se le puede poner el * para aceptar todos los dominios pero es peligroso
const ACCEPTED_ORIGINS = ["http://localhost:8080"];

app.get("/usuarios", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { id } = req.query; // sacamos el valor de id de la URL

  if (id) {
    const usuarioFiltrado = filtrarUsuarios("id", id);
    console.log(
      `Se ha devuelto al usuario con id: ${id} el `,
      new Date().toString()
    );
    return res.status(200).json(usuarioFiltrado);
  }
  res.status(200).json(usuarios);
  console.log(
    "Se ha entregado los datos de USUARIOS a traves de una solicitud GET"
  );
});

app.post("/usuarios", (req, res) => {
  const usuarioValidado = validarUsuario(req.body);
  if (usuarioValidado.error) {
    return res
      .status(400)
      .json({ erro: JSON.parse(usuarioValidado.error.message) });
  }
  const idUsuario = crypto.randomUUID();
  const usuarioAgregar = {
    id: idUsuario,
    ...usuarioValidado.data,
  };
  usuarios.push(usuarioAgregar);
  res.status(200).json(usuarios);
  console.log(
    `Se ha agregado con exito al usuario con id: ${idUsuario} en `,
    new Date().toString()
  );
});

//logica de patch
app.patch("/usuarios", (req, res) => {
  const { id } = req.query;
  const usuarioIndex = usuarios.findIndex((usuario) => usuario.id == id);
  const resultado = validarUsuarioParcial(req.body);

  if (usuarioIndex == -1) {
    return res.status(400).json({
      message: "Usuario no encontrado",
    });
  }
  if (!resultado.success) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) });
  }

  const updateUsuario = {
    ...usuarios[usuarioIndex],
    ...resultado.data,
  };
  usuarios[usuarioIndex] = updateUsuario;

  return res.json(updateUsuario);
});

app.delete("/usuarios", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { id } = req.query;
  const usuarioIndex = usuarios.findIndex((usuario) => usuario.id == id);
  if (usuarioIndex == -1) {
    return res.status(400).json({
      message: "Usuario no encontrado",
    });
  }
  usuarios.splice(usuarioIndex, 1);
  return res.json({ message: "Usuario eliminado" });
  console.log(`Se ha eliminado al usuario ${id}`);
});

app.options("/usuarios", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  }
  res.send(200);
});

//Servidor escuchando la conexion
app.listen(3000, () => {
  console.log(
    "El servidor esta escuchando las conexiones en http://localhost:3000"
  );
});
