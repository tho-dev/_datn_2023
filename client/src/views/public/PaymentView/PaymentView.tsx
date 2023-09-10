import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup, Text } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import PaySummary from "./components/PaySummary";
import ProductPay from "./components/ProductPay";
import Atstore from "./components/Atstore";
import ShipProduct from "./components/ShipProduct";

type Props = {};

const Payment = (props: Props) => {
	const [value, setValue] = React.useState("1");
	return (
		<HelmetProvider>
			<Helmet>
				<title>ThinkPro | Thanh toán</title>
			</Helmet>
			<Heading pt={"4"} fontSize={"20px"}>
				Thanh Toán
			</Heading>
			<Box display="flex" flexDirection={{ base: "column", md: "row" }} my={"5"} w={"full"}>
				<Box backgroundColor={"white"} borderRadius={"md"} p={"24px"} mr={"5"} w={{ md: "80%", base: "full" }}>
					<Text fontSize={"20px"} fontWeight={600} as={"h3"}>
						Phương Thức Nhận Hàng
					</Text>
					<Box py={"16px"} borderBottom={"1px solid #E6E8EA"}>
						<RadioGroup onChange={setValue} value={value}>
							<Stack direction="row" gap={"24px"}>
								<Radio value="1">Tại cửa Hàng</Radio>
								<Radio value="2">Giao Tận nơi</Radio>
							</Stack>
						</RadioGroup>
					</Box>
					<Box>{value == "1" ? <Atstore /> : <ShipProduct />}</Box>
				</Box>
				<Box w={{ md: "40%", base: "full" }} h={"full"}>
					<Box backgroundColor={"white"} borderRadius={"md"} py={"5"} px={"5"}>
						<PaySummary />
					</Box>
					<Box backgroundColor={"white"} borderRadius={"md"} py={"5"} px={"5"} mt={"16px"}>
						<ProductPay />
					</Box>
				</Box>
			</Box>
		</HelmetProvider>
	);
};

export default Payment;
