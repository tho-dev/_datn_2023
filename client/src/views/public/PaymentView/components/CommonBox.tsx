import { Box, Divider, Heading } from "@chakra-ui/layout";
import React from "react";

type Props = {
	title: string | React.ReactNode;
	children?: React.ReactNode;
};

const CommonBox = ({ title, children }: Props) => {
	return (
		<Box
			px="6"
			py="8"
			rounded="xl"
			borderWidth="1px"
			borderColor="#eef1f6"
			boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
			position="relative"
		>
			<Heading
				display="inline-block"
				fontSize="15px"
				fontWeight="bold"
				position="absolute"
				left="6"
				top="-2"
				bgColor="bg.white"
			>
				{title}
			</Heading>

			{children}
		</Box>
	);
};

export default CommonBox;
