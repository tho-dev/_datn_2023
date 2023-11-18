import React, { useEffect, useState } from "react";
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
	useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { PlusCircleIcon, SearchIcon } from "~/components/common/Icons";
import SelectThinkPro from "~/components/SelectThinkPro";
import { Link, Link as ReactRouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";
import TableThinkPro from "~/components/TableThinkPro";
import { useConfirmReturnOrderMutation, useGetReturnOrderQuery } from "~/redux/api/order";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";

type Props = {};

const ReturedOrder = (props: Props) => {
	const { control, watch } = useForm();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const toast = useToast();
	const columnHelper = createColumnHelper<any>();
	const [idReturned, setIdReturned] = useState("");
	const [confirmReturnOrder] = useConfirmReturnOrderMutation();

	const [filter, setFilter] = useState({
		date: null,
		is_confirm: null,
		search: "",
	} as any);

	const columns = [
		columnHelper.accessor("#", {
			cell: (info) => {
				const index = info.row.index;
				return index + 1;
			},
			header: "#",
		}),
		columnHelper.accessor("order_id", {
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
		columnHelper.accessor("phone_number", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{`+${info.getValue()}`}
				</Text>
			),
			header: "Số điện thoại",
		}),
		columnHelper.accessor("created_at", {
			cell: (info) => moment(info.getValue()).format("YYYY-MM-DD hh:mm"),
			header: "Ngày đặt",
		}),
		columnHelper.accessor("is_confirm", {
			cell: (info) => <Tag>{info.getValue() ? "Đã xác nhận" : "Chờ xác nhận"}</Tag>,
			header: "Trạng thái đơn hàng",
		}),
		columnHelper.accessor("reason", {
			cell: (info) => (
				<Text
					fontWeight="medium"
					fontSize="13px"
				>
					{info.getValue()}
				</Text>
			),
			header: "Phản hồi",
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
							<MenuItem>Xóa</MenuItem>
							<MenuItem onClick={() => handleOpenModelReturned(info.getValue())}>Xác nhận</MenuItem>
						</MenuList>
					</Menu>
				);
			},
			header: "Action",
		}),
	];
	const handleOpenModelReturned = (id: string) => {
		setIdReturned(id);
		onOpen();
	};
	const handleReturnedOrder = () => {
		confirmReturnOrder(idReturned)
			.unwrap()
			.then((data) => {
				toast({
					title: "Thành công",
					duration: 1600,
					position: "top-right",
					status: "success",
					description: data.message,
				});
			})
			.catch((err) => {
				toast({
					title: "Thất bại",
					duration: 1600,
					position: "top-right",
					status: "error",
					description: err.data.errors.message,
				});
			})
			.finally(() => {
				onClose();
			});
	};
	const verified = watch("is_confirm") || "";

	const handleDate = (data: any) => {
		setFilter({ date: data });
	};
	useEffect(() => {
		setFilter({
			is_confirm: verified.value,
		});
	}, [verified]);

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
					Quản lý hàng hoàn
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
							<BreadcrumbLink href="hang-hoan">Hàng hoàn</BreadcrumbLink>
						</BreadcrumbItem>
					</Breadcrumb>
				</Box>
			</Flex>
			{/* <Metrics /> */}
			<Flex
				gap={2}
				justifyContent={"space-between"}
			>
				<Flex
					w="100%"
					gap="4"
				>
					<Box display="inline-block">
						<SelectThinkPro
							control={control}
							name="is_confirm"
							title=""
							placeholder="--Trạng thái đơn hàng--"
							data={[
								{
									label: "Chờ xử lí",
									value: false,
								},
								{
									label: "Đã xác nhận",
									value: true,
								},
							]}
						/>
					</Box>
					<Box display="inline-block">
						<Input
							type="date"
							onChange={(e: any) => handleDate(e.target.value)}
						/>
					</Box>
					<Flex
						px="4"
						rounded="8px"
						alignItems="center"
						borderWidth="1px"
						borderColor="#e9ebec"
						w={"40%"}
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
							placeholder="Tìm kiếm đơn hàng..."
							onChange={(e) => setFilter({ search: e.target.value })}
						/>
					</Flex>
				</Flex>
			</Flex>
			<Box
				bgColor="bg.white"
				mt={8}
			>
				<TableThinkPro
					columns={columns}
					useData={useGetReturnOrderQuery}
					defaultPageSize={10}
					query={{
						_limit: 10,
						_page: 1,
						_sort: "created_at",
						_order: "desc",
						search: filter.search,
						is_confirm: filter.is_confirm,
						date: filter.date,
					}}
				/>
			</Box>
			<ConfirmThinkPro
				isOpen={isOpen}
				onClose={onClose}
				content="Bạn có chắc chắn muốn xác thực yêu cầu hoàn hàng này?"
				handleClick={handleReturnedOrder}
			/>
		</Box>
	);
};

export default ReturedOrder;
