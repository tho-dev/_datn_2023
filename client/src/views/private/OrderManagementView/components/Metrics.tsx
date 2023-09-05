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
				sm: "repeat(1, 1fr)",
				md: "repeat(2, 1fr)",
			}}
			textTransform="uppercase"
		>
			<MetricItem icon={<CheckIcon color="white"/>} heading={"200"} text={"Đơn hàng mới"}/>
			<MetricItem icon={<UserIcon color="white"/>} heading={"30"} text={"Khách hàng mới"}/>
			<MetricItem icon={<MoneyIcon color="white"/>} heading={"200.000$"} text={"Doanh thu"}/>
			<MetricItem icon={<NewIcon color="white"/>} heading={"200"} text={"Sản phẩm mới"}/>
		</Grid>
	);
};

export default Metrics;
