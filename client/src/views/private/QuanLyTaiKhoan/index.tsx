import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment/moment";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import DialogThinkPro from "~/components/DialogThinkPro";
import SelectThinkPro from "~/components/SelectThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import {
  EditIcon,
  PlusCircleIcon,
  SearchIcon,
  TraskIcon,
} from "~/components/common/Icons";
import { useDebounce } from "@uidotdev/usehooks";
import {
  useDeleteCounponMutation,
  useGetAllAccQuery,
  useGetSingleAccQuery,
} from "~/redux/api/coupon";
import ActionUpdateAcc from "./components/ActionUpdateAcc";
import ActionChangeAccView from "./components/ActionChangeAcc";
import ActionResetPassWordView from "./components/ActionResetPassWord";

type Props = {};

const QuanLyTaiKhoanView = (props: Props) => {
  const toast = useToast();
  const columnHelper = createColumnHelper<any>();

  const [id, setId] = useState(null);
  const [slug, setSlug] = useState(null);

  const {
    isOpen: isOpenActionChangeAcc,
    onOpen: onOpenActionChangeAcc,
    onClose: onCloseActionChangeAcc,
  } = useDisclosure();
  const {
    isOpen: isOpenActionUpdateAcc,
    onOpen: onOpenActionUpdateAcc,
    onClose: onCloseActionUpdateAcc,
  } = useDisclosure();

  const {
    isOpen: isOpenActionResetAcc,
    onOpen: onOpenActionResetAcc,
    onClose: onCloseActionResetAcc,
  } = useDisclosure();
  const {
    isOpen: isOpenComfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseComfirm,
  } = useDisclosure();

  const [deleteCounpon] = useDeleteCounponMutation();

  const { data: data_Acc } = useGetSingleAccQuery({
    id: slug,
  });

  const { control, register } = useForm({
    defaultValues: {
      username: "",
      status: "",
    },
  });
  const query = useMemo(() => {
    return {
      _limit: 10,
      _page: 1,
    };
  }, []);
  const debounceQuery = useDebounce(query, 500);

  const handleDeleteVoucher = async () => {
    try {
      await deleteCounpon(id as any).unwrap();
      toast({
        title: "Thành công",
        duration: 1600,
        position: "top-right",
        status: "success",
        description: "Xóa Voucher thành công",
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
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),
    columnHelper.accessor("name", {
      cell: (info) => {
        return <Text fontSize="sm">{info.getValue()}</Text>;
      },
      header: "Tên Người Dùng",
    }),
    columnHelper.accessor("username", {
      cell: (info) => `${info.getValue()}`,
      header: "Tên tài khoản",
    }),
    columnHelper.accessor("isActive", {
      cell: (info) => {
        return (
          <Text
            display="inline-flex"
            fontSize="13px"
            px="4"
            py="1"
            rounded="md"
            fontWeight="semibold"
            color={info.getValue() ? "text.textSuccess" : "text.textDelete"}
            bgColor={info.getValue() ? "bg.bgSuccess" : "bg.bgDelete"}
          >
            {info.getValue() ? "Đã kích hoạt" : "Chưa kích hoạt"}
          </Text>
        );
      },
      header: "Trạng thái",
    }),
    columnHelper.accessor("lastLogin", {
      cell: (info) => (
        <Text fontWeight="medium" fontSize="13px">
          {moment(info.getValue()).format("DD-MM-YYYY HH:MM:SS")}
        </Text>
      ),
      header: "Đăng nhập cuối",
    }),
    columnHelper.accessor("action", {
      cell: ({ row }) => {
        const doc = row?.original;

        return (
          <Menu>
            <MenuButton textAlign="center">
              <Text
                fontSize="18"
                fontWeight="semibold"
                textAlign="center"
                ml={3}
              >
                ...
              </Text>
            </MenuButton>
            <MenuList w="100px">
              <MenuItem
                py="2"
                icon={<TraskIcon size={4} />}
                onClick={() => {
                  setId(doc?._id);
                  onOpenConfirm();
                }}
              >
                Xóa
              </MenuItem>
              <MenuItem
                py="2"
                icon={<EditIcon size={4} />}
                onClick={() => {
                  setSlug(doc?.id);
                  onOpenActionUpdateAcc();
                }}
              >
                Cập Nhật tài khoản
              </MenuItem>
              <MenuItem
                py="2"
                icon={<EditIcon size={4} />}
                onClick={() => {
                  setSlug(doc?.id);
                  onOpenActionChangeAcc();
                }}
              >
                Đổi mật khẩu
              </MenuItem>
              <MenuItem
                py="2"
                icon={<EditIcon size={4} />}
                onClick={() => {
                  setSlug(doc?.id);
                  onOpenActionResetAcc();
                }}
              >
                Đặt lại mật khẩu
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
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
                <BreadcrumbLink as={ReactRouterLink} to="/admin/qltk">
                  Account
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" mb="6">
          <Flex gap="4" w="50%">
            {/* <Box>
              <SelectThinkPro
                control={control}
                name="status"
                title=""
                placeholder="-- Trạng thái --"
                data={[
                  {
                    label: "Đang khuyến mãi",
                    value: "true",
                  },
                  {
                    label: "Ngừng khuyến mãi",
                    value: "false",
                  },
                ]}
              />
            </Box> */}

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
                placeholder="Tìm kiếm Account"
                {...register("username")}
              />
            </Flex>
          </Flex>
          {/* <Flex flex="1" justifyContent="flex-end">
            <Button
              // flex="1"
              leftIcon={<PlusCircleIcon size={5} color="text.textSuccess" />}
              px="4"
              lineHeight="2"
              color="text.textSuccess"
              bgColor="bg.bgSuccess"
              onClick={onOpenActionCreatePromtion}
            >
              Tạo Mới
            </Button>
          </Flex> */}
        </Flex>

        {/* Danh sách */}
        <TableThinkPro
          columns={columns}
          useData={useGetAllAccQuery}
          defaultPageSize={10}
          query={debounceQuery}
        />
      </Box>
      {/* Form */}
      <DialogThinkPro
        size="6xl"
        isOpen={isOpenActionChangeAcc}
        onClose={onCloseActionChangeAcc}
        isCentered
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Thay đổi mật khẩu
          </Heading>
        }
      >
        <ActionChangeAccView
          AccDetail={data_Acc}
          onClose={onCloseActionChangeAcc}
        />
      </DialogThinkPro>
      <DialogThinkPro
        size="6xl"
        isOpen={isOpenActionResetAcc}
        onClose={onCloseActionResetAcc}
        isCentered
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Đặt lại mật khẩu
          </Heading>
        }
      >
        <ActionResetPassWordView
          AccDetail={data_Acc}
          onClose={onCloseActionResetAcc}
        />
      </DialogThinkPro>
      <DialogThinkPro
        isOpen={isOpenActionUpdateAcc}
        onClose={onCloseActionUpdateAcc}
        isCentered
        size="6xl"
        title={
          <Heading fontSize="16" textTransform="uppercase">
            Cập nhật tài khoản
          </Heading>
        }
      >
        <ActionUpdateAcc
          AccDetail={data_Acc}
          onClose={onCloseActionUpdateAcc}
        />
      </DialogThinkPro>

      {/* Cofirm */}
      <ConfirmThinkPro
        isOpen={isOpenComfirm}
        onClose={onCloseComfirm}
        content="Bạn có muốn xóa bỏ trương trình khuyến mãi này không?"
        handleClick={handleDeleteVoucher}
      />
    </>
  );
};

export default QuanLyTaiKhoanView;
