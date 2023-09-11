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
type Props = {};

const TableShipment = (props: Props) => {
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
    columnHelper.accessor("name", {
      cell: (info) => {
        return <h1>{info.getValue()}</h1>;
      },
      header: "Tên sản phẩm",
    }),
    columnHelper.accessor("thumbnail", {
      cell: (info) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={info.getValue()?.path}
              alt=""
              width="50px"
              height="50px"
            />
          </div>
        );
      },
      header: "Hình ảnh",
    }),
    columnHelper.accessor("price", {
      cell: (info) => info.getValue(),
      header: "Price",
    }),
    columnHelper.accessor("desc", {
      cell: (info) => info.getValue(),
      header: "Mô tả",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("action", {
      cell: () => {
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
              <MenuItem>Xem chi tiết</MenuItem>
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
      <TableThinkPro columns={columns} data={thinkpro.data} />
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default TableShipment;
