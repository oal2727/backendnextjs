import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "utils/prisma"
import { contactSchema } from "schemas/contactSchema"

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
	const creds = await contactSchema.safeParseAsync(req.body)
	if (!creds.success) {
		return res.status(400).json({message:"Error en los datos enviados"})
	}
    try {
        await prisma.contact.create({
            data:{
                fullName:req.body.fullName,
                email:req.body.email,
                subject:req.body.subject,
                theme:req.body.theme
            }
        })
        return res.status(200).json({ message: "registrado correctamente" })
      } catch (err) {
        return res.status(400).json({ message: "error de registro" })
      }

	
}


export default handler