import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Text } from "@chakra-ui/react";
import MarqueeReact from "./Marquee";
type Props = {};

const Introduce = (props: Props) => {
	return (
		<Box backgroundColor={"white"} borderRadius={"6px"} py={5} px={5} my={"5"}>
			<Flex alignItems={"center"} mb={"2"}>
				<Text as={"h5"} fontSize={"20px"} fontWeight={600}>
					ThinkPro
				</Text>
				<Text as={"p"} fontSize={"16px"} color={"#6B7075"} fontWeight={600} pl={"12px"}>
					Là nơi để bạn và người thân tin tưởng lựa chọn
				</Text>
			</Flex>
			<MarqueeReact />
		</Box>
	);
};

export default Introduce;
