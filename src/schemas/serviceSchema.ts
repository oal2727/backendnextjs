import { z } from "zod"
export const serviceSchemaCreate = z.object({
	dateRequest: z.coerce.date({
		invalid_type_error: "La fecha no es válida",
		required_error: "Este campo es requerido",
	}),
	theme: z.string().optional(),
	contactId: z.number().optional(),
	observation: z.string().optional(),
	timeHourEstimation: z.number().min(1, { message: "Este campo es requerido" }),
	timeMinuteEstimation: z.number().min(1, { message: "Este campo es requerido" }),
})

export const serviceSchemaUpdate = z.object({
	id: z.number().int().positive({ message: "El id debe ser un número positivo" }),
	contactId: z.number().optional(),
	dateInitialize: z.coerce.date({
		invalid_type_error: "La fecha no es válida",
		required_error: "Este campo es requerido",
	}),
	observation: z.string().optional(),
	timeHourToogle: z.number().optional(),
	timeMinuteToogle: z.number().optional(),
})

export type IService = z.infer<typeof serviceSchemaCreate>;
export type IServiceUpdate = z.infer<typeof serviceSchemaUpdate>;
