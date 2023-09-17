import React, { useEffect } from "react";
import {
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	Text,
	RadioGroup,
	Stack,
	Radio,
	Tabs,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import QuillThinkPro from "~/components/QuillThinkPro";
import SEO from "./components/SEO";
import Variants from "./components/Variants";
import Options from "./components/Options";
import Attributes from "./components/Attributes";
import CommonBox from "./components/CommonBox";
import { chakraComponents, Select } from "chakra-react-select";
import { TagsInput } from "react-tag-input-component";
import Media from "./components/Media";

type Props = {};

const categories = [
	{
		label: "Laptop",
		value: "latop",
	},
	{
		label: "Bàn phím",
		value: "ban-phim",
	},
];

const brands = [
	{
		label: "Dell",
		value: "dell",
	},
	{
		label: "Lenovo",
		value: "lenovo",
	},
	{
		label: "Haki",
		value: "haki",
	},
];

const OptionComponent = {
	Option: ({ children, ...props }: any) => (
		<chakraComponents.Option {...props}>
			<Text
				as="div"
				fontSize="sm"
			>
				{children}
			</Text>
		</chakraComponents.Option>
	),
	Control: ({ children, ...props }: any) => (
		<chakraComponents.Control {...props}>
			<Text
				as="div"
				w="full"
				display="flex"
				fontSize="sm"
			>
				{children}
			</Text>
		</chakraComponents.Control>
	),
};

const AddProductMangerView = (props: Props) => {
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
	} = useForm({
		// defaultValues: {
		// 	assets: [],
		// 	attributes: [],
		// 	brand_id: null,
		// 	category_id: null,
		// 	description: "",
		// 	has_gift: "false",
		// 	gift_amount: "",
		// 	image: null,
		// 	is_avaiable: "false",
		// 	name: "",
		// 	sku: "",
		// 	price: 0,
		// 	price_before_discount: 0,
		// 	seo_description: "",
		// 	specs: "",
		// 	status: "true",
		// 	tags: [],
		// 	title: "",
		// 	video_review: "",
		// 	variants: [],
		// },
	});
	// xử lý value quill và react-hook-form
	useEffect(() => {
		register("specs");
		register("description", { required: "Không được để trống" });
	}, [register]);

	const onEditorStateChangeSpecs = (value: any) => {
		setValue("specs", value);
	};
	const onEditorStateChangeDescription = (value: any) => {
		setValue("description", value);
	};

	const specs = watch("specs");
	const description = watch("description");

	// ...
	const onSubmit = async (data: any) => {
		console.log("data", data);
	};

	return (
		<Box
			w="full"
			h="full"
			minH="100vh"
		>
			<Heading
				fontSize="xl"
				color="text.black"
				lineHeight="100%"
			>
				Tạo mới sản phẩm
			</Heading>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					w="full"
					h="full"
					p="6"
					my="6"
					rounded="lg"
					bgColor="bg.white"
				>
					<Tabs
						position="relative"
						variant="unstyled"
					>
						<TabList>
							<Tab
								fontSize="md"
								color="text.black"
								fontWeight="bold"
							>
								Thông tin chung
							</Tab>
							<Tab
								fontSize="md"
								color="text.black"
								fontWeight="bold"
							>
								Đặc điểm
							</Tab>
							<Tab
								fontSize="md"
								color="text.black"
								fontWeight="bold"
							>
								Thuộc tính
							</Tab>
							<Tab
								fontSize="md"
								color="text.black"
								fontWeight="bold"
							>
								Biến thể
							</Tab>
						</TabList>
						<TabIndicator
							mt="-1.5px"
							height="2px"
							bg="bg.admin2"
							rounded="full"
						/>
						<TabPanels>
							{/* Thong tin chung */}
							<TabPanel>
								<Grid
									gap="8"
									templateColumns="repeat(12, 1fr)"
								>
									<GridItem colSpan={8}>
										{/* Thong tin chung */}
										<Flex
											gap="6"
											flexDir="column"
										>
											{/* Thong tin chung */}
											<CommonBox title="Thông tin chung">
												<Flex
													gap="4"
													flexDir="column"
												>
													<FormControl isInvalid={errors?.name as any}>
														<FormLabel
															htmlFor="name"
															fontSize="sm"
															fontWeight="semibold"
														>
															Sản phẩm
														</FormLabel>
														<Input
															id="name"
															{...register("name", {
																required: "Không được để trống",
															})}
															placeholder="Dell Inspiron 5510, ..."
															borderColor={errors?.name && "border.error"}
														/>
														<FormErrorMessage>
															{(errors?.name as any) && errors?.name?.message}
														</FormErrorMessage>
													</FormControl>
													<FormControl isInvalid={errors?.sku as any}>
														<FormLabel
															htmlFor="sku"
															fontSize="sm"
															fontWeight="semibold"
														>
															SKU
														</FormLabel>
														<Input
															id="sku"
															{...register("sku", {
																required: "Không được để trống",
															})}
															placeholder="Inspiron351103NU, ..."
															borderColor={errors?.sku && "border.error"}
														/>
														<FormErrorMessage>
															{(errors?.sku as any) && errors?.sku?.message}
														</FormErrorMessage>
													</FormControl>
													<FormControl isInvalid={errors?.video_review as any}>
														<FormLabel
															htmlFor="video_review"
															fontSize="sm"
															fontWeight="semibold"
														>
															Video review
															<Text
																as="span"
																fontSize="xs"
																ml="1"
																color="#8c98a4"
																fontWeight="medium"
															>
																(không bắt buộc)
															</Text>
														</FormLabel>
														<Input
															id="video_review"
															{...register("video_review")}
															placeholder="https://www.youtube.com/watch?v=sm1P2WfOuiI, ..."
															borderColor={errors?.video_review && "red.500"}
														/>
														<FormErrorMessage>
															{(errors?.video_review as any) &&
																errors?.video_review?.message}
														</FormErrorMessage>
													</FormControl>
													<FormControl isInvalid={errors?.specs as any}>
														<FormLabel
															htmlFor="specs"
															fontSize="sm"
															fontWeight="semibold"
														>
															Mô tả ngắn
															<Text
																as="span"
																fontSize="xs"
																ml="1"
																color="#8c98a4"
																fontWeight="medium"
															>
																(không bắt buộc)
															</Text>
														</FormLabel>
														<QuillThinkPro
															data={specs}
															onEditorStateChange={onEditorStateChangeSpecs as any}
														/>
														<FormErrorMessage>
															{(errors?.specs as any) && errors?.specs?.message}
														</FormErrorMessage>
													</FormControl>
													<FormControl isInvalid={errors?.description as any}>
														<FormLabel
															htmlFor="description"
															fontSize="sm"
															fontWeight="semibold"
														>
															Mô tả chi tiết
														</FormLabel>
														<QuillThinkPro
															data={description}
															onEditorStateChange={onEditorStateChangeDescription as any}
														/>
														<FormErrorMessage>
															{(errors?.description as any) &&
																errors?.description?.message}
														</FormErrorMessage>
													</FormControl>
												</Flex>
											</CommonBox>
											{/* Upload file */}
											<CommonBox title="Media">
												<Media
													register={register}
													watch={watch}
													getValues={getValues}
													setValue={setValue}
													errors={errors}
												/>
											</CommonBox>
											{/* SEO */}
											<CommonBox title="SEO meta tags">
												<SEO
													register={register}
													errors={errors}
												/>
											</CommonBox>
										</Flex>
									</GridItem>
									<GridItem colSpan={4}>
										<Flex
											gap="6"
											flexDir="column"
										>
											{/* Thong tin ve gia */}
											<CommonBox title="Thông tin giá">
												<Flex
													flexDir="column"
													gap="4"
												>
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
															rounded="4px"
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
																fontSize="sm"
																fontWeight="semibold"
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
															rounded="4px"
															px="4"
															borderColor={
																errors?.price_before_discount && "border.error"
															}
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
																fontSize="sm"
																fontWeight="semibold"
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
											{/* Khac lien quan */}
											<CommonBox title="Khác">
												<Flex
													flexDir="column"
													gap="4"
												>
													<Controller
														control={control}
														name="has_gift"
														render={({
															field: { onChange, onBlur, value = "false", name, ref },
															fieldState: { error },
														}) => (
															<FormControl
																isInvalid={!!error}
																id="has_gift"
															>
																<FormLabel
																	htmlFor="has_gift"
																	fontSize="sm"
																	fontWeight="semibold"
																>
																	Khuyến mãi
																</FormLabel>

																<RadioGroup
																	onChange={onChange}
																	value={value}
																	defaultValue={"false"}
																	name={name}
																	ref={ref}
																>
																	<Stack
																		direction="row"
																		gap="4"
																	>
																		<Radio value="true">
																			<Text
																				fontSize="sm"
																				fontWeight="medium"
																			>
																				Có
																			</Text>
																		</Radio>
																		<Radio value="false">
																			<Text
																				fontSize="sm"
																				fontWeight="medium"
																			>
																				Không
																			</Text>
																		</Radio>
																	</Stack>
																</RadioGroup>

																<FormErrorMessage>
																	{error && error.message}
																</FormErrorMessage>
															</FormControl>
														)}
													/>
													{/* Check xem khuyến mại thì hiện thị ô input */}
													{watch("has_gift") == "true" && (
														<FormControl isInvalid={errors?.gift_amount as any}>
															<Flex
																alignItems="center"
																justifyContent="space-between"
																borderWidth="1px"
																rounded="4px"
																px="4"
																borderColor={errors?.gift_amount && "border.error"}
															>
																<Input
																	id="gift_amount"
																	{...register("gift_amount", {
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
																	fontSize="sm"
																	fontWeight="semibold"
																>
																	VNĐ
																</Text>
															</Flex>
															<FormErrorMessage>
																{(errors?.gift_amount as any) &&
																	errors?.gift_amount?.message}
															</FormErrorMessage>
														</FormControl>
													)}
													{/* Trạng thái của sản phẩm */}
													<Controller
														control={control}
														name="status"
														render={({
															field: { onChange, onBlur, value = "true", name, ref },
															fieldState: { error },
														}) => (
															<FormControl
																isInvalid={!!error}
																id="status"
															>
																<FormLabel
																	htmlFor="status"
																	fontSize="sm"
																	fontWeight="semibold"
																>
																	Trạng thái
																</FormLabel>

																<RadioGroup
																	onChange={onChange}
																	value={value}
																	defaultValue={value}
																	name={name}
																	ref={ref}
																>
																	<Stack
																		direction="row"
																		gap="4"
																	>
																		<Radio value="true">
																			<Text
																				fontSize="sm"
																				fontWeight="medium"
																			>
																				Đang bán
																			</Text>
																		</Radio>
																		<Radio value="false">
																			<Text
																				fontSize="sm"
																				fontWeight="medium"
																			>
																				Ngừng bán
																			</Text>
																		</Radio>
																	</Stack>
																</RadioGroup>

																<FormErrorMessage>
																	{error && error.message}
																</FormErrorMessage>
															</FormControl>
														)}
													/>
													{/* Có sẵn hàng hay không */}
													<Controller
														control={control}
														name="is_avaiable"
														render={({
															field: { onChange, onBlur, value = "true", name, ref },
															fieldState: { error },
														}) => (
															<FormControl
																isInvalid={!!error}
																id="is_avaiable"
															>
																<FormLabel
																	htmlFor="is_avaiable"
																	fontSize="sm"
																	fontWeight="semibold"
																>
																	Có sẵn hàng không?
																</FormLabel>

																<RadioGroup
																	onChange={onChange}
																	value={value}
																	defaultValue={"true"}
																	name={name}
																	ref={ref}
																>
																	<Stack
																		direction="row"
																		gap="4"
																	>
																		<Radio value="true">
																			<Text
																				fontSize="sm"
																				fontWeight="medium"
																			>
																				Có sẵn
																			</Text>
																		</Radio>
																		<Radio value="false">
																			<Text
																				fontSize="sm"
																				fontWeight="medium"
																			>
																				Hết hàng
																			</Text>
																		</Radio>
																	</Stack>
																</RadioGroup>

																<FormErrorMessage>
																	{error && error.message}
																</FormErrorMessage>
															</FormControl>
														)}
													/>
												</Flex>
											</CommonBox>
											{/* Thông tin về hàng tồn kho */}
											<CommonBox title="Hàng tồn kho">
												<Flex
													flexDir="column"
													gap="4"
												>
													<FormControl isInvalid={errors?.stock as any}>
														<FormLabel
															htmlFor="stock"
															fontSize="sm"
															fontWeight="semibold"
														>
															Số lượng
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
															placeholder="99"
															borderColor={errors?.stock && "border.error"}
														/>
														<FormErrorMessage>
															{(errors?.stock as any) && errors?.stock?.message}
														</FormErrorMessage>
													</FormControl>
												</Flex>
											</CommonBox>
											{/* Tùy chọn */}
											<CommonBox title="Tùy chọn">
												<Flex
													flexDir="column"
													gap="4"
												>
													<Controller
														control={control}
														name="category_id"
														rules={{ required: "Không được để trống" }}
														render={({
															field: { onChange, onBlur, value, name, ref },
															fieldState: { error },
														}) => (
															<FormControl
																isInvalid={!!error}
																id="category_id"
															>
																<FormLabel
																	htmlFor="price"
																	fontSize="sm"
																	fontWeight="semibold"
																>
																	Danh mục
																</FormLabel>

																<Select
																	name={name}
																	ref={ref}
																	onChange={onChange}
																	onBlur={onBlur}
																	value={value}
																	options={categories}
																	placeholder={
																		<Text
																			as="span"
																			fontSize="sm"
																		>
																			Laptop, Bàn phím,...
																		</Text>
																	}
																	components={OptionComponent}
																	closeMenuOnSelect={false}
																/>

																<FormErrorMessage>
																	{error && error.message}
																</FormErrorMessage>
															</FormControl>
														)}
													/>
													<Controller
														control={control}
														name="brand_id"
														rules={{ required: "Không được để trống" }}
														render={({
															field: { onChange, onBlur, value, name, ref },
															fieldState: { error },
														}) => (
															<FormControl
																isInvalid={!!error}
																id="brand_id"
															>
																<FormLabel
																	htmlFor="price"
																	fontSize="sm"
																	fontWeight="semibold"
																>
																	Thương hiệu
																</FormLabel>

																<Select
																	name={name}
																	ref={ref}
																	onChange={onChange}
																	onBlur={onBlur}
																	value={value}
																	options={brands}
																	placeholder={
																		<Text
																			as="span"
																			fontSize="sm"
																		>
																			Dell, Lenovo,...
																		</Text>
																	}
																	components={OptionComponent}
																	closeMenuOnSelect={false}
																/>

																<FormErrorMessage>
																	{error && error.message}
																</FormErrorMessage>
															</FormControl>
														)}
													/>
													<Controller
														control={control}
														name="tags"
														render={({
															field: { onChange, onBlur, value = [], name, ref },
															fieldState: { error },
														}) => (
															<FormControl
																isInvalid={!!error}
																id="tags"
															>
																<FormLabel
																	htmlFor="price"
																	fontSize="sm"
																	fontWeight="semibold"
																>
																	Tags
																	<Text
																		as="span"
																		fontSize="xs"
																		ml="1"
																		color="#8c98a4"
																		fontWeight="medium"
																	>
																		(không bắt buộc)
																	</Text>
																</FormLabel>

																<TagsInput
																	value={value}
																	onChange={onChange}
																	name="tags"
																	placeHolder="Tags"
																/>

																<FormErrorMessage>
																	{error && error.message}
																</FormErrorMessage>
															</FormControl>
														)}
													/>
												</Flex>
											</CommonBox>
										</Flex>
									</GridItem>
								</Grid>
							</TabPanel>
							{/* Dac diem cau hinh */}
							<TabPanel>
								<Grid
									gap="8"
									templateColumns="repeat(1, 1fr)"
								>
									<GridItem colSpan={8}>
										<Flex
											gap="6"
											flexDir="column"
										>
											{/* Thuộc tính của sả phẩm */}
											<CommonBox title="Đặc điểm">
												<Attributes
													control={control}
													register={register}
													errors={errors}
													getValues={getValues}
													setValue={setValue}
												/>
											</CommonBox>
										</Flex>
									</GridItem>
								</Grid>
							</TabPanel>
							<TabPanel>
								<CommonBox title="Thuộc tính">
									<Options
										register={register}
										control={control}
										errors={errors}
										setValue={setValue}
										getValues={getValues}
										watch={watch}
										resetField={resetField}
									/>
								</CommonBox>
							</TabPanel>
							<TabPanel>
								<CommonBox title="Biến thể">
									<Variants />
								</CommonBox>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
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
					// borderWidth="1px"
					// borderColor="#eef1f6"
					boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
				>
					<Button
						isLoading={isSubmitting}
						bgColor="bg.bgDelete"
						color="text.textDelete"
						onClick={() => reset()}
					>
						Hủy
					</Button>
					<Button
						isLoading={isSubmitting}
						type="submit"
						bgColor="bg.bgSuccess"
						color="text.textSuccess"
					>
						Tạo mới
					</Button>
				</Flex>
			</form>
		</Box>
	);
};

export default AddProductMangerView;
