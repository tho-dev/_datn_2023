import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Datepicker from "./Datepicker";
import { Button, Select } from "@chakra-ui/react";

type Props = {
};

const OrderFilter = (props: Props) => {
  const [filter, setFilter] = useState<{
    search: string;
    status: string;
    payment: string;
  }>({
    search: "",
    status:"",
    payment: ""
  });
  // useEffect(()=>{
  //   showFilteredOrders(filter)
  // },[filter])
  return (
    <Box mt="4" px="5" py="6" gap="2" bgColor="bg.white" rounded="md">
      <Flex gap={4} justifyContent={"space-between"}>
        <Input
          borderColor={"gray.200"}
          placeholder="Tìm kiếm..."
          w={"25%"}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <Datepicker />
        <Select
          w={"20%"}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="pending">Chờ xử lí</option>
          <option value="delivered">Đã giao</option>
          <option value="canceled">Đã hủy</option>
        </Select>
        <Select
          w={"20%"}
          onChange={(e) => setFilter({ ...filter, payment: e.target.value })}
        >
          <option value="visa">VISA</option>
          <option value="cod">COD</option>
          <option value="debit">Thẻ ghi nợ</option>
          <option value="credit">Thẻ tín dụng</option>
        </Select>
        <Button bgColor={"cyan.400"} color={"white"} w={"10%"}>
          Lọc
        </Button>
      </Flex>
    </Box>
  );
};

export default OrderFilter;
