/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr, Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { ArrowDownAdminIcon, ArrowRightIcon } from "../common/Icons";

export type TableThinkProProps<Data extends object> = {
	columns: ColumnDef<Data, any>[];
	useData?: any;
	query?: any;
	defaultPageSize?: number;
};

export default function TableThinkPro<Data extends object>({
	columns,
	useData,
	query,
	defaultPageSize = 10,
}: TableThinkProProps<Data>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [data, setData] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [controlledPageCount, setPageCount] = useState(0);
	const [recordsPerPage, setRecordsPerPage] = useState(defaultPageSize);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
		},
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: recordsPerPage,
			},
		},
		debugTable: true,
		manualPagination: true,
		pageCount: controlledPageCount,
	});

	const {
		data: result,
		isLoading,
		isFetching,
	} = useData({
		...query,
		_page: table.getState().pagination.pageIndex + 1,
	});

	useEffect(() => {
		setLoading(isLoading || isFetching);
		setData(!(isLoading || isFetching) ? result?.data?.items : []);
		setPageCount(result?.data?.paginate?.totalPages);
		setRecordsPerPage(result?.data?.paginate?.limit);
	}, [result, table.getState().pagination.pageIndex, table.getState().pagination.pageSize]);

	return (
		<Box
			borderWidth="1px"
			borderColor="#F1F4F9"
			rounded="xl"
		>
			<Table>
				<Thead
					rounded="md"
					overflow="hidden"
					h="52px"
				>
					{table.getHeaderGroups().map((headerGroup) => (
						<Tr
							bgColor="#F1F4F9"
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => {
								const meta: any = header.column.columnDef.meta;
								return (
									<Th
										key={header?.id}
										onClick={header?.column?.getToggleSortingHandler()}
										isNumeric={meta?.isNumeric}
										textTransform="none"
										textAlign="start"
										color="text.admin2"
										lineHeight="1.6"
										borderBottom="none"
										px="2"
										fontSize="xs"
										fontWeight="semibold"
										_first={{
											paddingLeft: 5,
											borderTopLeftRadius: "12px",
										}}
										_last={{
											paddingRight: 5,
											borderTopRightRadius: "12px",
										}}
										w="max-content"
									>
										<Flex
											justifyContent="space-between"
											alignItems="flex-end"
											w="auto"
											gap="8"
										>
											<Text
												as="span"
												fontSize="xs"
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
											</Text>

											{flexRender(header.column.columnDef.header, header.getContext()) == "#" ||
												flexRender(header.column.columnDef.header, header.getContext()) ==
													"Action" || (
													<Flex
														as="span"
														alignItems="center"
														justifyContent="center"
														display="inline-flex"
														cursor="pointer"
														float="right"
													>
														<ArrowDownAdminIcon
															aria-label="sorted ascending"
															size={5}
															color="bg.admin2"
															cursor="pointer"
														/>
													</Flex>
												)}
										</Flex>
									</Th>
								);
							})}
						</Tr>
					))}
				</Thead>
				<Tbody position="relative">
					{!loading &&
						table.getRowModel()?.rows?.map((row) => (
							<Tr key={row?.id}>
								{row.getVisibleCells().map((cell) => {
									const meta: any = cell.column.columnDef.meta;
									return (
										<Td
											key={cell.id}
											isNumeric={meta?.isNumeric}
											fontSize="13px"
											py="3"
											px="3"
											textAlign="start"
											borderBottomWidth="1px"
											borderStyle="solid"
											borderColor="#F1F4F9"
											style={{
												textAlign: "start",
											}}
											_first={{
												paddingLeft: 5,
											}}
											_last={{
												paddingRight: 5,
											}}
											w="inherit"
											maxW="320px"
											fontWeight="medium"
										>
											<motion.div
												layout
												animate={{
													opacity: 1,
												}}
												initial={{
													opacity: 0,
												}}
												transition={{
													duration: 0.25,
												}}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</motion.div>
										</Td>
									);
								})}
							</Tr>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
						))}

					{loading &&
						Array(10)
							.fill(0)
							.map((u) => {
								return (
									<Tr key={u}>
										{Array(20)
											.fill(0)
											.map((i, k) => {
												return (
													<Td
														key={k}
														px={i}
														py="2"
														rounded="none"
													>
														<Skeleton
															w="full"
															h="8"
															rounded="none"
														/>
													</Td>
												);
											})}
									</Tr>
								);
							})}
				</Tbody>
			</Table>
			{!loading && (
				<Flex
					py="4"
					px="0"
					mx="6"
					alignItems="flex-end"
					justifyContent="space-between"
				>
					<Flex
						w="9"
						h="9"
						alignItems="center"
						justifyContent="center"
						bgColor="bg.white"
						border="1px solid #D9E1E7CC"
						rounded="full"
						transition="all 0.3s"
						color={table.getCanPreviousPage() ? "text.black" : "#1c1f2366"}
						cursor={table.getCanPreviousPage() ? "pointer" : "not-allowed"}
						onClick={() => {
							if (!table.getCanPreviousPage()) return;
							table.previousPage();
						}}
					>
						<ArrowRightIcon
							size={4}
							transform="rotate(180deg)"
						/>
					</Flex>
					<Flex
						fontSize="sm"
						color="text.black"
						fontWeight="semibold"
						px="4"
						py="1"
						gap="2"
					>
						<Center
							as="span"
							display="inline-flex"
							rounded="full"
							fontSize="13px"
						>
							{table.getState().pagination.pageIndex + 1}
						</Center>
						|
						<Center
							as="span"
							display="inline-flex"
							rounded="full"
							fontSize="13px"
						>
							{table.getPageCount()}
						</Center>
					</Flex>
					<Flex
						w="9"
						h="9"
						alignItems="center"
						justifyContent="center"
						bgColor="bg.white"
						border="1px solid #D9E1E7CC"
						rounded="full"
						transition="all 0.3s"
						color={table.getCanNextPage() ? "text.black" : "#1c1f2366"}
						cursor={table.getCanNextPage() ? "pointer" : "not-allowed"}
						onClick={() => {
							if (!table.getCanNextPage()) return;
							table.nextPage();
						}}
					>
						<ArrowRightIcon size={4} />
					</Flex>
				</Flex>
			)}
		</Box>
	);
}
