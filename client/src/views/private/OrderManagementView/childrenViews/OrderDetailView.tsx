import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Button, Image, Table, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
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
import { createColumnHelper } from "@tanstack/react-table";
import OrderDetailMetricItem from "../components/OrderDetailMetric";
import { useParams } from "react-router";
import {
  useCancelOrderMutation,
  useGetOneShippingQuery,
  useTokenPrintOrderMutation,
  useUpdateStatusOrderMutation,
} from "~/redux/api/order";
import OrderStatus from "../../ShippingView/components/OrderStatus";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import { useToast } from "@chakra-ui/react";
import ModelPrint from "./ModalPrint";
import TableProduct from "./TableProduct";
import ExportOrderPDF from "./ExportOrderPDF";
import { PDFViewer } from "@react-pdf/renderer";
import DialogThinkPro from "~/components/DialogThinkPro";
import { Link, Link as ReactRouterLink } from "react-router-dom";
import { chuyenDoiSoDienThoaiVe0 } from "~/utils/fc";

type Props = {};

const OrderDetailView = (props: Props) => {
  const { id } = useParams();
  const toast = useToast();
  const [openPrint, setOpenPrint] = useState(false);
  const [tokenPrint, setTokenPrint] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenOrder,
    onClose: onCloseOrder,
    onOpen: onOpenOrder,
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
  const [tokenPrintOrder, { isLoading: isLoadingPrint }] =
    useTokenPrintOrderMutation();
  const [updateStatusOrder] = useUpdateStatusOrderMutation();
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
  const checkStatusOrder = (status: string) => {
    if (status == "processing") {
      return "Chờ xác nhận";
    }
    if (status == "confirmed") {
      return "Đã xác nhận";
    }
    if (status == "delivering") {
      return "Đang vận chuyển";
    }
    if (status == "cancelled") {
      return "Đã huỷ đơn";
    }
    if (status == "delivered") {
      return "Đã hoàn thành";
    }
    if (status == "returned") {
      return "Đã hoàn hàng";
    }
    return "Chờ xác nhận";
  };
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
        return (
          <Text fontSize="14px" fontWeight="semibold">
            {info.getValue()?._id ?? "id"}
          </Text>
        );
      },
      header: "ID sản phẩm",
    }),
    columnHelper.accessor("sku_id", {
      cell: ({ getValue }) => {
        return (
          <Image
            src={getValue()?.image.url}
            w="64px"
            h="64px"
            objectFit="contain"
            bgColor="bg.gray"
            rounded="md"
            p="2"
          />
        );
      },
      header: "Ảnh",
    }),
    columnHelper.accessor("sku_id", {
      cell: (info) => {
        return (
          <Text fontSize="14px" fontWeight="semibold">
            {info.getValue()?.name ?? "Sản phẩm"}
          </Text>
        );
      },
      header: "Tên sản phẩm",
    }),
    columnHelper.accessor("option_value", {
      cell: (info) => {
        return (
          <Text fontSize="14px" fontWeight="semibold">
            {info.getValue()?.join(",") ?? "Sản phẩm"}
          </Text>
        );
      },
      header: "Cấu hình",
    }),
    columnHelper.accessor("price", {
      cell: (info) => (
        <Text fontSize="14px" fontWeight="semibold">
          {info.getValue()?.toLocaleString()}đ
        </Text>
      ),
      header: "Đơn giá",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => (
        <Text fontSize="14px" fontWeight="semibold">
          {info.getValue()}
        </Text>
      ),
      header: "Số lượng",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("#", {
      cell: (info) => (
        <Text fontSize="14px" fontWeight="semibold">
          {(
            info.row.original.price * info.row.original.quantity
          )?.toLocaleString()}
          đ
        </Text>
      ),
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
  const handlePrinOrder = async () => {
    if (
      data?.data.status == ("processing" as any) ||
      data?.data.status == ("confirmed" as any)
    ) {
      const data_token: any = await tokenPrintOrder({ order_id: id });
      setTokenPrint(data_token.data.data);
      setOpenPrint(true);
      return;
    }
    toast({
      title: "Hệ thống thông báo",
      description: `Không thể thực hiện in đơn đã huỷ`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePrint = async (value: string) => {
    const newTab = window.open(
      `https://dev-online-gateway.ghn.vn/a5/public-api/${value}?token=${tokenPrint}`,
      "_blank"
    );
    setOpenPrint(false);
    newTab?.focus();
  };
  const handleOpenModelStatus = (status: string) => {
    setOrderStatus(status);
    onOpenOrder();
  };
  const handleChangeStatusOrder = () => {
    updateStatusOrder({ status: orderStatus, id: id })
      .unwrap()
      .then((data) => {
        console.log(data);
        toast({
          title: "Hệ thống thông báo",
          description: `${data.message}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Hệ thống thông báo",
          description: `${err.data.errors.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        onCloseOrder();
      });
  };
  return (
    <Box bgColor="bg.white" px="6" py="8" mb="8" rounded="lg">
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h1" fontSize="18">
          <Text>Chi tiết đơn hàng</Text>
        </Heading>
        <Flex gap={4}>
          {data?.data.status === "processing" && (
            <Button onClick={() => handleOpenModelStatus("confirmed")}>
              Xác nhận đơn
            </Button>
          )}
          {data?.data.status === "confirmed" && (
            <Button onClick={() => handleOpenModelStatus("delivering")}>
              Vận chuyển đơn
            </Button>
          )}
          {data?.data.status === "delivering" && (
            <Button onClick={() => handleOpenModelStatus("pendingComplete")}>
              Hoàn thành đơn
            </Button>
          )}

          {data?.data.shipping_method === "at_store" ? (
            <Button
              leftIcon={<DownloadIcon size={24} />}
              onClick={() => onPDFOpen()}
            >
              In HĐ thanh toán
            </Button>
          ) : (
            <Button
              leftIcon={<DownloadIcon size={24} />}
              onClick={handlePrinOrder}
              loadingText="Đang tải..."
              isLoading={isLoadingPrint}
            >
              {" "}
              In vận đơn
            </Button>
          )}
        </Flex>
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
          phone={chuyenDoiSoDienThoaiVe0(data?.data.phone_number)}
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
          phone={
            data?.data.shipping_method == "at_store"
              ? "Mua tại cửa hàng"
              : "Ship"
          }
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
          <TableProduct columns={columns} data={data?.data.products} />
          <Flex alignItems="flex-end" flexDirection="column" py={4}>
            <Box width="30%" minH="250px">
              <Flex
                my={1}
                justifyContent="space-between"
                p={2}
                borderBottom="1px solid #ccc"
              >
                <Text fontSize={14} fontWeight="semibold">
                  Tổng số lượng:{" "}
                </Text>
                <Text fontSize={14} fontWeight="semibold">
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
                <Text fontSize={14} fontWeight="semibold">
                  Tổng tiền sản phẩm:{" "}
                </Text>
                <Text fontSize={14} fontWeight="semibold">
                  {data.data.products
                    .reduce(
                      (acc: any, product: any) =>
                        acc + product.quantity * product.price,
                      0
                    )
                    .toLocaleString()}
                  đ
                </Text>
              </Flex>
              <Flex
                my={1}
                justifyContent="space-between"
                p={2}
                borderBottom="1px solid #ccc"
              >
                <Text fontSize={14} fontWeight="semibold">
                  Giảm giá:{" "}
                </Text>
                <Text fontSize={14} fontWeight="semibold">
                  0đ
                </Text>
              </Flex>
              <Flex
                my={1}
                justifyContent="space-between"
                p={2}
                borderBottom="1px solid #ccc"
              >
                <Text fontSize={14} fontWeight="semibold">
                  Tiền vận chuyển:{" "}
                </Text>
                <Text fontSize={14} fontWeight="semibold">
                  {data?.data.shipping_info?.transportation_fee.toLocaleString() ||
                    0}
                  đ
                </Text>
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
                <Text fontSize={14} fontWeight="semibold">
                  {(
                    data?.data.total_amount +
                    (data?.data.shipping_info?.transportation_fee || 0)
                  ).toLocaleString() || 0}
                  đ
                </Text>
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
                : "Giao tận nơi"}
            </Heading>
            <Flex justifyContent="center" alignItems="center" fontSize={15}>
              <Flex
                py={4}
                justifyContent={"center"}
                flexDir={"column"}
                alignItems={"center"}
                w={"100%"}
              >
                <CarIcon />
                <Text fontWeight={700}>
                  {data?.data.shipping_method === "at_store"
                    ? "Tại Cửa hàng"
                    : "Giao hàng nhanh"}
                </Text>

                <Flex w={"100%"}>
                  <Text fontSize="14px" fontWeight="semibold" w={"50%"}>
                    Thanh toán:
                  </Text>
                  <Text fontSize="14px" fontWeight="semibold">
                    {data?.data.payment_status == "paid"
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </Text>
                </Flex>

                <Flex w={"100%"}>
                  <Text fontSize="14px" fontWeight="semibold" w={"50%"}>
                    Giao hàng:{" "}
                  </Text>
                  <Text fontSize="14px" fontWeight="semibold">
                    {data?.data.shipping_method == "at_store"
                      ? "Tại cửa hàng"
                      : "Giao tận nơi"}
                  </Text>
                </Flex>
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
                <Text w="50%" fontWeight="semibold">
                  Trạng thái thanh toán:
                </Text>
                <Text fontWeight="semibold">
                  {data?.data.payment_method.message == "failed"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </Text>
              </Flex>
              <Flex>
                <Text w="50%" fontWeight="semibold">
                  Phương thức:
                </Text>
                <Text fontWeight="semibold">
                  {data?.data.payment_method.orderInfo}
                </Text>
              </Flex>
              <Flex>
                <Text w="50%" fontWeight="semibold">
                  Hình thức thanh toán:
                </Text>
                <Text fontWeight="semibold">
                  {data?.data.payment_method.orderType == "cash"
                    ? "Tiền mặt"
                    : data?.data.payment_method.orderType}
                </Text>
              </Flex>
              <Flex>
                <Text w="50%" fontWeight="semibold">
                  Mã:
                </Text>
                <Text fontWeight="semibold">
                  {data?.data.payment_method.partnerCode}
                </Text>
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
            Trạng thái đơn hàng: {checkStatusOrder(data?.data.status)}
          </Heading>
          <Flex gap={4}>
            <Button
              as={ReactRouterLink}
              to={`/admin/don-hang/cap-nhat/${id}`}
              leftIcon={<AddressIcon size={6} />}
              bg="#FFCCFF"
              _hover={{ bg: "#CCCCFF" }}
              fontWeight={"semibold"}
            >
              Cập nhật thông tin
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
        content="Bạn có muốn xoá đơn hàng này?"
      />
      <ConfirmThinkPro
        isOpen={isOpenOrder}
        onClose={onCloseOrder}
        handleClick={handleChangeStatusOrder}
        content="Bạn có muốn thay đổi trạng thái của đơn hàng?"
      />
      <ModelPrint
        isOpen={openPrint}
        onClose={() => setOpenPrint(false)}
        handlePrint={handlePrint}
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
