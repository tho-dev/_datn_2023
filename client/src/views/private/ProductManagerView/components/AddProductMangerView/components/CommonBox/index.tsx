import { Box, Divider, Heading } from "@chakra-ui/layout";
import React from "react";

type Props = {
	title: string | React.ReactNode;
	children?: React.ReactNode;
};

const CommonBox = ({ title, children }: Props) => {
	return (
		<Box
			py="8"
			px="6"
			rounded="lg"
			borderWidth="1px"
			borderColor="#eef1f6"
			boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
		>
			<Heading
				fontSize="sm"
				fontWeight="bold"
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
