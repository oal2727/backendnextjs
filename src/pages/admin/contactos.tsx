import { Box, SimpleGrid, Spinner } from "@chakra-ui/react"
import React from "react"
import AdminLayout from "layouts/admin"
import ContactTable from "views/admin/dataTables/components/ContactTable"

import { columnContact, columnsDataColumns } from "views/admin/dataTables/variables/columnsData"
import { trpc } from "utils/trpc"
import { inferProcedureOutput } from "@trpc/server"
import { AppRouter } from "server/routers/_app"

type Contact = inferProcedureOutput<AppRouter["contact"]["get"]>;

export default function Contactos () {

	const { data: contacts, isLoading, refetch: reloadContacts } = trpc.contact.get.useQuery(undefined, {
		refetchOnWindowFocus: false,
	})
	return (
		<AdminLayout>
			<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
				<SimpleGrid
					mb='20px'
					columns={1}
					spacing={{ base: "20px", xl: "20px" }}
				>
					{(isLoading) ? <Spinner /> :
						<>
							<ContactTable
								columnsData={columnContact}
								tableData={contacts as Contact}
								reloadContact={reloadContacts}
							/>
						</>
					}

				</SimpleGrid>
			</Box>
		</AdminLayout>
	)
}
