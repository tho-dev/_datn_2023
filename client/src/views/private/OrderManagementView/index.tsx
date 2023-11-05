import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Breadcrumb,
  useDisclosure,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Tag,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import thinkpro from "~/data/clone-thinkpro.json";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import Metrics from "./components/Metrics";
import { Link } from "react-router-dom";
import OrderFilter from "./components/OrderFilter";
import { useEffect, useState } from "react";
import { useGetAllOrderQuery } from "~/redux/api/order";
import moment from "moment";
import { debounce } from "lodash";
import { PlusCircleIcon } from "~/components/common/Icons";
type Props = {};

const OrderManagementView = (props: Props) => {
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState({
    search: "",
    date: "",
    status: "",
    payment_method: "",
  });

  const { data, isLoading, isFetching } = useGetAllOrderQuery({
    _limit: 10,
    _page: 1,
    _sort: "created_at",
    _order: "desc",
    search: debouncedSearchTerm.search,
    status: debouncedSearchTerm.status,
    date: debouncedSearchTerm.date,
    payment_method: debouncedSearchTerm.payment_method,
  });

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
      header: "ID đơn hàng",
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
      cell: (info) => `+${info.getValue()}`,
      header: "Số điện thoại",
    }),
    columnHelper.accessor("status", {
      cell: (info) => <Tag>{info.getValue()}</Tag>,
      header: "Trạng thái đơn hàng",
    }),
    columnHelper.accessor("payment_method", {
      cell: (info) => (
        <Text fontWeight="medium" fontSize="13px">
          {info.getValue()?.orderInfo || info.getValue() || ""}
        </Text>
      ),
      header: "Phương thức thanh toán",
    }),
    columnHelper.accessor("payment_status", {
      cell: (info) => (
        <Text fontWeight="medium" fontSize="13px">
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
              <MenuItem><Link to={`/admin/don-hang/cap-nhat/${info.getValue()}`}>Cập nhật</Link></MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "Action",
    }),
  ];
  if (isLoading) return <Box>Loading...</Box>;

  const debouncedSearch = debounce(({ name, value }: any) => {
    setDebouncedSearchTerm({
      ...debouncedSearchTerm,
      [name]: value,
    });
  }, 2000);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    debouncedSearch(e.target);
  };

  const handleDate = (data: any) => {
    const parsedDate = moment(
      data,
      "ddd MMM DD YYYY HH:mm:ss [GMT]Z (Giờ Đông Dương)"
    );
    const formattedDate = parsedDate.toISOString();

    const new_data = {
      name: "date",
      value: formattedDate,
    };
    debouncedSearch(new_data);
  };

  const handleStatus = (data: any) => {
    const new_data = {
      name: "status",
      value: data,
    };
    debouncedSearch(new_data);
  };
  const handlePayment = (data: any) => {
    const new_data = {
      name: "payment_method",
      value: data,
    };
    debouncedSearch(new_data);
  };
  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
      <Flex alignItems="center" justifyContent="space-between" pb="5">
        <Heading as="h2" fontSize="18">
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
      <Flex w={"100%"} gap={4} justifyContent={"space-between"}>
        <OrderFilter
          handleSearch={handleSearch}
          search={search}
          handleDate={handleDate}
          handleStatus={handleStatus}
          handlePayment={handlePayment}
        />
        <Button
          // as={ReactRouterLink}
          // to="add"
          leftIcon={<PlusCircleIcon size={5} color="text.white" />}
          px="4"
          lineHeight="2"
          bgColor="bg.green"
          _hover={{ bg: "green.400" }}
          disabled
        >
          Tạo đơn
        </Button>
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
          }}
        />
      </Box>
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OrderManagementView;
