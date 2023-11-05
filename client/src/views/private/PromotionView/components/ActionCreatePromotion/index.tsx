import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import FileUploadThinkPro from "~/components/FileUploadThinkPro";
import SelectThinkPro from "~/components/SelectThinkPro";
import { AppIcon, CloseSmallIcon } from "~/components/common/Icons";
import { useCreateBrandMutation } from "~/redux/api/brand";
import { useDisclosure } from "@chakra-ui/react";
import DialogThinkPro from "~/components/DialogThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { createColumnHelper } from "@tanstack/react-table";
import { useGetAllProductQuery } from "~/redux/api/product";

type Props = {
	onClose: () => void;
};

const ActionPromotion = ({ onClose }: Props) => {
	const toast = useToast();
	const columnHelper = createColumnHelper<any>();
	const { isOpen: isOpenProduct, onClose: onCloseProduct, onOpen: onOpenProduct } = useDisclosure();

	const {
		control,
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		watch,
		reset,
	} = useForm();

	const [createBrand, { isLoading }] = useCreateBrandMutation();

	const onSubmit = async (data: any) => {
		data = {
			...data,
			parent_id: data?.parent_id?.value,
			category_id: data?.category_id?.value,
		};

		try {
			await createBrand(data).unwrap();
			toast({
				title: "Thành công",
				duration: 1600,
				position: "top-right",
				status: "success",
				description: "Tạo danh mục thành công",
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
				const index = row.index + 1;
				const { pageIndex, pageSize } = table.getState().pagination;
				return pageIndex * pageSize + index;
			},
			header: "#",
		}),
		columnHelper.accessor("name", {
			cell: (info) => {
				return <Text fontSize="sm">{info.getValue()}</Text>;
			},
			header: "Khuyến mãi",
		}),
	];

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
								htmlFor="meta_description"
								fontWeight="semibold"
							>
								Meta description
							</FormLabel>
							<Textarea
								id="meta_description"
								size="lager"
								p="4"
								fontSize="sm"
								boxShadow="none"
								placeholder="Meta description"
								{...register("seo.meta_description", {
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
								Sản phẩm
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
					bgColor="bg.bgSuccess"
					textColor="text.textSuccess"
					fontWeight="bold"
					leftIcon={<CloseSmallIcon size={4} />}
					px="4"
					isLoading={isLoading}
				>
					Tạo mới
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
						<Box display="inline-flex">
							<SelectThinkPro
								control={control}
								name="category"
								title="Danh mục"
								placeholder="-- Danh mục --"
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
						</Box>
					</Box>
					<TableThinkPro
						columns={columns}
						useData={useGetAllProductQuery}
						query={{
							_page: 1,
							_limit: 10,
							_order: "asc",
							_sort: "created_at",
						}}
					/>
				</Box>
			</DialogThinkPro>
		</form>
	);
};

export default ActionPromotion;
