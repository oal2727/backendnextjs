import { PrismaClient } from "@prisma/client"
import { hash } from "argon2"

const prisma = new PrismaClient()
async function main() {
	const user = await prisma.user.create({
		data: {
			name: "jose",
			email: "jose@hotmail.com",
			password: await hash("password"),
		},
	})
	console.log("admin creado", user.email)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
