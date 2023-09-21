// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import FixedPlugin from "components/fixedPlugin/FixedPlugin"
// Assets
import { ReactNode } from "react"

function AuthIllustration(props: { children: ReactNode; illustrationBackground?: string }) {
	const authBg = useColorModeValue("white", "gray.800")
	const { children, illustrationBackground } = props
	// Chakra color mode
	return (
		<Flex bg={authBg} position='relative' h='max-content'>
			<Flex
				h='100vh'
				w='100%'
				maxW={{ md: "66%", lg: "1313px" }}
				mx='auto'
				pt={{ sm: "50px", md: "0px" }}
				px={{ lg: "30px", xl: "0px" }}
				ps={{ xl: "70px" }}
				justifyContent='center'
				alignItems={"center"}
				direction='column'>
				{children}
				{illustrationBackground && <Box
					display={{ base: "none", md: "block" }}
					h='100%'
					minH='100vh'
					w={{ "lg": "50vw", "2xl": "44vw" }}
					position='absolute'
					right='0px'>
					<Flex
						style={{ backgroundImage: `url(${illustrationBackground})` }}
						justify='center'
						align='end'
						w='100%'
						h='100%'
						bgSize='cover'
						bgPosition='50%'
						position='absolute'
						borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}
					/>
				</Box>}
			</Flex>
			<FixedPlugin />
		</Flex>
	)
}

export default AuthIllustration
