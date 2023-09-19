import { initTRPC } from '@trpc/server';
import superjson from "superjson"
import { Context } from "./context"

// You can use any variable name you like.
// We use t to keep things simple.
export const t = initTRPC.context<Context>().create({
    transformer: superjson,
});
 
export const router = t.router; // using for routes
export const publicProcedure = t.procedure; // using for routes publics