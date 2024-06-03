import { router } from "../trpc"
import questionRouter from "./questionRouter"
import contactRouter from "./contactRouter"
import managmentRouter from "./managmentRouter"
import blogRouter from "./blogRouter"
export const appRouter = router({
	question: questionRouter,
	contact: contactRouter,
	blog: blogRouter,
	managment: managmentRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter