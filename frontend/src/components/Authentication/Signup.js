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

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [pic, setPic] = useState("");
	const [show, setShow] = useState(false);
	const [confirmShow, setConfirmShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	const postDeatils = (pics) => {
		setLoading(true);
		if (pics === undefined) {
			toast({
				title: "Please select an image!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}
		if (pics.type === "image/jpeg" || pics.type === "image/png") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "chat-app");
			data.append("cloud_name", "dv5vnwpfz");
			fetch("https://api.cloudinary.com/v1_1/dv5vnwpfz/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
					console.log(data.url.toString());
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
				});
		} else {
			toast({
				title: "Please select an image!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		if (!name || !email || !password || !confirmPassword) {
			toast({
				title: "Please fill all the feilds!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			toast({
				title: "Passwords do not match!",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}

		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const { data } = await axios.post(
				"http://localhost:5000/api/user",
				{ name, email, password, pic },
				config
			);
			toast({
				title: "Registration successful!",
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
				<FormLabel>Name</FormLabel>
				<Input
					value={name}
					placeholder="Enter your name"
					onChange={(e) => {
						setName(e.target.value);
					}}
				></Input>
			</FormControl>

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

			<FormControl isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						value={confirmPassword}
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
								<i className="fas fa-eye"></i>
							) : (
								<i className="fas fa-eye-slash"></i>
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
				isLoading={loading}
			>
				Sign Up
			</Button>
		</VStack>
	);
}

export default Signup;
