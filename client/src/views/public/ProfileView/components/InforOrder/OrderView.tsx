import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import TabPanelItem from "./components/TabPanelItem";

type Props = {};

const OrderView = (props: Props) => {
  const deliveryStatus = [
    "all",
    "processing",
    "confirmed",
    "delivering",
    "delivered",
    "cancelled",
    "returned",
  ];
  return (
    <Box py="4" rounded="xl" bgColor="bg.white">
      <Heading py="4" color="text.black" fontSize="xl">
        Theo dõi đơn hàng
      </Heading>
      <Box my="6">
        <Tabs my="2">
          <TabList display={"flex"} justifyContent={"space-between"}>
            <Tab fontSize="sm" fontWeight="semibold">
              Tất cả
            </Tab>
            <Tab fontSize="sm" fontWeight="semibold">
              Chờ xác nhận
            </Tab>
            <Tab fontSize="sm" fontWeight="semibold">
              Đã xác nhận
            </Tab>
            <Tab fontSize="sm" fontWeight="semibold">
              Đang giao
            </Tab>
            <Tab fontSize="sm" fontWeight="semibold">
              Đã hoàn thành
            </Tab>
            <Tab fontSize="sm" fontWeight="semibold">
              Đã hủy
            </Tab>
            <Tab fontSize="sm" fontWeight="semibold">
              Trả hàng / Hoàn tiền
            </Tab>
          </TabList>

          <TabPanels>
            {deliveryStatus.map((status) => (
              <TabPanelItem key={status} status={status} />
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default OrderView;
