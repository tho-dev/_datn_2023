import React from "react";

import { Grid, GridItem, Flex, Box, Center, Text, Heading } from "@chakra-ui/layout";
import MetricItem from "./MetricItem";
import { CheckIcon, MoneyIcon, NewIcon, UserIcon } from "~/components/common/Icons";

type Props = {};

const Metrics = (props: Props) => {
	return (
		<Grid
			mt="4"
			px="5"
			py="6"
			gap="2"
			bgColor="bg.white"
			rounded="md"
			templateColumns={{
				sm: "repeat(3, 1fr)",
				md: "repeat(5, 1fr)",
			}}
			textTransform="uppercase"
		>
			<MetricItem color="blue" icon={<CheckIcon color="blue.400"/>} heading={"200"} text={"Đơn hàng mới"}/>
			<MetricItem color="yellow" icon={<UserIcon color="yellow.400"/>} heading={"30"} text={"Khách hàng mới"}/>
			<MetricItem color="green" icon={<MoneyIcon color="green.400"/>} heading={"200.000$"} text={"Doanh thu"}/>
			<MetricItem color="purple" icon={<NewIcon color="purple.400"/>} heading={"200"} text={"Sản phẩm mới"}/>
			<MetricItem color="red" icon={<NewIcon color="red.400"/>} heading={"200"} text={"Sản phẩm mới"}/>
		</Grid>
	);
};

export default Metrics;
