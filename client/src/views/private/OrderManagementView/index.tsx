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
	Tag,
	useDisclosure,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { debounce } from "lodash";
import moment from "moment";
import { useState } from "react";
import { Link, Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { PlusCircleIcon, SearchIcon } from "~/components/common/Icons";
import { useGetAllOrderQuery } from "~/redux/api/order";
import OrderFilter from "./components/OrderFilter";
import { useForm } from "react-hook-form";
import SelectThinkPro from "~/components/SelectThinkPro";
type Props = {};

const OrderManagementView = (props: Props) => {
	const [search, setSearch] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState({
		search: "",
		date: "",
		status: "",
		payment_method: "",
	});

	const { register, control, setValue, getValues } = useForm();

	const columnHelper = createColumnHelper<any>();
	const { isOpen, onClose, onOpen } = useDisclosure();

	const columns = [
		columnHelper.accessor("#", {
			cell: (info) => {
				const index = info.row.index;
				return index + 1;
			},
			header: "#",
		}),
		columnHelper.accessor("_id", {
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
			header: "ID đơn hàng",
		}),
		columnHelper.accessor("customer_name", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{info.getValue()}
				</Text>
			),
			header: "Tên khách hàng",
		}),
		columnHelper.accessor("total_amount", {
			cell: (info) => info.getValue()?.toLocaleString(),
			header: "Tổng tiền",
			meta: {
				isNumeric: true,
			},
		}),
		columnHelper.accessor("created_at", {
			cell: (info) => moment(info.getValue()).format("YYYY-MM-DD hh:mm"),
			header: "Ngày đặt",
		}),
		columnHelper.accessor("phone_number", {
			cell: (info) => `+${info.getValue()}`,
			header: "Số điện thoại",
		}),
		columnHelper.accessor("status", {
			cell: (info) => <Tag>{info.getValue()}</Tag>,
			header: "Trạng thái đơn hàng",
		}),
		columnHelper.accessor("payment_method", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{info.getValue()?.orderInfo || info.getValue() || ""}
				</Text>
			),
			header: "Phương thức thanh toán",
		}),
		columnHelper.accessor("payment_status", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{info.getValue() == "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
				</Text>
			),
			header: "Trạng thái thanh toán",
		}),
		columnHelper.accessor("_id", {
			cell: (info) => {
				return (
					<Menu>
						<MenuButton
							fontSize="sm"
							fontWeight="bold"
							ml={3}
							w="5"
							h="5"
							rounded="sm"
							alignItems="center"
							justifyContent="center"
							color="text.admin2"
							bgColor="#f1f4f9"
							css={{
								"& span": {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "-8px",
								},
							}}
						>
							...
						</MenuButton>
						<MenuList>
							<MenuItem onClick={onOpen}>Xóa</MenuItem>
							<MenuItem>
								<Link to={`/admin/don-hang/${info.getValue()}`}>Xem chi tiết</Link>
							</MenuItem>
							<MenuItem>Cập nhật</MenuItem>
						</MenuList>
					</Menu>
				);
			},
			header: "Action",
		}),
	];

	const debouncedSearch = debounce(({ name, value }: any) => {
		setDebouncedSearchTerm({
			...debouncedSearchTerm,
			[name]: value,
		});
	}, 2000);

	const handleSearch = (e: any) => {
		setSearch(e.target.value);
		debouncedSearch(e.target);
	};

	const handleDate = (data: any) => {
		const parsedDate = moment(data, "ddd MMM DD YYYY HH:mm:ss [GMT]Z (Giờ Đông Dương)");
		const formattedDate = parsedDate.toISOString();

		const new_data = {
			name: "date",
			value: formattedDate,
		};
		debouncedSearch(new_data);
	};

	const handleStatus = (data: any) => {
		const new_data = {
			name: "status",
			value: data,
		};
		debouncedSearch(new_data);
	};

	const handlePayment = (data: any) => {
		const new_data = {
			name: "payment_method",
			value: data,
		};
		debouncedSearch(new_data);
	};

	return (
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
					Quản lý đơn hàng
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
							<BreadcrumbLink href="don-hang">Đơn hàng</BreadcrumbLink>
						</BreadcrumbItem>
					</Breadcrumb>
				</Box>
			</Flex>
			{/* <Metrics /> */}
			<Flex
				gap={4}
				justifyContent={"space-between"}
			>
				<Flex
					w="90%"
					gap="4"
				>
					<Box flex="1.1">
						<SelectThinkPro
							control={control}
							name="category"
							title=""
							placeholder="-- Trạng thái --"
							data={[
								{
									label: "Chờ xử lí",
									value: "processing",
								},
								{
									label: "Đã xác nhận",
									value: "confirmed",
								},
								{
									label: "Đang giao",
									value: "delivering",
								},
								{
									label: "Đã giao",
									value: "delivered",
								},
								{
									label: "Đã huỷ",
									value: "cancelled",
								},
							]}
						/>
					</Box>

					<Input
						flex="1"
						type="date"
					/>

					<Box flex="1.5">
						<SelectThinkPro
							control={control}
							name="category"
							title=""
							placeholder="-- Trạng thái thanh toán --"
							data={[
								{
									label: "Chưa thanh toán",
									value: "processing",
								},
								{
									label: "Đã thanh toán",
									value: "processing",
								},
							]}
						/>
					</Box>

					<Box flex="1.5">
						<SelectThinkPro
							control={control}
							name="category"
							title=""
							placeholder="-- Phương thức thanh toán --"
							data={[
								{
									label: "Thanh toán bằng tiền mặt",
									value: "1",
								},
								{
									label: "Thanh toán bằng MOMO",
									value: "2",
								},
							]}
						/>
					</Box>

					<Flex
						flex="2"
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
							placeholder="Tìm kiếm đơn hàng"
						/>
					</Flex>
				</Flex>
				{/* <OrderFilter
					handleSearch={handleSearch}
					search={search}
					handleDate={handleDate}
					handleStatus={handleStatus}
					handlePayment={handlePayment}
				/> */}
				<Flex
					flex="1"
					justifyContent="flex-end"
				>
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
						disabled
					>
						Tạo đơn
					</Button>
				</Flex>
			</Flex>

			<Box
				bgColor="bg.white"
				mt={8}
			>
				<TableThinkPro
					columns={columns}
					useData={useGetAllOrderQuery}
					defaultPageSize={10}
					query={{
						_limit: 10,
						_page: 1,
						_sort: "created_at",
						_order: "desc",
						search: debouncedSearchTerm.search,
						status: debouncedSearchTerm.status,
						date: debouncedSearchTerm.date,
						payment_method: debouncedSearchTerm.payment_method,
					}}
				/>
			</Box>
			<ConfirmThinkPro
				isOpen={isOpen}
				onClose={onClose}
			/>
		</Box>
	);
};

export default OrderManagementView;
