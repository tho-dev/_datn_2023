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
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { AirplayIcon, EditIcon, PlusCircleIcon, SearchIcon, TraskIcon } from "~/components/common/Icons";
import { useGetAllProductQuery } from "~/redux/api/product";
import { formatNumber } from "~/utils/fc";
import moment from "moment/moment";

type Props = {};

const ProductManagerView = (props: Props) => {
	const columnHelper = createColumnHelper<any>();
	const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const columns = [
		columnHelper.accessor("#", {
			cell: ({ table, row }) => {
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
			header: "Sản phẩm",
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
		columnHelper.accessor("brand", {
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
			header: "Thương hiệu",
		}),
		columnHelper.accessor("image", {
			cell: ({ getValue }) => (
				<Image
					w="64px"
					h="64px"
					p="2"
					objectFit="contain"
					src={getValue()}
					alt={getValue()}
					bgColor="bg.gray"
					rounded="md"
				/>
			),
			header: "Ảnh",
		}),
		columnHelper.accessor("price_before_discount", {
			cell: ({ getValue }) => (
				<Text
					fontSize="13px"
					fontWeight="medium"
				>
					{formatNumber(`${getValue()}`)}
				</Text>
			),
			header: "Giá gốc",
		}),
		columnHelper.accessor("colors", {
			cell: ({ getValue }) => {
				const colors = getValue();
				return (
					<Flex gap="2">
						{colors?.map((color: any, index: number) => {
							return (
								<Box
									key={index}
									w="14px"
									h="14px"
									bgColor={color.value}
									rounded="2px"
								/>
							);
						})}
					</Flex>
				);
			},
			header: "Màu sắc",
		}),
		columnHelper.accessor("status", {
			cell: ({ getValue }) => (
				<Text>
					{getValue() ? (
						<Box
							display="inline-block"
							px="2"
							py="1"
							fontSize="xs"
							fontWeight="semibold"
							bgColor="bg.bgSuccess"
							color="text.textSuccess"
							rounded="4px"
						>
							Đang Bán
						</Box>
					) : (
						<Box
							display="inline-block"
							px="2"
							py="1"
							fontSize="xs"
							fontWeight="semibold"
							bgColor="bg.bgDelete"
							color="text.textDelete"
							rounded="md"
						>
							Ngừng Bán
						</Box>
					)}
				</Text>
			),
			header: "Trạng thái",
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
				console.log("row", row);

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
									onOpenConfirm();
								}}
							>
								Xóa
							</MenuItem>
							<MenuItem
								py="2"
								icon={<AirplayIcon size={4} />}
							>
								Preview
							</MenuItem>
							<MenuItem
								as={ReactRouterLink}
								to={`/admin/san-pham/${row?.original?._id}/update`}
								py="2"
								icon={<EditIcon size={4} />}
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
					Quản lý sản phẩm
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
							<BreadcrumbLink
								as={ReactRouterLink}
								to="/admin/san-pham"
							>
								Sản phẩm
							</BreadcrumbLink>
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
						placeholder="Tìm kiếm..."
					/>
				</Flex>
				<Button
					as={ReactRouterLink}
					to="/admin/san-pham/add"
					leftIcon={
						<PlusCircleIcon
							size={5}
							color="text.white"
						/>
					}
					px="4"
					lineHeight="2"
					bgColor="bg.green"
				>
					Tạo Mới
				</Button>
			</Flex>

			{/* hiểu thị dữ liệu */}
			<TableThinkPro
				columns={columns}
				useData={useGetAllProductQuery}
				defaultPageSize={10}
				query={{
					_page: 1,
					_limit: 20,
					_order: "desc",
					_sort: "created_at",
				}}
			/>

			<ConfirmThinkPro
				isOpen={isOpenConfirm}
				onClose={onCloseConfirm}
				// handleClick={handleDeleteProduct}
			/>
		</Box>
	);
};

export default ProductManagerView;
