import z from "zod";

const usuarioSchema = z.object({
  nombre: z
    .string({
      invalid_type_error: "El nombre debe de ser un string",
      required_error: "El campo de nombre debe de ser proporcionado",
    })
    .min(3, {
      message: "El nombre debe de tener 3 caracteres o mas para ser valido",
    }),
  accesorios: z
    .array(
      z.enum(["lentes", "reloj", "collar", "gorra"], {
        invalid_type_error: "Los accesorios deben de ser un array de strings",
      })
    )
    .optional(),
  estudiante: z
    .enum(["si", "no"], {
      invalid_type_error:
        "El campo estudiante debe de ser un string con 'si' o 'no'",
    })
    .optional(),
});

export function validarUsuario(object) {
  return usuarioSchema.safeParse(object);
}

//para poder hacer una actualizacion de los datos tendriamos que validar los datos, y para no
//hacer de cada caso,podriamos hacer uso del esquema ya creado,solamente que agregamos la funcion
//partial() en el para que todos los campos sean opcionales  y asi poder validar el dato a modificar
export function validarUsuarioParcial(object) {
  return usuarioSchema.partial().safeParse(object);
}
