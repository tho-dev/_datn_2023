import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  AddressIcon,
  CarIcon,
  CloseIcon,
  DownloadIcon,
  LocationIcon,
  OrderIcon,
  UserIcon,
} from "~/components/common/Icons";
import TableThinkPro from "~/components/TableThinkPro";
import { createColumnHelper } from "@tanstack/react-table";
import OrderDetailMetricItem from "../components/OrderDetailMetric";
import { useParams } from "react-router";
import {
  useCancelOrderMutation,
  useGetOneShippingQuery,
} from "~/redux/api/order";
import OrderStatus from "../../ShippingView/components/OrderStatus";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import { useToast } from "@chakra-ui/react";
import ExportOrderPDF from "./ExportOrderPDF";
import { PDFViewer } from "@react-pdf/renderer";
import DialogThinkPro from "~/components/DialogThinkPro";

type Props = {};

const OrderDetailView = (props: Props) => {
  const { id } = useParams();
  const toast = useToast();
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure();
  const {
    isOpen: isPDFOpen,
    onClose: onPDFClose,
    onOpen: onPDFOpen,
  } = useDisclosure();
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
  console.log(data);

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
    onConfirmClose();
  };


  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h1" fontSize="18">
          <Text>Chi tiết đơn hàng</Text>
        </Heading>
        <Button
          leftIcon={<DownloadIcon size={24} />}
          onClick={() => onPDFOpen()}
        >
          Xuất hóa đơn
        </Button>
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
          text={data?.data.payment_method.orderInfo}
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
          shadow="md"
        >
          {/* <TableThinkPro columns={columns} useData={useGetOneShippingQuery} /> */}
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
          <Box
            my="4"
            px="5"
            py="6"
            gap="2"
            bgColor="bg.white"
            rounded="md"
            shadow="md"
          >
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
                  Trạng thái thanh toán:
                  {data?.data.payment_status == "paid"
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </Text>
                <Text fontSize="12px" fontWeight="semibold">
                  Phương thức Giao hàng:{" "}
                  {data?.data.shipping_method == "at_store"
                    ? "Tại cửa hàng"
                    : "Shipping"}
                </Text>
              </Flex>
            </Flex>
          </Box>
          {/* Thanh toán */}
          <Box
            my="4"
            px="5"
            py="6"
            gap="2"
            bgColor="bg.white"
            rounded="md"
            shadow="md"
          >
            <Heading size="md" pb={4} borderBottomWidth={1} fontSize={18}>
              Chi tiết thanh toán:
            </Heading>
            <Flex pt={4} flexDir="column" gap={2} fontSize={15}>
              <Flex>
                <Text w="40%" fontWeight="semibold">
                  Trạng thái thanh toán:
                </Text>
                <Text>
                  {data?.data.payment_method.message == "failed"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </Text>
              </Flex>
              <Flex>
                <Text w="40%" fontWeight="semibold">
                  Phương thức:
                </Text>
                <Text>{data?.data.payment_method.orderInfo}</Text>
              </Flex>
              <Flex>
                <Text w="40%" fontWeight="semibold">
                  Hình thức thanh toán:
                </Text>
                <Text>
                  {data?.data.payment_method.orderType == "cash"
                    ? "Tiền mặt"
                    : data?.data.payment_method.orderType}
                </Text>
              </Flex>
              <Flex>
                <Text w="40%" fontWeight="semibold">
                  Mã:
                </Text>
                <Text>{data?.data.payment_method.partnerCode}</Text>
              </Flex>
            </Flex>
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
              onClick={() => onConfirmOpen()}
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
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        handleClick={() => handleCancelOrder(data?.data._id)}
        content="Bạn có muốn xoá đơn hàng này"
      />
      <DialogThinkPro
        isOpen={isPDFOpen}
        onClose={onPDFClose}
        title="Xuất hóa đơn"
        isCentered={true}
        size="3xl"
        footer={
          <Flex gap={4}>
            <Button onClick={() => onPDFClose()}>Hủy</Button>
            {/* <Button bgColor={"blue.500"}>
              <PDFDownloadLink
                document={<ExportOrderPDF />}
                fileName="example.pdf"
              >
                {({ loading }) =>
                  loading ? "Loading document..." : "Download now!"
                }
              </PDFDownloadLink>
            </Button> */}
          </Flex>
        }
      >
        <PDFViewer width={"100%"} height={"800px"}>
          <ExportOrderPDF data={data?.data} />
        </PDFViewer>
      </DialogThinkPro>
    </Box>
  );
};

export default OrderDetailView;