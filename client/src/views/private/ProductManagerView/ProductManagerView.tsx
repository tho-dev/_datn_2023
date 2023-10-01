import React, { useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Button,
  Link,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AddAdminIcon,
  AirplayIcon,
  ArrowTopRightIcon,
  EditIcon,
  FilterIcon,
  SearchAdminIcon,
  TraskIcon,
} from "~/components/common/Icons";
import { Link as ReactRouterLink } from "react-router-dom";
import TableThinkPro from "~/components/TableThinkPro";
import { createColumnHelper } from "@tanstack/react-table";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import thinkpro from "~/data/clone-thinkpro.json";

type Props = {};

const ProductManagerView = (props: Props) => {
  const columnHelper = createColumnHelper<any>();
  const [id, setId] = useState(null);
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  // hàm xóa sản phẩm
  const handleDeleteProduct = async () => {
    console.log("number", id);
    onCloseConfirm();
  };

  const columns = [
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),
    columnHelper.accessor("thumbnail", {
      cell: (info) => {
        return <h1>{info.getValue()?.filename}</h1>;
      },
      header: "Tên sản phẩm",
    }),
    columnHelper.accessor("slug", {
      cell: (info) => info.getValue(),
      header: "Slug",
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
            <MenuButton textAlign="center">
              <Text fontSize="18" fontWeight="semibold" textAlign="center" ml={3}>
                ...
              </Text>
            </MenuButton>
            <MenuList w="100px">
              <MenuItem
                py="2"
                icon={<TraskIcon size={4} />}
                onClick={() => {
                  setId(1 as any);
                  onOpenConfirm();
                }}
              >
                Xóa
              </MenuItem>
              <MenuItem py="2" icon={<AirplayIcon size={4} />}>
                Preview
              </MenuItem>
              <MenuItem
                as={ReactRouterLink}
                to="/admin/san-pham/slug/update"
                py="2"
                icon={<EditIcon size={4} />}
              >
                Cập Nhật
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
    }),
  ];

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="18" color="text.black" lineHeight="100%">
          Quản lý sản phẩm
        </Heading>
        <Flex gap="4" >
          <Button
            color="text.black"
            bgColor="bg.white"
            size="small"
            px="6"
            leftIcon={<ArrowTopRightIcon size={5} strokeWidth={1.2} />}
            fontSize={14}
          >
            Export
          </Button>
          <Link as={ReactRouterLink} to="/admin/san-pham/add">
            <Button
              bgColor="#06d6a0"
              size="small"
              px="6"
              leftIcon={<AddAdminIcon size={4} />}
              fontSize={14}
              _hover={{
                textDecoration: "none",  
              }}
            >
              Tạo mới
            </Button>
          </Link>

        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mt="4">
        <Button
          color="text.black"
          bgColor="bg.white"
          size="small"
          px="4"
          fontWeight="semibold"
          fontSize={14}
          leftIcon={<FilterIcon size={7} />}
        >
          Lọc
        </Button>
        <Flex
          alignItems="center"
          justifyContent="space-around"
          bgColor="bg.white"
          rounded="4px"
          border="1px solid #F1F4F9"
          px="4"
        >
          <Flex as="span" display="inline-flex" mt="1" mr="2">
            <SearchAdminIcon size={5} />
          </Flex>
          <Input
            maxH="38px"
            border="none"
            px="0"
            placeholder="Tìm kiếm"
            w="200px"
            maxW="full"
            _placeholder={{
              fontSize: "14",
            }}
          />
        </Flex>
      </Flex>
      <Box bgColor="bg.white" pl="8" pt="6" pr="4" mt="4" rounded="6px">
        <TableThinkPro columns={columns} data={thinkpro.data} />
      </Box>

      <ConfirmThinkPro
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        handleClick={handleDeleteProduct}
      />
    </Box>
  );
};

export default ProductManagerView;
