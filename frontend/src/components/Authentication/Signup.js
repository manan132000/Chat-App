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

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [pic, setPic] = useState("");
	const [show, setShow] = useState(false);
	const [confirmShow, setConfirmShow] = useState(false);

	const postDeatils = () => {};

	const handleSubmit = () => {};

	return (
		<VStack spacing="5px">
			<FormControl isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					placeholder="Enter your name"
					onChange={(e) => {
						setName(e.target.value);
					}}
				></Input>
			</FormControl>

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

			<FormControl isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={confirmShow ? "text" : "password"}
						placeholder="Confirm password"
						onChange={(e) => {
							setConfirmPassword(e.target.value);
						}}
					></Input>
					<InputRightElement w="3.3rem">
						<Button
							bg="white"
							h="1.75rem"
							size="sm"
							onClick={() => {
								setConfirmShow(!confirmShow);
							}}
						>
							{confirmShow ? (
								<i class="fas fa-eye"></i>
							) : (
								<i class="fas fa-eye-slash"></i>
							)}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl>
				<FormLabel>Upload your Picture</FormLabel>
				<Input
					type="file"
					p={1.5}
					accept="image/*"
					onChange={(e) => {
						postDeatils(e.target.files[0]);
					}}
				></Input>
			</FormControl>

			<Button
				colorScheme="blue"
				w="100%"
				style={{ marginTop: 20 }}
				onClick={handleSubmit}
			>
				Sign Up
			</Button>
		</VStack>
	);
}

export default Signup;
