import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { Link, Link as ReactRouterLink } from "react-router-dom";
import UserSearch from "./components/UserSearch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
  Select,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import {
  useDeleteUserMutation,
  useGetAllQuery,
  useUpdateMutation,
} from "~/redux/api/user";
import moment from "moment";
import { useAppSelector } from "~/redux/hook/hook";

const UserListManagerView = () => {
  const { user } = useAppSelector((state) => state.persistedReducer.global);
  const columnHelper = createColumnHelper<any>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenBlock,
    onClose: onCloseBlock,
    onOpen: onOpenBlock,
  } = useDisclosure();

  const [search, setSearch] = useState("");
  const [idUser, setIdUser] = useState("");
  const [filter, setFilter] = useState({
    role: null,
    verified: null,
  } as any);
  const toast = useToast();
  const [deleteUser] = useDeleteUserMutation();
  const [update] = useUpdateMutation();

  const handleOpenModalDelete = (id: any) => {
    setIdUser(id);
    onOpen();
  };
  const handleUpdateRole = (e: any, id: any) => {
    const data = { role: e.target.value };
    if (user.role === "admin" && e.target.value === "manager") {
      return toast({
        title: "Bạn không đủ quyền",
        duration: 1600,
        position: "top-right",
        status: "warning",
      });
    }
    update({ data, id })
      .unwrap()
      .then(() => {
        toast({
          duration: 1600,
          position: "top-right",
          status: "success",
          title: "Vai trò đã được cập nhật",
        });
      })
      .catch((err) => {
        toast({
          duration: 1600,
          position: "top-right",
          status: "error",
          title: err.data.errors.message,
        });
      });
  };
  const handleDelete = () => {
    deleteUser(idUser)
      .then(() => {
        toast({
          duration: 1600,
          position: "top-right",
          status: "success",
          title: "Đã xoá user",
        });
      })
      .catch((err) => {
        toast({
          duration: 1600,
          position: "top-right",
          status: "error",
          title: err.data.errors.message,
        });
      })
      .finally(() => {
        onClose();
      });
  };
  const handleBlockUser = () => {
    if (idUser == user._id) {
      onCloseBlock();
      return toast({
        duration: 1600,
        position: "top-right",
        status: "warning",
        title: "Bạn không thể chặn chính mình",
      });
    }
    const data = { is_block: true };
    update({ data, id: idUser })
      .unwrap()
      .then(() => {
        toast({
          duration: 1600,
          position: "top-right",
          status: "success",
          title: "Bạn đã chặn thành công user",
        });
      })
      .catch((err) => {
        toast({
          duration: 1600,
          position: "top-right",
          status: "error",
          title: err.data.errors.message,
        });
      })
      .finally(() => {
        onCloseBlock();
      });
  };

  const columns = [
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),
    columnHelper.accessor("", {
      cell: (data) => (
        <Text fontSize="sm">
          {data.row.original.first_name + " " + data.row.original.last_name}
        </Text>
      ),
      header: "Tên tài khoản",
    }),
    columnHelper.accessor("avatar", {
      cell: (data) => (
        <Image
          src={data.getValue()?.url}
          w="64px"
          h="64px"
          objectFit="contain"
          bgColor="bg.gray"
          p={2}
        />
      ),
      header: "Ảnh",
    }),
    columnHelper.accessor("email", {
      cell: (data) => <Text fontSize="sm">{data.getValue()}</Text>,
      header: "Email",
    }),
    columnHelper.accessor("location", {
      cell: (data) => <Text fontSize="sm">{data.getValue()}</Text>,
      header: "Địa chỉ",
    }),
    columnHelper.accessor("role", {
      cell: (data) => (
        <Select
          size="sm"
          value={data.getValue()}
          onChange={(e) => handleUpdateRole(e, data.row.original._id)}
        >
          <option value="customer" disabled={data.row.original._id == user._id}>
            Customer
          </option>
          <option value="manager" disabled={data.row.original._id == user._id}>
            Manager
          </option>
          <option value="expert" disabled={data.row.original._id == user._id}>
            Expert
          </option>
          <option value="admin" disabled={data.row.original._id == user._id}>
            Admin
          </option>
        </Select>
      ),
      header: "Vai trò",
    }),
    columnHelper.accessor("created_at", {
      cell: (data) => (
        <Text fontWeight="medium" fontSize="13px">
          {moment(data.getValue()).format("DD-MM-YYYY HH:MM:SS")}
        </Text>
      ),
      header: "Ngày tạo",
    }),
    columnHelper.accessor("verified", {
      cell: (data) => (data.getValue() ? "Đã xác thực" : "Chưa xác thực"),
      header: "Trạng thái",
    }),
    columnHelper.accessor("action", {
      cell: (data) => {
        return (
          <Menu>
            <MenuButton
              fontSize="18"
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
              <MenuItem
                onClick={() => handleOpenModalDelete(data.row.original._id)}
              >
                Xóa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIdUser(data.row.original._id);
                  onOpenBlock();
                }}
              >
                Chặn
              </MenuItem>
              <MenuItem>
                <Link to={`${data.row.original._id}/update`}>Cập nhật</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Hành động",
    }),
  ];

  const handleSearched = (e: any) => {
    setSearch(e.target.value as string);
  };

  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="xl">
      <Flex alignItems="center" justifyContent="space-between" pb="5">
        <Heading
          as="h2"
          fontSize="18px"
          fontWeight="semibold"
          textTransform="uppercase"
        >
          Danh Sách Tài Khoản
        </Heading>
        <Box>
          <Breadcrumb spacing="8px" separator="/" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink as={ReactRouterLink} to="/admin">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/admin/tai-khoan">
                Quản lý tài khoản
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>
      <UserSearch
        search={search}
        handleSearched={handleSearched}
        setFilter={setFilter}
      />
      <Box
        w={{
          sm: "100%",
          lg: "100%",
        }}
        bgColor="bg.white"
        mt="6"
      >
        <TableThinkPro
          columns={columns}
          useData={useGetAllQuery}
          query={{
            _limit: 10,
            _page: 1,
            _sort: "created_at",
            _order: "desc",
            search,
            role: filter.role,
            verified: filter.verified,
          }}
        />
      </Box>
      <ConfirmThinkPro
        isOpen={isOpen}
        onClose={onClose}
        handleClick={handleDelete}
      />
      <ConfirmThinkPro
        isOpen={isOpenBlock}
        onClose={onCloseBlock}
        content="Bạn có chắc chắn muốn chặn user này?"
        handleClick={handleBlockUser}
      />
    </Box>
  );
};

export default UserListManagerView;
