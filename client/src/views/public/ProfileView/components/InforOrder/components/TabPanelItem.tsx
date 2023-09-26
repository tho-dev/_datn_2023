import { Box, Divider, Flex, TabPanel, Text, Tag } from "@chakra-ui/react";
import { orders } from "~/data/clone-thinkpro.json";
import React from "react";
import ItemCart from "./ItemCart";

type Props = {
  status: string;
};

const TabPanelItem = ({ status }: Props) => {
  const filteredOrders = orders.filter(
    (order) => order.deliveryStatus == status
  );
  return (
    <TabPanel>
      {status == "all"
        ? orders.map((order) => (
            <Box
              key={order.id}
              p="6"
              my={4}
              rounded="md"
              backgroundColor="bg.gray"
            >
              <Flex justifyContent="space-between">
                <Text fontSize="14px" fontWeight={"bold"}>
                  Mã đơn hàng:{" "}
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
                  {order.deliveryStatus}
                </Tag>
              </Flex>
              <Divider />
              <Box>
                <ItemCart />
              </Box>
              <Divider />
              <Flex justifyContent="end">
                <Text fontSize="14px" fontWeight="bold">
                  Thành tiền:{" "}
                  <Text
                    as={"span"}
                    fontSize="14px"
                    fontWeight={"bold"}
                    color={"text.red"}
                  >
                    {order.amount} đ
                  </Text>
                </Text>
              </Flex>
            </Box>
          ))
        : filteredOrders.map((order) => (
            <Box
              key={order.id}
              p="6"
              my={4}
              rounded="md"
              backgroundColor="bg.gray"
            >
              <Flex justifyContent="space-between">
                <Text fontSize="14px" fontWeight={"bold"}>
                  Mã đơn hàng:{" "}
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
                  {order.deliveryStatus}
                </Tag>
              </Flex>
              <Divider />
              <Box>
                <ItemCart />
              </Box>
              <Divider />
              <Flex justifyContent="end">
                <Text fontSize="14px" fontWeight="bold">
                  Thành tiền:{" "}
                  <Text
                    as={"span"}
                    fontSize="14px"
                    fontWeight={"bold"}
                    color={"text.red"}
                  >
                    {order.amount} đ
                  </Text>
                </Text>
              </Flex>
            </Box>
          ))}
    </TabPanel>
  );
};

export default TabPanelItem;
