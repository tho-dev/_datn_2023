import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { status_order } from "~/data";
import ItemOrder from "./components/ItemOrder";
import { useAppSelector } from "~/redux/hook/hook";
import {
  useCancelOrderMutation,
  useConfirmDeliveredMutation,
  useGetOrderByUserIdQuery,
  useReturnOrderMutation,
} from "~/redux/api/order";
import { useState } from "react";
import { chuyenDoiSoDienThoai } from "~/utils/fc";
import DialogThinkPro from "~/components/DialogThinkPro";
import ReturnOrder from "./components/ReturnOrder";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import OrderDetail from "./components/OrderDetail";
import LoadingPolytech from "~/components/LoadingPolytech";

type Props = {};

const OrderView = (props: Props) => {
  const { user } = useAppSelector((state) => state.persistedReducer.global);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState<any>({
    _page: 1,
    _limit: 6,
    _order: "desc",
    _sort: "created_at",
    status: "",
    id: user._id,
  });
  const [id, setId] = useState("");
  const [orderDetail, setOrderDetail] = useState({} as any);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenReturn,
    onOpen: onOpenReturn,
    onClose: onCloseReturn,
  } = useDisclosure();

  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();
  const toast = useToast();
  const { data, isLoading, isFetching, isError } =
    useGetOrderByUserIdQuery(query);

  const [cancelOrder] = useCancelOrderMutation();
  const [confirmDelivered] = useConfirmDeliveredMutation();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const handleChangeStatus = (status_order: string) => {
    setQuery({ status: status_order });
    setStatus(status_order);
  };
  // hoàn hàng

  const handleOpenModelReturn = (order: any) => {
    onOpenReturn();
    setId(order._id);
    setOrderDetail(order);
  };

  // huỷ hàng
  const handleOpenModelCancel = (order: any) => {
    onOpenCancel();
    setOrderDetail(order);
  };
  const handleCancel = () => {
    // check thời gian
    // const currentDate = new Date();
    // const targetTime = new Date(orderDetail.created_at);
    // targetTime.setMinutes(targetTime.getMinutes() + 15);
    // if (currentDate > targetTime) {
    //   return toast({
    //     title: "Không thể huỷ đơn hàng",
    //     description: "Liên hệ với bộ phận CSKH để được xử lý",
    //     status: "error",
    //     duration: 2000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    // }
    if (orderDetail?.status !== "processing") {
      return toast({
        title: "Hệ thống",
        description: "Bạn không thể huỷ đơn hàng",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
    cancelOrder({ id: orderDetail._id })
      .unwrap()
      .then((data: any) => {
        toast({
          title: "Hệ thống",
          description: "Huỷ đơn hàng thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .catch((error: any) => {
        toast({
          title: "Hệ thống",
          description: "Huỷ đơn hàng thất bại",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      })
      .finally(() => {
        onCloseCancel();
      });
  };
  // xác nhận đã nhận được hàng
  const handleConfirmCompleted = (order: any) => {
    confirmDelivered(order?._id)
      .unwrap()
      .then((data) => {
        toast({
          title: "Hệ thống",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        toast({
          title: "Hệ thống",
          description: error.data.errors.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      });
  };
  // xem chi tiết đơn hàng và cập nhật đơn hàng
  const handleOrderDetail = (order: any) => {
    setOrderDetail(order);
    onOpen();
  };
  return (
    <Box rounded="xl" bgColor="bg.white">
      <Flex my="6" gap={4}>
        {status_order.map((item: any, index: number) => {
          return (
            <Button
              fontSize="sm"
              fontWeight="semibold"
              p={4}
              key={index}
              bgColor={status === item.value ? "gray" : "bg.gray"}
              onClick={() => handleChangeStatus(item.value)}
              color={status === item.value ? "white" : "black"}
            >
              {item.name}
            </Button>
          );
        })}
      </Flex>
      {isFetching && <Box>fetching...</Box>}

      {isError ? (
        <Text>Không có đơn hàng nào</Text>
      ) : (
        <Grid gridTemplateColumns={"repeat(2,1fr)"} gap={4} w={"100%"}>
          {data?.data.items.map((item: any, index: number) => {
            return (
              <GridItem>
                <ItemOrder
                  key={index}
                  item={item}
                  handleOpenModelReturn={handleOpenModelReturn}
                  handleOpenModelCancel={handleOpenModelCancel}
                  handleConfirmCompleted={handleConfirmCompleted}
                  handleOrderDetail={handleOrderDetail}
                />
              </GridItem>
            );
          })}
        </Grid>
      )}

      {/* hoàn hàng */}
      <DialogThinkPro
        isOpen={isOpenReturn}
        onClose={onCloseReturn}
        isCentered
        size="4xl"
        title={<Heading fontSize="xl">Trả lại đơn hàng</Heading>}
      >
        <ReturnOrder
          orderDetail={orderDetail}
          id={id}
          onCloseReturn={onCloseReturn}
        />
      </DialogThinkPro>
      {/* Huỷ đơn */}
      <ConfirmThinkPro
        isOpen={isOpenCancel}
        handleClick={handleCancel}
        onClose={onCloseCancel}
        content="Bạn có chắc muốn huỷ đơn hàng này?"
      />
      {/* cập nhật đơn hàng */}
      <DialogThinkPro
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="4xl"
        title={<Heading fontSize="xl">Chi tiết đơn hàng của bạn</Heading>}
      >
        <OrderDetail orderDetail={orderDetail} onCloseDetail={onClose} />
      </DialogThinkPro>
    </Box>
  );
};

export default OrderView;
