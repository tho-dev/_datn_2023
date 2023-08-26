import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/layout";
import { ArrowUpAdminIcon, ArrowDownAdminIcon } from "../common/Icons";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	ColumnDef,
	SortingState,
	getSortedRowModel,
} from "@tanstack/react-table";

export type TableThinkProProps<Data extends object> = {
	data: Data[];
	columns: ColumnDef<Data, any>[];
};

export default function TableThinkPro<Data extends object>({ data, columns }: TableThinkProProps<Data>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<Table>
			<Thead
				rounded="md"
				overflow="hidden"
				h="46px"
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
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									isNumeric={meta?.isNumeric}
									textTransform="none"
									textAlign="start"
									color="text.admin2"
									lineHeight="1.6"
									borderBottom="none"
									px="4"
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
								>
									<Flex
										justifyContent="space-between"
										alignItems="center"
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
													<ArrowUpAdminIcon
														aria-label="sorted descending"
														size={3}
														color="bg.admin2"
														cursor="pointer"
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
			<Tbody>
				{table.getRowModel().rows.map((row) => (
					<Tr key={row.id}>
						{row.getVisibleCells().map((cell) => {
							const meta: any = cell.column.columnDef.meta;
							return (
								<Td
									key={cell.id}
									isNumeric={meta?.isNumeric}
									fontSize="sm"
									py="3"
									px="4"
									textAlign="start"
									borderBottomWidth="1px"
									borderColor="#f1f4f9"
									style={{
										textAlign: "start",
									}}
									_first={{
										paddingLeft: 5,
									}}
									_last={{
										paddingRight: 5,
									}}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</Td>
							);
						})}
					</Tr>
				))}
			</Tbody>
		</Table>
	);
}
