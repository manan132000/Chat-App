import React, { useState } from "react";
import {
	VStack,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Button,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	const handleSubmit = async () => {
		setLoading(true);
		if (!email || !password) {
			toast({
				title: "Please fill all the fields!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}

		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/user/login",
				{
					email,
					password,
				}
			);
			toast({
				title: "You are now logged in!",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);
			navigate("/chats");
		} catch (error) {
			toast({
				title: "Error occured!",
				description: error.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
		}
	};

	return (
		<VStack spacing="5px">
			<FormControl isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					value={email}
					placeholder="Enter your Email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				></Input>
			</FormControl>

			<FormControl isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						value={password}
						type={show ? "text" : "password"}
						placeholder="Enter your password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					></Input>
					<InputRightElement w="3.3rem">
						<Button
							bg="white"
							h="1.75rem"
							size="sm"
							onClick={() => {
								setShow(!show);
							}}
						>
							{show ? (
								<i className="fas fa-eye"></i>
							) : (
								<i className="fas fa-eye-slash"></i>
							)}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				colorScheme="blue"
				w="100%"
				style={{ marginTop: 20 }}
				onClick={handleSubmit}
			>
				Login
			</Button>
			<Button
				variant="solid"
				colorScheme="red"
				w="100%"
				style={{ marginTop: 10 }}
				onClick={() => {
					setEmail("guest@example.com");
					setPassword("123456");
				}}
				isLoading={loading}
			>
				Use Guest User Credentials
			</Button>
		</VStack>
	);
}

export default Login;
