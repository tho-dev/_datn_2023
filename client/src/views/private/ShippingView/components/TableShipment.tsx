import { Box } from "@chakra-ui/react";
import React from "react";
import TableThinkPro from "~/components/TableThinkPro";
import { createColumnHelper } from "@tanstack/react-table";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import thinkpro from "~/data/clone-thinkpro.json";
import { Link } from "react-router-dom";
type Props = {
  data: any;
};

const TableShipment = ({ data }: Props) => {
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
        return <p>{info?.getValue()}</p>;
      },
      header: "Mã đơn hàng",
    }),
    columnHelper.accessor("customer_name", {
      cell: (info) => {
        return <p>{info?.getValue()}</p>;
      },
      header: "Tên khách hàng",
    }),
    columnHelper.accessor("total_amount", {
      cell: (info) => <p>{info?.getValue()}</p>,
      header: "Tổng tiền",
    }),
    columnHelper.accessor("payment_status", {
      cell: (info) => (
        <p>
          {info?.getValue() == "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
        </p>
      ),
      header: "Trạng thái thanh toán",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("payment_method", {
      cell: (info) => <p>{info.getValue()}</p>,
      header: "Phương thức thanh toán",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("status", {
      cell: (info) => <p>{info.getValue()}</p>,
      header: "Trạng thái đơn hàng",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("_id", {
      cell: (info) => {
        return (
          <Menu>
            <MenuButton
              fontSize="sm"
              fontWeight="bold"
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

  return (
    <Box>
      <TableThinkPro columns={columns} data={data} />
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default TableShipment;
