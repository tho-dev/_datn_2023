import { Box, Heading, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import thinkpro from "~/data/clone-thinkpro.json";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import Metrics from "./components/Metrics";
import { Link } from "react-router-dom";
import OrderFilter from "./components/OrderFilter";
import { useEffect, useState } from "react";
import { useGetAllOrderQuery } from "~/redux/api/order";
import moment from "moment";
type Props = {};

const OrderManagementView = (props: Props) => {
  const { data, isLoading, isFetching } = useGetAllOrderQuery("");

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
        return <h1>{info.getValue()}</h1>;
      },
      header: "ID đơn hàng",
    }),
    columnHelper.accessor("customer_name", {
      cell: (info) => info.getValue(),
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
      cell: (info) => moment(info.getValue()).format("YYYY-MM-DD"),
      header: "Ngày đặt",
    }),
    columnHelper.accessor("phone_number", {
      cell: (info) => `+${info.getValue()}`,
      header: "Số điện thoại",
    }),
    columnHelper.accessor("payment_method", {
      cell: (info) => info.getValue(),
      header: "Phương thức thanh toán",
    }),
    columnHelper.accessor("payment_status", {
      cell: (info) => info.getValue(),
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
                <Link to={`/admin/don-hang/${info.getValue()}`}>
                  Xem chi tiết
                </Link>
              </MenuItem>
              <MenuItem>Cập nhật</MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
    }),
  ];

  // const showFilteredOrders = (filter: {
  //   search: string;
  //   status: string;
  //   payment: string;
  // }) => {
  //  let filteredOrders = orders.filter(order => Object.values())
  //   setOrders(filteredOrders)
  // };
  if (isLoading) return <Box>Loading...</Box>;
  if (isFetching) return <Box>isFetching...</Box>;
  console.log(data);
  return (
    <Box w="full" h="full">
      <Heading as="h1" fontSize={"18"}>
        <Text>Danh sách đơn hàng</Text>
      </Heading>
      <Metrics />
      <OrderFilter />
      <Box bgColor="bg.white" mt="6" p="6">
        <TableThinkPro columns={columns} data={data?.data.items} />
      </Box>
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OrderManagementView;
