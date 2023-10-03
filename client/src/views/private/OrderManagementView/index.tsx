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

type Props = {};

const OrderManagementView = (props: Props) => {
  const columnHelper = createColumnHelper<any>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [orders, setOrders] = useState(thinkpro.orders);
  const columns = [
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return <h1>{info.getValue()}</h1>;
      },
      header: "ID đơn hàng",
    }),
    columnHelper.accessor("customerName", {
      cell: (info) => info.getValue(),
      header: "Tên khách hàng",
    }),
    columnHelper.accessor("amount", {
      cell: (info) => info.getValue(),
      header: "Tổng tiền",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("orderDate", {
      cell: (info) => info.getValue(),
      header: "Ngày đặt",
    }),
    columnHelper.accessor("deliveryDate", {
      cell: (info) => info.getValue(),
      header: "Ngày giao",
    }),
    columnHelper.accessor("payment", {
      cell: (info) => info.getValue(),
      header: "Phương thức",
    }),
    columnHelper.accessor("deliveryStatus", {
      cell: (info) => info.getValue(),
      header: "Trạng thái",
    }),
    columnHelper.accessor("action", {
      cell: () => {
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
                <Link to="/admin/don-hang/id">Xem chi tiết</Link>
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
  return (
    <Box w="full" h="full">
      <Heading as="h1" fontSize={"18"}>
        <Text>Danh sách đơn hàng</Text>
      </Heading>
      <Metrics />
      <OrderFilter />
      <Box bgColor="bg.white" mt="6" p="6">
        <TableThinkPro columns={columns} data={orders} />
      </Box>
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OrderManagementView;
