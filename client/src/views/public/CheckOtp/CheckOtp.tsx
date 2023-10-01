import { Box, Flex, HStack, Heading, Stack } from "@chakra-ui/layout";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	PinInput,
	PinInputField,
	Radio,
	RadioGroup,
	Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { data } from "~/views/private/DashboardView/components/TopCategory";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { otpSchema } from "~/validate/payment";
type Props = {};

const CheckOtp = (props: Props) => {
	const [value, setValue] = React.useState("");
	const { register, handleSubmit } = useForm({});
	const submitForm = () => {
		console.log("value_", value);
	};
	return (
		<HelmetProvider>
			<Helmet>
				<title>ThinkPro | Check</title>
			</Helmet>
			<Heading pt={"4"} fontSize={"20px"}>
				Check OTP
			</Heading>
			<form onSubmit={handleSubmit(submitForm)}>
				<Box my={"5"} w={"full"}>
					<Box
						backgroundColor={"white"}
						borderRadius={"md"}
						p={"24px"}
						mr={"5"}
						w={{ md: "80%", base: "full" }}
					>
						<Text fontSize={"20px"} fontWeight={600} as={"h3"}>
							Check OTP
						</Text>
						<FormControl>
							<HStack>
								<PinInput onChange={(value) => setValue(value)}>
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
								</PinInput>
							</HStack>
							<FormErrorMessage>{value.length === 0 ? "Mời bạn nhập mã OTP" : ""}</FormErrorMessage>
						</FormControl>
						<Button bg={"green.400"} mt={"16px"} type="submit">
							Xác nhận
						</Button>
					</Box>
				</Box>
			</form>
		</HelmetProvider>
	);
};

export default CheckOtp;
