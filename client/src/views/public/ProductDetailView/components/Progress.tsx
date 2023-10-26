import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Progress as ChakraProgress, Text } from "@chakra-ui/react";

type Props = {
	rate: number;
	title: string;
};

const Progress = ({ rate, title }: Props) => {
	return (
		<Box mr={"2"}>
			<Flex
				justifyContent={"space-between"}
				py={"2"}
			>
				<Text
					as={"p"}
					fontSize={"12px"}
					lineHeight={"12px"}
					fontWeight="semibold"
				>
					{title}
				</Text>
				<Text
					as={"p"}
					fontSize={"12px"}
					lineHeight={"12px"}
				>
					{rate} / 10
				</Text>
			</Flex>
			<ChakraProgress
				value={rate * 10}
				colorScheme={rate < 4 ? "red" : rate >= 8 ? "green" : "yellow"}
				size="xs"
				borderRadius={"6px"}
			/>
		</Box>
	);
};

export default Progress;
