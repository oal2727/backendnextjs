import {
	Button, Checkbox, Flex, Modal, ModalBody,
	ModalCloseButton, ModalContent, ModalFooter, Image, Textarea, GridItem, ModalHeader, ModalOverlay, ModalProps, SimpleGrid,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const ModalDetailContact = ({ ...props }: any) => {
	const { item, onClose } = props

	return (<Modal
		blockScrollOnMount={true}
		size={"3xl"}
		isCentered={false}
		motionPreset='slideInBottom'
		{...props}
	>
		<ModalOverlay />
		<ModalContent mx={{ base: 1, md: 0 }}>
			<ModalHeader>Detalle del Contacto</ModalHeader>
			<ModalCloseButton onClick={props.onClose} />
			<ModalBody as={Flex} gap={2} flexDirection='column'>
				<SimpleGrid columns={1}
					gap={3} w={"100%"}>
					<h1><strong>Tema</strong> :{item?.theme}</h1>
					<h1>Nombre y Apellido : {item?.fullName}</h1>
					<h1>Asunto</h1>
					<p>{item?.subject}</p>
				</SimpleGrid>
			</ModalBody>
			<ModalFooter display={"flex"} gap={2} >
				<Button
					onClick={props.onClose}
					type="submit" form="updateForm"
					w={{ base: "100%", md: 40 }}>Cerrar</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>)

}

export default ModalDetailContact