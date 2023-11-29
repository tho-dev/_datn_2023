import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import Metrics from "./components/Metrics";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import TopSale from "./components/TopSale";
import Revenue from "./components/Revenue";
import TopCustomer from "./components/TopCustomer";
import TopProduct from "./components/TopProduct";
import TopCategory from "./components/TopCategory";

const DashboardView = () => {
	return (
		<Box
			w="full"
			h="full"
		>
			<Flex
				gap="6"
				h="320px"
			>
				<Box
					flex="1"
					px="10"
					py="8"
					h="320px"
					maxH="full"
					rounded="2xl"
					display="flex"
					flexDir="column"
					justifyContent="center"
					alignItems="flex-start"
					bgColor="#0bcbe01a"
					gap="2"
				>
					<Heading
						fontSize="xl"
						color="rgb(11 203 224)"
						fontWeight="semibold"
					>
						Hi, Welcome back 👋
					</Heading>
					<Text
						fontSize="md"
						color="rgb(11 203 224)"
						fontWeight="medium"
					>
						Polytech - Laptop, Phím cơ, Bàn nâng hạ, Ghế công thái học, PS5, Nintendo - Dịch vụ Tận tâm
					</Text>
				</Box>

				<Box
					w="500px"
					px="8"
					py="6"
					maxH="full"
					rounded="2xl"
					bgColor="#0bcbe01a"
				></Box>
			</Flex>
			{/* <Metrics /> */}

			{/* <Box
				bgColor="bg.white"
				my="6"
				p="6"
			>
				<Flex gap="6">
					<Revenue></Revenue>
					<TopSale title="Top sales location " />
				</Flex>

				<Flex gap="6">
					<TopCustomer title="Top customers" />
					<TopProduct title="Top Product" />
					<TopCategory title="Top Category" />
				</Flex>
			</Box> */}
		</Box>
	);
};

export default DashboardView;
