import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

/** Example on how to extend the built-in session types */
declare module "next-auth" {
	export interface User {
		id: number,
		name: string,
		email: string,
		isAdmin: boolean,
	}
	interface Session extends DefaultSession {
		/** This is an example. You can find me in types/next-auth.d.ts */
		id: number
		user: User
		// foo: number
	}
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
	interface JWT {
		id: number,
		email: string,
		user: User
	}
}