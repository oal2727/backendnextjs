import { TRPCError } from "@trpc/server"
import { publicProcedure, router } from "server/trpc"
import { z } from "zod"

const eventRouter = router({
	count: publicProcedure.query(async ({ ctx }) => {
		const contact = await ctx.prisma.contact.count()
		return contact
	}),
	get: publicProcedure.query(async ({ ctx }) => {
		const contacts = await ctx.prisma.contact.findMany({
			select: {
				id: true,
				fullName: true,
				email: true,
				theme: true,
				bussiness: true,
				createdAt: true,
				subject: true,
				serviceActive: true,
			},
		})
		const contactUpdate = contacts.map((item) => {
			return {
				...item,
				status: item.serviceActive,
				stateService: item.serviceActive ? "Activo" : "Inactivo",
				bussiness: item.bussiness == null ? "No asignado" : item.bussiness,
			}
		})
		return contactUpdate
	}),
	updateState: publicProcedure.input(z.object({
		contactId: z.number().min(1, { message: "Este campo es requerido" }),
	})).mutation(async ({ input, ctx }) => {
		const { contactId } = input
		const contactUnique = await ctx.prisma.contact.findFirst({
			where: {
				id: contactId,
			},
			select: {
				serviceActive: true,
				id: true,
			},
		})

		await ctx.prisma.contact.update({
			where: {
				id: contactId,
			},
			data: {
				serviceActive: !contactUnique?.serviceActive,
			},
		})
		return true
	}),
})
export default eventRouter