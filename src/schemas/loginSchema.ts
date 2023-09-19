import * as z from "zod"
export const loginSchema = z.object({
	email: z.string().min(1, { message: "Este campo es requerido" }).email({ message: "El email no es válido" }),
	password: z.string().min(1, { message: "Este campo es requerido" }),
})
export type ILogin = z.infer<typeof loginSchema>;
