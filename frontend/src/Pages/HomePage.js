import React from "react";
import {
	Container,
	Box,
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function HomePage() {
	return (
		<Container maxW="xl" centerContent>
			<Box
				d="flex"
				justifyContent="center"
				p={3}
				bg="white"
				w="100%"
				m="40px 0 15px 0"
				borderRadius="lg"
				borderWidth="1px"
			>
				<Text
					fontSize="4xl"
					fontFamily="Work Sans"
					color="black"
					width="fit-content"
					margin="auto"
				>
					Talk-a-tive
				</Text>
			</Box>
			<Box p={3} bg="white" w="100%" borderRadius="lg" borderWidth="1px">
				<Tabs variant="soft-rounded">
					<TabList mb="1em">
						<Tab w="50%">Login</Tab>
						<Tab w="50%">Sign Up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
}

export default HomePage;
