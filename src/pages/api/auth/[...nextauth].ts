import NextAuth,{ NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "utils/prisma"
import { loginSchema } from "schemas/loginSchema"
import { verify } from "argon2"

export const authOptions: NextAuthOptions = {
    providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
        const creds = await loginSchema.parseAsync(credentials)
        const user = await prisma.user.findFirst({
            where: { email: creds.email },
        })
        if (!user) {
            return null
        }
        const isAdmin = "admin"
        const isValidPassword = await verify(user.password, creds.password)
        if (!isValidPassword) {
            return null
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin
        }

    },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth/sign-in", // Displays signin buttons
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    session: async ({ session, token }) => {
        if (token) {
            session.id = token.id
            session.user = token.user
        }
        return Promise.resolve(session)
    },
    jwt: async ({ token, user }) => {
        const isSignin = user ? true : false
        if (isSignin) {
            token.id = user!.id as number
            token.email = user!.email
            token.user = user
        }
        return Promise.resolve(token)
    },
    },
    events: {},
	// Enable debug messages in the console if you are having problems
	debug: false,
};
//  Este objeto se pasa a la función NextAuth, creando un
//  controlador para procesar solicitudes de autenticacióne
export default NextAuth(authOptions);