import React, { useState } from "react";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Box,
	Input,
	Flex,
	Text,
	Button,
} from "@chakra-ui/react";
import Transport from "./Transport";

type Props = {
	registerShip: any;
	errors: any;
};

const ShipProduct = ({ registerShip, errors }: Props) => {
	const [district, setDistrict] = useState<string>("");
	const addres = (value: string) => {
		setDistrict(value);
	};
	return (
		<Box mt={"12px"}>
			<Text mb={"16px"} fontSize={"16px"} lineHeight={"150%"} fontWeight={600}>
				Thông tin người nhận
			</Text>

			<Flex gap={"16px"}>
				<FormControl isInvalid={errors.name as any}>
					<FormLabel>Tên người nhận</FormLabel>
					<Input
						type="text"
						border={"none"}
						p={"8px 12px"}
						placeholder="Nhập họ và tên"
						bg={"#F6F9FC"}
						borderRadius={"6px"}
						fontSize={"14px"}
						{...registerShip("name")}
					/>
					<FormErrorMessage> {(errors.name as any) && (errors?.name?.message as any)}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={errors.phone as any}>
					<FormLabel>Số điện thoại</FormLabel>
					<Input
						type="text"
						border={"none"}
						p={"8px 12px"}
						placeholder="Nhập số điện thoại"
						bg={"#F6F9FC"}
						borderRadius={"6px"}
						fontSize={"14px"}
						{...registerShip("phone")}
					/>
					
					<FormErrorMessage> {(errors.phone as any) && (errors?.phone?.message as any)}</FormErrorMessage>
				</FormControl>
			</Flex>
			<Flex gap={"16px"} mt={"16px"}>
				<FormControl isInvalid={errors?.district as any}>
					<FormLabel>Khu Vực</FormLabel>
					<Box display={district!=""?"none":"block"}><Transport addres={addres} /></Box>
					<Input
						type="text"
						border={"none"}
						p={"8px 12px"}
						placeholder="Khu vực"
						bg={"#F6F9FC"}
						borderRadius={"6px"}
						fontSize={"14px"}
						{...registerShip("district")}
						defaultValue={district}
						display={district==""?"none":"block"}
					/>
					<FormErrorMessage>
						{" "}
						{(errors?.district as any) && (errors?.district?.message as any)}
					</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={errors?.address as any}>
					<FormLabel>Địa chỉ nhận hàng</FormLabel>
					<Input
						type="text"
						border={"none"}
						p={"8px 12px"}
						placeholder="Địa chỉ nhận hàng"
						bg={"#F6F9FC"}
						borderRadius={"6px"}
						fontSize={"14px"}
						{...registerShip("address")}
					/>
					<FormErrorMessage>
						{" "}
						{(errors?.address as any) && (errors?.address?.message as any)}
					</FormErrorMessage>
				</FormControl>
			</Flex>
		</Box>
	);
};

export default ShipProduct;
