import { Icon } from "@chakra-ui/react"
import {
	MdBarChart,
	MdPerson,
	MdHome,
	MdLock,
	MdOutlineShoppingCart,
} from "react-icons/md"

// Admin Imports
import MainDashboard from "pages/admin/default"
import NFTMarketplace from "pages/admin/nft-marketplace"
import Profile from "pages/admin/profile"
import DataTables from "pages/admin/data-tables"
import RTL from "pages/rtl/rtl-default"

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
