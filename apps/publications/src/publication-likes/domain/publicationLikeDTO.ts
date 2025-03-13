import { z } from "zod";

export const createPublicationLikeDto = z.object({
  publicationId: z
    .string({
      required_error: "El campo userId es obligatorio",
      invalid_type_error: "El campo userId debe ser un texto",
    })
    .uuid(),
  userId: z
    .string({
      required_error: "El campo userId es obligatorio",
      invalid_type_error: "El campo userId debe ser un texto",
    })
    .uuid(),
});

export type RegisterUserDto = z.infer<typeof createPublicationLikeDto>;