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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import DialogThinkPro from "~/components/DialogThinkPro";
import SelectThinkPro from "~/components/SelectThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { EditIcon, PlusCircleIcon, SearchIcon, TraskIcon } from "~/components/common/Icons";
import ActionCreatePromotion from "./components/ActionCreatePromotion";
import ActionUpdateBrand from "./components/ActionUpdateBrand";
import { useGetAllPromotionQuery } from "~/redux/api/promotion";

type Props = {};

const PromotionView = (props: Props) => {
	const toast = useToast();
	// thương hiệu cha
	const [id, setId] = useState(null);
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

	const { control } = useForm();

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
			header: "Khuyến mãi",
		}),
		columnHelper.accessor("slug", {
			cell: (info) => `/${info.getValue()}`,
			header: "Slug",
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
			header: "Banner",
		}),
		columnHelper.accessor("status", {
			cell: (info) => {
				return (
					<Text
						display="inline-flex"
						fontSize="13px"
						px="4"
						py="1"
						rounded="md"
						fontWeight="semibold"
						color={info.getValue() ? "text.textSuccess" : "text.textDelete"}
						bgColor={info.getValue() ? "bg.bgSuccess" : "bg.bgDelete"}
					>
						{info.getValue() ? "Đang khuyến mãi" : "Ngừng khuyến mãi"}
					</Text>
				);
			},
			header: "Trạng thái",
		}),
		columnHelper.accessor("start_time", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}
				</Text>
			),
			header: "Ngày bắt đầu",
		}),
		columnHelper.accessor("expired_time", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{info.getValue() ? moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS") : "Đang cập nhật"}
				</Text>
			),
			header: "Ngày kết thúc",
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
									// const parent_id = parents?.find((item: any) => item?.value == doc?.parent_id);
									// setBrand({
									// 	_id: doc?._id,
									// 	name: doc?.name,
									// 	thumbnail: doc?.thumbnail,
									// 	parent_id: parent_id,
									// 	category_id: {
									// 		label: doc?.category?.name,
									// 		value: doc?.category?.category_id,
									// 	},
									// 	description: doc?.description,
									// });
									// onOpenActionUpdateBrand();
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
						fontWeight="semibold"
						textTransform="uppercase"
					>
						Danh Sách Khuyến Mãi
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
								<BreadcrumbLink href="khuyen-mai">Khuyến mãi</BreadcrumbLink>
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
						gap="4"
						w="50%"
					>
						<Box>
							<SelectThinkPro
								control={control}
								name="category"
								title=""
								placeholder="-- Trạng thái --"
								data={[
									{
										label: "Đang khuyến mãi",
										value: "1",
									},
									{
										label: "Ngừng khuyến mãi",
										value: "2",
									},
								]}
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
								placeholder="Tìm kiếm khuyến mãi"
							/>
						</Flex>
					</Flex>
					<Flex
						flex="1"
						justifyContent="flex-end"
					>
						<Button
							// flex="1"
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
							onClick={onOpenActionCreateBrand}
						>
							Tạo Mới
						</Button>
					</Flex>
				</Flex>

				{/* Danh sách */}
				<TableThinkPro
					columns={columns}
					useData={useGetAllPromotionQuery}
					defaultPageSize={10}
					query={{
						_limit: 10,
						_page: 1,
					}}
				/>
			</Box>
			{/* Form */}
			<DialogThinkPro
				size="6xl"
				isOpen={isOpenActionCreateBrand}
				onClose={onCloseActionCreateBrand}
				isCentered
				title={
					<Heading
						fontSize="16"
						textTransform="uppercase"
					>
						Tạo mới khuyến mãi
					</Heading>
				}
			>
				<ActionCreatePromotion onClose={onCloseActionCreateBrand} />
			</DialogThinkPro>
			<DialogThinkPro
				isOpen={isOpenActionUpdateBrand}
				onClose={onCloseActionUpdateBrand}
				isCentered
				title={
					<Heading
						fontSize="16"
						textTransform="uppercase"
					>
						Cập nhật thương hiệu
					</Heading>
				}
			>
				{/* <ActionUpdateBrand onClose={onCloseActionUpdateBrand} /> */}
			</DialogThinkPro>

			{/* Cofirm */}
			<ConfirmThinkPro
				isOpen={isOpenComfirm}
				onClose={onCloseComfirm}
				content="Bạn có muốn xóa bỏ thương hiệu này không?"
				handleClick={handleDeleteBrand}
			/>
		</>
	);
};

export default PromotionView;
