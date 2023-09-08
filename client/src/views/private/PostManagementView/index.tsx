import React, { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import thinkpro from "~/data/clone-thinkpro.json";
import TableThinkPro from "~/components/TableThinkPro";
import { createColumnHelper } from "@tanstack/react-table";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import { PlusIcon, SearchAdminIcon } from "~/components/common/Icons";
import ProductForm from "./components/ProductForm";

type Props = {};

const PostManagementView = (props: Props) => {
  const [dialogData, setDialogData] = useState<any>();
  const [dialogType, setDialogType] = useState<"view" | "create" | "update">(
    "view"
  );
  const handleOpenDialog = (rowData: any) => {
    onFormOpen();
    setDialogData(rowData);
    setDialogType("view")
  };
  const handleOpenDialogCreate = () => {
    onFormOpen();
    setDialogData({});
    setDialogType("create")
  };
  const handleOpenDialogUpdate = (rowData: any) => {
    onFormOpen();
    setDialogData(rowData);
    setDialogType("update")
  };
  const columnHelper = createColumnHelper<any>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onClose: onFormClose,
    onOpen: onFormOpen,
  } = useDisclosure();
  const columns = [
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),
    columnHelper.accessor("title", {
      cell: (info) => {
        return <h1>{info.getValue()}</h1>;
      },
      header: "Tiêu đề",
    }),
    columnHelper.accessor("image", {
      cell: (info) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={info.getValue()} alt="" width="50px" height="50px" />
          </div>
        );
      },
      header: "Hình ảnh",
    }),
    columnHelper.accessor("author", {
      cell: (info) => info.getValue(),
      header: "Tác giả",
    }),
    columnHelper.accessor("short_description", {
      cell: (info) => info.getValue(),
      header: "Mô tả ngắn",
    }),
    columnHelper.accessor("action", {
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
              <MenuItem onClick={() => handleOpenDialog(info.row.original)}>
                Xem chi tiết
              </MenuItem>
              <MenuItem onClick={() => handleOpenDialogUpdate(info.row.original)}>Cập nhật</MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
    }),
  ];

  return (
    <>
      <Heading fontSize="2xl">Quản lí bài viết</Heading>
      <Box bgColor="bg.white" mt="6" p="6" rounded={"md"}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Flex gap={4}>
            <Button leftIcon={<PlusIcon size={5} />} bgColor="#06D6A0" onClick={handleOpenDialogCreate}>
              Thêm mới
            </Button>
          </Flex>
          <Flex
            w="full"
            h="full"
            p="4"
            maxW={{
              sm: "160px",
              md: "160px",
              lg: "360px",
              xl: "360px",
              "2xl": "360px",
            }}
            maxH="40px"
            alignItems="center"
            rounded="md"
            backgroundColor="bg.admin1"
            display={{
              sm: "flex",
              md: "flex",
              lg: "flex",
              xl: "flex",
              "2xl": "flex",
            }}
          >
            <Flex as="span" mt="1">
              <SearchAdminIcon size={6} />
            </Flex>
            <Input
              h="full"
              border="none"
              bgColor="transparent"
              px="0"
              pl="1"
              placeholder="Tìm kiếm ..."
            />
          </Flex>
        </Flex>
        <TableThinkPro columns={columns} data={thinkpro.posts} />
        <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
        <ProductForm
          type={dialogType}
          data={dialogData}
          onClose={onFormClose}
          isOpen={isFormOpen}
        />
      </Box>
    </>
  );
};

export default PostManagementView;
