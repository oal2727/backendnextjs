import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "utils/prisma"
import { contactSchema } from "schemas/contactSchema"
import cors from "../../../server/middlewares/cors"

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
	await cors({ req, res, methods: [ "POST" ] })

	if(req.method =="POST"){
		const creds = await contactSchema.safeParseAsync(req.body)
	if (!creds.success) {
		return res.status(400).json({ message: "Error en los datos enviados" })
	}
	try {
		await prisma.contact.create({
			data: {
				fullName: req.body.fullName,
				email: req.body.email,
				subject: req.body.subject,
				theme: req.body.theme,
			},
		})
		return res.status(200).json({ message: "registrado correctamente" })
	}
	catch (err) {
		return res.status(400).json({ message: err })
	}
	}

}

export default handler