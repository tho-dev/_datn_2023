import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import ItemCart from "./ItemCart";
import { checkOrderStatus } from "~/utils/fc";

type Props = {
  orderDetail: any;
};

const DetailOrder = ({ orderDetail }: Props) => {
  console.log(orderDetail);

  return (
    <Box p="4" my={4} rounded="md" backgroundColor="bg.gray">
      <Flex justifyContent="space-between" my="2">
        <Text fontSize="14px" fontWeight={"bold"}>
          Mã đơn hàng:
          <Text as={"span"} fontSize="12px">
            POLYTECH{orderDetail?._id}
          </Text>
        </Text>
        <Text
          py="1"
          px="4"
          fontSize="xs"
          fontWeight="semibold"
          display="inline-block"
          rounded="4px"
          bg={checkOrderStatus(orderDetail.status as string)?.background}
          color={checkOrderStatus(orderDetail.status as string)?.color}
        >
          {checkOrderStatus(orderDetail.status as string)?.status}
        </Text>
      </Flex>
      <Divider />
      {orderDetail?.orders.map((item: any) => {
        return <ItemCart product={item} key={item._id} />;
      })}

      <Divider />
      <Box my={4} rounded="md" backgroundColor="bg.gray">
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Tống số lượng :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            {orderDetail?.orders.length} sản phẩm
          </Text>
        </Flex>
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Tổng tiền sản phẩm :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            {orderDetail?.orders
              .reduce((acc: any, order: any) => {
                return acc + order.price * order.quantity;
              }, 0)
              .toLocaleString() || 0}
            đ
          </Text>
        </Flex>
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Giảm giá :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            {orderDetail?.coupon_id?.coupon_value || 0}đ
          </Text>
        </Flex>
        <Divider />
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Tổng tiền cần thanh toán :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            {orderDetail?.total_amount?.toLocaleString()}đ
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailOrder;
