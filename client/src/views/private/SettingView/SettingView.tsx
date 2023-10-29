import { Box, Flex, Heading, Text, Link, Grid, GridItem } from "@chakra-ui/layout";
import CommonBox from "./components/CommonBox";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Switch } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import { Link as ReactRouterLink } from "react-router-dom";
import { ArrowRightUpIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";
import { useDisclosure } from "@chakra-ui/react";

type Props = {};

const SettingView = (props: Props) => {
	const {
		control,
		handleSubmit,
		register,
		setValue,
		getValues,
		watch,
		reset,
		resetField,
		formState: { errors, isSubmitting },
	} = useForm<any>({
		mode: "onTouched",
	});

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { fields, remove, append } = useFieldArray({
		control,
		name: "branch",
	});

	const onSubmit = async (data: any) => {
		console.log("data", data);
	};

	return (
		<Box
			px="6"
			py="8"
			bgColor="bg.white"
			rounded="lg"
		>
			<Heading
				fontSize="lg"
				fontWeight="bold"
			>
				Cấu Hình Chung
			</Heading>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid
					mt="6"
					gap="8"
					templateColumns="repeat(12, 1fr)"
				>
					<GridItem colSpan={7}>
						<Flex
							flex="1"
							flexDir="column"
							gap="6"
						>
							<CommonBox title="Website">
								<Flex
									gap="4"
									flexDir="column"
								>
									<FormControl isInvalid={errors?.banner_title as any}>
										<FormLabel
											htmlFor="title"
											fontSize="sm"
											fontWeight="semibold"
										>
											Tiêu đề
										</FormLabel>
										<Input
											id="banner_title"
											{...register("banner_title", {
												required: "Không được để trống",
											})}
											placeholder="..."
											borderColor={errors?.banner_title && "red.500"}
										/>
										<FormErrorMessage>
											{(errors?.banner_title as any) && errors?.banner_title?.message}
										</FormErrorMessage>
									</FormControl>
									<FormControl isInvalid={errors?.banner_description as any}>
										<FormLabel
											htmlFor="title"
											fontSize="sm"
											fontWeight="semibold"
										>
											Mô tả
										</FormLabel>
										<Input
											id="banner_description"
											{...register("banner_description", {
												required: "Không được để trống",
											})}
											placeholder="..."
											borderColor={errors?.banner_description && "red.500"}
										/>
										<FormErrorMessage>
											{(errors?.banner_description as any) && errors?.banner_description?.message}
										</FormErrorMessage>
									</FormControl>
									<Flex gap="4">
										<FormControl isInvalid={errors?.banner_color as any}>
											<FormLabel
												htmlFor="title"
												fontSize="sm"
												fontWeight="semibold"
											>
												Màu chữ
											</FormLabel>
											<Input
												id="banner_color"
												{...register("banner_color", {
													required: "Không được để trống",
												})}
												placeholder="..."
												borderColor={errors?.banner_color && "red.500"}
											/>
											<FormErrorMessage>
												{(errors?.banner_color as any) && errors?.banner_color?.message}
											</FormErrorMessage>
										</FormControl>
										<FormControl isInvalid={errors?.banner_background_color as any}>
											<FormLabel
												htmlFor="title"
												fontSize="sm"
												fontWeight="semibold"
											>
												Màu nền
											</FormLabel>
											<Input
												id="banner_background_color"
												{...register("banner_background_color", {
													required: "Không được để trống",
												})}
												placeholder="..."
												borderColor={errors?.banner_background_color && "red.500"}
											/>
											<FormErrorMessage>
												{(errors?.banner_background_color as any) &&
													errors?.banner_background_color?.message}
											</FormErrorMessage>
										</FormControl>
									</Flex>

									<Flex gap="6">
										<FormControl
											w="max-content"
											isInvalid={errors?.logo as any}
										>
											<FormLabel
												htmlFor="title"
												fontSize="sm"
												fontWeight="semibold"
											>
												Logo
											</FormLabel>

											<Flex>
												<Box
													w="120px"
													h="120px"
													rounded="full"
												>
													<FileUploadThinkPro
														fileName="category"
														getDataFn={(data) => setValue("logo", data)}
														setData={watch("logo")}
													/>
												</Box>
											</Flex>

											<FormErrorMessage>
												{(errors?.logo as any) && errors?.logo?.message}
											</FormErrorMessage>
										</FormControl>
										<FormControl
											flex="1"
											isInvalid={errors?.banner_thumbnail as any}
										>
											<FormLabel
												htmlFor="title"
												fontSize="sm"
												fontWeight="semibold"
											>
												Banner
											</FormLabel>

											<Flex>
												<Box
													w="full"
													h="200px"
													rounded="full"
												>
													<FileUploadThinkPro
														fileName="assets"
														getDataFn={(data) => setValue("banner_thumbnail", data)}
														setData={watch("banner_thumbnail")}
													/>
												</Box>
											</Flex>

											<FormErrorMessage>
												{(errors?.banner_thumbnail as any) && errors?.banner_thumbnail?.message}
											</FormErrorMessage>
										</FormControl>
									</Flex>
								</Flex>
							</CommonBox>
							<CommonBox title="Thông Tin SEO">
								<Flex
									gap="4"
									flexDir="column"
								>
									<FormControl isInvalid={errors?.meta_title as any}>
										<FormLabel
											htmlFor="meta_title"
											fontSize="sm"
											fontWeight="semibold"
										>
											Tiêu đề trang
										</FormLabel>
										<Input
											id="meta_title"
											{...register("meta_title", {
												required: "Không được để trống",
											})}
											placeholder="..."
											borderColor={errors?.meta_title && "red.500"}
										/>
										<FormErrorMessage>
											{(errors?.meta_title as any) && errors?.meta_title?.message}
										</FormErrorMessage>
									</FormControl>
									<FormControl isInvalid={errors?.meta_keyword as any}>
										<FormLabel
											htmlFor="meta_keyword"
											fontSize="sm"
											fontWeight="semibold"
										>
											Từ khóa
										</FormLabel>
										<Input
											id="meta_keyword"
											{...register("meta_keyword", {
												required: "Không được để trống",
											})}
											placeholder="..."
											borderColor={errors?.meta_keyword && "red.500"}
										/>
										<FormErrorMessage>
											{(errors?.meta_keyword as any) && errors?.meta_keyword?.message}
										</FormErrorMessage>
									</FormControl>
									<FormControl isInvalid={errors?.meta_slug as any}>
										<FormLabel
											htmlFor="meta_slug"
											fontSize="sm"
											fontWeight="semibold"
										>
											Đường dẫn trang
										</FormLabel>
										<Input
											id="meta_slug"
											{...register("meta_slug", {
												required: "Không được để trống",
											})}
											placeholder="..."
											borderColor={errors?.meta_slug && "red.500"}
										/>
										<FormErrorMessage>
											{(errors?.meta_slug as any) && errors?.meta_slug?.message}
										</FormErrorMessage>
									</FormControl>
									<FormControl isInvalid={errors?.meta_description as any}>
										<FormLabel
											htmlFor="meta_description"
											fontSize="sm"
											fontWeight="semibold"
										>
											Mô tả trang
										</FormLabel>
										<Input
											id="meta_description"
											{...register("meta_description", {
												required: "Không được để trống",
											})}
											placeholder="..."
											borderColor={errors?.meta_description && "red.500"}
										/>
										<FormErrorMessage>
											{(errors?.meta_description as any) && errors?.meta_description?.message}
										</FormErrorMessage>
									</FormControl>
								</Flex>
							</CommonBox>
						</Flex>
					</GridItem>

					<GridItem colSpan={5}>
						<Flex
							flexDir="column"
							flex="1"
							gap="6"
						>
							<CommonBox title="Các chi nhánh">
								<Box>
									<Flex
										gap="6"
										flexDir="column"
									>
										{fields.map((field: any, index) => {
											return (
												<Box
													key={field.id}
													p="4"
													rounded="md"
													fontSize="sm"
													color="text.black"
													backgroundColor="bg.gray"
												>
													<Flex justifyContent="space-between">
														<Box>
															<Text fontWeight="semibold">{field.city}</Text>
															<Text>{field.address}</Text>
														</Box>
														<Flex gap="2">
															<Button
																w="10"
																h="8"
																size="small"
																bgColor="bg.bgDelete"
																color="text.textDelete"
																onClick={() => remove(index)}
															>
																Xóa
															</Button>
															<Button
																w="10"
																h="8"
																size="small"
																bgColor="bg.bgEdit"
																color="text.textEdit"
															>
																Sửa
															</Button>
														</Flex>
													</Flex>
													<Flex
														mt="2"
														alignItems="flex-end"
														justifyContent="space-between"
													>
														<Box fontSize="xs">
															<Text
																fontWeight="semibold"
																color="#f93920"
															>
																Đã đóng cửa, hẹn bạn 09:00 ngày mai
															</Text>
															<Text fontWeight="medium">09:00 - 21:00</Text>
														</Box>
														<Link
															as={ReactRouterLink}
															fontSize="xs"
															color="text.blue"
															fontWeight="bold"
															textDecoration="none"
														>
															Chỉ đường
															<ArrowRightUpIcon size={4} />
														</Link>
													</Flex>
												</Box>
											);
										})}
									</Flex>
									<Button
										mt="4"
										size="small"
										bgColor="bg.bgSuccess"
										color="text.textSuccess"
										onClick={() => {
											onOpen();
											setValue("branch", [
												...(getValues().branch || []),
												{
													name: "",
													time: "",
													map: "",
													address: "",
													status: true,
												},
											]);
										}}
									>
										Thêm chi nhánh
									</Button>
								</Box>
							</CommonBox>
						</Flex>
					</GridItem>
				</Grid>

				<Flex
					position="fixed"
					bottom="2"
					left="50%"
					transform="translateX(calc(50% - 260px))"
					w="full"
					maxW="400px"
					bgColor="bg.white"
					px="6"
					py="4"
					rounded="lg"
					justifyContent="space-around"
					borderWidth="1px"
					borderColor="#eef1f6"
					boxShadow="0 0.375rem 0.75rem rgba(140,sm2,164,.075)"
				>
					<Button
						w={"40"}
						bgColor="bg.bgDelete"
						color="text.textDelete"
						onClick={() => reset()}
					>
						Hủy
					</Button>
					<Button
						w={"40"}
						isLoading={isSubmitting}
						type="submit"
						bgColor="bg.bgEdit"
						color="text.textEdit"
					>
						Cập Nhật
					</Button>
				</Flex>

				{/* Form thêm chi nhánh */}
				<DialogThinkPro
					title={
						<Heading
							fontSize="lg"
							fontWeight="semibold"
						>
							Tạo chi nhánh
						</Heading>
					}
					isCentered
					isOpen={isOpen}
					onClose={onClose}
				>
					<Flex
						gap="4"
						flexDir="column"
					>
						<FormControl>
							<FormLabel
								fontSize="sm"
								fontWeight="semibold"
							>
								Thành phố
							</FormLabel>
							<Input
								{...register(`branch.${fields.length}.city`, {
									required: "Không được để trống",
								})}
								placeholder="Thành phố Hồ Chí Minh, ..."
							/>
						</FormControl>
						<FormControl>
							<FormLabel
								fontSize="sm"
								fontWeight="semibold"
							>
								Địa chỉ
							</FormLabel>
							<Input
								id="banner_title"
								{...register("banner_title", {
									required: "Không được để trống",
								})}
								placeholder="Số 5 - 7 Nguyễn Huy Tưởng, F6, Q. Bình Thạnh, .."
								borderColor={errors?.banner_title && "red.500"}
							/>
							<FormErrorMessage>
								{(errors?.banner_title as any) && errors?.banner_title?.message}
							</FormErrorMessage>
						</FormControl>
						<Flex gap="4">
							<FormControl isInvalid={errors?.banner_title as any}>
								<FormLabel
									htmlFor="title"
									fontSize="sm"
									fontWeight="semibold"
								>
									Thời gian mở cửa
								</FormLabel>
								<Input
									id="banner_title"
									{...register("banner_title", {
										required: "Không được để trống",
									})}
									placeholder="9:00, .."
									borderColor={errors?.banner_title && "red.500"}
								/>
								<FormErrorMessage>
									{(errors?.banner_title as any) && errors?.banner_title?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors?.banner_title as any}>
								<FormLabel
									htmlFor="title"
									fontSize="sm"
									fontWeight="semibold"
								>
									Thời gian đóng cửa
								</FormLabel>
								<Input
									id="banner_title"
									{...register("banner_title", {
										required: "Không được để trống",
									})}
									placeholder="22:00, ..."
									borderColor={errors?.banner_title && "red.500"}
								/>
								<FormErrorMessage>
									{(errors?.banner_title as any) && errors?.banner_title?.message}
								</FormErrorMessage>
							</FormControl>
						</Flex>
						<FormControl isInvalid={errors?.banner_title as any}>
							<FormLabel
								htmlFor="title"
								fontSize="sm"
								fontWeight="semibold"
							>
								Trạng thái
							</FormLabel>
							<Switch id="email-alerts" />
						</FormControl>
						<FormControl isInvalid={errors?.banner_title as any}>
							<FormLabel
								htmlFor="title"
								fontSize="sm"
								fontWeight="semibold"
							>
								Map
							</FormLabel>
							<Input
								id="banner_title"
								{...register("banner_title", {
									required: "Không được để trống",
								})}
								placeholder="https://www.google.com/maps/place/ThinkPro+-+95+Tr%E1%BA%A7n+Thi%E1%BB%87n+Ch%C3%A1nh,+P12,+Q10,+TP+HCM/@10.7720769,106.6680882,17z/data=!3m1!4b1!4m5!3m4!1s0x31752fea4b76a251:0x3b34f5af9212aadc!8m2!3d10.7720769!4d106.6702769."
								borderColor={errors?.banner_title && "red.500"}
							/>
							<FormErrorMessage>
								{(errors?.banner_title as any) && errors?.banner_title?.message}
							</FormErrorMessage>
						</FormControl>
					</Flex>
				</DialogThinkPro>
			</form>
		</Box>
	);
};

export default SettingView;
