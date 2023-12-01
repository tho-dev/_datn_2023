import { useForm } from "react-hook-form";

import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { useState } from "react";
import { Image, useToast } from "@chakra-ui/react";
import banner from "~/assets/images/TGDD-540x270-1.png";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Flex } from "@chakra-ui/react";
import { chuyenDoiSoDienThoai } from "~/utils/fc";
import ReCAPTCHA from "react-google-recaptcha";

type Props = {
	setCheckPhone: any;
	handleGetPhoneNumber: (phoneNumber: any) => void;
	setQuery: any;
	loading: boolean;
};

const CheckPhone = ({ setCheckPhone, handleGetPhoneNumber, setQuery, loading }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>();

	const toast = useToast();

	const [checkCaptch, setCheckCaptch] = useState(false);

	const onChange = () => {
		setCheckCaptch(true);
	};

	const onSubmit = async (data: any) => {
		if (!checkCaptch) {
			return toast({
				title: "Hệ thống",
				description: "Bạn chưa xác minh captch",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
		}
		const phone_number = chuyenDoiSoDienThoai(data.phone_number);
		if (!phone_number) {
			return toast({
				title: "Hệ thống",
				description: "Sai định dạng số điện thoại",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
		}
		setQuery({ phone_number: phone_number });
		setCheckPhone(false);
		handleGetPhoneNumber(phone_number);
	};

	return (
		<Box>
			<Grid gridTemplateColumns="repeat(2,1fr)">
				<GridItem colSpan={1}>
					<Box
						w="100%"
						h="full"
						display="flex"
						alignItems="center"
						justifyItems="center"
					>
						<Image
							src={banner}
							alt="Dan Abramov"
							width="100%"
							objectFit="cover"
						/>
					</Box>
				</GridItem>
				<GridItem colSpan={1}>
					<form
						style={{
							width: "100%",
						}}
						onSubmit={handleSubmit(onSubmit)}
					>
						<Flex
							padding="20px"
							height="460px"
							flexDirection="column"
							bgColor="bg.white"
							rounded="2xl"
							alignItems="center"
							justifyContent="center"
						>
							<FormControl
								isInvalid={errors.phone_number as any}
								w="60%"
							>
								<FormLabel
									marginTop="20px"
									fontSize="lg"
									fontWeight="bold"
									textAlign="center"
									textTransform="uppercase"
								>
									Tra cứu thông tin đơn hàng
								</FormLabel>
								<Input
									id="phone_number"
									{...register("phone_number")}
									type="number"
									placeholder="Nhập số điện thoại mua hàng"
									mt="3"
								/>
								<FormHelperText></FormHelperText>
								<FormErrorMessage>
									{(errors.phone_number as any) && (errors?.phone_number?.message as any)}
								</FormErrorMessage>
							</FormControl>
							<Button
								type="submit"
								color="text.textEdit"
								bgColor="bg.bgEdit"
								w="60%"
								loadingText="Đang tìm kiếm đơn hàng..."
								isLoading={!loading}
								rounded="full"
								overflow="hidden"
								my="4"
							>
								Tra cứu thông tin
							</Button>
							<ReCAPTCHA
								sitekey={process.env.GOOGLE_SITE_KEY as string}
								onChange={onChange}
							/>
						</Flex>
					</form>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default CheckPhone;
