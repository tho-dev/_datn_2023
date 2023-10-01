import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Radio, RadioGroup, Text } from "@chakra-ui/react";
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
	const [value, setValue] = React.useState("1");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(otpSchema),
	});
	const submitForm = (data: any) => {
		console.log("value_", data);
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
						<FormControl isInvalid={errors.otp as any}>
							<Input
								type="text"
								border={"none"}
								p={"8px 12px"}
								placeholder="Nhập mã OTP"
								bg={"#F6F9FC"}
								borderRadius={"6px"}
								fontSize={"14px"}
								{...register("otp")}
							/>
							<FormErrorMessage> {(errors.otp as any) && (errors?.otp?.message as any)}</FormErrorMessage>
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
