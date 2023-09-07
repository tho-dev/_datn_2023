import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import {
  CarIcon,
  DownloadIcon,
  LocationIcon,
  OrderIcon,
  PhoneIcon,
  UserIcon,
} from "~/components/common/Icons";
import MetricItem from "../components/MetricItem";
import TableThinkPro from "~/components/TableThinkPro";
import { createColumnHelper } from "@tanstack/react-table";
import OrderDetailMetricItem from "../components/OrderDetailMetric";
import { Progress } from '@chakra-ui/react'

type Props = {};

const OrderDetailView = (props: Props) => {
  const data = [
    {
      productId: 111,
      productName: "Demo 1",
      productPrice: 100000,
      productQty: 2,
      amount: 200000,
    },
    {
      productId: 222,
      productName: "Demo 1",
      productPrice: 100000,
      productQty: 2,
      amount: 200000,
    },
  ];
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("#", {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: "#",
    }),
    columnHelper.accessor("productId", {
      cell: (info) => {
        return <h1>{info.getValue()}</h1>;
      },
      header: "ID sản phẩm",
    }),
    columnHelper.accessor("productName", {
      cell: (info) => info.getValue(),
      header: "Tên sản phẩm",
    }),
    columnHelper.accessor("productPrice", {
      cell: (info) => info.getValue().toLocaleString(),
      header: "Đơn giá",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("productQty", {
      cell: (info) => info.getValue(),
      header: "Số lượng",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("amount", {
      cell: (info) => info.getValue().toLocaleString(),
      header: "Thành tiền",
    }),
  ];
  return (
    <Box w="full" h="full">
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h1" fontSize="2xl">
          <Text>Chi tiết đơn hàng</Text>
        </Heading>
      </Flex>
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h1" fontSize="md">
          <Text>ID đơn hàng: #111</Text>
        </Heading>
        <Button leftIcon={<DownloadIcon size={24} />}> Xuất HĐ</Button>
      </Flex>
      <Grid
        mt="4"
        px="5"
        py="6"
        gap="2"
        bgColor="bg.white"
        rounded="md"
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
      >
        <OrderDetailMetricItem
          heading="Thông tin KH"
          text="NGÔ BÁ KHÁ"
          icon={<UserIcon size={6} color="green" />}
          color="green"
        />
        <OrderDetailMetricItem
          heading="Địa chỉ nhận"
          text="Tô Vĩnh Diện, Khương Trung, Thanh Xuân, Hà Nội"
          icon={<LocationIcon size={24} color="blue" />}
          color="blue"
        />
        <OrderDetailMetricItem
          heading="Phương thức thanh toán"
          text="Thẻ visa"
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
        >
          <TableThinkPro columns={columns} data={data} />
        </Box>
        <Box w="25%">
          {/* Vận chuyển */}
          <Box my="4" px="5" py="6" gap="2" bgColor="bg.white" rounded="md">
            <Heading size="md" pb={4} borderBottomWidth={1}>
              Vận chuyển:
            </Heading>
            <Flex justifyContent="center" alignItems="center">
              <Flex
                py={4}
                justifyContent={"center"}
                flexDir={"column"}
                alignItems={"center"}
              >
                <CarIcon />
                <Text fontWeight={700}>Shopee Express</Text>
                <Text>ID: #111111</Text>
                <Text>Phương thức thanh toán: Thẻ tín dụng</Text>
              </Flex>
            </Flex>
          </Box>
          {/* Thanh toán */}
          <Box my="4" px="5" py="6" gap="2" bgColor="bg.white" rounded="md">
            <Heading size="md" pb={4} borderBottomWidth={1}>
              Chi tiết thanh toán:
            </Heading>
            <Flex pt={4} flexDir="column" gap={2}>
              <Flex>
                <Text w="40%">Mã giao dịch:</Text>
                <Text>#1111111111111</Text>
              </Flex>
              <Flex>
                <Text w="40%">Phương thức:</Text>
                <Text>Thẻ tín dụng</Text>
              </Flex>
              <Flex>
                <Text w="40%">Số thẻ:</Text>
                <Text>1111 1111 1111</Text>
              </Flex>
              <Flex>
                <Text w="40%">Tên chủ thẻ:</Text>
                <Text>NGO BA KHA</Text>
              </Flex>
              <Flex>
                <Text w="40%">TỔNG TIỀN:</Text>
                <Text>400 000</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box mt="4" px="5" py="6" gap="2" bgColor="bg.white" rounded="md">
        <Flex justifyContent={"space-between"} pb={4} borderBottomWidth={1}>
          <Heading size="md"> Trạng thái đơn hàng:</Heading>
          <Flex gap={2}>
            <Button
              bgColor="blue.100"
              color={"blue.400"}
              leftIcon={<LocationIcon size={12} />}
              _hover={{
                bgColor: "blue.400",
                color: "white",
              }}
            >
              Sửa địa chỉ
            </Button>
            <Button
              bgColor="red.100"
              color={"red.400"}
              leftIcon={<LocationIcon size={12} />}
              _hover={{
                bgColor: "red.400",
                color: "white",
              }}
            >
              Hủy đơn hàng
            </Button>
          </Flex>
        </Flex>

        <Box pt={8}>
          <Progress hasStripe value={50} colorScheme="green" size={"md"} w={"78%"} m={"0 auto"}/>
          <Flex w={"90%"} m="40px auto 0 auto" justifyContent={"space-between"}>
             <Box textAlign={"center"} borderWidth={1} rounded={"md"} p={5}>
                <Heading size={"md"}>
                    Đơn hàng được đặt
                </Heading>
                <Text size={"xs"}>
                    Mon, 24 Dec, 2022
                </Text>
             </Box>
             <Box textAlign={"center"} borderWidth={1} rounded={"md"} p={5}>
                <Heading size={"md"}>
                    Đóng gói
                </Heading>
                <Text size={"xs"}>
                    Mon, 24 Dec, 2022
                </Text>
             </Box>
             <Box textAlign={"center"} borderWidth={1} rounded={"md"} p={5}>
                <Heading size={"md"}>
                  Giao cho ĐVVC
                </Heading>
                <Text size={"xs"}>
                    Mon, 24 Dec, 2022
                </Text>
             </Box>
             <Box textAlign={"center"} borderWidth={1} rounded={"md"} p={5}>
                <Heading size={"md"}>
                  Đang giao
                </Heading>
                <Text size={"xs"}>
                    Mon, 24 Dec, 2022
                </Text>
             </Box>
             <Box textAlign={"center"} borderWidth={1} rounded={"md"} p={5}>
                <Heading size={"md"}>
                    Đã giao
                </Heading>
                <Text size={"xs"}>
                    Mon, 24 Dec, 2022
                </Text>
             </Box>
             
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailView;
