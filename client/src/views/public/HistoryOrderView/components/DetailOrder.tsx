import {
  Box,
  Divider,
  Flex,
  Text,
  Tag,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import ItemCart from "./ItemCart";
import { formatCurrency } from "~/utils/fc";

type Props = {
  orderDetail: any;
};

const DetailOrder = ({ orderDetail }: Props) => {
  return (
    <Box p="4" my={4} rounded="md" backgroundColor="bg.gray">
      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight={"bold"}>
          Mã đơn hàng:
          <Text as={"span"} fontSize="12px">
            POLYTECH{orderDetail?._id}
          </Text>
        </Text>
        <Tag
          fontSize="12px"
          fontWeight="bold"
          textTransform={"uppercase"}
          color={"text.red"}
        >
          {orderDetail?.status}
        </Tag>
      </Flex>
      <Divider />
      {orderDetail?.orders.map((item: any) => {
        return <ItemCart product={item} key={item._id} />;
      })}

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
            1000
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
