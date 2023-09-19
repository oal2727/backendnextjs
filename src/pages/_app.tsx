import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import React from "react"
import theme from "theme/theme"

import "styles/Fonts.css"
import "styles/App.css"
import "styles/Contact.css"
import { trpc } from "../utils/trpc"
import { Session } from "next-auth"
import "react-calendar/dist/Calendar.css"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"

function MyApp({
	Component,
	pageProps,
}: AppProps<{
	session: Session;
}>) {
	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<Head>
					<title>Horizon UI Dashboard </title>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='theme-color' content='#000000' />
				</Head>
				<React.StrictMode>
					<Component {...pageProps} />
				</React.StrictMode>
			</ChakraProvider>
		</SessionProvider>
	)
}

export default trpc.withTRPC(MyApp)