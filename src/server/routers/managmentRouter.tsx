
import { TRPCError } from "@trpc/server"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"
import { serviceSchemaCreate, serviceSchemaUpdate } from "schemas/serviceSchema"

// consulta(query): se utiliza para obtener datos, generalmente no cambia ningún dato una
// mutación(mutation): se utiliza para enviar datos, a menudo con fines de creación/actualización/eliminación. una
// suscripción(Subscription): es posible que no la necesite y tenemos documentación específica

const managmentRouter = router({
	get: publicProcedure.input(z.object({
		contactId: z.number().optional(),
	})).query(async ({ ctx, input }) => { // WORKING (X)
		const { contactId } = input
		const managment = await ctx.prisma.requeriment.findMany({
			where: {
				contactId: input.contactId,
			},
			select: {
				id: true,
				theme: true,
				dateRequest: true,
				paymentRequest: true,
				dateInitialize: true,
				timeHourEstimation: true,
				timeMinuteEstimation: true,
				timeHourToogle: true,
				timeMinuteToogle: true,
				paymentStatus: true,
			},
		})
		const managmentUpdate = managment.map((item) => {
			return {
				...item,
				timeEstimation: item.timeHourEstimation + " horas con " + item.timeMinuteEstimation + " minuto",
				timeToogle: (item.timeHourToogle == null && item.timeMinuteToogle == null) ? "No asignado" :
					item.timeHourToogle + " horas con " + item.timeMinuteToogle + " minuto",
				statePayment: item.paymentStatus ? "Cancelado" : "Pendiente",
				paymentRequest: item.paymentRequest == null ? "No asignado" : item.paymentRequest,
			}
		})

		const contact = await ctx.prisma.contact.findFirst({
			where: {
				id: contactId,
			},
			select: {
				fullName: true,
				bussiness: true,
			},
		})

		const data = {
			detailContact: contact,
			managment: managmentUpdate,
		}
		return data

	}),
	show: publicProcedure.input(z.object({
		serviceId: z.number().min(1, { message: "Este campo es requerido" }),
	})).query(async ({ input, ctx }) => {
		const { serviceId } = input
		const service = await ctx.prisma.requeriment.findUnique({
			where: {
				id: serviceId,
			},
		})
		return service
	}),

	updateState: publicProcedure.input(z.object({
		managmentId: z.number().min(1, { message: "Este campo es requerido" }),
	})).mutation(async ({ input, ctx }) => {
		const { managmentId } = input
		const contactUnique = await ctx.prisma.requeriment.findFirst({
			where: {
				id: managmentId,
			},
			select: {
				id: true,
			},
		})

		await ctx.prisma.requeriment.update({
			where: {
				id: managmentId,
			},
			data: {
				paymentRequest: new Date(),
				paymentStatus: true,
			},
		})
		return true
	}),
	update: publicProcedure.input(serviceSchemaUpdate).mutation(async ({ input, ctx }) => { // WORKING (X)
		await ctx.prisma.requeriment.update({
			where: {
				id: input.id,
			},
			data: {
				contactId: input.contactId,
				dateInitialize: input.dateInitialize,
				timeHourToogle: input.timeHourToogle,
				timeMinuteToogle: input.timeMinuteToogle,
				observation: input.observation,
			},
		})
	}),
	save: publicProcedure.input(serviceSchemaCreate).mutation(async ({ input, ctx }) => { // WORKING (X)
		await ctx.prisma.requeriment.create({
			data: {
				theme: input.theme,
				contactId: input.contactId,
				timeHourEstimation: input.timeHourEstimation,
				timeMinuteEstimation: input.timeMinuteEstimation,
				dateRequest: input.dateRequest,
				observation: input.observation,
			},
		})
	}),

})
export default managmentRouter