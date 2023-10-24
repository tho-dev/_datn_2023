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
// import ActionCreatePost from "./components/AddPostMangerView/input";
import ActionUpdatePost from "./components/UpdatePostMangerView/input";
import { useDeletePostMutation, useGetAllPostQuery } from "~/redux/api/post";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import moment from "moment/moment";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import PostDialogThinkPro from "~/components/DialogThinkPro/PostDialogThinkPro";
import AddPostMangerView from "./components/AddPostMangerView/AddPostMangerView";


type Props = {};

const PostView = (props: Props) => {
	const toast = useToast();
	const [id, setId] = useState(null);
	const [post, setPost] = useState<any>(null);
	const [parents, setParents] = useState<any>([]);
	const columnHelper = createColumnHelper<any>();
	const {
		isOpen: isOpenActionCreatePost,
		onOpen: onOpenActionCreatePost,
		onClose: onCloseActionCreatePost,
	} = useDisclosure();
	const {
		isOpen: isOpenActionUpdatePost,
		onOpen: onOpenActionUpdatePost,
		onClose: onCloseActionUpdatePost,
	} = useDisclosure();
	const { isOpen: isOpenComfirm, onOpen: onOpenConfirm, onClose: onCloseComfirm } = useDisclosure();

	const [deletePost] = useDeletePostMutation();
	const { data: categories, isLoading } = useGetAllCategoryQuery({
		_limit: 20,
		_page: 1,
		_parent: true,
		_sort: "created_at",
		_order: "desc",
		_type: "category_post",
	});

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
									const category_id = parents?.find((item: any) => item?.value == doc?.category_id);
									setPost({
										_id: doc?._id,
										title: doc?.title,
										thumbnail: doc?.thumbnail,
										category_id: category_id,
										description: doc?.description,
										content: doc?.content,
										meta_keyword: doc?.meta_keyword,
										meta_description: doc?.meta_description,
										meta_title: doc?.meta_title,
									});
									onOpenActionUpdatePost();
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
						fontSize="18"
					>
						Quản lý bài viết
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
							placeholder="Bài viết..."
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
						_parent: true,
						_order: "desc",
						_sort: "created_at",
						// _type: "category_post"
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
			<PostDialogThinkPro
				isOpen={isOpenActionCreatePost}
				onClose={onCloseActionCreatePost}
				isCentered
				title={<Heading fontSize="18">Tạo mới bài viết</Heading>}
			>
				<AddPostMangerView
					onClose={onCloseActionCreatePost}
					parents={parents}  />
			</PostDialogThinkPro>
			
			<PostDialogThinkPro
				isOpen={isOpenActionUpdatePost}
				onClose={onCloseActionUpdatePost}
				isCentered
				title={<Heading fontSize="18">Cập nhật bài viết</Heading>}
			>
				<ActionUpdatePost
					onClose={onCloseActionUpdatePost}
					post={post}
					parents={parents}
				/>
			</PostDialogThinkPro>
		</>
	);
};

export default PostView;


