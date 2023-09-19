import { Box, SimpleGrid } from "@chakra-ui/react"
import React from "react"
import AdminLayout from "layouts/admin"
import { TableData } from "views/admin/default/variables/columnsData"

export default function DataTables () {
	return (
		<AdminLayout>
			<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
				<SimpleGrid
					mb='20px'
					columns={{ sm: 1, md: 2 }}
					spacing={{ base: "20px", xl: "20px" }}
				>
					<p>hola</p>
					
				</SimpleGrid>
			</Box>
		</AdminLayout>
	)
}
