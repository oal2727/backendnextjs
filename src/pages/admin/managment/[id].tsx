import { Box, SimpleGrid, Spinner, Button, Portal, useDisclosure } from "@chakra-ui/react"
import React from "react"
import AdminLayout from "layouts/admin"
import ManagmentTable from "views/admin/dataTables/components/ManagmentTable"
import { useRouter } from "next/router"
import { developmentColumn } from "views/admin/dataTables/variables/columnsData"
import { trpc } from "utils/trpc"
import { inferProcedureOutput } from "@trpc/server"
import { AppRouter } from "server/routers/_app"
import ModalRequeriment from "components/modal/ModalRequeriment"
type Managment = inferProcedureOutput<AppRouter["managment"]["get"]>;

export default function Managment () {

	const router = useRouter()
	const { id } = router.query

	const { data: managment, isLoading, refetch: reloadManagment } = trpc.managment.get.useQuery({
		contactId: parseInt(id as string),
	}, {
		refetchOnWindowFocus: false,
	})

	const { isOpen: managmentModalIsOpen,
		onClose: closeManagmentModal,
		onOpen: openModalService } = useDisclosure()

	return (
		<AdminLayout>
			<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
				<SimpleGrid
					mb='20px'
					columns={1}
					spacing={{ base: "20px", xl: "20px" }}
				>
					<Portal>
						<ModalRequeriment
							contactId={parseInt(id as string)}
							isOpen={managmentModalIsOpen} onClose={() => {
								reloadManagment()
								closeManagmentModal()
							}} />
					</Portal>
					{(isLoading) ? <Spinner /> :
						<>
							<h1>Nombre Completo : {managment?.detailContact?.fullName}</h1>
							<h1>Empresa o entorno: {managment?.detailContact?.bussiness}</h1>
							<Button
								onClick={() => {
									openModalService()
								}}
								width={"200px"}>Agregar Servicio</Button>
							{
								(managment?.managment?.length) && (
									<ManagmentTable
										columnsData={developmentColumn}
										tableData={managment?.managment as any}
										reloadContact={reloadManagment}
									/>
								)
							}
						</>
					}
				</SimpleGrid>
			</Box>
		</AdminLayout>
	)
}
