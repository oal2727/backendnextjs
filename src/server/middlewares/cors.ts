import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
type Props = {
	req: NextApiRequest
	res: NextApiResponse
	methods: ("POST" | "GET" | "DELETE" | "PUT")[]
}
const cors = async ({ req, res, methods }: Props) => {
	return await NextCors(req, res, {
		methods,
		origin: process.env.ORIGIN,
		optionsSuccessStatus: 200,
	})
}

export default cors