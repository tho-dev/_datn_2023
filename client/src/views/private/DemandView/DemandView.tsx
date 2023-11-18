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
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import DialogThinkPro from "~/components/DialogThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { EditIcon, PlusCircleIcon, SearchIcon, TraskIcon } from "~/components/common/Icons";
import { useDeleteDemandMutation, useGetAllDemandQuery } from "~/redux/api/demand";
import ActionCreateDemand from "./ActionCreateDemand";
import ActionUpdateDemand from "./ActionUpdateDemand";
import { useDebounce } from "@uidotdev/usehooks";

type Props = {};

type TQuery = {
	_page: number;
	_limit: number;
	_order: string;
	_sort: string;
	_name?: string;
};

const DemandView = (props: Props) => {
	const toast = useToast();
	const columnHelper = createColumnHelper<any>();
	const [id, setId] = useState(null);
	const [demand, setDemand] = useState<any>(null);
	const [query, setQuery] = useState<TQuery>({
		_page: 1,
		_limit: 10,
		_order: "desc",
		_sort: "created_at",
	});

	const debounceQuery = useDebounce(query, 300);

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

	const { control, register } = useForm({
		defaultValues: {
			name: "",
		},
	});

	const name = useWatch({
		control,
		name: "name",
	});

	useEffect(() => {
		if (query) {
			setQuery({
				...query,
				_name: name,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name]);

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
			cell: ({ row, table }) => {
				const index = row.index + 1;
				const { pageIndex, pageSize } = table.getState().pagination;

				return <Text fontSize="13px">{pageIndex * pageSize + index}</Text>;
			},
			header: "#",
		}),
		columnHelper.accessor("name", {
			cell: (info) => {
				return <Text fontSize="13px">{info.getValue()}</Text>;
			},
			header: "Nhu cầu",
		}),
		columnHelper.accessor("slug", {
			cell: (info) => `/${info.getValue()}`,
			header: "Đường dẫn",
		}),

		columnHelper.accessor("created_at", {
			cell: (info) => <Text fontSize="13px">{moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}</Text>,
			header: "Ngày tạo",
		}),
		columnHelper.accessor("updated_at", {
			cell: (info) => <Text fontSize="13px">{moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}</Text>,
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
						Danh Sách Nhu Cầu
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
						w="30%"
						gap="4"
					>
						<Flex
							flex="1"
							px="4"
							rounded="lg"
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
								placeholder="Tìm kiếm nhu cầu"
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
					query={debounceQuery}
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
				title={
					<Heading
						fontSize="16"
						textTransform="uppercase"
					>
						Tạo mới nhu cầu
					</Heading>
				}
			>
				<ActionCreateDemand onClose={onCloseActionCreateDemand} />
			</DialogThinkPro>
			<DialogThinkPro
				isOpen={isOpenActionUpdateDemand}
				onClose={onCloseActionUpdateDemand}
				isCentered
				title={
					<Heading
						fontSize="16"
						textTransform="uppercase"
					>
						Cập nhật nhu cầu
					</Heading>
				}
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
