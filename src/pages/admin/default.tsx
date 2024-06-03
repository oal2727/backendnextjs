import {
	Avatar,
	Box,
	Flex,
	Spinner,
	FormLabel,
	Icon,
	Select,
	SimpleGrid,
	useColorModeValue,
} from "@chakra-ui/react"
// Assets
// Custom components
import MiniStatistics from "components/card/MiniStatistics"
import IconBox from "components/icons/IconBox"
import {
	MdAddTask,
	MdAttachMoney,
	MdBarChart,
	MdFileCopy,
} from "react-icons/md"

import AdminLayout from "layouts/admin"
import { trpc } from "utils/trpc" // paso 1 importar el trpc

export default function UserReports () {
	// Chakra Color Mode

	const brandColor = useColorModeValue("brand.500", "white")
	const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100")

	const { data: contact, isLoading } = trpc.contact.count.useQuery(undefined, {
		refetchOnWindowFocus: false,
	})

	return (
		<AdminLayout>
			<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
				<>
					<SimpleGrid
						columns={{ "base": 1, "md": 2, "lg": 3, "2xl": 6 }}
						gap='20px'
						mb='20px'
					>
						{(isLoading) ? <Spinner /> :
							<>
								<MiniStatistics
									startContent={
										<IconBox
											w='56px'
											h='56px'
											bg={boxBg}
											icon={
												<Icon
													w='32px'
													h='32px'
													as={MdBarChart}
													color={brandColor}
												/>
											}
										/>
									}
									name='Total Contactos'
									value={contact?.contact as number}
								/>
								<MiniStatistics
									startContent={
										<IconBox
											w='56px'
											h='56px'
											bg={boxBg}
											icon={
												<Icon
													w='32px'
													h='32px'
													as={MdBarChart}
													color={brandColor}
												/>
											}
										/>
									}
									name='Total Blog'
									value={contact?.blog as number}
								/>
							</>
						}
						{/* <MiniStatistics
							startContent={
								<IconBox
									w='56px'
									h='56px'
									bg={boxBg}
									icon={
										<Icon
											w='32px'
											h='32px'
											as={MdAttachMoney}
											color={brandColor}
										/>
									}
								/>
							}
							name='Spend this month'
							value='---'
						/> */}
					</SimpleGrid>
				</>
			</Box>
		</AdminLayout>
	)
}
