import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Button, Table, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  AddressIcon,
  CarIcon,
  CloseIcon,
  DownloadIcon,
  LocationIcon,
  OrderIcon,
  PhoneIcon,
  UserIcon,
} from "~/components/common/Icons";
import MetricItem from "../components/MetricItem";
import TableThinkPro from "~/components/TableThinkPro";
import { createColumnHelper } from "@tanstack/react-table";
import OrderDetailMetricItem from "../components/OrderDetailMetric";
import { Progress } from "@chakra-ui/react";
import { mt } from "date-fns/locale";
import { useParams } from "react-router";
import {
  useCancelOrderMutation,
  useGetOneShippingQuery,
} from "~/redux/api/order";
import OrderStatus from "../../ShippingView/components/OrderStatus";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import { useToast } from "@chakra-ui/react";

type Props = {};

const OrderDetailView = (props: Props) => {
  const { id } = useParams();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isLoading, isFetching, isError } = useGetOneShippingQuery({
    id,
  });
  const [cancelOrder] = useCancelOrderMutation();
  const columnHelper = createColumnHelper<any>();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  if (isFetching) {
    return <Box>isFetching...</Box>;
  }
  if (isError) {
    return <Box>isError...</Box>;
  }
  const columns = [
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),

    columnHelper.accessor("sku_id", {
      cell: (info) => {
        return <h1>{info.getValue()._id}</h1>;
      },
      header: "ID sản phẩm",
    }),
    columnHelper.accessor("sku_id", {
      cell: (info) => {
        return <h1>{info.getValue().name}</h1>;
      },
      header: "Tên sản phẩm",
    }),
    columnHelper.accessor("price", {
      cell: (info) => info.getValue()?.toLocaleString(),
      header: "Đơn giá",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => info.getValue(),
      header: "Số lượng",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("#", {
      cell: (info) =>
        (
          info.row.original.price * info.row.original.quantity
        )?.toLocaleString(),
      header: "Thành tiền",
    }),
  ];
  const handleCancelOrder = (id: string) => {
    cancelOrder({ id })
      .unwrap()
      .then((data: any) => {
        toast({
          title: "Hệ thống thông báo",
          description: `${data.data.message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Hệ thống thông báo",
          description: `${error.data.errors.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    onClose();
  };

  return (
    <Box w="full" h="full">
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h1" fontSize="18">
          <Text>Chi tiết đơn hàng</Text>
        </Heading>
        <Button leftIcon={<DownloadIcon size={24} />}> Xuất HĐ</Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h1" fontSize="16">
          <Text>ID đơn hàng: #{data?.data._id}</Text>
        </Heading>
      </Flex>
      <Grid
        mt="4"
        px="5"
        py="6"
        gap="5"
        bgColor="bg.white"
        rounded="md"
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        <OrderDetailMetricItem
          heading="Thông tin KH"
          text={data?.data.customer_name}
          phone={data?.data.phone_number}
          icon={<UserIcon size={6} color="green" />}
          color="green"
        />
        <OrderDetailMetricItem
          heading="Địa chỉ nhận"
          text={
            data?.data.shipping_method === "at_store"
              ? data?.data.shop_address
              : data?.data.shipping_info.shipping_address
          }
          phone={data?.data.shipping_method}
          icon={<LocationIcon size={24} color="blue" />}
          color="blue"
        />
        <OrderDetailMetricItem
          heading="Phương thức thanh toán"
          text={data?.data.payment_method}
          icon={<OrderIcon size={6} color="cyan" />}
          color="cyan"
        />
      </Grid>
      <Flex gap={4}>
        {/* Danh sách sp */}
        <Box
          mt="4"
          px="5"
          py="6"
          gap="2"
          bgColor="bg.white"
          rounded="md"
          w={"75%"}
        >
          <TableThinkPro columns={columns} data={data?.data.products} />
          <Flex alignItems="flex-end" flexDirection="column" py={4}>
            <Box width="30%" minH="250px">
              <Flex
                my={1}
                justifyContent="space-between"
                p={2}
                borderBottom="1px solid #ccc"
              >
                <Text fontSize={16} fontWeight="semibold">
                  Tổng số lượng:{" "}
                </Text>
                <Text>
                  {data.data.products.reduce(
                    (acc: any, product: any) => acc + product.quantity,
                    0
                  )}
                </Text>
              </Flex>
              <Flex
                my={1}
                justifyContent="space-between"
                p={2}
                borderBottom="1px solid #ccc"
              >
                <Text fontSize={16} fontWeight="semibold">
                  Tổng Tiền:{" "}
                </Text>
                <Text>{data?.data.total_amount.toLocaleString()}</Text>
              </Flex>
              <Flex
                my={1}
                justifyContent="space-between"
                p={2}
                borderBottom="1px solid #ccc"
              >
                <Text fontSize={16} fontWeight="semibold">
                  Giảm Giá:{" "}
                </Text>
                <Text>0</Text>
              </Flex>
              <Flex
                my={1}
                justifyContent="space-between"
                p={2}
                borderBottom="1px solid #ccc"
              >
                <Text fontSize={16} fontWeight="bold">
                  Thành tiền:{" "}
                </Text>
                <Text>{data?.data.total_amount.toLocaleString()}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box w="25%">
          {/* Vận chuyển */}
          <Box my="4" px="5" py="6" gap="2" bgColor="bg.white" rounded="md">
            <Heading size="md" pb={4} borderBottomWidth={1} fontSize={18}>
              Vận chuyển:{" "}
              {data?.data.shipping_method === "at_store"
                ? "Mua trực tiếp"
                : "shipping"}
            </Heading>
            <Flex justifyContent="center" alignItems="center" fontSize={15}>
              <Flex
                py={4}
                justifyContent={"center"}
                flexDir={"column"}
                alignItems={"center"}
              >
                <CarIcon />
                <Text fontWeight={700}>
                  {data?.data.shipping_method === "at_store"
                    ? "Tại Cửa hàng"
                    : "Giao hàng nhanh"}
                </Text>
                <Text fontSize="12px" fontWeight="semibold">
                  Trạng thái thanh toán:{" "}
                  {data?.data.payment_status == "unpaid"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </Text>
                <Text fontSize="12px" fontWeight="semibold">
                  Phương thức thanh toán: {data?.data.payment_method}
                </Text>
              </Flex>
            </Flex>
          </Box>
          {/* Thanh toán */}
          <Box my="4" px="5" py="6" gap="2" bgColor="bg.white" rounded="md">
            <Heading size="md" pb={4} borderBottomWidth={1} fontSize={18}>
              Chi tiết thanh toán:
            </Heading>
            {data?.data.payment_status == "unpaid" ? (
              <Box>Chưa thanh toán</Box>
            ) : (
              <Flex pt={4} flexDir="column" gap={2} fontSize={15}>
                <Flex>
                  <Text w="40%">Mã giao dịch:</Text>
                  <Text>#1111111111111</Text>
                </Flex>
                <Flex>
                  <Text w="40%">Phương thức:</Text>
                  <Text>Thẻ tín dụng</Text>
                </Flex>
                <Flex>
                  <Text w="40%">Số thẻ:</Text>
                  <Text>1111 1111 1111</Text>
                </Flex>
                <Flex>
                  <Text w="40%">Tên chủ thẻ:</Text>
                  <Text>NGO BA KHA</Text>
                </Flex>
                <Flex>
                  <Text w="40%">TỔNG TIỀN:</Text>
                  <Text>400 000</Text>
                </Flex>
              </Flex>
            )}
          </Box>
        </Box>
      </Flex>
      <Box
        m="16px 0 30px 0"
        px="5"
        py="6"
        gap="2"
        bgColor="bg.white"
        rounded="md"
        minH="400px"
      >
        <Flex
          justifyContent={"space-between"}
          pb={4}
          borderBottomWidth={1}
          my={6}
        >
          <Heading fontSize={18}>
            {" "}
            Trạng thái đơn hàng: {data?.data.status}
          </Heading>
          <Flex gap={4}>
            <Button
              leftIcon={<AddressIcon size={6} />}
              bg="#FFCCFF"
              _hover={{ bg: "#CCCCFF" }}
            >
              Thay đổi địa chỉ
            </Button>
            <Button
              leftIcon={<CloseIcon size={6} />}
              bg="bg.red"
              _hover={{ bg: "#666633" }}
              onClick={() => onOpen()}
            >
              Huỷ đơn hàng
            </Button>
          </Flex>
        </Flex>
        <Box padding={4}>
          <OrderStatus data={data?.data.status} />
        </Box>
      </Box>
      <ConfirmThinkPro
        isOpen={isOpen}
        onClose={onClose}
        handleClick={() => handleCancelOrder(data?.data._id)}
        content="Bạn có muốn xoá đơn hàng này"
      />
    </Box>
  );
};

export default OrderDetailView;
