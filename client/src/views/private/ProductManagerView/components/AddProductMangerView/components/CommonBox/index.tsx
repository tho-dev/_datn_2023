import { Box, Divider, Heading } from "@chakra-ui/layout";
import React from "react";

type Props = {
	title: string | React.ReactNode;
	children?: React.ReactNode;
};

const CommonBox = ({ title, children }: Props) => {
	return (
		<Box
			bgColor="bg.white"
			px="8"
			py="6"
			rounded="xl"
		>
			<Heading
				fontSize="lg"
				fontWeight="semibold"
			>
				{title}
			</Heading>
			<Divider
				mt="3"
				mb="4"
			/>
			{children}
		</Box>
	);
};

export default CommonBox;
