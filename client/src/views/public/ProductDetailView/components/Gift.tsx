import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";
import { GiftIcon } from "~/components/common/Icons";

type Props = {};

const Gift = (props: Props) => {
	return (
		<Box
			bgColor={"bg.white"}
			rounded={"6px"}
			p="6"
			mt="4"
		>
			<Flex alignItems={"center"}>
				<GiftIcon size={18} />
				<Text
					fontSize={"16px"}
					fontWeight={600}
					pl={"2"}
				>
					Quà tặng miễn phí
				</Text>
			</Flex>
			<Box
				fontSize={"12px"}
				pl={"9"}
				py={"2"}
			>
				<ul>
					<li>Chuột E-DRA EM604W 149.000đ</li>
				</ul>
			</Box>
		</Box>
	);
};

export default Gift;
