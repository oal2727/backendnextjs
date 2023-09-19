import { router } from "../trpc"
import questionRouter from "./questionRouter"

export const appRouter = router({
	question: questionRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter