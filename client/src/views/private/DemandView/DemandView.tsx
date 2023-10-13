import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
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
import ActionCreateDemand from "./ActionCreateDemand";
import ActionUpdateDemand from "./ActionUpdateDemand";
import { useDeleteDemandMutation, useGetAllDemandQuery } from "~/redux/api/demand";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import moment from "moment/moment";

type Props = {};

const DemandView = (props: Props) => {
	const toast = useToast();
	const [id, setId] = useState(null);
	const [demand, setDemand] = useState<any>(null);
	const columnHelper = createColumnHelper<any>();
	const {
		isOpen: isOpenActionCreateDemand,
		onOpen: onOpenActionCreateDemand,
		onClose: onCloseActionCreateDemand,
	} = useDisclosure();
	const {
		isOpen: isOpenActionUpdateDemand,
		onOpen: onOpenActionUpdateDemand,
		onClose: onCloseActionUpdateDemand,
	} = useDisclosure();
	const { isOpen: isOpenComfirm, onOpen: onOpenConfirm, onClose: onCloseComfirm } = useDisclosure();

	const [deleteDemand] = useDeleteDemandMutation();

	const handleDeleteDemand = async () => {
		try {
			await deleteDemand(id as any).unwrap();
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
				return index + 1;
			},
			header: "#",
		}),
		columnHelper.accessor("name", {
			cell: (info) => {
				return <Text fontSize="sm">{info.getValue()}</Text>;
			},
			header: "Nhu cầu",
		}),
		columnHelper.accessor("slug", {
			cell: (info) => `/${info.getValue()}`,
			header: "Đường dẫn",
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
									setDemand({
										_id: doc?._id,
										name: doc?.name,
										slug: doc?.slug,
									});
									onOpenActionUpdateDemand();
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
						Quản lý nhu cầu
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
								<BreadcrumbLink href="nhu-cau">Nhu cầu</BreadcrumbLink>
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
							placeholder="Nhu cầu..."
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
						onClick={onOpenActionCreateDemand}
					>
						Tạo Mới
					</Button>
				</Flex>

				{/* Danh sách */}
				<TableThinkPro
					columns={columns}
					useData={useGetAllDemandQuery}
					defaultPageSize={10}
					query={{
						_page: 1,
						_limit: 10,
						_order: "desc",
						_sort: "created_at",
					}}
				/>

				{/* Cofirm */}
				<ConfirmThinkPro
					isOpen={isOpenComfirm}
					onClose={onCloseComfirm}
					content="Bạn có muốn xóa bỏ nhu cầu này không?"
					handleClick={handleDeleteDemand}
				/>
			</Box>
			{/* Form */}
			<DialogThinkPro
				isOpen={isOpenActionCreateDemand}
				onClose={onCloseActionCreateDemand}
				isCentered
				title={<Heading fontSize="18">Tạo mới nhu cầu</Heading>}
			>
				<ActionCreateDemand onClose={onCloseActionCreateDemand} />
			</DialogThinkPro>
			<DialogThinkPro
				isOpen={isOpenActionUpdateDemand}
				onClose={onCloseActionUpdateDemand}
				isCentered
				title={<Heading fontSize="18">Cập nhật nhu cầu</Heading>}
			>
				<ActionUpdateDemand
					onClose={onCloseActionUpdateDemand}
					demand={demand}
				/>
			</DialogThinkPro>
		</>
	);
};

export default DemandView;
