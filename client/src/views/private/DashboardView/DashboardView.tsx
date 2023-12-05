import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useState } from "react";
import image_bag from "~/assets/images/ic_glass_bag.png";
import image_buy from "~/assets/images/ic_glass_buy.png";
import image_message from "~/assets/images/ic_glass_message.png";
import image_user from "~/assets/images/ic_glass_users.png";
import {
  useGetDashboardQuery,
  useGetRevenueStatisticsQuery,
} from "~/redux/api/general";
import { formatMoney } from "~/utils/fc";
import TopRevenue from "./components/TopRevenue";
import TopOrders from "./components/TopOrders";
import TopCategory from "./components/TopCategory";
import LoadingPolytech from "~/components/LoadingPolytech";
import { useAppSelector } from "~/redux/hook/hook";

const DashboardView = () => {
  const { user } = useAppSelector((state) => state.persistedReducer.global);
  const { data, isLoading } = useGetDashboardQuery({});
  const [query, setQuery] = useState({
    period: "week",
  });

  const { data: revenues } = useGetRevenueStatisticsQuery(query);
  if (isLoading) {
    return <LoadingPolytech />;
  }

  return (
    <Box w="full" h="full" pb="60px">
      <Heading my="6" fontSize="2xl" fontWeight="bold">
        Hi, Welcome back {user?.first_name + " " + user?.last_name}👋
      </Heading>

      <Flex gap="48px" my="10">
        <Box flex="1" px="6" py="10" rounded="2xl" bgColor="#aee2d1">
          <Flex flexDir="column" alignItems="center" justifyContent="center">
            <Box>
              <Image src={image_bag} />
            </Box>
            <Text my="1" fontSize="2xl" fontWeight="semibold">
              {formatMoney(data?.array?.products)}
            </Text>
            <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
              Sản Phẩm
            </Text>
          </Flex>
        </Box>
        <Box flex="1" px="6" py="10" rounded="2xl" bgColor="#d8f8fa">
          <Flex flexDir="column" alignItems="center" justifyContent="center">
            <Box>
              <Image src={image_user} />
            </Box>
            <Text my="1" fontSize="2xl" fontWeight="semibold">
              {formatMoney(data?.array?.users)}
            </Text>
            <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
              User
            </Text>
          </Flex>
        </Box>
        <Box flex="1" px="6" py="10" rounded="2xl" bgColor="#fff4da">
          <Flex flexDir="column" alignItems="center" justifyContent="center">
            <Box>
              <Image src={image_buy} />
            </Box>
            <Text my="1" fontSize="2xl" fontWeight="semibold">
              {formatMoney(data?.array?.orders)}
            </Text>
            <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
              Đơn Hàng
            </Text>
          </Flex>
        </Box>
        <Box flex="1" px="6" py="10" rounded="2xl" bgColor="#ffe8e0">
          <Flex flexDir="column" alignItems="center" justifyContent="center">
            <Box>
              <Image src={image_message} />
            </Box>
            <Text my="1" fontSize="2xl" fontWeight="semibold">
              {formatMoney(data?.array?.revenues)}
            </Text>
            <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
              Doanh Thu
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Flex gap="6" h="500px">
        <Box flex="2">
          <TopRevenue
            revenues={revenues}
            handleClick={(x: string) =>
              setQuery({
                period: x,
              })
            }
          />
        </Box>
        <Box flex="1">{data && <TopOrders orders={data?.orders} />}</Box>
      </Flex>

      <Flex mt="6" h="420px" gap="6">
        <Box flex="1">
          <TopCategory values={data} />
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardView;
