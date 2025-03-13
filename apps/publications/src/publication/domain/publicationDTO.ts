import { z } from "zod";

export const createPublicationDto = z.object({
  userId: z
    .string({
      required_error: "El campo userId es obligatorio",
      invalid_type_error: "El campo userId debe ser un texto",
    })
    .uuid(),
  title: z
    .string({
      required_error: "El campo title es obligatorio",
      invalid_type_error: "El campo title debe ser un texto",
    }),
  content: z
    .string({
      required_error: "El campo content es obligatorio",
      invalid_type_error: "El campo content debe ser un texto",
    })
});

export type RegisterUserDto = z.infer<typeof createPublicationDto>;