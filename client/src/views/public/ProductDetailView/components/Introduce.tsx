import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Text } from "@chakra-ui/react";
import MarqueeReact from "./Marquee";
type Props = {};

const Introduce = (props: Props) => {
	return (
		<Box
			backgroundColor={"bg.white"}
			rounded={"6px"}
			my={"5"}
			p="6"
		>
			<Flex
				alignItems={"center"}
				mb={"2"}
			>
				<Text
					as={"h5"}
					fontSize={"lg"}
					fontWeight={600}
				>
					ThinkPro
				</Text>
				<Text
					as={"p"}
					fontSize={"16px"}
					color={"#6B7075"}
					fontWeight={600}
					pl={"12px"}
				>
					Là nơi để bạn và người thân tin tưởng lựa chọn
				</Text>
			</Flex>
			<MarqueeReact />
		</Box>
	);
};

export default Introduce;
