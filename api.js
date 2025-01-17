import express, { json } from "express";
//para importar la funcion require y poder importar JSONs
import { usuariosRouter } from "./routes/usuarios.js";
import { corsMiddleware } from "./middlewares/cors.js";

const PORT = process.env.PORT ?? 3000;
const app = express();
app.disable("x-powered-by");

app.use(json()); // para transformar el body de la request de JSON a objeto
app.use(corsMiddleware());
app.use((req, res, next) => {
  console.log("Se ha recibido una solicitud", new Date().toString());
  next();
});
//basicamente en esta parte redirigimos todas las consultas de cualquier metodo a "/usuarios" al archivo usuariosRouter que ya maneja todas las solicitudes
app.use("/usuarios", usuariosRouter);

//res.header("Access-Control-Allow-Origin", "http://localhost:8080");

//Servidor escuchando la conexion
app.listen(PORT, () => {
  console.log(
    `El servidor esta escuchando las conexiones en http://localhost:${PORT}`
  );
});
