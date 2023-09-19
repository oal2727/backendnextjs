import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
// import { unstable_getServerSession } from "next-auth"
import { prisma } from "../utils/prisma"
// import { nextAuthOptions } from "common/auth"

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (
	ctx: trpcNext.CreateNextContextOptions,
) => {
	const { req, res } = ctx
	// const session = await unstable_getServerSession(req, res,nextAuthOptions)
	return {
		req,
		res,
		// session,
		prisma,
	}
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;