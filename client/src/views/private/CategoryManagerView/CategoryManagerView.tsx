import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Image,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import DialogThinkPro from "~/components/DialogThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { EditIcon, PlusCircleIcon, SearchIcon, TraskIcon } from "~/components/common/Icons";
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from "~/redux/api/category";
import ActionCreateCategory from "./components/ActionCreateCategory";
import ActionUpdateCategory from "./components/ActionUpdateCategory";
import { useDebounce } from "@uidotdev/usehooks";

type TQuery = {
	_limit: number;
	_page: number;
	_sort: string;
	_order: string;
	_type: string;
	_name?: string;
};

const CategoryManagerView = () => {
	const toast = useToast();
	const columnHelper = createColumnHelper<any>();

	const [id, setId] = useState(null);
	const [category, setCategory] = useState<any>(null);
	const [parents, setParents] = useState<any>([]);
	const [query, setQuery] = useState<TQuery>({
		_limit: 20,
		_page: 1,
		_sort: "created_at",
		_order: "desc",
		_type: "category_brand",
	});
	const debounceQuery = useDebounce(query, 500);

	const {
		isOpen: isOpenActionCreateCategory,
		onOpen: onOpenActionCreateCategory,
		onClose: onCloseActionCreateCategory,
	} = useDisclosure();
	const {
		isOpen: isOpenActionUpdateCategory,
		onOpen: onOpenActionUpdateCategory,
		onClose: onCloseActionUpdateCategory,
	} = useDisclosure();
	const { isOpen: isOpenComfirm, onOpen: onOpenConfirm, onClose: onCloseComfirm } = useDisclosure();

	const { control, register } = useForm({
		defaultValues: {
			name: "",
		},
	});
	const nameForm = useWatch({
		control,
		name: "name",
	});

	const [deleteCategory] = useDeleteCategoryMutation();
	const { data: categories, isLoading } = useGetAllCategoryQuery({
		_limit: 30,
		_page: 1,
		_sort: "created_at",
		_order: "desc",
		_type: "category_brand",
	});

	useEffect(() => {
		if (query) {
			setQuery({
				...query,
				_name: nameForm,
			});
		}
	}, [nameForm]);

	useEffect(() => {
		if (categories) {
			const parentsFilter = categories?.data?.items?.map((category: any) => {
				return {
					label: category?.name,
					value: category?._id,
				};
			});

			setParents(parentsFilter);
		}
	}, [categories, isLoading]);

	const handleDeleteCategory = async () => {
		try {
			await deleteCategory(id).unwrap();
			toast({
				title: "Thành công",
				duration: 1600,
				position: "top-right",
				status: "success",
				description: "Xóa danh mục thành công",
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

		onCloseComfirm();
	};

	const columns = [
		columnHelper.accessor("#", {
			cell: ({ row, table }) => {
				const index = row.index + 1;
				const { pageIndex, pageSize } = table.getState().pagination;

				return (
					<Text
						fontSize="13px"
						fontWeight="medium"
					>
						{pageIndex * pageSize + index}
					</Text>
				);
			},
			header: "#",
		}),
		columnHelper.accessor("name", {
			cell: (info) => {
				return (
					<Text
						fontWeight="medium"
						fontSize="13px"
					>
						{info.getValue()}
					</Text>
				);
			},
			header: "Danh mục",
		}),
		columnHelper.accessor("slug", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					/{info.getValue()}
				</Text>
			),
			header: "Đường dẫn",
		}),
		columnHelper.accessor("thumbnail", {
			cell: ({ getValue }) => {
				return (
					<Image
						src={getValue()?.url}
						w="64px"
						h="64px"
						objectFit="contain"
						bgColor="bg.gray"
						rounded="md"
						p="2"
					/>
				);
			},
			header: "Ảnh",
		}),

		columnHelper.accessor("description", {
			cell: (info) => {
				return (
					<Text
						fontWeight="medium"
						fontSize="13px"
						css={{
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{info.getValue()}
					</Text>
				);
			},
			header: "Mô tả",
		}),
		columnHelper.accessor("created_at", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}
				</Text>
			),
			header: "Ngày tạo",
		}),
		columnHelper.accessor("updated_at", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}
				</Text>
			),
			header: "Ngày cập nhật",
		}),
		columnHelper.accessor("action", {
			cell: ({ row }) => {
				const doc = row?.original;

				return (
					<Menu>
						<MenuButton textAlign="center">
							<Text
								fontSize="18"
								fontWeight="semibold"
								textAlign="center"
								ml={3}
							>
								...
							</Text>
						</MenuButton>
						<MenuList w="100px">
							<MenuItem
								py="2"
								icon={<TraskIcon size={4} />}
								onClick={() => {
									setId(doc?._id);
									onOpenConfirm();
								}}
							>
								Xóa
							</MenuItem>
							<MenuItem
								py="2"
								icon={<EditIcon size={4} />}
								onClick={() => {
									const parent_id = parents?.find((item: any) => item?.value == doc?.parent_id);
									setCategory({
										_id: doc?._id,
										name: doc?.name,
										thumbnail: doc?.thumbnail,
										parent_id: parent_id,
										description: doc?.description,
									});
									onOpenActionUpdateCategory();
								}}
							>
								Cập Nhật
							</MenuItem>
						</MenuList>
					</Menu>
				);
			},
			header: "Action",
		}),
	];

	return (
		<>
			<Box
				bgColor="bg.white"
				px="6"
				py="8"
				mb="8"
				rounded="xl"
			>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					pb="5"
				>
					<Heading
						as="h2"
						fontSize="18"
						fontWeight="semibold"
						textTransform="uppercase"
					>
						Danh Sách Danh Mục
					</Heading>
					<Box>
						<Breadcrumb
							spacing="8px"
							separator="/"
							fontSize="sm"
						>
							<BreadcrumbItem>
								<BreadcrumbLink
									as={ReactRouterLink}
									to="/admin"
								>
									Home
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem isCurrentPage>
								<BreadcrumbLink href="/admin/danh-muc">Danh mục</BreadcrumbLink>
							</BreadcrumbItem>
						</Breadcrumb>
					</Box>
				</Flex>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					mb="6"
				>
					<Flex
						w="30%"
						gap="4"
					>
						<Flex
							flex="1"
							px="4"
							rounded="8px"
							alignItems="center"
							borderWidth="1px"
							borderColor="#e9ebec"
						>
							<Flex
								as="span"
								alignItems="center"
								justifyContent="center"
							>
								<SearchIcon
									size={5}
									color="text.black"
									strokeWidth={1}
								/>
							</Flex>
							<Input
								border="none"
								padding="0.6rem 0.9rem"
								fontSize="15"
								fontWeight="medium"
								lineHeight="1.5"
								w="260px"
								placeholder="Tìm kiếm danh mục"
								{...register("name")}
							/>
						</Flex>
					</Flex>
					<Button
						leftIcon={
							<PlusCircleIcon
								size={5}
								color="text.textSuccess"
							/>
						}
						px="4"
						lineHeight="2"
						color="text.textSuccess"
						bgColor="bg.bgSuccess"
						onClick={onOpenActionCreateCategory}
					>
						Tạo Mới
					</Button>
				</Flex>

				{/* Danh sách */}
				<TableThinkPro
					columns={columns}
					useData={useGetAllCategoryQuery}
					defaultPageSize={10}
					query={debounceQuery}
				/>

				{/* Cofirm */}
				<ConfirmThinkPro
					isOpen={isOpenComfirm}
					onClose={onCloseComfirm}
					content="Bạn có muốn xóa bỏ thương hiệu này không?"
					handleClick={handleDeleteCategory}
				/>
			</Box>
			{/* Form */}
			<DialogThinkPro
				isOpen={isOpenActionCreateCategory}
				onClose={onCloseActionCreateCategory}
				isCentered
				title={
					<Heading
						fontSize="16"
						textTransform="uppercase"
					>
						Tạo mới danh mục
					</Heading>
				}
			>
				<ActionCreateCategory
					onClose={onCloseActionCreateCategory}
					parents={parents}
				/>
			</DialogThinkPro>
			<DialogThinkPro
				isOpen={isOpenActionUpdateCategory}
				onClose={onCloseActionUpdateCategory}
				isCentered
				title={
					<Heading
						fontSize="16"
						textTransform="uppercase"
					>
						Cập nhật danh mục
					</Heading>
				}
			>
				<ActionUpdateCategory
					onClose={onCloseActionUpdateCategory}
					category={category}
					parents={parents}
				/>
			</DialogThinkPro>
		</>
	);
};

export default CategoryManagerView;
