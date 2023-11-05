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
import { useGetOneQuery } from "~/redux/api/order";
import { useAppSelector } from "~/redux/hook/hook";
import { formatCurrency } from "~/utils/fc";

type Props = {};

const DetailOrder = (props: Props) => {
  const { idOrder, orders } = useAppSelector(
    (state) => state.persistedReducer.order
  );
  const { data, isLoading, isSuccess } = useGetOneQuery(idOrder);
  const quantityProduct =
    isSuccess && data.data.products.map((item: any) => item.quantity);
  const priceProduct =
    isSuccess && data.data.products.map((item: any) => item.price);
  const totalPrice =
    isSuccess &&
    priceProduct.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0
    );
  const totalQuantity =
    isSuccess &&
    quantityProduct.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0
    );
  const totalMoney = isSuccess && totalPrice * totalQuantity;
  return (
    <Box p="4" my={4} rounded="md" backgroundColor="bg.gray">
      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight={"bold"}>
          Mã đơn hàng:{" "}
          <Text as={"span"} fontSize="14px">
            {data?.originalArgs}
          </Text>
        </Text>
        <Tag
          fontSize="12px"
          fontWeight="bold"
          textTransform={"uppercase"}
          color={"text.red"}
        >
          pending
        </Tag>
      </Flex>
      <Divider />
      {isLoading && (
        <Box p="4" my={4} rounded="md" backgroundColor="bg.gray">
          <Flex justifyContent="space-between" alignItems="center">
            <SkeletonText w="50%" h="30px" noOfLines={1} />
          </Flex>
          <Divider />
          <Box>
            <Flex justifyContent={"space-between"} my={"4"}>
              <Skeleton w="50px" h="50px" />
              <SkeletonText w="100%" h="30px" ml="10px" noOfLines={4} />
            </Flex>
          </Box>
          <Divider />
          <Flex
            justifyContent="end"
            display="flex"
            alignItems="center"
            pt="30px"
          >
            <SkeletonText w="100px" h="30px" ml="10px" noOfLines={1} />
          </Flex>
        </Box>
      )}
      {isSuccess &&
        data?.data?.products.map((item: any) => {
          return (
            <Box key={item?._id}>
              <ItemCart orderItem={item} />

              <Divider />
            </Box>
          );
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
            {totalQuantity} sản phẩm
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
            {formatCurrency(totalMoney)}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Tổng tiền giao hàng :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            200đ
          </Text>
        </Flex>
        <Flex justifyContent="space-between" my={1}>
          <Text fontSize="14px" fontWeight="bold">
            Thuế VAT 10% :{" "}
          </Text>
          <Text
            as={"span"}
            fontSize="14px"
            fontWeight={"bold"}
            color={"text.red"}
          >
            300đ
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
            3500đ
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailOrder;
