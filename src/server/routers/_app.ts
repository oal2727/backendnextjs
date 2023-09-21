import { router } from "../trpc"
import questionRouter from "./questionRouter"
import contactRouter from "./contactRouter"

export const appRouter = router({
	question: questionRouter,
	contact: contactRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter