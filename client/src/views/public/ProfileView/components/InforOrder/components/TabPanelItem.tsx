import { Box, Divider, Flex, TabPanel, Text, Tag } from "@chakra-ui/react";
import React from "react";
import ItemCart from "./ItemCart";
import { useGetOrderByUserIdQuery } from "~/redux/api/order";
import { useAppSelector } from "~/redux/hook/hook";
type Props = {
  status: string;
};

const TabPanelItem = ({ status }: Props) => {
  const { user } = useAppSelector((state) => state.persistedReducer.global);
  const { data, isLoading, isFetching } = useGetOrderByUserIdQuery(user._id);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  if (isFetching) {
    return <Box>isFetching...</Box>;
  }
  const filteredOrders = data.data.filter(
    (order: any) => order.status == status
  );
  console.log(filteredOrders);
  return (
    <TabPanel>
      {status == "all"
        ? data?.data.map((order: any) => (
            <Box
              key={order._id}
              p="6"
              my={4}
              rounded="md"
              backgroundColor="bg.gray"
            >
              <Flex justifyContent="space-between">
                <Text fontSize="14px" fontWeight={"bold"}>
                  Mã đơn hàng:{order._id}
                  <Text as={"span"} fontSize="14px">
                    {order.id}
                  </Text>
                </Text>
                <Tag
                  fontSize="12px"
                  fontWeight="bold"
                  textTransform={"uppercase"}
                  color={"text.red"}
                >
                  {order.status}
                </Tag>
              </Flex>
              <Divider />
              <Box>
                <ItemCart product={order?.new_order_details[0]} />
              </Box>
              <Divider />
              <Flex justifyContent="end">
                <Text fontSize="14px" fontWeight="bold">
                  Thành tiền:{order.total_amount.toLocaleString()}đ
                </Text>
              </Flex>
            </Box>
          ))
        : filteredOrders.map((order: any) => (
            <Box
              key={order._id}
              p="6"
              my={4}
              rounded="md"
              backgroundColor="bg.gray"
            >
              <Flex justifyContent="space-between">
                <Text fontSize="14px" fontWeight={"bold"}>
                  Mã đơn hàng:{" "}
                  <Text as={"span"} fontSize="14px">
                    {order._id}
                  </Text>
                </Text>
                <Tag
                  fontSize="12px"
                  fontWeight="bold"
                  textTransform={"uppercase"}
                  color={"text.red"}
                >
                  {order.status}
                </Tag>
              </Flex>
              <Divider />
              <Box>
                <ItemCart product={order?.new_order_details[0]} />
              </Box>
              <Divider />
              <Flex justifyContent="end">
                <Text fontSize="14px" fontWeight="bold">
                  Thành tiền:{order.total_amount.toLocaleString()}đ
                </Text>
              </Flex>
            </Box>
          ))}
    </TabPanel>
  );
};

export default TabPanelItem;
