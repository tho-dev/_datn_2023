import { Flex, Grid, GridItem, Stack } from "@chakra-ui/layout";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CheckedIcon } from "~/components/common/Icons";
import { useUpdatePassWordMutation } from "~/redux/api/user";
import { useAppDispatch } from "~/redux/hook/hook";
import { logout } from "~/redux/slices/globalSlice";

type Props = {
	user: any;
};

const ChangePassword = ({ user }: Props) => {
	const toast = useToast();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [updatePassWord] = useUpdatePassWordMutation();
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = (data: any) => {
		if (data.new_password !== data.confirm_password) {
			toast({
				title: "Hệ thống thông báo",
				description: "Mật khẩu mới không trùng khớp",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "bottom-right",
			});
			return;
		}
		updatePassWord({
			id: user._id,
			password: data.password,
			new_password: data.new_password,
			new_confirm_password: data.confirm_password,
		})
			.unwrap()
			.then((data) => {
				toast({
					title: "Hệ thống thông báo",
					description: data.message,
					status: "success",
					duration: 2000,
					isClosable: true,
					position: "bottom-right",
				});
				dispatch(logout(false as any));
				navigate("/");
			})
			.catch((error) => {
				toast({
					title: "Hệ thống thông báo",
					description: error.data.message,
					status: "error",
					duration: 2000,
					isClosable: true,
					position: "bottom-right",
				});
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
						md: "repeat(6, 1fr)",
						xl: "repeat(6, 1fr)",
					}}
					gap={4}
					alignItems="center"
				>
					<GridItem colSpan={6}>
						<FormControl isInvalid={errors.password as any}>
							<FormLabel
								fontWeight="semibold"
								htmlFor="password"
								fontSize="sm"
							>
								Mật khẩu
							</FormLabel>
							<Input
								type="password"
								id="password"
								placeholder="Mật khẩu"
								{...register("password", {
									required: "Vui lòng điền thông tin",
								})}
								borderColor={errors?.password ? "border.error" : "#e9ebec"}
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
					<GridItem colSpan={6}>
						<FormControl isInvalid={errors.new_password as any}>
							<FormLabel
								fontSize="sm"
								htmlFor="new_password"
								fontWeight="semibold"
							>
								Mật khẩu mới
							</FormLabel>
							<Input
								id="new_password"
								type="password"
								placeholder="Mật khẩu mới"
								{...register("new_password", {
									required: "Vui lòng điền thông tin",
								})}
								borderColor={errors?.new_password ? "border.error" : "#e9ebec"}
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
					<GridItem colSpan={4}>
						<FormControl isInvalid={errors.confirm_password as any}>
							<FormLabel
								fontSize="sm"
								htmlFor="confirm_password"
								fontWeight="semibold"
							>
								Xác nhận mật khẩu mới
							</FormLabel>
							<Input
								type="password"
								id="confirm_password"
								placeholder="Xác nhận mật khẩu mới"
								{...register("confirm_password", {
									required: "Vui lòng điền thông tin",
								})}
								borderColor={errors?.confirm_password ? "border.error" : "#e9ebec"}
							/>
							<FormErrorMessage>
								{errors?.confirm_password && (errors.confirm_password.message as any)}
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
						Thay đổi
					</Button>
				</Stack>
			</Flex>
		</form>
	);
};

export default ChangePassword;
