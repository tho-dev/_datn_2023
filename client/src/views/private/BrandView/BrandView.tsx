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
import ActionCreateBrand from "./components/ActionCreateBrand";
import ActionUpdateBrand from "./components/ActionUpdateBrand";
import { useDeleteBrandMutation, useGetAllBrandsQuery } from "~/redux/api/brand";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import moment from "moment/moment";

type Props = {};

const BrandView = (props: Props) => {
	const toast = useToast();
	// thương hiệu cha
	const [id, setId] = useState(null);
	const [brand, setBrand] = useState<any>(null);
	const [parents, setParents] = useState<any>([]);
	const [categoriesBrand, setCategoriesBrand] = useState<any>([]);
	const columnHelper = createColumnHelper<any>();
	const {
		isOpen: isOpenActionCreateBrand,
		onOpen: onOpenActionCreateBrand,
		onClose: onCloseActionCreateBrand,
	} = useDisclosure();
	const {
		isOpen: isOpenActionUpdateBrand,
		onOpen: onOpenActionUpdateBrand,
		onClose: onCloseActionUpdateBrand,
	} = useDisclosure();
	const { isOpen: isOpenComfirm, onOpen: onOpenConfirm, onClose: onCloseComfirm } = useDisclosure();

	const [deleteBrand] = useDeleteBrandMutation();
	const { data: brands, isLoading } = useGetAllBrandsQuery({
		_limit: 20,
		_page: 1,
		_parent: true,
		_sort: "created_at",
		_order: "desc",
	});

	const { data: categories } = useGetAllCategoryQuery({
		_limit: 20,
		_page: 1,
		_parent: true,
		_sort: "created_at",
		_order: "desc",
		_type: "category_brand",
	});

	useEffect(() => {
		if (brands) {
			const parentsFilter = brands?.data?.items?.map((brand: any) => {
				return {
					label: brand?.name,
					value: brand?._id,
				};
			});

			setParents(parentsFilter);
		}
	}, [brands, isLoading]);

	useEffect(() => {
		if (categories) {
			const categoriesFilter = categories?.data?.items?.map((brand: any) => {
				return {
					label: brand?.name,
					value: brand?._id,
				};
			});

			setCategoriesBrand(categoriesFilter);
		}
	}, [categories, isLoading]);

	const handleDeleteBrand = async () => {
		try {
			await deleteBrand(id as any).unwrap();
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
				return pageIndex * pageSize + index;
			},
			header: "#",
		}),
		columnHelper.accessor("name", {
			cell: (info) => {
				return <Text fontSize="sm">{info.getValue()}</Text>;
			},
			header: "Thương hiệu",
		}),
		columnHelper.accessor("slug", {
			cell: (info) => `/${info.getValue()}`,
			header: "Đường dẫn",
		}),
		columnHelper.accessor("category", {
			cell: (info) => {
				return <Text fontSize="sm">{info.getValue()?.name}</Text>;
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

									setBrand({
										_id: doc?._id,
										name: doc?.name,
										thumbnail: doc?.thumbnail,
										parent_id: parent_id,
										category_id: {
											label: doc?.category?.name,
											value: doc?.category?.category_id,
										},
										description: doc?.description,
									});
									onOpenActionUpdateBrand();
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
						Thương Hiệu
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
								<BreadcrumbLink href="thuong-hieu">Thương hiệu</BreadcrumbLink>
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
							placeholder="Thương hiệu..."
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
						onClick={onOpenActionCreateBrand}
					>
						Tạo Mới
					</Button>
				</Flex>

				{/* Danh sách */}
				<TableThinkPro
					columns={columns}
					useData={useGetAllBrandsQuery}
					defaultPageSize={15}
					query={{
						_limit: 20,
						_page: 1,
						_parent: true,
						_sort: "created_at",
						_order: "desc",
						_type: "category_brand",
					}}
				/>

				{/* Cofirm */}
				<ConfirmThinkPro
					isOpen={isOpenComfirm}
					onClose={onCloseComfirm}
					content="Bạn có muốn xóa bỏ thương hiệu này không?"
					handleClick={handleDeleteBrand}
				/>
			</Box>
			{/* Form */}
			<DialogThinkPro
				isOpen={isOpenActionCreateBrand}
				onClose={onCloseActionCreateBrand}
				isCentered
				title={<Heading fontSize="18">Tạo mới thương hiệu</Heading>}
			>
				<ActionCreateBrand
					onClose={onCloseActionCreateBrand}
					parents={parents}
					categories={categoriesBrand}
				/>
			</DialogThinkPro>
			<DialogThinkPro
				isOpen={isOpenActionUpdateBrand}
				onClose={onCloseActionUpdateBrand}
				isCentered
				title={<Heading fontSize="18">Cập nhật thương hiệu</Heading>}
			>
				<ActionUpdateBrand
					onClose={onCloseActionUpdateBrand}
					brand={brand}
					parents={parents}
					categories={categoriesBrand}
				/>
			</DialogThinkPro>
		</>
	);
};

export default BrandView;
