import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextFetchEvent, NextResponse } from "next/server"

// Se ha formateado el if para que se pueda ver la validacion que devuelve el return y se ha suprimido
// el error de retorno consistente porque la documentación de next no muestra ejemplos donde se retorne
// siempre algo, por lo que se asume que debe retornar solo en caso de redirigir a otro lado



// eslint-disable-next-line consistent-return
const middleware = async (req: NextRequestWithAuth) => {
	// Si req.nextauth.token está definido, el usuario está autenticado
	const loggedUser = req?.nextauth?.token?.user
	const pathName = req.nextUrl.pathname
    console.log("middleware")
	console.log(pathName)
}

export default withAuth(
	middleware,
	{
		callbacks: {
			authorized: ({ token }) => !!token?.user,
		},
	})

export const config = {
	matcher: [
		"/admin/:path*",
	],
}
