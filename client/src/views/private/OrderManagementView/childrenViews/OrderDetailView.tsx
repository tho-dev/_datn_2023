import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Button, Table } from "@chakra-ui/react";
import React from "react";
import {
  CarIcon,
  DownloadIcon,
  LocationIcon,
  PhoneIcon,
  UserIcon,
} from "~/components/common/Icons";
import MetricItem from "../components/MetricItem";
import TableThinkPro from "~/components/TableThinkPro";
import { createColumnHelper } from "@tanstack/react-table";

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
        <Heading as="h1" fontSize={24} textTransform="uppercase">
          <Text>Đơn hàng: #111</Text>
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
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
      >
        <MetricItem
          icon={<UserIcon size={6} color="white" />}
          heading="Tên khách hàng"
          text={"Trường Con Nam Định"}
        />
        <MetricItem
          icon={<LocationIcon size={24}  color="white" />}
          heading="Địa chỉ"
          text={"66b Nguyễn Sỹ Sách"}
        />
        <MetricItem
          icon={<PhoneIcon size={6}  color="white" />}
          heading="Số điện thoại"
          text={"033 444 5555"}
        />
      </Grid>
      {/* Danh sách sp */}
      <Box mt="4" px="5" py="6" gap="2" bgColor="bg.white" rounded="md">
        <TableThinkPro columns={columns} data={data} />
      </Box>
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
  );
};

export default OrderDetailView;
