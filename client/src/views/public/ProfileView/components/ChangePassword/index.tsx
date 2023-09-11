import { Divider, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import { Button, FormControl, FormErrorMessage, FormLabel, Image, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { CheckedIcon, CloseSmallIcon } from "~/components/common/Icons";

type Props = {};

const ChangePassword = (props: Props) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = (data: any) => {
		console.log("data", data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex
				gap="4"
				mt="6"
				flexDir="column"
			>
				<Grid
					templateColumns={{
						sm: "repeat(1, 1fr)",
						md: "repeat(6, 1fr)",
						xl: "repeat(6, 1fr)",
					}}
					gap={4}
					alignItems="center"
				>
					<GridItem colSpan={1}>
						<FormLabel
							fontWeight="semibold"
							htmlFor="password"
							fontSize="sm"
						>
							Mật khẩu
						</FormLabel>
					</GridItem>
					<GridItem colSpan={4}>
						<FormControl isInvalid={errors.password as any}>
							<Input
								id="password"
								placeholder="Mật khẩu"
								{...register("password", {
									required: "Vui lòng điền thông tin",
								})}
								borderColor={errors?.password ? "border.error" : ""}
							/>
							<FormErrorMessage>{errors?.password && (errors.password.message as any)}</FormErrorMessage>
						</FormControl>
					</GridItem>
				</Grid>
				<Grid
					templateColumns={{
						sm: "repeat(1, 1fr)",
						md: "repeat(6, 1fr)",
						xl: "repeat(6, 1fr)",
					}}
					gap={4}
					alignItems="center"
				>
					<GridItem colSpan={1}>
						<FormLabel
							fontSize="sm"
							htmlFor="new_password"
							fontWeight="semibold"
						>
							Mật khẩu mới
						</FormLabel>
					</GridItem>
					<GridItem colSpan={4}>
						<FormControl isInvalid={errors.new_password as any}>
							<Input
								id="new_password"
								placeholder="Mật khẩu mới"
								{...register("new_password", {
									required: "Vui lòng điền thông tin",
								})}
								borderColor={errors?.new_password ? "border.error" : ""}
							/>
							<FormErrorMessage>
								{errors?.new_password && (errors.new_password.message as any)}
							</FormErrorMessage>
						</FormControl>
					</GridItem>
				</Grid>
				<Grid
					templateColumns={{
						sm: "repeat(1, 1fr)",
						md: "repeat(6, 1fr)",
						xl: "repeat(6, 1fr)",
					}}
					gap={4}
					alignItems="center"
				>
					<GridItem colSpan={1}>
						<FormLabel
							fontSize="sm"
							htmlFor="confirm_password"
							fontWeight="semibold"
						>
							Xác nhận mật khẩu
						</FormLabel>
					</GridItem>
					<GridItem colSpan={4}>
						<FormControl isInvalid={errors.confirm_password as any}>
							<Input
								id="confirm_password"
								placeholder="Xác nhận mật khẩu"
								{...register("confirm_password", {
									required: "Vui lòng điền thông tin",
								})}
								borderColor={errors?.confirm_password ? "border.error" : ""}
							/>
							<FormErrorMessage>
								{errors?.confirm_password && (errors.confirm_password.message as any)}
							</FormErrorMessage>
						</FormControl>
					</GridItem>
				</Grid>
			</Flex>
			<Divider my="6" />
			<Stack
				direction="row"
				spacing={4}
			>
				<Button
					colorScheme="blue"
					leftIcon={<CheckedIcon size={5} />}
					variant="solid"
					type="submit"
					size="medium"
				>
					Lưu lại
				</Button>
				<Button
					colorScheme="blue"
					leftIcon={<CloseSmallIcon size={5} />}
					variant="outline"
					size="medium"
				>
					Hủy
				</Button>
			</Stack>
		</form>
	);
};

export default ChangePassword;
