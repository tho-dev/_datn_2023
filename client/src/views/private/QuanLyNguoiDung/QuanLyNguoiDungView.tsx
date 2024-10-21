import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import DialogThinkPro from "~/components/DialogThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import {
  AirplayIcon,
  EditIcon,
  PlusCircleIcon,
  SearchIcon,
  TraskIcon,
  UserIcon,
} from "~/components/common/Icons";
import {
  useDeleteUserMutation,
  useGetAllPromotionQuery,
  useGetRoleQuery,
  useGetSinglePromotionQuery,
} from "~/redux/api/promotion";
import ActionCreatePromotion from "./components/ActionCreatePromotion";
import ActionUpdatePromotion from "./components/ActionUpdatePromotion";
import { useDebounce } from "@uidotdev/usehooks";
import ActionChangPassword from "./components/ActionChangePassWord";
import ActionChangeRole from "./components/ActionChangeRole";

type Props = {};

const QuanLyNguoiDungView = (props: Props) => {
  const toast = useToast();
  const columnHelper = createColumnHelper<any>();

  const [id, setId] = useState(null);
  const [slug, setSlug] = useState(null);

  const {
    isOpen: isOpenActionCreatePromtion,
    onOpen: onOpenActionCreatePromtion,
    onClose: onCloseActionCreatePromtion,
  } = useDisclosure();
  const {
    isOpen: isOpenActionUpdatePromotion,
    onOpen: onOpenActionUpdatePromtion,
    onClose: onCloseActionUpdatePromotion,
  } = useDisclosure();
  const {
    isOpen: isOpenActionChangePassword,
    onOpen: onOpenActionChangePassword,
    onClose: onCloseActionChangePassword,
  } = useDisclosure();

  const {
    isOpen: isOpenActionChangeRole,
    onOpen: onOpenActionChangeRole,
    onClose: onCloseActionChangeRole,
  } = useDisclosure();

  const {
    isOpen: isOpenComfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseComfirm,
  } = useDisclosure();

  const [deletedPromotion] = useDeleteUserMutation();
  const dataRole = useGetRoleQuery("");
  const { data: detailUser } = useGetSinglePromotionQuery(
    {
      id: slug,
    },
    {
      skip: !slug,
    }
  );

  const { control, register } = useForm({
    defaultValues: {
      name: "",
      status: "",
    },
  });
  const statusForm: any = useWatch({
    control,
    name: "status",
  });
  const nameForm = useWatch({
    control,
    name: "name",
  });
  const query = useMemo(() => {
    return {
      _limit: 10,
      _page: 1,
      _name: nameForm,
      _status: statusForm ? JSON.parse(statusForm?.value) : "",
    };
  }, [statusForm, nameForm]);
  const debounceQuery = useDebounce(query, 500);

  const handleDeletePromotion = async () => {
    try {
      await deletedPromotion(id as any).unwrap();
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Xóa khuyến mãi thành công",
      });
    } catch (error: any) {
      toast({
        title: "Có lỗi",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: JSON.stringify(error?.data?.errors),
      });
    }

    onCloseComfirm();
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => {
        return <Text fontSize="sm">{info.getValue()}</Text>;
      },
      header: "Id",
    }),
    columnHelper.accessor("name", {
      cell: (info) => {
        return <Text fontSize="sm">{info.getValue()}</Text>;
      },
      header: "Họ và tên",
    }),
    columnHelper.accessor("dob", {
      cell: (info) => {
        return <Text fontSize="sm">{info.getValue()}</Text>;
      },
      header: "Ngày tháng năm sinh",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => {
        return <Text fontSize="sm">{info.getValue()}</Text>;
      },
      header: "SDT",
    }),
    columnHelper.accessor("cccd", {
      cell: (info) => {
        return <Text fontSize="sm">{info.getValue()}</Text>;
      },
      header: "CCCD",
    }),
    columnHelper.accessor("username", {
      cell: (info) => <Text fontSize="sm">{info.getValue()}</Text>,
      header: "Tài Khoản",
    }),
    columnHelper.accessor("roleName", {
      cell: (info) => <Text fontSize="sm">{info.getValue()}</Text>,
      header: "Vai trò",
    }),
    columnHelper.accessor("address", {
      cell: (info) => <Text fontSize="sm">{info.getValue()}</Text>,
      header: "Địa chỉ",
    }),
    columnHelper.accessor("note", {
      cell: (info) => <Text fontSize="sm">{info.getValue()}</Text>,
      header: "Ghi chú",
    }),
    columnHelper.accessor("action", {
      cell: ({ row }) => {
        const doc = row?.original;
        return (
          <Grid templateColumns="repeat(2, 1fr)" gap="1" w="75%">
            <Tooltip label="Xoá">
              <Button
                size="sm"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setId(doc?.id);
                  onOpenConfirm();
                }}
              >
                <TraskIcon size={5} />
              </Button>
            </Tooltip>
            <Tooltip label="Cập nhật">
              <Button
                size="sm"
                bg="green.200"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setSlug(doc?.id);
                  onOpenActionUpdatePromtion();
                }}
              >
                <AirplayIcon size={5} />
              </Button>
            </Tooltip>
            <Tooltip label="Đổi mật khẩu">
              <Button
                size="sm"
                bg="blue.200"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setSlug(doc?.id);
                  onOpenActionChangePassword();
                }}
              >
                <EditIcon size={5} />
              </Button>
            </Tooltip>
            <Tooltip label="Cập nhật vai trò">
              <IconButton
                size="sm"
                bg="green.200"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setSlug(doc?.id);
                  onOpenActionChangeRole();
                }}
                icon={<UserIcon size={5} />}
                aria-label="updateuser"
              ></IconButton>
            </Tooltip>
          </Grid>
        );
      },
      header: "Hành Động",
    }),
  ];

  return (
    <>
      <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
        <Flex alignItems="center" justifyContent="space-between" pb="5">
          <Heading
            as="h2"
            fontSize="18"
            fontWeight="semibold"
            textTransform="uppercase"
          >
            Danh Sách Người Dùng
          </Heading>
          <Box>
            <Breadcrumb spacing="8px" separator="/" fontSize="sm">
              <BreadcrumbItem>
                <BreadcrumbLink as={ReactRouterLink} to="/admin">
                  Quản Lý Chung
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="khuyen-mai">
                  Quản Lý Người Dùng
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" mb="6">
          <Flex gap="4" w="30%">
            <Flex
              flex="1"
              px="4"
              rounded="8px"
              alignItems="center"
              borderWidth="1px"
              borderColor="#e9ebec"
            >
              <Flex as="span" alignItems="center" justifyContent="center">
                <SearchIcon size={5} color="text.black" strokeWidth={1} />
              </Flex>
              <Input
                border="none"
                padding="0.6rem 0.9rem"
                fontSize="15"
                fontWeight="medium"
                lineHeight="1.5"
                w="260px"
                placeholder="Tìm kiếm người dùng"
                {...register("name")}
              />
            </Flex>
          </Flex>
          <Flex flex="1" justifyContent="flex-end">
            <Button
              // flex="1"
              leftIcon={<PlusCircleIcon size={5} color="text.textSuccess" />}
              px="4"
              lineHeight="2"
              color="text.textSuccess"
              bgColor="bg.bgSuccess"
              onClick={onOpenActionCreatePromtion}
            >
              Thêm Người Dùng
            </Button>
          </Flex>
        </Flex>

        {/* Danh sách */}
        <TableThinkPro
          columns={columns}
          useData={useGetAllPromotionQuery}
          defaultPageSize={10}
          query={debounceQuery}
        />
      </Box>
      {/* Form */}
      <DialogThinkPro
        size="6xl"
        isOpen={isOpenActionCreatePromtion}
        onClose={onCloseActionCreatePromtion}
        isCentered
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Tạo mới Người Dùng
          </Heading>
        }
      >
        <ActionCreatePromotion onClose={onCloseActionCreatePromtion} />
      </DialogThinkPro>
      {/* cập nhật */}
      <DialogThinkPro
        isOpen={isOpenActionUpdatePromotion}
        onClose={onCloseActionUpdatePromotion}
        isCentered
        size="6xl"
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Cập nhật Người Dùng
          </Heading>
        }
      >
        <ActionUpdatePromotion
          promotion={detailUser}
          onClose={onCloseActionUpdatePromotion}
        />
      </DialogThinkPro>
      {/* thay đổi quyền */}
      <DialogThinkPro
        isOpen={isOpenActionChangeRole}
        onClose={onCloseActionChangeRole}
        isCentered
        size="2xl"
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Cập nhật vai trò
          </Heading>
        }
      >
        <ActionChangeRole
          data={detailUser}
          dataRole={dataRole.data}
          onClose={onCloseActionChangeRole}
        />
      </DialogThinkPro>
      {/* đổi mk */}
      <DialogThinkPro
        isOpen={isOpenActionChangePassword}
        onClose={onCloseActionChangePassword}
        isCentered
        size="6xl"
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Thay đổi mật khẩu
          </Heading>
        }
      >
        <ActionChangPassword
          data={detailUser}
          onClose={onCloseActionChangePassword}
        />
      </DialogThinkPro>
      {/* Cofirm */}
      <ConfirmThinkPro
        isOpen={isOpenComfirm}
        onClose={onCloseComfirm}
        content="Bạn có muốn xóa bỏ người dùng này không?"
        handleClick={handleDeletePromotion}
      />
    </>
  );
};

export default QuanLyNguoiDungView;
