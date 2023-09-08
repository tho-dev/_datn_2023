import { Box, Heading, Text, Flex } from "@chakra-ui/layout";
import ActiveUser from "./components/ActiveUser";
import { Button, Input } from "@chakra-ui/react";
import UserSearch from "./components/UserSearch";
import { SearchIcon, PlusCircleIcon } from "~/components/common/Icons";
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



type Props = {};

const UserListManagerView = (props: Props) => {
  const columnHelper = createColumnHelper<any>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    columnHelper.accessor("#", {
      cell: (data) => {
        const index = data.row.index;
        return index + 1;
      },
      header: "#",
    }),
    columnHelper.accessor("name", {
      cell: (data) => data.getValue(),
      header: "User Name",
    }),
    columnHelper.accessor("email", {
      cell: (data) => data.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("create_date", {
      cell: (data) => data.getValue(),
      header: "Create Date",
    }),
    columnHelper.accessor("status", {
      cell: (data) => data.getValue(),
      header: "Account Status",
    }),
    columnHelper.accessor("action", {
      cell: (data) => {
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
              <MenuItem >Cập nhật</MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
    }),
  ];

  // Data fake
  const fakeData = [
    {
      id: 1,
      name: "duythuan",
      email: "duythuan123@gmail.com",
      create_date: "1/9/2023",
      status: "Active"
    },
    {
      id: 2,
      name: "duythuan",
      email: "duythuan123@gmail.com",
      create_date: "1/9/2023",
      status: "Active"
    },
    {
      id: 3,
      name: "duythuan",
      email: "duythuan123@gmail.com",
      create_date: "1/9/2023",
      status: "Active"
    },
    {
      id: 4,
      name: "duythuan",
      email: "duythuan123@gmail.com",
      create_date: "1/9/2023",
      status: "Active"
    },
    {
      id: 5,
      name: "duythuan",
      email: "duythuan123@gmail.com",
      create_date: "1/9/2023",
      status: "Active"
    },
  ];
  return (
    <Box w="full" h="full">
      <Heading as="h1" fontSize={24}  >
        <Text>Users list</Text>
      </Heading>

      <ActiveUser />

      <UserSearch />

      <Box
        w={{
          sm: "100%",
          lg: "100%",
        }}
        bgColor="bg.white"
        mt="6"
        p="6"
      >
        <TableThinkPro columns={columns} data={fakeData} />
      </Box>
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default UserListManagerView;


