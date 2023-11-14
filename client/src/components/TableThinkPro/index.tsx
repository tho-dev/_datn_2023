import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, Table, Tbody, Td, Th, Thead, Tr, Spinner } from "@chakra-ui/react";
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

	console.log("data", loading);

	return (
		<Box
			px="6"
			py="8"
			borderWidth="1px"
			borderColor="border.primary"
			rounded="xl"
		>
			<Table>
				<Thead
					rounded="md"
					overflow="hidden"
					h="48px"
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
										_first={{
											paddingLeft: 5,
											borderTopLeftRadius: "10px",
											borderBottomLeftRadius: "10px",
										}}
										_last={{
											paddingRight: 5,
											borderTopRightRadius: "10px",
											borderBottomRightRadius: "10px",
										}}
										w="max-content"
									>
										<Flex
											justifyContent="space-around"
											alignItems="center"
											w="inherit"
											gap="8"
										>
											<Text as="span">
												{flexRender(header.column.columnDef.header, header.getContext())}
											</Text>

											{flexRender(header.column.columnDef.header, header.getContext()) == "#" ||
												flexRender(header.column.columnDef.header, header.getContext()) ==
													"Action" || (
													<Flex
														as="span"
														flexDir="column"
														alignItems="center"
														justifyContent="center"
														display="inline-flex"
														cursor="pointer"
														float="right"
													>
														<ArrowDownAdminIcon
															aria-label="sorted descending"
															size={3}
															color="bg.admin2"
															cursor="pointer"
															transform="rotate(-180deg)"
														/>
														<ArrowDownAdminIcon
															aria-label="sorted ascending"
															size={3}
															color="bg.admin2"
															cursor="pointer"
															mt="-5px"
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
				<Tbody
					h={loading ? "9" : "auto"}
					position="relative"
				>
					{!loading ? (
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
											borderColor="border.primary"
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
						))
					) : (
						<Flex
							w="full"
							py="4"
							justifyContent="center"
							alignItems="center"
							position="absolute"
						>
							<Spinner />
						</Flex>
					)}
				</Tbody>
			</Table>
			{!loading && (
				<Flex
					py="6"
					px="0"
					alignItems="flex-end"
					justifyContent="space-between"
				>
					<Button
						h="38px"
						bgColor="bg.white"
						border="1px solid #D9E1E7CC"
						rounded="lg"
						transition="all 0.3s"
						color={table.getCanPreviousPage() ? "text.black" : "#1c1f2366"}
						cursor={table.getCanPreviousPage() ? "pointer" : "not-allowed"}
						leftIcon={
							<ArrowRightIcon
								size={4}
								transform="rotate(180deg)"
							/>
						}
						onClick={() => {
							if (!table.getCanPreviousPage()) return;
							table.previousPage();
						}}
					>
						Previous
					</Button>
					<Flex
						fontSize="sm"
						color="text.black"
						fontWeight="semibold"
					>
						{`Trang ${table.getState().pagination.pageIndex + 1}/${table.getPageCount()}`}
					</Flex>
					<Button
						h="38px"
						bgColor="bg.white"
						border="1px solid #D9E1E7CC"
						rounded="lg"
						transition="all 0.3s"
						color={table.getCanNextPage() ? "text.black" : "#1c1f2366"}
						cursor={table.getCanNextPage() ? "pointer" : "not-allowed"}
						rightIcon={<ArrowRightIcon size={4} />}
						onClick={() => {
							if (!table.getCanNextPage()) return;
							table.nextPage();
						}}
					>
						Next
					</Button>
				</Flex>
			)}
		</Box>
	);
}
