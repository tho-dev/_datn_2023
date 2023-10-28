import { Link as ReactRouterLink } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { SearchIcon, PlusCircleIcon, TraskIcon, EditIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";
import ActionCreateCategory from "./components/ActionCreateCategory";
import ActionUpdateCategory from "./components/ActionUpdateCategory";
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from "~/redux/api/category";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import moment from "moment/moment";

type Props = {};

const PostCategoryView = (props: Props) => {
	const toast = useToast();
	// thương hiệu cha
	const [id, setId] = useState(null);
	const [category, setCategory] = useState<any>(null);
	const [parents, setParents] = useState<any>([]);
	const columnHelper = createColumnHelper<any>();
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

	const [deleteCategory] = useDeleteCategoryMutation();
	const { data: categories, isLoading } = useGetAllCategoryQuery({
		_limit: 20,
		_page: 1,
		_sort: "created_at",
		_order: "asc",
		_type: "category_post",
	});

	useEffect(() => {
		if (categories) {
			const parentsFilter = categories?.data?.items?.map((category: any) => ({
				label: category?.name,
				value: category?._id,
			}));

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
				description: "Xóa danh mục bài viết thành công",
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
				return pageIndex * pageSize + index;
			},
			header: "#",
		}),
		columnHelper.accessor("name", {
			cell: (info) => {
				return <Text fontSize="sm">{info.getValue()}</Text>;
			},
			header: "Danh mục",
		}),
		columnHelper.accessor("slug", {
			cell: (info) => `/${info.getValue()}`,
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
						fontSize="sm"
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
				rounded="lg"
			>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					pb="5"
				>
					<Heading
						as="h2"
						fontSize="18px"
						fontWeight="semibold"
					>
						Danh mục bài viết
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
								<BreadcrumbLink href="/admin/danh-muc-bai-viet">Danh mục bài viết</BreadcrumbLink>
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
						px="4"
						rounded="4px"
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
							placeholder="Danh mục..."
						/>
					</Flex>
					<Button
						leftIcon={
							<PlusCircleIcon
								size={5}
								color="text.white"
							/>
						}
						px="4"
						lineHeight="2"
						bgColor="bg.green"
						onClick={onOpenActionCreateCategory}
					>
						Tạo Mới
					</Button>
				</Flex>

				{/* Danh sách */}
				<TableThinkPro
					columns={columns}
					useData={useGetAllCategoryQuery}
					defaultPageSize={20}
					query={{
						_limit: 20,
						_page: 1,
						_sort: "created_at",
						_order: "desc",
						_type: "category_post",
					}}
				/>

				{/* Cofirm */}
				<ConfirmThinkPro
					isOpen={isOpenComfirm}
					onClose={onCloseComfirm}
					content="Bạn có muốn xóa bỏ danh mục này không?"
					handleClick={handleDeleteCategory}
				/>
			</Box>
			{/* Form */}
			<DialogThinkPro
				isOpen={isOpenActionCreateCategory}
				onClose={onCloseActionCreateCategory}
				isCentered
				title={<Heading fontSize="18">Tạo mới danh mục bài viết</Heading>}
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
				title={<Heading fontSize="18">Cập nhật danh mục bài viết</Heading>}
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

export default PostCategoryView;
