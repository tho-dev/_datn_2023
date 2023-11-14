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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import DialogThinkPro from "~/components/DialogThinkPro";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import SelectThinkPro from "~/components/SelectThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { AppIcon, CloseSmallIcon } from "~/components/common/Icons";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import { useGetProducItemToBrandAndCategoryQuery } from "~/redux/api/collection";
import { useUpdateProductMutation } from "~/redux/api/product";
import { useCreatePromotionMutation, useUpdatePromotionMutation } from "~/redux/api/promotion";
import { formatNumber } from "~/utils/fc";

type Props = {
	onClose: () => void;
	promotion: any;
};

const ActionUpdatePromotion = ({ onClose, promotion }: Props) => {
	const toast = useToast();
	const columnHelper = createColumnHelper<any>();
	const [category, setCategory] = useState<any>([]);
	const [categories, setCategories] = useState<any>([]);
	const [defaultData, setDefaultData] = useState<any>({});
	const [query, setQuery] = useState({
		_page: 1,
		_limit: 10,
		_order: "asc",
		_sort: "created_at",
		_category: "",
	});

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

	const { data } = useGetAllCategoryQuery({
		_page: 1,
		_limit: 50,
		_order: "asc",
		_sort: "created_at",
	});

	useEffect(() => {
		if (data) {
			const categoryFilter = data?.data?.items?.map((item: any) => {
				return {
					label: item?.name,
					value: item?.slug,
				};
			});

			setCategories(categoryFilter);
			setQuery({
				...query,
				_category: categoryFilter?.[0]?.value,
			});
			setCategory(categoryFilter?.[0]);
		}
	}, [data]);

	useEffect(() => {
		if (data) {
			const categoryWatch = watch("category");
			setQuery({
				...query,
				_page: 1,
				_category: categoryWatch?.value,
			});
			setCategory(categoryWatch);
		}
	}, [watch("category")]);

	useEffect(() => {
		if (promotion) {
			const filterPromtion = {
				...promotion,
				items: promotion?.items?.map((item: any) => item._id),
			};

			setDefaultData(filterPromtion);
			reset(filterPromtion);
		}
	}, [reset, promotion]);

	const onSubmit = async ({ category, max_percent, slug, min_sale_price, ...values }: any) => {
		values = {
			...values,
			category: undefined,
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
					<Box mb="4">
						<SelectThinkPro
							control={control}
							name="category"
							title=""
							placeholder="-- Danh mục --"
							data={categories}
							defaultValue={[category]}
						/>
					</Box>

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
										useData={useGetProducItemToBrandAndCategoryQuery}
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
