import * as z from "zod"
export const contactSchema = z.object({
	email: z.string({
		required_error: "Correo es requerido",
	  }),
	fullName: z.string({
		required_error: "Nombre y Apellido es requerido",
	  })
	  .max(50, { message: "El limite de caracteres es 50" }),
	theme: z.string({
		required_error: "Tema es requerido",
	  })
	  .max(255, { message: "El limite de caracteres es 255" }),
	subject: z.string({
		required_error: "Asunto es requerido",
	  })
	  .max(255, { message: "El limite de caracteres es 255" }),
})

export const blogSchema = z.object({
	email: z.string({
		required_error: "Correo es requerido",
	  }),
})

export type IContact = z.infer<typeof contactSchema>;
export type IBlog = z.infer<typeof blogSchema>;
