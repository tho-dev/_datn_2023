import { Center, Flex, Grid, GridItem, Stack } from "@chakra-ui/layout";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import { CheckedIcon } from "~/components/common/Icons";
import { useUpdateMutation } from "~/redux/api/user";

type Props = {
	user: any;
};

const Info = ({ user }: Props) => {
	const toast = useToast();
	const [update] = useUpdateMutation();
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (user) {
			reset(user);
		}
	}, [reset, user]);

	const onSubmit = async (data: any) => {
		const payload = {
			first_name: data.first_name,
			last_name: data.last_name,
			avatar: data.avatar,
			email: data.email,
			location: data.location,
		};
		const result: any = await update({ data: payload, id: user._id });

		if (result.data?.status === 200) {
			toast({
				title: "Thành công",
				description: "Cập nhật thông tin thành công",
				status: "success",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
		} else {
			toast({
				title: "Thất bại",
				description: "Cập nhật thông tin thất bại",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-right",
			});
		}
	};

	return (
		user && (
			<form
				style={{
					width: "100%",
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Flex
					gap="4"
					flexDir="column"
					py="8"
					px="6"
					rounded="xl"
					borderWidth="1px"
					borderColor="#eef1f6"
					boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
				>
					<Grid
						templateColumns={{
							sm: "repeat(1, 1fr)",
							md: "repeat(1, 1fr)",
							xl: "repeat(1, 1fr)",
						}}
						gap={4}
						alignItems="center"
					>
						<GridItem
							w="full"
							colSpan={1}
							alignItems="center"
						>
							<Center>
								<Box
									w="120px"
									h="120px"
									rounded="full"
									overflow="hidden"
									border="1px solid #e9ebec"
								>
									<FileUploadThinkPro
										fileName="avatar"
										getDataFn={(data: any) => setValue("avatar", data)}
										setData={watch("avatar")}
									/>
								</Box>
							</Center>
						</GridItem>
					</Grid>
					<Grid
						templateColumns={{
							sm: "repeat(1, 1fr)",
							md: "repeat(2, 1fr)",
							xl: "repeat(2, 1fr)",
						}}
						gap={4}
						alignItems="center"
					>
						<GridItem colSpan={1}>
							<FormControl isInvalid={errors.name as any}>
								<FormLabel
									fontWeight="semibold"
									fontSize="13px"
								>
									First Name
								</FormLabel>
								<Input
									id="first_name"
									placeholder="First Name"
									{...register("first_name", {
										required: "Vui lòng điền thông tin ",
									})}
									borderColor={errors?.first_name ? "border.error" : "#e9ebec"}
								/>
								<FormErrorMessage>
									{errors?.first_name && (errors.first_name.message as any)}
								</FormErrorMessage>
							</FormControl>
						</GridItem>
						<GridItem colSpan={1}>
							<FormControl isInvalid={errors.last_name as any}>
								<FormLabel
									fontWeight="semibold"
									fontSize="13px"
								>
									Last Name
								</FormLabel>
								<Input
									id="last_name"
									placeholder="Last Name"
									{...register("last_name", {
										required: "Vui lòng điền thông tin ",
									})}
									borderColor={errors?.last_name ? "border.error" : "#e9ebec"}
								/>
								<FormErrorMessage>
									{errors?.last_name && (errors.last_name.message as any)}
								</FormErrorMessage>
							</FormControl>
						</GridItem>

						<GridItem colSpan={1}>
							<FormControl isInvalid={errors.email as any}>
								<FormLabel
									fontSize="13px"
									htmlFor="email"
									fontWeight="semibold"
								>
									Email
								</FormLabel>
								<Input
									id="email"
									placeholder="Email"
									{...register("email", {
										required: "Vui lòng điền thông tin ",
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: "Email không hợp lệ",
										},
									})}
									borderColor={errors?.email ? "border.error" : "#e9ebec"}
									readOnly
								/>
								<FormErrorMessage>{errors?.email && (errors.email.message as any)}</FormErrorMessage>
							</FormControl>
						</GridItem>

						<GridItem colSpan={1}>
							<FormControl isInvalid={errors.phone as any}>
								<FormLabel
									fontWeight="semibold"
									htmlFor="phone"
									fontSize="13px"
								>
									SĐT
								</FormLabel>
								<Input
									id="phone"
									placeholder="Nhập số điện thoại"
									{...register("phone", {
										required: "Vui lòng điền thông tin ",
									})}
									borderColor={errors?.phone ? "border.error" : "#e9ebec"}
								/>
								<FormErrorMessage>{errors?.phone && (errors.phone.message as any)}</FormErrorMessage>
							</FormControl>
						</GridItem>
					</Grid>
					<Grid
						templateColumns={{
							sm: "repeat(1, 1fr)",
							md: "repeat(2, 1fr)",
							xl: "repeat(2, 1fr)",
						}}
						gap={4}
						alignItems="center"
					>
						<GridItem colSpan={2}>
							<FormControl isInvalid={errors.location as any}>
								<FormLabel
									fontWeight="semibold"
									htmlFor="name"
									fontSize="13px"
								>
									Địa chỉ
								</FormLabel>
								<Textarea
									id="location"
									placeholder="Nhập địa chỉ"
									{...register("location", {
										required: "Vui lòng điền thông tin ",
									})}
									borderColor={errors?.location ? "border.error" : "#e9ebec"}
								/>
								<FormErrorMessage>
									{errors?.location && (errors.location.message as any)}
								</FormErrorMessage>
							</FormControl>
						</GridItem>
					</Grid>
					<Stack
						direction="row"
						spacing={4}
						mt="2"
					>
						<Button
							leftIcon={<CheckedIcon size={4} />}
							type="submit"
							bg="bg.bgEdit"
							color="text.textEdit"
						>
							Lưu
						</Button>
					</Stack>
				</Flex>
			</form>
		)
	);
};

export default Info;
