import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import DialogThinkPro from "~/components/DialogThinkPro";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import SelectThinkPro from "~/components/SelectThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { AppIcon, CloseSmallIcon } from "~/components/common/Icons";
import { useGetAllBrandsQuery } from "~/redux/api/brand";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import { useGetProducItemToBrandAndCategoryQuery } from "~/redux/api/collection";
import { useGetAllProductManagerQuery, useUpdateProductMutation } from "~/redux/api/product";
import { useCreatePromotionMutation, useUpdatePromotionMutation } from "~/redux/api/promotion";
import { formatNumber } from "~/utils/fc";

type Props = {
	onClose: () => void;
	promotion: any;
};

const ActionUpdatePromotion = ({ onClose, promotion }: Props) => {
	const toast = useToast();
	const columnHelper = createColumnHelper<any>();
	const [categoriesFilter, setCategoriesFilter] = useState<any>([]);
	const [brandsFilter, setBrandsFilter] = useState<any>([]);
	const [defaultData, setDefaultData] = useState<any>({});

	const { isOpen: isOpenProduct, onClose: onCloseProduct, onOpen: onOpenProduct } = useDisclosure();

	const [updatePromotion] = useUpdatePromotionMutation();

	const {
		control,
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		watch,
		reset,
	} = useForm({
		defaultValues: defaultData,
	});

	const categoryForm = useWatch({
		control,
		name: "category",
	});
	const brandForm = useWatch({
		control,
		name: "brand",
	});

	const query = useMemo(() => {
		return {
			_page: 1,
			_limit: 10,
			_order: "desc",
			_sort: "created_at",
			_category: categoryForm?.value,
			_brand: brandForm?.value,
		};
	}, [categoryForm, brandForm]);

	const { data: brands } = useGetAllBrandsQuery(
		{
			_limit: 100,
			_page: 1,
			_sort: "created_at",
			_order: "desc",
			_category: categoryForm?.value as string,
		},
		{
			skip: !categoryForm?.value,
		}
	);
	const { data: categories } = useGetAllCategoryQuery({
		_limit: 20,
		_page: 1,
		_sort: "created_at",
		_order: "desc",
		_type: "category_brand",
	});

	useEffect(() => {
		if (brands) {
			setValue("brand", "");
			const brandsRes = brands?.data?.items?.map((brand: any) => {
				return {
					label: brand?.name,
					value: brand?._id,
				};
			});
			setBrandsFilter(brandsRes);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [brands, categoryForm]);

	useEffect(() => {
		if (categories) {
			const categoriesFilter = categories?.data?.items?.map((brand: any) => {
				return {
					label: brand?.name,
					value: brand?._id,
				};
			});

			setCategoriesFilter(categoriesFilter);
			setValue("category", categoriesFilter[0]);
		}
	}, [categories]);

	useEffect(() => {
		if (promotion) {
			const filterPromtion = {
				...promotion,
				items: promotion?.items?.map((item: any) => item._id),
			};

			console.log("filterPromtion", filterPromtion);

			setDefaultData(filterPromtion);
			reset(filterPromtion);
		}
	}, [reset, promotion]);

	const onSubmit = async ({ category, brand, max_percent, slug, min_sale_price, ...values }: any) => {
		values = {
			...values,
			status: values?.status?.value,
			start_time: new Date(values.start_time).toISOString(),
			expired_time: new Date(values.expired_time).toISOString(),
		};

		try {
			await updatePromotion(values).unwrap();
			toast({
				title: "Thành công",
				duration: 1600,
				position: "top-right",
				status: "success",
				description: "Cập nhật khuyến mãi thành công",
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

		reset();
		onClose();
	};

	const columns = [
		columnHelper.accessor("#", {
			cell: ({ row, table }) => {
				const doc = row.original;

				return (
					<Checkbox
						value={doc._id}
						name="items"
					/>
				);
			},
			header: "#",
		}),
		columnHelper.accessor("name", {
			cell: ({ getValue }) => {
				return (
					<Text
						fontSize="13px"
						fontWeight="medium"
						display="inline-block"
					>
						{getValue()}
					</Text>
				);
			},
			header: "Sản phẩm",
		}),
		columnHelper.accessor("option_value", {
			cell: ({ getValue }) => {
				const values = getValue();
				return (
					<Flex gap="1">
						{values?.map((value: any, index: number) => {
							return (
								<Text
									key={index}
									fontSize="13px"
									fontWeight="medium"
									px="4"
									py="1"
									display="inline-flex"
									borderWidth="1px"
									borderColor="border.primary"
									rounded="md"
								>
									{value}
								</Text>
							);
						})}
					</Flex>
				);
			},
			header: "Biến thể",
		}),
		columnHelper.accessor("price_before_discount", {
			cell: ({ getValue }) => (
				<Text
					fontSize="13px"
					fontWeight="medium"
				>
					{formatNumber(`${getValue()}`)}
				</Text>
			),
			header: "Giá gốc",
		}),
		columnHelper.accessor("price", {
			cell: ({ getValue }) => (
				<Text
					fontSize="13px"
					fontWeight="medium"
				>
					{formatNumber(`${getValue()}`)}
				</Text>
			),
			header: "Giá khuyến mãi",
		}),
		columnHelper.accessor("colors", {
			cell: ({ getValue }) => {
				const colors = getValue();
				return (
					<Flex gap="2">
						{colors?.map((color: any, index: number) => {
							return (
								<Box
									key={index}
									w="14px"
									h="14px"
									bgColor={color.value}
									rounded="2px"
								/>
							);
						})}
					</Flex>
				);
			},
			header: "Màu sắc",
		}),
	];

	console.log("w", watch("start_time"));

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex
				flexDir="column"
				gap="4"
			>
				<FormControl isInvalid={errors.file as any}>
					<Flex
						justifyContent="center"
						mt="8"
					>
						<Box
							w="60%"
							h="260px"
						>
							<FileUploadThinkPro
								fileName="banner"
								getDataFn={(data: any) => setValue("thumbnail", data)}
								setData={watch("thumbnail")}
							/>
						</Box>
					</Flex>

					<FormErrorMessage>{(errors.thumbnail as any) && errors?.thumbnail?.message}</FormErrorMessage>
				</FormControl>

				<Flex
					mt="6"
					gap="6"
				>
					<Flex
						flexDir="column"
						flex="2"
						gap="4"
					>
						<FormControl isInvalid={errors.name as any}>
							<FormLabel
								htmlFor="name"
								fontSize="15"
								fontWeight="semibold"
							>
								Khuyến mãi
							</FormLabel>
							<Input
								id="name"
								placeholder="Khuyến mãi"
								{...register("name", {
									required: "Không được để trống !!!",
								})}
							/>
							<FormErrorMessage>{(errors.name as any) && errors?.name?.message}</FormErrorMessage>
						</FormControl>

						<FormControl>
							<FormLabel
								htmlFor="seo.title"
								fontSize="15"
								fontWeight="semibold"
							>
								Meta title
							</FormLabel>
							<Input
								id="seo.title"
								placeholder="Meta title"
								{...register("seo.title")}
							/>
						</FormControl>

						<Controller
							control={control}
							name="seo.tags"
							render={({ field: { onChange, onBlur, value = [], name, ref }, fieldState: { error } }) => (
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
									</FormLabel>

									<TagsInput
										value={value}
										onChange={onChange}
										name="tags"
										placeHolder="Tags"
									/>
								</FormControl>
							)}
						/>

						<FormControl>
							<FormLabel
								fontSize="15"
								htmlFor="description"
								fontWeight="semibold"
							>
								Meta description
							</FormLabel>
							<Textarea
								id="description"
								size="lager"
								p="4"
								fontSize="sm"
								boxShadow="none"
								placeholder="Meta description"
								{...register("seo.description", {
									required: "Không được để trống !!!",
								})}
							/>
						</FormControl>
					</Flex>

					<Flex
						flexDir="column"
						gap="4"
						flex="2"
					>
						<FormControl isInvalid={errors.start_time as any}>
							<FormLabel
								htmlFor="start_time"
								fontSize="15"
								fontWeight="semibold"
							>
								Ngày bắt đầu
							</FormLabel>
							<Input
								id="start_time"
								type="datetime-local"
								{...register("start_time", {
									required: "Không được để trống !!!",
								})}
							/>
							<FormErrorMessage>
								{(errors.start_time as any) && errors?.start_time?.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errors.expired_time as any}>
							<FormLabel
								htmlFor="expired_time"
								fontSize="15"
								fontWeight="semibold"
							>
								Ngày kết thúc
							</FormLabel>
							<Input
								id="expired_time"
								type="datetime-local"
								{...register("expired_time", {
									required: "Không được để trống !!!",
								})}
							/>
							<FormErrorMessage>
								{(errors.expired_time as any) && errors?.expired_time?.message}
							</FormErrorMessage>
						</FormControl>
						<SelectThinkPro
							control={control}
							name="status"
							title="Trạng thái"
							placeholder="-- Chọn trạng thái --"
							data={[
								{
									label: "Đang khuyến mãi",
									value: true,
								},
								{
									label: "Ngừng khuyến mãi",
									value: false,
								},
							]}
						/>
						<FormControl isInvalid={errors.description as any}>
							<FormLabel
								fontSize="15"
								htmlFor="description"
								fontWeight="semibold"
							>
								Mô tả
							</FormLabel>
							<Textarea
								id="description"
								size="lager"
								p="4"
								fontSize="sm"
								boxShadow="none"
								placeholder="Mô tả"
								{...register("description", {
									required: "Không được để trống !!!",
								})}
							/>
							<FormErrorMessage>
								{(errors.description as any) && errors?.description?.message}
							</FormErrorMessage>
						</FormControl>
					</Flex>

					<Flex
						flexDir="column"
						gap="4"
						flex="1"
					>
						<FormControl>
							<FormLabel
								fontSize="15"
								fontWeight="semibold"
							>
								Chọn sản phẩm áp dụng
							</FormLabel>
							<Button
								w="full"
								bgColor="bg.bgEdit"
								color="text.textEdit"
								leftIcon={
									<AppIcon
										size={5}
										color="text.textEdit"
									/>
								}
								onClick={onOpenProduct}
							>
								Sản phẩm ({watch("items")?.length ? watch("items")?.length : 0})
							</Button>
						</FormControl>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				gap="3"
				justifyContent="flex-end"
				mt="6"
			>
				<Button
					textColor="text.textDelete"
					fontWeight="bold"
					bgColor="bg.bgDelete"
					px="4"
					leftIcon={<CloseSmallIcon size={4} />}
					onClick={onClose}
				>
					Đóng
				</Button>
				<Button
					type="submit"
					bgColor="bg.bgEdit"
					textColor="text.textEdit"
					fontWeight="bold"
					leftIcon={<CloseSmallIcon size={4} />}
					px="4"
				>
					Cập nhật
				</Button>
			</Flex>

			<DialogThinkPro
				isOpen={isOpenProduct}
				onClose={onCloseProduct}
				isCentered
				size="full"
				title={
					<Heading
						fontSize="md"
						fontWeight="bold"
						textTransform="uppercase"
					>
						Danh Sách Sản Phẩm
					</Heading>
				}
			>
				<Box>
					<Flex gap="4">
						<Box
							display="inline-block"
							mb="4"
						>
							<SelectThinkPro
								control={control}
								name="category"
								title=""
								placeholder="-- Danh mục --"
								data={categoriesFilter}
							/>
						</Box>
						<Box
							display="inline-block"
							mb="4"
						>
							<SelectThinkPro
								control={control}
								name="brand"
								title=""
								placeholder="-- Thương hiệu --"
								data={brandsFilter}
							/>
						</Box>
					</Flex>

					<Controller
						control={control}
						name={`items`}
						render={({ field: { ref: _ref, ...field }, fieldState: { error } }) => (
							<FormControl
								isInvalid={!!error}
								id="items"
							>
								<CheckboxGroup {...field}>
									<TableThinkPro
										columns={columns}
										useData={useGetAllProductManagerQuery}
										query={query}
									/>
								</CheckboxGroup>
							</FormControl>
						)}
					/>
				</Box>
			</DialogThinkPro>
		</form>
	);
};

export default ActionUpdatePromotion;
