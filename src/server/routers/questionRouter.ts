
import { TRPCError } from "@trpc/server"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"

// consulta(query): se utiliza para obtener datos, generalmente no cambia ningún dato una
// mutación(mutation): se utiliza para enviar datos, a menudo con fines de creación/actualización/eliminación. una
// suscripción(Subscription): es posible que no la necesite y tenemos documentación específica

const questionRouter = router({
	getHello: publicProcedure.query(async(ctx) => {
		return { message: "Welcome to Full-Stack tRPC CRUD App with Next.js" }
	}),
	get: publicProcedure.query(async ({ ctx }) => { // WORKING (X)
		return []
	}),
})
export default questionRouter