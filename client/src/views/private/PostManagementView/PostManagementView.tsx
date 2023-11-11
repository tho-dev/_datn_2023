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
import ActionUpdatePost from "./components/UpdatePostMangerView/input";
import { useDeletePostMutation, useGetAllPostQuery } from "~/redux/api/post";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import moment from "moment/moment";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import PostDialogThinkPro from "~/components/DialogThinkPro/PostDialogThinkPro";
import AddPostMangerView from "./components/AddPostMangerView/AddPostMangerView";
import SelectThinkPro from "~/components/SelectThinkPro";
import { useForm } from "react-hook-form";

type Props = {};

const PostView = (props: Props) => {
	const toast = useToast();
	const [id, setId] = useState(null);
	const [post, setPost] = useState<any>(null);
	const [parents, setParents] = useState<any>([]);
	const [category, setCategory] = useState<any>(null);
	const columnHelper = createColumnHelper<any>();
	// const {
	// 	isOpen: isOpenActionCreatePost,
	// 	onOpen: onOpenActionCreatePost,
	// 	onClose: onCloseActionCreatePost,
	// } = useDisclosure();
	const {
		isOpen: isOpenActionUpdateCategory,
		onOpen: onOpenActionUpdateCategory,
		onClose: onCloseActionUpdateCategory,
	} = useDisclosure();
	const { isOpen: isOpenComfirm, onOpen: onOpenConfirm, onClose: onCloseComfirm } = useDisclosure();

	const { control } = useForm();

	const [deletePost] = useDeletePostMutation();
	const { data: categories, isLoading } = useGetAllCategoryQuery({
		_limit: 20,
		_page: 1,
		_sort: "created_at",
		_order: "desc",
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

	const handleDeletePost = async () => {
		try {
			await deletePost(id as any).unwrap();
			toast({
				title: "Thành công",
				duration: 1600,
				position: "top-right",
				status: "success",
				description: "Xóa nhu cầu thành công",
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
			cell: (info) => {
				const index = info.row.index;
				return (
					<Text
						fontSize="13px"
						fontWeight="medium"
					>
						{index + 1}
					</Text>
				);
			},
			header: "#",
		}),
		columnHelper.accessor("title", {
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
			header: "Bài viết",
		}),
		columnHelper.accessor("category", {
			cell: ({ getValue }) => {
				return (
					<Text
						fontSize="13px"
						fontWeight="medium"
					>
						{getValue()}
					</Text>
				);
			},
			header: "Danh mục",
		}),
		columnHelper.accessor("thumbnail", {
			cell: ({ getValue }) => {
				return (
					<Image
						src={getValue()}
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
		columnHelper.accessor("slug", {
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
						/{info.getValue()}
					</Text>
				);
			},
			header: "Đường dẫn",
		}),
		columnHelper.accessor("description", {
			cell: (info) => {
				const description = info.getValue();
				return (
					<Text
						fontWeight="medium"
						fontSize="13px"
						css={{
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							"& p": {
								display: "inline",
							},
						}}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
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
										title: doc?.title,
										thumbnail: doc?.thumbnail,
										parent_id: parent_id,
										category_id: {
											label: doc?.category?.name,
											value: doc?.category?.category_id,
										},
										description: doc?.description,
										content: doc?.content,
										meta_keyword: doc?.meta_keyword,
										meta_description: doc?.meta_description,
										meta_title: doc?.meta_title,
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
						Danh Sách Bài Viết
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
								<BreadcrumbLink href="bai-viet">Bài viết</BreadcrumbLink>
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
						w="50%"
						gap="4"
					>
						<Box>
							<SelectThinkPro
								title=""
								control={control}
								data={parents}
								name="category_id"
								placeholder="-- Danh mục --"
							/>
						</Box>

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
								placeholder="Tìm kiếm danh mục bài viết"
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
						// onClick={onOpenActionCreatePost}
						as={ReactRouterLink}
						to="/admin/bai-viet/add"
					>
						Tạo Mới
					</Button>
				</Flex>

				{/* Danh sách */}
				<TableThinkPro
					columns={columns}
					useData={useGetAllPostQuery}
					defaultPageSize={10}
					query={{
						_page: 1,
						_limit: 20,
						_order: "desc",
						_sort: "created_at"
					}}
				/>

				{/* Cofirm */}
				<ConfirmThinkPro
					isOpen={isOpenComfirm}
					onClose={onCloseComfirm}
					content="Bạn có muốn xóa bỏ nhu cầu này không?"
					handleClick={handleDeletePost}
				/>
			</Box>
			{/* Form */}
			{/* <PostDialogThinkPro
				isOpen={isOpenActionCreatePost}
				onClose={onCloseActionCreatePost}
				isCentered
				title={<Heading fontSize="18">Tạo mới bài viết</Heading>}
			>
				<AddPostMangerView
					onClose={onCloseActionCreatePost}
					parents={parents}  />
			</PostDialogThinkPro> */}

			<PostDialogThinkPro
				isOpen={isOpenActionUpdateCategory}
				onClose={onCloseActionUpdateCategory}
				isCentered
				title={
					<Heading
						fontSize="16"
						textTransform="uppercase"
					>
						Cập nhật bài viết
					</Heading>
				}
			>
				<ActionUpdatePost
					onClose={onCloseActionUpdateCategory}
					category={category}
					parents={parents}
				/>
			</PostDialogThinkPro>
		</>
	);
};

export default PostView;