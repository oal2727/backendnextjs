import {
	Button, Checkbox, Flex, Modal, ModalBody, FormControl, FormLabel, Input, FormErrorMessage, Select, useToast,
	ModalCloseButton, ModalContent, ModalFooter, InputGroup, InputRightAddon, useColorModeValue, Textarea, GridItem, ModalHeader, ModalOverlay, ModalProps, SimpleGrid,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceSchemaCreate, IService } from "schemas/serviceSchema"
import { useForm } from "react-hook-form"
import { trpc } from "utils/trpc"

const ModalRequeriment = ({ ...props }: any) => {
	const { onClose, reloadManagment, contactId } = props

	const toast = useToast()

	const { register, reset, handleSubmit, watch, getValues, setValue, formState: { errors, isSubmitting } } = useForm<IService>({
		resolver: zodResolver(serviceSchemaCreate),
	})
	const textColor = useColorModeValue("gray.900", "gray.200")

	const { mutateAsync: registerService, isLoading: isUpdatingEvent } = trpc.managment.save.useMutation()

	const submitService = async(data: any) => {
		data.contactId = contactId
		registerService(data)
			.then(() => {
				toast({
					title: "Servicio agregado",
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
			<ModalHeader>Registro del Servicio</ModalHeader>
			<ModalCloseButton onClick={props.onClose} />
			<ModalBody as={Flex} gap={2} flexDirection='column'>
				<form onSubmit={handleSubmit(submitService)} id="addForm">
					<SimpleGrid columns={{ base: 1, md: 2 }} gap={3} w={"100%"}>
						<FormControl isInvalid={!!errors.theme} w={"100%"}>
							<FormLabel lineHeight={1}>Actividad descripción</FormLabel>
							<Input color={textColor} type="text" {...register("theme")} />
							<FormErrorMessage mt={1} mb={0}>{errors.theme?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={!!errors.dateRequest} w={"100%"}>
							<FormLabel lineHeight={1}>Fecha de Solicitud</FormLabel>
							<Input color={textColor} type="datetime-local" {...register("dateRequest")} />
							<FormErrorMessage mt={1} mb={0}>{errors.dateRequest?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={!!errors.timeHourEstimation} w={"100%"}>
							<FormLabel lineHeight={1}>Hora Estimada</FormLabel>
							<InputGroup >
								<Input
									color={textColor}
									type="text"
									{...register("timeHourEstimation", { valueAsNumber: true })}
								/>
								<InputRightAddon>horas</InputRightAddon>
							</InputGroup>
							<FormErrorMessage mt={1} mb={0}>{errors.timeHourEstimation?.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={!!errors.timeMinuteEstimation} w={"100%"}>
							<FormLabel lineHeight={1}>Minuto Estimada</FormLabel>
							<InputGroup>
								<Input
									color={textColor}
									type="text"
									{...register("timeMinuteEstimation", { valueAsNumber: true })}
								/>
								<InputRightAddon>minutos</InputRightAddon>
							</InputGroup>
							<FormErrorMessage mt={1} mb={0}>{errors.timeMinuteEstimation?.message}</FormErrorMessage>
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
					w={{ base: "100%" }}>Agregar Requerimiento</Button>
				<Button onClick={props.onClose}
					type="submit"
					w={{ base: "100%" }}>Cerrar</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>)

}

export default ModalRequeriment