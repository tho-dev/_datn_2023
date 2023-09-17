import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Spacer } from "@chakra-ui/react";
import Profine from "./components/Profine";
import Address from "./components/Address";
import Confirmation from "./components/Confirmation";

type Props = {};

const AddUserListManagerView = (props: Props) => {
	return (
		<Tabs variant="unstyled">
			<TabList
				w={"70%"}
				m={"10px auto"}
			>
				<Box
					borderRadius={"100%"}
					h={"44px"}
					borderColor="blue.500"
					border={"2px"}
				>
					<Tab _selected={{ color: "white", bg: "blue.500", borderRadius: "100%" }}>1</Tab>
				</Box>
				<Text
					m={2}
					fontWeight={700}
					fontSize={"20px"}
				>
					Profine
				</Text>
				<Spacer />
				<Box
					borderRadius={"100%"}
					h={"44px"}
					border={"2px"}
				>
					<Tab _selected={{ color: "white", bg: "blue.500", borderRadius: "100%" }}>2</Tab>
				</Box>
				<Text
					m={2}
					fontWeight={700}
					fontSize={"20px"}
				>
					Billing address
				</Text>
				<Spacer />
				<Box
					borderRadius={"100%"}
					h={"44px"}
					border={"2px"}
				>
					<Tab _selected={{ color: "white", bg: "blue.500", borderRadius: "100%" }}>3</Tab>
				</Box>
				<Text
					m={2}
					fontWeight={700}
					fontSize={"20px"}
				>
					Confirmation
				</Text>
			</TabList>
			<TabPanels
				my={10}
				bg="white"
				w={"100%"}
				borderRadius="2xl"
				py={{
					sm: "6",
					lg: "9",
				}}
				px={{
					sm: "10",
					md: "10",
					lg: "28",
					xl: "28",
				}}
			>
				<TabPanel>
					<Profine />
				</TabPanel>
				<TabPanel>
					<Address />
				</TabPanel>
				<TabPanel>
					<Confirmation />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default AddUserListManagerView;
