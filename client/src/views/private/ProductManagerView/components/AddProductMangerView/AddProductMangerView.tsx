import React, { useEffect, useState } from "react";
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
import SelectThinkPro from "~/components/SelectThinkPro";
import { useGetAllBrandsQuery } from "~/redux/api/brand";
import { useGetAllCategoryQuery } from "~/redux/api/category";

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
	// xử lý value quill và react-hook-form
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
	} = useForm();

	const [brandsFilter, setBrandsFilter] = useState<any>([]);
	const [categoriesFilter, setCategoriesFilter] = useState<any>([]);

	// xử lý call api
	const { data: brands } = useGetAllBrandsQuery({
		_page: 1,
		_limit: 200,
		_order: "desc",
		_sort: "created_at",
	});

	const { data: categories } = useGetAllCategoryQuery({
		_page: 1,
		_limit: 50,
		_order: "desc",
		_sort: "created_at",
		_type: "category_brand",
	});

	useEffect(() => {
		if (brands && categories) {
			const selectBrands = brands?.data?.items?.map((brand: any) => ({
				label: brand?.name,
				value: brand?._id,
			}));

			const selectCategories = categories?.data?.items?.map((category: any) => ({
				label: category?.name,
				value: category?._id,
			}));

			setBrandsFilter(selectBrands);
			setCategoriesFilter(selectCategories);
		}
	}, [brands, categories]);

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
			bgColor="bg.white"
			py="8"
			px="6"
			rounded="lg"
		>
			<Heading
				fontSize="18"
				color="text.black"
				lineHeight="100%"
			>
				Tạo mới sản phẩm
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
													fontSize="sm"
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
												{(errors?.video_review as any) && errors?.video_review?.message}
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
													fontSize="sm"
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
												{(errors?.description as any) && errors?.description?.message}
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
										control={control}
									/>
								</CommonBox>
								{/* Thuộc tính của sản phẩm */}
								<CommonBox title="Đặc điểm">
									<Attributes
										control={control}
										register={register}
										errors={errors}
										getValues={getValues}
										setValue={setValue}
									/>
								</CommonBox>
								{/* Thuộc tính của sản phẩm */}
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
								{/* Biến thể của sản phẩm */}
								<CommonBox title="Biến thể">
									<Variants />
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

													<FormErrorMessage>{error && error.message}</FormErrorMessage>
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
													{(errors?.gift_amount as any) && errors?.gift_amount?.message}
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

													<FormErrorMessage>{error && error.message}</FormErrorMessage>
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

													<FormErrorMessage>{error && error.message}</FormErrorMessage>
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
										<SelectThinkPro
											title="Danh mục"
											control={control}
											data={categoriesFilter}
											name="category_id"
											placeholder="-- Danh mục --"
											rules={{ required: "Không được để trống" }}
										/>

										<SelectThinkPro
											title="Thương hiệu"
											control={control}
											data={brandsFilter}
											name="brand_id"
											placeholder="-- Thương hiệu --"
											rules={{ required: "Không được để trống" }}
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
															fontSize="sm"
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

													<FormErrorMessage>{error && error.message}</FormErrorMessage>
												</FormControl>
											)}
										/>
									</Flex>
								</CommonBox>
							</Flex>
						</GridItem>
					</Grid>
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
					borderWidth="1px"
					borderColor="#eef1f6"
					boxShadow="0 0.375rem 0.75rem rgba(140,sm2,164,.075)"
				>
					<Button
						w={"40"}
						isLoading={isSubmitting}
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
