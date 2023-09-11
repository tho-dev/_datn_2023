import { Box, Divider, Heading } from "@chakra-ui/layout";
import React from "react";

type Props = {};

const Variants = (props: Props) => {
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
				Variants
			</Heading>
			<Divider
				mt="3"
				mb="4"
			/>
		</Box>
	);
};

export default Variants;
