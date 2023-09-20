import { Icon } from "@chakra-ui/react"
import {
	MdBarChart,
	MdPerson,
	MdHome,
	MdLock,
	MdOutlineShoppingCart,
} from "react-icons/md"

// Auth Imports
import SignInCentered from "pages/auth/sign-in"
import { IRoute } from "types/navigation"

const routes: IRoute[] = [
	{
		name: "Main Dashboard",
		layout: "/admin",
		path: "/default",
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		permissions: "admin",
	},
	{
		name: "Data Tables",
		layout: "/admin",
		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
		path: "/data-tables",
		permissions: "admin",
	},
]

export default routes
