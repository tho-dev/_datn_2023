import React from "react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Input, Flex, Text } from "@chakra-ui/react";
type Props = {};

const Atstore = (props: Props) => {
	return (
		<Box mt={"12px"}>
			<Text mb={"16px"} fontSize={"16px"} lineHeight={"150%"} fontWeight={600}>
				Thông tin người nhận
			</Text>
			<Flex gap={"16px"}>
				<FormControl>
					<FormLabel>Tên người nhận</FormLabel>
					<Input
						type="text"
						border={"none"}
						p={"8px 12px"}
						placeholder="Nhập họ và tên"
						bg={"#F6F9FC"}
						borderRadius={"6px"}
						fontSize={"14px"}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Số điện thoại</FormLabel>
					<Input
						type="text"
						border={"none"}
						p={"8px 12px"}
						placeholder="Nhập số điện thoại"
						bg={"#F6F9FC"}
						borderRadius={"6px"}
						fontSize={"14px"}
					/>
				</FormControl>
			</Flex>
		</Box>
	);
};

export default Atstore;
