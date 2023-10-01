import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import SubCategoryForm from "./components/CategoryForm";
import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter";

type Props = {};

const PostCategoryManagement = (props: Props) => {
  const columnHelper = createColumnHelper<any>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [formValues, setFormValues] = useState(undefined);

  const columns = [
    columnHelper.accessor("#", {
      cell: (data) => {
        const index = data.row.index;
        return index + 1;
      },
      header: "#",
    }),
    columnHelper.accessor("id", {
      cell: (data) => {
        return <h1>{data.getValue()}</h1>;
      },
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: (data) => data.getValue(),
      header: "Tên danh mục",
    }),
    columnHelper.accessor("createdBy", {
      cell: (data) => data.getValue(),
      header: "Người tạo",
    }),
    columnHelper.accessor("action", {
      cell: (data) => {
        return (
          <Menu>
            <MenuButton
              fontSize="18"
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
              <MenuItem onClick={() => setFormValues(data.row.original)}>
                Cập nhật
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
    }),
  ];
  const fakeData = [
    {
      id: 1,
      name: "cate. no 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, consequatur esse minus assumenda quaerat nam unde ullam temporibus repellendus labore.",
      categoryName: "Category 1",
      createdBy: "DUC",
    },
    {
      id: 2,
      name: "cate. no 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, consequatur esse minus assumenda quaerat nam unde ullam temporibus repellendus labore.",
      categoryName: "Category 1",
      createdBy: "DUC",
    },
    {
      id: 3,
      name: "cate. no 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, consequatur esse minus assumenda quaerat nam unde ullam temporibus repellendus labore.",
      categoryName: "Category 1",
      createdBy: "DUC",
    },
    {
      id: 4,
      name: "cate. no 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, consequatur esse minus assumenda quaerat nam unde ullam temporibus repellendus labore.",
      categoryName: "Category 2",
      createdBy: "DUC",
    },
    {
      id: 5,
      name: "cate. no 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, consequatur esse minus assumenda quaerat nam unde ullam temporibus repellendus labore.",
      categoryName: "Category 3",
      createdBy: "DUC",
    },
  ];
  return (
    <Box w="full" h="full">
      <Heading as="h1" fontSize="18">
        <Text>Quản lí danh mục bài viết</Text>
      </Heading>
      <Flex>
        <Box
          w={{
            sm: "100%",
            lg: "30%",
          }}
          bgColor="bg.white"
          mt="6"
          p="6"
          gap={4}
        >
          <SubCategoryForm data={formValues} />
        </Box>
        <Box
          w={{
            sm: "100%",
            lg: "70%",
          }}
          bgColor="bg.white"
          mt="6"
          p="6"
        > 
          <CategoryFilter/>
          <TableThinkPro columns={columns} data={fakeData} />
        </Box>
      </Flex>
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default PostCategoryManagement;
