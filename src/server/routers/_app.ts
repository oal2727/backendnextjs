import { router } from "../trpc"
import questionRouter from "./questionRouter"
import contactRouter from "./contactRouter"
import managmentRouter from "./managmentRouter"
export const appRouter = router({
	question: questionRouter,
	contact: contactRouter,
	managment: managmentRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter