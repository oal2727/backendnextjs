import {
	Button, Checkbox, Flex, Modal, ModalBody, FormControl, FormLabel, Input, FormErrorMessage, Select, useToast,
	ModalCloseButton, ModalContent, ModalFooter, InputGroup, InputRightAddon, useColorModeValue, Textarea, GridItem, ModalHeader, ModalOverlay, ModalProps, SimpleGrid,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceSchemaUpdate, IServiceUpdate } from "schemas/serviceSchema"
import { useForm } from "react-hook-form"
import { trpc } from "utils/trpc"

const ModalUpdateRequeriment = ({ ...props }: any) => {
	const { onClose, reloadManagment, contactId } = props

	const toast = useToast()

	const { register, reset, handleSubmit, watch, getValues, setValue, formState: { errors, isSubmitting } } = useForm<IServiceUpdate>({
		resolver: zodResolver(serviceSchemaUpdate),
	})
	const textColor = useColorModeValue("gray.900", "gray.200")

	const { data: serviceData, isLoading: isLoadingEvent } = trpc.managment.show.useQuery({ serviceId: contactId! }, {
		refetchOnWindowFocus: false,
	})

	const { mutateAsync: updateService, isLoading: isUpdatingEvent } = trpc.managment.update.useMutation()

	useEffect(() => {
		if (serviceData && contactId) {
			const timeHourToogle = serviceData.timeHourToogle !== null ? serviceData.timeHourToogle : 0
			const timeMinuteToogle = serviceData.timeMinuteToogle !== null ? serviceData.timeMinuteToogle : 0
			setValue("id", serviceData.id)
			setValue("contactId", contactId)
			setValue("observation", serviceData.observation)
			setValue("timeHourToogle", timeHourToogle)
			setValue("timeMinuteToogle", timeMinuteToogle)
		}
		return () => {
			reset()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ serviceData ])

	const submitService = async(data: any) => {
		updateService(data)
			.then(() => {
				toast({
					title: "Servicio actualizado",
					description: "El servicio se actualizó correctamente",
					status: "success",
					duration: 5000,
					isClosable: true,
				})
				reset()
				props.onClose()
			})
			.catch((err) => {

			})
	}

	return (<Modal
		blockScrollOnMount={true}
		size={"3xl"}
		isCentered={false}
		motionPreset='slideInBottom'
		{...props}
	>
		<ModalOverlay />
		<ModalContent mx={{ base: 1, md: 0 }}>
			<ModalHeader>Actualizar del Servicio</ModalHeader>
			<ModalCloseButton onClick={props.onClose} />
			<ModalBody as={Flex} gap={2} flexDirection='column'>
				<form onSubmit={handleSubmit(submitService)} id="addForm">
					<SimpleGrid columns={{ base: 1, md: 2 }} gap={3} w={"100%"}>
						<FormControl isInvalid={!!errors.dateInitialize} w={"100%"}>
							<FormLabel lineHeight={1}>Fecha Inicio</FormLabel>
							<Input
								color={textColor}
								type="datetime-local"
								{...register("dateInitialize")}
							/>
							<FormErrorMessage mt={1} mb={0}>{errors.dateInitialize?.message}</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={!!errors.timeHourToogle} w={"100%"}>
							<FormLabel lineHeight={1}>Hora Estmiada Toogle</FormLabel>
							<InputGroup>
								<Input
									color={textColor}
									type="text"
									{...register("timeHourToogle", { valueAsNumber: true })}
								/>
								<InputRightAddon>horas</InputRightAddon>
							</InputGroup>
							<FormErrorMessage mt={1} mb={0}>{errors.timeHourToogle?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={!!errors.timeMinuteToogle} w={"100%"}>
							<FormLabel lineHeight={1}>Minuto Estimada Toogle</FormLabel>
							<InputGroup>
								<Input
									color={textColor}
									type="text"
									{...register("timeMinuteToogle", { valueAsNumber: true })}
								/>
								<InputRightAddon>minutos</InputRightAddon>
							</InputGroup>
							<FormErrorMessage mt={1} mb={0}>{errors.timeMinuteToogle?.message}</FormErrorMessage>
						</FormControl>
						<FormControl
							isInvalid={!!errors.observation} w={"100%"}>
							<FormLabel lineHeight={1}>Observación</FormLabel>
							<Textarea color={textColor}
								placeholder="Descripción del Evento"
								{...register("observation")} />
							<FormErrorMessage mt={1} mb={0}>{errors.observation?.message}</FormErrorMessage>
						</FormControl>

				    </SimpleGrid>
				</form>
			</ModalBody>
			<ModalFooter display={"flex"} gap={2} >
				<Button type="submit" form="addForm"
					w={{ base: "100%" }}>Actualizar Requerimiento</Button>
				<Button
					onClick={props.onClose}
					type="submit"
					w={{ base: "100%" }}>Cerrar</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>)

}

export default ModalUpdateRequeriment