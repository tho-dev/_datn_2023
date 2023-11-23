import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Button, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
  CartIcon,
  InfoIcon,
  LocationIcon,
  MoneyIcon,
  TagIcon,
  UserIcon,
} from "~/components/common/Icons";
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

import ExportOrderPDF from "./ExportOrderPDF";
import { PDFViewer } from "@react-pdf/renderer";
import DialogThinkPro from "~/components/DialogThinkPro";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  checkOrderStatus,
  chuyenDoiSoDienThoaiVe0,
  formatNumber,
} from "~/utils/fc";
import LoadingPolytech from "~/components/LoadingPolytech";

const OrderDetailView = () => {
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

  const { data, isFetching } = useGetOneShippingQuery({
    id,
  });

  const [cancelOrder] = useCancelOrderMutation();
  const [tokenPrintOrder, { isLoading: isLoadingPrint }] =
    useTokenPrintOrderMutation();
  const [updateStatusOrder] = useUpdateStatusOrderMutation();

  if (isFetching) {
    return <LoadingPolytech />;
  }

  const handleCancelOrder = (id: string) => {
    if (
      data?.data.status !== "processing" ||
      data?.data.status !== "confirmed"
    ) {
      return toast({
        title: "Hệ thống thông báo",
        description: `Không thể huỷ đơn hàng ${data?.data.status}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
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
    <Box bgColor="bg.white" px="6" py="8" rounded="xl">
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Flex gap="4">
          <Heading fontSize="18" textTransform="uppercase">
            Chi tiết đơn hàng
          </Heading>

          <Text
            py="1"
            px="4"
            fontSize="xs"
            fontWeight="semibold"
            display="inline-block"
            rounded="4px"
            bg={checkOrderStatus(data?.data.status as string)?.background}
            color={checkOrderStatus(data?.data.status as string)?.color}
          >
            {checkOrderStatus(data?.data.status as string)?.status}
          </Text>
        </Flex>
        <Flex gap={4}>
          {data?.data.status === "processing" && (
            <Button
              onClick={() => handleOpenModelStatus("confirmed")}
              bgColor="bg.bgWarning"
              color="text.textWarning"
            >
              Xác nhận đơn
            </Button>
          )}
          {data?.data.status === "confirmed" && (
            <Button
              onClick={() => handleOpenModelStatus("delivering")}
              bgColor="bg.bgWarning"
              color="text.textWarning"
            >
              Vận chuyển đơn
            </Button>
          )}
          {data?.data.status === "delivering" && (
            <Button
              onClick={() => handleOpenModelStatus("pendingComplete")}
              bgColor="bg.bgSuccess"
              color="text.textSuccess"
            >
              Hoàn thành đơn
            </Button>
          )}

          {data?.data.shipping_method === "at_store" ? (
            <Button
              onClick={() => onPDFOpen()}
              bg="bg.bgEdit"
              color="text.textEdit"
            >
              In HĐ thanh toán
            </Button>
          ) : (
            <Button
              onClick={handlePrinOrder}
              loadingText="Đang tải..."
              isLoading={isLoadingPrint}
              bg="bg.bgEdit"
              color="text.textEdit"
            >
              In vận đơn
            </Button>
          )}
          {data?.data.status == "processing" ||
            (data?.data.status == "confirmed" && (
              <Button
                as={ReactRouterLink}
                bg="bg.bgSuccess"
                to={`/admin/don-hang/cap-nhat/${id}`}
                color="text.textSuccess"
              >
                Cập nhật thông tin
              </Button>
            ))}

          {data?.data.status == "processing" && (
            <Button
              bg="bg.bgDelete"
              color="text.textDelete"
              onClick={() => onOpen()}
            >
              Huỷ đơn hàng
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h1" fontSize="16">
          <Text>ID: #{data?.data._id}</Text>
        </Heading>
      </Flex>
      <Grid
        mt="4"
        py="6"
        gap="5"
        bgColor="bg.white"
        rounded="md"
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
      >
        <OrderDetailMetricItem
          heading="Thông Tin Khách Hàng"
          icon={<UserIcon size={5} color="text.textSuccess" />}
          color="bg.bgSuccess"
        >
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Tên:
            </Text>{" "}
            {data?.data.customer_name}
          </Text>
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - SĐT:
            </Text>{" "}
            {chuyenDoiSoDienThoaiVe0(data?.data.phone_number)}
          </Text>
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Ghi chú:
            </Text>{" "}
            {data?.data?.content}
          </Text>
        </OrderDetailMetricItem>
        <OrderDetailMetricItem
          heading="Địa chỉ nhận"
          icon={<LocationIcon size={5} color="text.textEdit" />}
          color="bg.bgEdit"
        >
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Địa chỉ:
            </Text>{" "}
            {data?.data.shipping_method === "at_store"
              ? data?.data.shop_address
              : data?.data.shipping_info.shipping_address}
          </Text>
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Giao hàng:
            </Text>{" "}
            {data?.data.shipping_method == "at_store" ? "Cửa Hàng" : "Online"}
          </Text>
        </OrderDetailMetricItem>
        <OrderDetailMetricItem
          heading="Thanh Toán"
          icon={<InfoIcon size={6} color="text.textWarning" />}
          color="bg.bgWarning"
        >
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Phương thức:
            </Text>{" "}
            {data?.data.payment_method.orderInfo}
          </Text>
          <Box fontWeight="semibold">
            <Text as="span" fontWeight="bold" fontSize="13px">
              - Trạng thái:
            </Text>{" "}
            <Text display="inline-flex" fontSize="13px">
              {data?.data.payment_method.message == "failed"
                ? "Chưa thanh toán"
                : "Đã thanh toán"}
            </Text>
          </Box>
        </OrderDetailMetricItem>
        <OrderDetailMetricItem
          heading="Tổng tiền"
          icon={<MoneyIcon size={6} color="text.textDelete" />}
          color="bg.bgDelete"
        >
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Số lượng:
            </Text>{" "}
            {data.data.products.reduce(
              (acc: any, product: any) => acc + product.quantity,
              0
            )}
          </Text>
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Tiền sản phẩm:
            </Text>{" "}
            {formatNumber(
              `${data.data.products.reduce(
                (acc: any, product: any) =>
                  acc + product.quantity * product.price,
                0
              )}`
            ) || 0}{" "}
            VND
          </Text>
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Giảm giá:
            </Text>{" "}
            {formatNumber(`${data?.data.coupon_id?.coupon_value || 0}`)} VND
          </Text>
          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Phí vận chuyển:
            </Text>{" "}
            {formatNumber(
              `${data?.data.shipping_info?.transportation_fee || 0}`
            )}{" "}
            VND
          </Text>

          <Text fontSize="13px" fontWeight="semibold">
            <Text as="span" fontWeight="bold">
              - Thành tiền:
            </Text>{" "}
            {formatNumber(
              `${
                data?.data.total_amount +
                (data?.data.shipping_info?.transportation_fee || 0)
              }`
            )}{" "}
            VND
          </Text>
        </OrderDetailMetricItem>
      </Grid>

      <Flex w="full" flexDir="column" gap="6">
        <OrderDetailMetricItem
          heading="Sản phẩm"
          icon={<CartIcon size={5} color="text.textEn" />}
          color="bg.bgEn"
        >
          <Flex my="4" gap="4" flexDir="column">
            {data?.data?.products?.map((product: any, index: number) => {
              return (
                <Flex gap="4" key={index}>
                  <Box
                    w="68px"
                    h="68px"
                    rounded="lg"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor="#eef1f6"
                    boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
                  >
                    <Image
                      src={product?.sku_id?.image?.url}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                  <Flex flex="1">
                    <Flex flex="1" gap="3" flexDir="column">
                      <Text
                        fontSize="13px"
                        color="text.black"
                        fontWeight="semibold"
                      >
                        {product?.sku_id?.name}
                      </Text>

                      <Flex gap="2" flexWrap="wrap">
                        {product.option_value?.map((x: any, i: any) => {
                          return (
                            <Text
                              key={i}
                              px="3"
                              py="1"
                              fontSize="xs"
                              fontWeight="semibold"
                              rounded="xl"
                              borderWidth="1px"
                              borderColor="#eef1f6"
                              boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
                            >
                              {x}
                            </Text>
                          );
                        })}
                      </Flex>
                    </Flex>

                    <Flex
                      mr="4"
                      gap="3"
                      flexDir="column"
                      justifyContent="flex-start"
                    >
                      <Text
                        fontSize="sm"
                        color="text.textDelete"
                        fontWeight="black"
                        display="inline-flex"
                        textAlign="right"
                      >
                        x{product?.quantity}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {formatNumber(`${product.total_money}`)} VND
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </OrderDetailMetricItem>

        <OrderDetailMetricItem
          heading="Tình trạng"
          icon={<TagIcon size={6} color="text.textSuccess" />}
          color="bg.bgSuccess"
        >
          <OrderStatus data={data?.data.status} />
        </OrderDetailMetricItem>
      </Flex>

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
        title={
          <Heading textTransform="uppercase" fontSize="lg">
            Xuất hóa đơn
          </Heading>
        }
        isCentered={true}
        size="6xl"
        footer={
          <Flex gap={4}>
            <Button
              onClick={() => onPDFClose()}
              bg="bg.bgDelete"
              color="text.textDelete"
            >
              Hủy
            </Button>
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
