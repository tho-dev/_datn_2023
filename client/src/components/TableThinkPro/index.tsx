import { Flex, Text } from "@chakra-ui/layout";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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
import * as React from "react";
import { ArrowDownAdminIcon, ArrowRightIcon } from "../common/Icons";

export type TableThinkProProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export default function TableThinkPro<Data extends object>({
  data,
  columns,
}: TableThinkProProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
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
  });

  return (
    <>
      <Table>
        <Thead rounded="md" overflow="hidden" h="46px">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr bgColor="#F1F4F9" key={headerGroup.id}>
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
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text as="span">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Text>

                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) == "#" ||
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) == "Action" || (
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
                    maxWidth="200px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </motion.div>
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex py="6" px="0" alignItems="flex-end" justifyContent="space-between">
        <Button
          h="38px"
          bgColor="bg.white"
          border="1px solid #D9E1E7CC"
          rounded="lg"
          transition="all 0.3s"
          color={table.getCanPreviousPage() ? "text.black" : "#1c1f2366"}
          cursor={table.getCanPreviousPage() ? "pointer" : "not-allowed"}
          leftIcon={<ArrowRightIcon size={4} transform="rotate(180deg)" />}
          onClick={() => {
            if (!table.getCanPreviousPage()) return;
            table.previousPage();
          }}
        >
          Previous
        </Button>
        <Flex fontSize="sm" color="text.black" fontWeight="semibold">
          {`Trang 1/${table.getPageCount()}`}
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
    </>
  );
}
