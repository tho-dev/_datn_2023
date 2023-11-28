import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, Link as ReactRouterLink } from "react-router-dom";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import TableThinkPro from "~/components/TableThinkPro";
import { FilterIcon, SearchIcon } from "~/components/common/Icons";
import { useGetAllOrderQuery } from "~/redux/api/order";
import SelectThinkPro from "~/components/SelectThinkPro";
import { checkOrderStatus, chuyenDoiSoDienThoaiVe0 } from "~/utils/fc";
import { useForm } from "react-hook-form";

const OrderManagementView = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState({
    search: "",
    date: "",
    status: "",
    payment_method: "",
    payment_status: "",
  } as any);

  const { control, watch, setValue } = useForm();

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
        return (
          <Text fontWeight="medium" fontSize="13px">
            {info.getValue()}
          </Text>
        );
      },
      header: "ID",
    }),
    columnHelper.accessor("customer_name", {
      cell: (info) => (
        <Text fontWeight="medium" fontSize="13px">
          {info.getValue()}
        </Text>
      ),
      header: "Tên khách hàng",
    }),
    columnHelper.accessor("total_amount", {
      cell: (info) => info.getValue()?.toLocaleString(),
      header: "Tổng tiền",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => moment(info.getValue()).format("YYYY-MM-DD hh:mm"),
      header: "Ngày đặt",
    }),
    columnHelper.accessor("phone_number", {
      cell: (info) => chuyenDoiSoDienThoaiVe0(info.getValue()),
      header: "Số điện thoại",
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <Text
          py="1"
          px="4"
          fontSize="xs"
          fontWeight="semibold"
          display="inline-block"
          rounded="4px"
          bg={checkOrderStatus(info.getValue() as string)?.background}
          color={checkOrderStatus(info.getValue() as string)?.color}
        >
          {checkOrderStatus(info.getValue() as string)?.status}
        </Text>
      ),
      header: "Trạng thái đơn hàng",
    }),
    columnHelper.accessor("payment_method", {
      cell: (info) => (
        <Text
          py="1"
          px="4"
          fontSize="xs"
          fontWeight="semibold"
          display="inline-block"
          rounded="4px"
          bg="bg.bgEdit"
          color="text.textEdit"
        >
          {info.getValue()?.orderInfo || info.getValue() || ""}
        </Text>
      ),
      header: "Phương thức thanh toán",
    }),
    columnHelper.accessor("payment_status", {
      cell: (info) => (
        <Text
          py="1"
          px="4"
          fontSize="xs"
          fontWeight="semibold"
          display="inline-block"
          rounded="4px"
          bgColor={info.getValue() == "paid" ? "bg.bgSuccess" : "bg.bgDelete"}
          color={
            info.getValue() == "paid" ? "text.textSuccess" : "text.textDelete"
          }
        >
          {info.getValue() == "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
        </Text>
      ),
      header: "Trạng thái thanh toán",
    }),
    columnHelper.accessor("_id", {
      cell: (info) => {
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
                <Link to={`/admin/don-hang/${info.getValue()}`}>
                  Xem chi tiết
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/admin/don-hang/cap-nhat/${info.getValue()}`}>
                  Cập nhật
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
    }),
  ];

  const handleDate = (data: any) => {
    setDebouncedSearchTerm({ date: data });
  };

  const status = watch("status");
  const payment_method = watch("payment_method");
  const payment_status = watch("payment_status");
  const handleFilterNews = () => {
    setValue("status", "");
    setValue("payment_method", "");
    setValue("payment_status", "");
    setDebouncedSearchTerm({
      search: "",
      date: "",
      status: "",
      payment_method: "",
      payment_status: "",
    });
  };

  useEffect(() => {
    setDebouncedSearchTerm({
      status: status?.value || "",
      payment_method: payment_method?.value || "",
      payment_status: payment_status?.value || "",
    });
  }, [status, payment_method, payment_status]);
  return (
    <Box bgColor="bg.white" py="8" px="6" mb="8" rounded="2xl">
      <Flex alignItems="center" justifyContent="space-between" pb="5">
        <Heading
          as="h2"
          fontSize="18"
          fontWeight="semibold"
          textTransform="uppercase"
        >
          Quản lý đơn hàng
        </Heading>
        <Box>
          <Breadcrumb spacing="8px" separator="/" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink as={ReactRouterLink} to="/admin">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="don-hang">Đơn hàng</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>
      {/* <Metrics /> */}
      <Flex gap={6} justifyContent={"space-between"}>
        <Flex w="95%" gap="4">
          <Box display="inline-block">
            <SelectThinkPro
              control={control}
              name="status"
              title=""
              placeholder="--Trạng thái đơn hàng--"
              data={[
                {
                  label: "Chờ xử lí",
                  value: "processing",
                },
                {
                  label: "Đã xác nhận",
                  value: "confirmed",
                },
                {
                  label: "Đang vận chuyển",
                  value: "delivering",
                },
                {
                  label: "Đã hoàn thành",
                  value: "delivered",
                },
                {
                  label: "Đã huỷ đơn",
                  value: "cancelled",
                },
                {
                  label: "Đã hoàn hàng",
                  value: "returned",
                },
                {
                  label: "Chờ hoàn thành",
                  value: "pendingComplete",
                },
              ]}
            />
          </Box>

          <Box display="inline-block">
            <Input
              value={debouncedSearchTerm?.date}
              type="date"
              onChange={(e: any) => handleDate(e.target.value)}
            />
          </Box>

          <Box display="inline-block">
            <SelectThinkPro
              control={control}
              name="payment_status"
              title=""
              placeholder="-- Trạng thái thanh toán --"
              data={[
                {
                  label: "Chưa thanh toán",
                  value: "unpaid",
                },
                {
                  label: "Đã thanh toán",
                  value: "paid",
                },
              ]}
            />
          </Box>

          <Box display="inline-block">
            <SelectThinkPro
              control={control}
              name="payment_method"
              title=""
              placeholder="-- Phương thức thanh toán --"
              data={[
                {
                  label: "Thanh toán bằng tiền mặt",
                  value: "TIENMAT",
                },
                {
                  label: "Thanh toán bằng MOMO",
                  value: "MOMO",
                },
              ]}
            />
          </Box>

          <Flex
            flex="1.7"
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
              placeholder="Tìm kiếm theo tên,mã,..."
              value={debouncedSearchTerm?.search}
              onChange={(e) =>
                setDebouncedSearchTerm({ search: e.target.value })
              }
            />
          </Flex>
        </Flex>
        <Flex flex="1" justifyContent="flex-end">
          <Button
            leftIcon={<FilterIcon size={5} color="text.textSuccess" />}
            px="4"
            lineHeight="2"
            color="text.textSuccess"
            bgColor="bg.bgSuccess"
            onClick={handleFilterNews}
          >
            Làm mới
          </Button>
        </Flex>
      </Flex>

      <Box bgColor="bg.white" mt={8}>
        <TableThinkPro
          columns={columns}
          useData={useGetAllOrderQuery}
          defaultPageSize={10}
          query={{
            _limit: 10,
            _page: 1,
            _sort: "created_at",
            _order: "desc",
            search: debouncedSearchTerm.search,
            status: debouncedSearchTerm.status,
            date: debouncedSearchTerm.date,
            payment_method: debouncedSearchTerm.payment_method,
            payment_status: debouncedSearchTerm.payment_status,
          }}
        />
      </Box>
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OrderManagementView;
