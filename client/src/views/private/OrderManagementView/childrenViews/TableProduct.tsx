import { Box, Flex, Text } from "@chakra-ui/layout";
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
import { ArrowDownAdminIcon } from "~/components/common/Icons";

export type TableThinkProProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export default function TableProduct<Data extends object>({
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
    <Box px="6" py="8" borderWidth="1px" borderColor="border.gray" rounded="lg">
      <Table>
        <Thead rounded="md" overflow="hidden" h="48px">
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
                      justifyContent="space-between"
                      alignItems="center"
                      w="inherit"
                      gap="8"
                    >
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
                    w="auto"
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
    </Box>
  );
}
