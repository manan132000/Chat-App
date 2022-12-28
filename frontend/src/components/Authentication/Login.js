import React, { useState } from "react";
import {
	VStack,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Button,
} from "@chakra-ui/react";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);

	const postDeatils = () => {};

	const handleSubmit = () => {};

	return (
		<VStack spacing="5px">
			<FormControl isRequired>
				<FormLabel>Email</FormLabel>
				<Input
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
								<i class="fas fa-eye"></i>
							) : (
								<i class="fas fa-eye-slash"></i>
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
			>
				Use Guest User Credentials
			</Button>
		</VStack>
	);
}

export default Login;
