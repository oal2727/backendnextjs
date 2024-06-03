import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "utils/prisma"
import { blogSchema } from "schemas/contactSchema"
import cors from "../../../server/middlewares/cors"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await cors({ req, res, methods: [ "POST" ] })
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Método no permitido" })
	}
	const creds = await blogSchema.safeParseAsync(req.body)
	if (!creds.success) {
		return res.status(400).json({ message: "Error en los datos enviados" })
	}

	try {
		await prisma.blog.create({
			data: {
				email: req.body.email,
			},
		})
		return res.status(200).json({ message: "registrado correctamente" })
	}
	catch (err) {
	  	return res.status(400).json({ message: err })
	}
}

export default handler