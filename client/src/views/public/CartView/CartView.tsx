import { Box, Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import ItemCart from "./components/ItemCart";
import OrderSummary from "./components/OrderSummary";

type Props = {};

const CartView = (props: Props) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>ThinkPro | Giỏ hàng của bạn</title>
			</Helmet>
			<Heading
				pt={"4"}
				fontSize={"20px"}
			>
				Giỏ hàng (0)
			</Heading>
			<Box
				display="flex"
				flexDirection={{ base: "column", md: "row" }}
				my={"5"}
				w={"full"}
			>
				<Box
					backgroundColor={"white"}
					borderRadius={"md"}
					py={"5"}
					mr={"5"}
					w={{ md: "80%", base: "full" }}
				>
					<ItemCart />
				</Box>
				<Box
					backgroundColor={"white"}
					borderRadius={"md"}
					py={"5"}
					px={"5"}
					w={{ md: "40%", base: "full" }}
					h={"full"}
				>
					<OrderSummary />
				</Box>
			</Box>
		</HelmetProvider>
	);
};

export default CartView;
