import { TRPCError } from "@trpc/server"
import { publicProcedure, router } from "server/trpc"
import { z } from "zod"

const blogRouter = router({
	count: publicProcedure.query(async ({ ctx }) => {
		const contact = await ctx.prisma.blog.count()
		return contact
	}),
	get: publicProcedure.query(async ({ ctx }) => {
		const contacts = await ctx.prisma.blog.findMany({
			select: {
				id: true,
				email: true,
				createdAt: true,
			},
		})
		const contactUpdate = contacts.map((item) => {
			return {
				...item,
				email: item.email,
				createdAt: item.createdAt,
			}
		})
		return contactUpdate
	}),
})
export default blogRouter