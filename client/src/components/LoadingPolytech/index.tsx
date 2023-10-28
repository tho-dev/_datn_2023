import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import React from "react";

type Props = {};

const LoadingPolytech = (props: Props) => {
	return (
		<Flex
			position="fixed"
			top="0"
			left="0"
			right="0"
			w="100vw"
			h="100vh"
			maxH="full"
			maxW="full"
			alignItems="center"
			justifyContent="center"
			bgColor="bg.white"
			zIndex="999"
		>
			<Spinner
				size="xl"
				color="bg.blue"
				thickness="4px"
			/>
		</Flex>
	);
};

export default LoadingPolytech;
