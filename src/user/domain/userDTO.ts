import { z } from "zod";

export const registerUserDto = z.object({
  name: z
    .string({
      required_error: "El campo nombre es obligatorio",
      invalid_type_error: "El campo nombre debe ser un texto",
    })
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z
    .string({
      required_error: "El campo correo es obligatorio",
      invalid_type_error: "El campo correo debe ser un texto",
    })
    .email("Debe ser un email válido"),
  password: z
    .string({
      required_error: "El campo contraseña es obligatorio",
      invalid_type_error: "El campo contraseña debe ser un texto",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegisterUserDto = z.infer<typeof registerUserDto>;
