import React, { useState } from "react";

import {
  Grid,
  GridItem,
  Flex,
  Box,
  Center,
  Text,
  Heading,
} from "@chakra-ui/layout";
import MetricItem from "./MetricItem";
import {
  CheckIcon,
  MoneyIcon,
  NewIcon,
  UserIcon,
} from "~/components/common/Icons";
import { useGetAllTotalOrderQuery } from "~/redux/api/order";
import { useDisclosure } from "@chakra-ui/react";
import ModalOrder from "./ModalOrder";

type Props = {};

const Metrics = (props: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [mode, setMode] = useState("");
  const [title, setTitle] = useState("");
  const { data, isLoading, isFetching, isError } = useGetAllTotalOrderQuery("");
  if (isLoading) {
    return <Box>isLoading</Box>;
  }
  if (isFetching) {
    return <Box>isFetching</Box>;
  }
  if (isError) {
    return <Box>isError</Box>;
  }

  const handleOpenModalOrder = (mode: string, title: string) => {
    setMode(mode);
    setTitle(title);
    onOpen();
  };
  return (
    <>
      <Grid
        mt="4"
        px="5"
        py="6"
        gap="4"
        bgColor="bg.white"
        rounded="md"
        templateColumns={{
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        textTransform="uppercase"
      >
        <MetricItem
          color="blue"
          icon={<CheckIcon color="blue.400" />}
          heading={data?.data.total_order}
          text={"Tổng số đơn hàng"}
          handleOpenModalOrder={handleOpenModalOrder}
          mode="order"
          title="Chi tiết thống kê đơn hàng"
        />
        <MetricItem
          color="yellow"
          icon={<UserIcon color="yellow.400" />}
          heading={data?.data.total_user}
          text={"Khách hàng"}
          handleOpenModalOrder={handleOpenModalOrder}
          mode="user"
          title="Chi tiết thống kê khách hàng"
        />
        <MetricItem
          color="green"
          icon={<MoneyIcon color="green.400" />}
          heading={`${data?.data.total_order_money} đ`}
          text={"Doanh thu"}
          handleOpenModalOrder={handleOpenModalOrder}
          mode="money"
          title="Chi tiết thống kê doanh thu"
        />
        <MetricItem
          color="purple"
          icon={<NewIcon color="purple.400" />}
          heading={data?.data.total_order_product}
          text={"Sản phẩm đã bán"}
          handleOpenModalOrder={handleOpenModalOrder}
          mode="product"
          title="Chi tiết thống kê sản phẩm"
        />
        {/* <MetricItem color="red" icon={<NewIcon color="red.400"/>} heading={"200"} text={"Sản phẩm mới"}/> */}
      </Grid>
      <ModalOrder
        isOpen={isOpen}
        onClose={onClose}
        mode={mode}
        title={title}
        data={data?.data}
      />
    </>
  );
};

export default Metrics;
