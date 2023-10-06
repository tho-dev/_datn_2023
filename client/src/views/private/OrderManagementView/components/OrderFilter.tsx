import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Datepicker from "./Datepicker";
import { Button, Select } from "@chakra-ui/react";
import { SearchAdminIcon } from "~/components/common/Icons";

type Props = {
};

const OrderFilter = (props: Props) => {
  const [filter, setFilter] = useState<{
    search: string;
    status: string;
    payment: string;
  }>({
    search: "",
    status: "",
    payment: ""
  });
  // useEffect(()=>{
  //   showFilteredOrders(filter)
  // },[filter])
  return (
    <Box mt="4" px="5" py="6" gap="2" bgColor="bg.white" rounded="md">
      <Flex gap={4} justifyContent={"space-between"}>
        <Flex
          alignItems="center"
          justifyContent="space-around"
          bgColor="bg.white"
          rounded="4px"
          border="1px solid #e2e8f0"
          px="4"
          w={"22%"}
        >
          <Flex as="span" display="inline-flex" mt="1" mr={2} >
            <SearchAdminIcon size={5} />
          </Flex>
          <Input
            maxH="38px"
            border="none"
            px="0"
            placeholder="Tìm kiếm"
            // w="200px"
            maxW="full"
            _placeholder={{
              fontSize: "14",
            }}
          />
        </Flex>
        <Datepicker />
        <Select
          w={"22%"}
          fontSize={15}
          color={"gray.500"}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="pending">Chờ xử lí</option>
          <option value="delivered">Đã giao</option>
          <option value="canceled">Đã hủy</option>
        </Select>
        <Select
          w={"22%"}
          fontSize={15}
          color={"gray.500"}
          onChange={(e) => setFilter({ ...filter, payment: e.target.value })}
        >
          <option value="visa">VISA</option>
          <option value="cod">COD</option>
          <option value="debit">Thẻ ghi nợ</option>
          <option value="credit">Thẻ tín dụng</option>
        </Select>
        <Button fontSize={15} bgColor={"cyan.400"} color={"white"} w={"10%"}>
          Lọc
        </Button>
      </Flex>
    </Box>
  );
};

export default OrderFilter;
