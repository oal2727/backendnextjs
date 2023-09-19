import React,{useState,useCallback} from 'react';
// Chakra imports
import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import { useForm } from "react-hook-form"
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import { ILogin, loginSchema } from "schemas/loginSchema"

export default function SignIn() {
	// Chakra color mode

	const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
		resolver: zodResolver(loginSchema),
	})
	const router = useRouter()
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorSecondary = 'gray.400';
	const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	const brandStars = useColorModeValue('brand.500', 'brand.400');
	const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
	const googleText = useColorModeValue('navy.700', 'white');
	const googleHover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.300' });
	const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' });
	const [ show, setShow ] = React.useState(false);
	const handleClick = () => setShow(!show);

	const [form,setForm]=useState({
		email:"",
		password:""
	})
	const handleChange =(e)=>{
		setForm({...form,[e.target.name]:e.target.value})
	}
	const onSubmit= useCallback(async (data:ILogin) => {
		const result = await signIn("credentials", { ...data, redirect: false })
		if (result?.ok) {
			console.log("well")
			await router.push((router.query.callbackUrl as string) ?? "/admin")
		}
		else if (result?.error) {
			console.log("error de session")
		}
	}, [])

	return (
		<DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
			<Flex
				maxW={{ base: '100%', md: 'max-content' }}
				w='100%'
				mx={{ base: 'auto', lg: '0px' }}
				me='auto'
				h='100%'
				alignItems='start'
				justifyContent='center'
				mb={{ base: '30px', md: '60px' }}
				px={{ base: '25px', md: '0px' }}
				mt={{ base: '40px', md: '14vh' }}
				flexDirection='column'>
				<Box me='auto'>
					<Heading color={textColor} fontSize='36px' mb='10px'>
						Log In
					</Heading>
				</Box>
				<Flex
					zIndex='2'
					direction='column'
					w={{ base: '100%', md: '420px' }}
					maxW='100%'
					background='transparent'
					borderRadius='15px'
					mx={{ base: 'auto', lg: 'unset' }}
					me='auto'
					mb={{ base: '20px', md: 'auto' }}>
					<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl>
						<FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
							Email<Text color={brandStars}>*</Text>
						</FormLabel>
						<Input
							{...register("email")}
							isRequired={true}
							variant='auth'
							onChange={handleChange}
							fontSize='sm'
							ms={{ base: '0px', md: '0px' }}
							type='email'
							name="email"
							placeholder='mail@simmmple.com'
							mb='24px'
							fontWeight='500'
							size='lg'
						/>
						<FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} display='flex'>
							Password<Text color={brandStars}>*</Text>
						</FormLabel>
						<InputGroup size='md'>
							<Input
								isRequired={true}
								{...register("password")}
								fontSize='sm'
								onChange={handleChange}
								placeholder='Min. 8 characters'
								mb='24px'
								name="password"
								size='lg'
								type={show ? 'text' : 'password'}
								variant='auth'
							/>
							<InputRightElement display='flex' alignItems='center' mt='4px'>
								<Icon
									color={textColorSecondary}
									_hover={{ cursor: 'pointer' }}
									as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
									onClick={handleClick}
								/>
							</InputRightElement>
						</InputGroup>
						<Button fontSize='sm' variant='brand' 
						type="submit"
						fontWeight='500' w='100%' h='50' mb='24px'>
							Log In
						</Button>
					</FormControl>
					</form>
				</Flex>
			</Flex>
		</DefaultAuthLayout>
	);
}
