import {
	Flex,
	Table,
	Portal,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Icon,
	Badge,
	useDisclosure,
	Tfoot,
	Button,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import React, { useMemo, useEffect, useState } from "react"
import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	Column,
	useTable,
} from "react-table"
import { FaEye, FaCheckCircle, FaLaptopCode, FaInfoCircle } from "react-icons/fa"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
// Custom components
import Card from "components/card/Card"
import Menu from "components/menu/MainMenu"
import { inferProcedureOutput } from "@trpc/server"
import { AppRouter } from "server/routers/_app"
import { trpc } from "utils/trpc"
import ModalDetailContact from "components/modal/ModalDetailContact"
import { useRouter } from "next/router"
import ModalUpdateRequeriment from "components/modal/ModalUpdateRequeriment"

dayjs.extend(utc)
dayjs.extend(timezone)

type Managment = inferProcedureOutput<AppRouter["managment"]["get"]>;

export type TableProps = {
	columnsData: Column[];
	tableData: any;
	reloadContact: any
};

export default function ManagmentTable(props: TableProps) {
	const { columnsData, tableData, reloadContact } = props
	const router = useRouter()

	const columns = useMemo(() => columnsData, [ columnsData ])
	const data = useMemo(() => tableData, [ tableData ])
	const iconColor = useColorModeValue("secondaryGray.500", "brand.200")
	const tableInstance = useTable(
		{
			columns,
			data,
			initialState: { pageSize: 10, hiddenColumns: [ "id", "paymentStatus" ] },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const [ isMounted, setIsMounted ] = useState(false)
	const { mutateAsync: stateService, isLoading: activatinContact } = trpc.managment.updateState.useMutation()

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		nextPage,
		previousPage,
	} = tableInstance

	const [ selectedContactId, setSelectedContactId ] = useState<any>(null)
	useEffect(() => {
		if (isMounted) return
		setIsMounted(true)
	}, [ isMounted ])

	const textColor = useColorModeValue("secondaryGray.900", "white")
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.100")
	const { isOpen: serviceModal, onClose: closeServiceModal, onOpen: openModal } = useDisclosure()

	if (!isMounted) return <></>

	return (
		<Card
			flexDirection='column'
			w='100%'
			px='0px'
			overflowX={{ sm: "scroll", lg: "hidden" }}>
			<Portal>
				<ModalUpdateRequeriment isOpen={serviceModal} onClose={() => {
					setSelectedContactId(null)
					reloadContact()
					closeServiceModal()
				}}
				contactId={selectedContactId}
				 />

			</Portal>
			<Flex px='25px' justify='space-between' mb='20px' align='center'>
				<Text
					color={textColor}
					fontSize='22px'
					fontWeight='700'
					lineHeight='100%'>
           Registros de Servicios
				</Text>
			</Flex>
			<Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
				<Thead>
					{headerGroups.map((headerGroup, index) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<Th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									pe='10px'
									key={index}
									borderColor={borderColor}>
									<Flex
										justify='space-between'
										align='center'
										fontSize={{ sm: "10px", lg: "12px" }}
										color='gray.400'>
										{column.render("Header")}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row, index) => {
						prepareRow(row)
						return (
							<Tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => {
									let cellContent: JSX.Element
									if (cell.column.id === "actions") {
										cellContent = <>
											{
												!row.values.paymentStatus ?
													<Button
														onClick={() => {
															stateService({
																managmentId: row.values.id,
															}).finally(() => {
																reloadContact()
															})
														}}
														variant='ghost'
														colorScheme='blue'
														size='sm'
													>
														<Icon as={FaCheckCircle} width='20px' height='20px' color='inherit' />
													</Button>
													: null
											}
											<Button
												onClick={() => {
													openModal()
													setSelectedContactId(row.values.id)
												}}
												variant='ghost'
												colorScheme='blue'
												size='sm'
											>
												<Icon as={FaInfoCircle} width='20px' height='20px' color='inherit' />
											</Button>
										</>
									}
									else if (cell.value instanceof Date) {
										cellContent = <Text color={textColor} fontSize='sm' fontWeight='700'>
											{dayjs(cell.value).tz("America/Lima").format("DD/MM/YYYY HH:mm")}
										</Text>
									}
									else if (cell.column.Header == "Estado de Pago") {
										cellContent = <Badge variant='solid' colorScheme={row.values.paymentStatus ? "green" : "red"}>
											{cell.value}
										</Badge>
									}
									else {
										cellContent = <Text color={textColor} fontSize='sm' fontWeight='700'>
											{cell.value}
										</Text>
									}
									return (
										<Td
											{...cell.getCellProps()}
											key={index}
											fontSize={{ sm: "14px" }}
											minW={{ sm: "150px", md: "200px", lg: "auto" }}
											borderColor='transparent'
										>
											{cellContent}
										</Td>
									)
								})}
							</Tr>
						)
					})}
				</Tbody>
				<Tfoot>
					<Tr>
						<Td colSpan={10000}>
							<Flex justify='flex-end' align='center' color={iconColor}>
								<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
									{"<"}
								</Button>
								<Text fontSize='sm' mx={5}>
                                    Página{" "}
									<strong>
										{tableInstance.state.pageIndex + 1} de{" "}
										{tableInstance.pageOptions.length}
									</strong>{" "}
								</Text>
								<Button onClick={() => nextPage()} disabled={!canNextPage}>
									{">"}
								</Button>
							</Flex>
						</Td>
					</Tr>
				</Tfoot>
			</Table>
		</Card>
	)
}