import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	Image,
	Input,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import { ArrowReturnIcon } from "~/components/common/Icons";
import {
	useGetAllVariantQuery,
	useGetProductByIdQuery,
	useGetSkuQuery,
	useUpdateVariantMutation,
} from "~/redux/api/product";
import CommonBox from "./components/CommonBox";
import Media from "./components/Media";

type Props = {};

const AddProductMangerView = (props: Props) => {
	const toast = useToast();
	const navigate = useNavigate();
	const { product_id, sku_id } = useParams();
	const [defaultData, setDefaultData] = useState<any>(null);

	// xử lý value quill và react-hook-form
	const {
		control,
		handleSubmit,
		register,
		setValue,
		getValues,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: defaultData,
	});

	const { fields } = useFieldArray({
		control,
		name: "options",
	});

	const { data: product } = useGetProductByIdQuery(
		{
			id: product_id as string,
		},
		{
			skip: !product_id,
		}
	);

	const { data: variants } = useGetAllVariantQuery(
		{
			id: product_id as string,
		},
		{
			skip: !product_id,
		}
	);

	const { data: sku } = useGetSkuQuery(
		{
			sku_id: sku_id,
			product_id: product_id,
		},
		{
			skip: !sku_id,
		}
	);

	const [updateVariant] = useUpdateVariantMutation();

	useEffect(() => {
		if (sku) {
			const data = sku?.data;
			reset(data, {
				keepValues: false,
			});
			setDefaultData(data);
		}
	}, [sku, sku_id, product_id, reset]);

	// call api
	const onSubmit = async (data: any) => {
		try {
			const { slug, shared_url, price_discount_percent, ...payload } = data;
			await updateVariant(payload).unwrap();

			toast({
				title: "Thành công",
				duration: 1600,
				position: "top-right",
				status: "success",
				description: "Cập nhật biến thể thành công",
			});
		} catch (error: any) {
			toast({
				title: "Có lỗi",
				duration: 1600,
				position: "top-right",
				status: "error",
				description: JSON.stringify(error?.data?.errors),
			});
		}
	};

	return (
		<Box
			w="full"
			h="full"
			bgColor="bg.white"
			py="8"
			px="6"
			rounded="xl"
		>
			<Heading
				fontSize="18"
				color="text.black"
				lineHeight="100%"
				textTransform="uppercase"
			>
				Cập nhật biến thể sản phẩm
			</Heading>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					w="full"
					h="full"
					my="6"
					rounded="lg"
					bgColor="bg.white"
				>
					<Grid
						gap="8"
						templateColumns="repeat(12, 1fr)"
					>
						<GridItem colSpan={5}>
							<Flex
								gap="6"
								flexDir="column"
							>
								{/* Thông tin biến thể*/}
								<CommonBox title={`SKU: ${sku_id}`}>
									<Flex
										as={ReactRouterLink}
										to={`/admin/san-pham/${product_id}/update`}
										gap="4"
									>
										<Box
											w="68px"
											h="68px"
											bgColor="bg.gray"
											rounded="md"
											overflow="hidden"
										>
											<Image
												src={
													product?.data?.images?.[0]?.url
														? product?.data?.images?.[0]?.url
														: "https://res.cloudinary.com/dctvtsnuk/image/upload/v1697604038/ezcx9lttgrinnzmrl9ti.png"
												}
												w="full"
												h="full"
												objectFit="contain"
												p="1"
											/>
										</Box>
										<Flex
											gap="2px"
											flexDir="column"
										>
											<Text
												fontSize="sm"
												fontWeight="semibold"
											>
												{product?.data?.name}
											</Text>
											<Text
												fontSize="13px"
												fontWeight="semibold"
											>
												{variants?.data?.length} chi tiết thể
											</Text>
											<Flex
												gap="1"
												alignItems="center"
												color="text.blue"
												fontSize="13px"
												fontWeight="semibold"
											>
												<Center>
													<ArrowReturnIcon size={5} />
												</Center>
												<Text>Quay về chi tiết sản phẩm</Text>
											</Flex>
										</Flex>
									</Flex>
								</CommonBox>
								{/* Danh sách biến thể */}
								<CommonBox title="Danh Sách Biến Thể">
									<Flex
										gap="4"
										flexDir="column"
										maxH="480px"
										overflowY="auto"
									>
										{variants?.data.map((variant: any, k: number) => {
											const optionValues = variant?.option_value;
											return (
												<Flex
													as={ReactRouterLink}
													to={`/admin/san-pham/${product_id}/bien-the/${variant?._id}`}
													key={k}
													gap="3"
													p="3"
													rounded="md"
													bgColor={sku_id == variant?._id ? "bg.gray" : "transparent"}
													borderWidth="1px"
													borderColor="border.primary"
													borderStyle="dashed"
													alignItems="flex-start"
												>
													<Box
														w="68px"
														h="68px"
														bgColor="bg.white"
														rounded="md"
														overflow="hidden"
														borderWidth="1px"
														borderColor="border.primary"
														alignItems="flex-start"
														borderStyle="dashed"
													>
														<Image
															src={
																variant?.image?.url
																	? variant?.image?.url
																	: "https://res.cloudinary.com/dctvtsnuk/image/upload/v1697604038/ezcx9lttgrinnzmrl9ti.png"
															}
															w="full"
															h="full"
															objectFit="contain"
															p="1"
														/>
													</Box>

													<Box>
														<Flex
															gap="1"
															flexWrap="wrap"
															height="fit-content"
														>
															{optionValues.map((item: any, k: number) => {
																return (
																	<Text
																		key={k}
																		fontSize="xs"
																		rounded="4px"
																		fontWeight="semibold"
																		px="2"
																		py="1"
																		borderWidth="1px"
																		borderColor="border.primary"
																		borderStyle="dashed"
																	>
																		{item?.label}
																	</Text>
																);
															})}
														</Flex>
														<Text
															mt="2"
															fontSize="xs"
															fontWeight="semibold"
														>
															SKU: {variant?.SKU}
														</Text>
													</Box>
												</Flex>
											);
										})}
									</Flex>
								</CommonBox>
							</Flex>
						</GridItem>
						<GridItem colSpan={7}>
							<Flex
								gap="6"
								flexDir="column"
							>
								{/* Thong tin chung */}
								<CommonBox title="Các Thuộc Tính">
									<Flex
										gap="4"
										flexDir="column"
									>
										{fields.map((field: any, index: number) => {
											const isColor =
												watch(`options.[${index}.name]`) == "mau" ||
												watch(`options.[${index}.name]`) == "color";

											return (
												<Flex
													key={field.id}
													gap="3"
													flexDir="column"
												>
													<FormControl isInvalid={`errors?.options?.[${index}].label` as any}>
														<FormLabel
															htmlFor="name"
															fontSize="sm"
															fontWeight="semibold"
														>
															{field?.label}
														</FormLabel>
														<Input
															{...register(`options.${index}.option_value.label`, {
																required: "Không được để trống",
															})}
															placeholder="Tên thuộc tính"
														/>
													</FormControl>
													<FormControl
														key={field.id}
														isInvalid={`errors?.options?.[${index}].value` as any}
														display="flex"
														alignItems="center"
														gap="4"
													>
														<Input
															{...register(`options.${index}.option_value.value`, {
																required: "Không được để trống",
															})}
															placeholder="Giá trị thuộc tính"
															type={isColor ? "color" : "text"}
															w={isColor ? "48px" : "full"}
															px={isColor ? "0" : "4"}
														/>

														{isColor && (
															<Text
																my="1"
																fontWeight="medium"
																fontSize="13px"
																px="2"
																py="1"
																rounded="3px"
																bgColor={watch(`options.${index}.option_value.value`)}
																color="white"
																display="inline-block"
															>
																{watch(`options.${index}.option_value.value`)}
															</Text>
														)}
													</FormControl>
												</Flex>
											);
										})}
									</Flex>
								</CommonBox>
								<CommonBox title="Chi Tiết Biến Thể">
									<Flex gap="4">
										<FormControl isInvalid={errors?.price as any}>
											<FormLabel
												htmlFor="price"
												fontSize="sm"
												fontWeight="semibold"
											>
												Giá gốc
											</FormLabel>
											<Flex
												alignItems="center"
												justifyContent="space-between"
												borderWidth="1px"
												rounded="8px"
												px="4"
												borderColor={errors?.price && "border.error"}
											>
												<Input
													id="price"
													{...register("price", {
														required: "Không được để trống",
														pattern: {
															value: /^\d+$/,
															message: "Vui lòng nhập số",
														},
													})}
													border="none"
													placeholder="20.000.000"
													px="0"
												/>
												<Text
													color="#8c98a4"
													fontSize="13px"
													fontWeight="medium"
												>
													VNĐ
												</Text>
											</Flex>
											<FormErrorMessage>
												{(errors?.price as any) && errors?.price?.message}
											</FormErrorMessage>
										</FormControl>
										<FormControl isInvalid={errors?.price_before_discount as any}>
											<FormLabel
												htmlFor="price_before_discount"
												fontSize="sm"
												fontWeight="semibold"
											>
												Giá khuyến mãi
											</FormLabel>
											<Flex
												alignItems="center"
												justifyContent="space-between"
												borderWidth="1px"
												rounded="8px"
												px="4"
												borderColor={errors?.price_before_discount && "border.error"}
											>
												<Input
													id="price_before_discount"
													{...register("price_before_discount", {
														required: "Không được để trống",
														pattern: {
															value: /^\d+$/,
															message: "Vui lòng nhập số",
														},
													})}
													border="none"
													placeholder="19.999.000"
													px="0"
												/>
												<Text
													color="#8c98a4"
													fontSize="13px"
													fontWeight="medium"
												>
													VNĐ
												</Text>
											</Flex>
											<FormErrorMessage>
												{(errors?.price_before_discount as any) &&
													errors?.price_before_discount?.message}
											</FormErrorMessage>
										</FormControl>
									</Flex>
								</CommonBox>
								<CommonBox title="Quản Lý Tồn Kho">
									<Flex gap="4">
										<FormControl isInvalid={errors?.stock as any}>
											<FormLabel
												htmlFor="price"
												fontSize="sm"
												fontWeight="semibold"
											>
												Tồn kho
											</FormLabel>
											<Input
												id="stock"
												{...register("stock", {
													required: "Không được để trống",
													pattern: {
														value: /^\d+$/,
														message: "Vui lòng nhập số",
													},
												})}
												borderColor={errors?.stock && "border.error"}
												placeholder="99"
											/>
											<FormErrorMessage>
												{(errors?.stock as any) && errors?.stock?.message}
											</FormErrorMessage>
										</FormControl>
										<FormControl isInvalid={errors?.SKU as any}>
											<FormLabel
												htmlFor="SKU"
												fontSize="sm"
												fontWeight="semibold"
											>
												SKU
											</FormLabel>
											<Input
												id="SKU"
												{...register("SKU", {
													required: "Không được để trống",
												})}
												borderWidth="1px"
												borderColor={errors?.SKU && "border.error"}
												placeholder="XYZ"
											/>
											<FormErrorMessage>
												{(errors?.SKU as any) && errors?.SKU?.message}
											</FormErrorMessage>
										</FormControl>
									</Flex>
								</CommonBox>
								{/* Upload file */}
								<CommonBox title="Hình Ảnh Biến Thể Sản Phẩm">
									<Media
										register={register}
										watch={watch}
										getValues={getValues}
										setValue={setValue}
										errors={errors}
										control={control}
									/>
								</CommonBox>
							</Flex>
						</GridItem>
					</Grid>
				</Box>
				<Flex
					position="fixed"
					bottom="2"
					left="50%"
					zIndex="9999"
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
						Cập nhật
					</Button>
				</Flex>
			</form>
		</Box>
	);
};

export default AddProductMangerView;
