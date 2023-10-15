import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Datepicker from "./Datepicker";
import { Button, Select } from "@chakra-ui/react";
import { SearchAdminIcon } from "~/components/common/Icons";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

type Props = {
  handleSearch: (e: any) => void;
  search: any;
  handleDate: (date: any) => void;
};

const OrderFilter = ({ handleSearch, search, handleDate }: Props) => {
  const [date, setDate] = React.useState<Date>();
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
          <Flex as="span" display="inline-flex" mt="1" mr={2}>
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
            value={search}
            name="search"
            onChange={(e) => handleSearch(e)}
          />
        </Flex>
        <Flex
          w={"20%"}
          borderWidth={1}
          borderColor={"gray.200"}
          px={4}
          alignItems={"center"}
          rounded={"sm"}
        >
          <Flatpickr
            placeholder="Chọn ngày..."
            options={{
              mode: "single",
              dateFormat: "d/m/Y",
            }}
            value={date}
            onChange={([date]) => {
              setDate(date);
              handleDate(date);
            }}
          />
        </Flex>
        <Select
          w={"22%"}
          fontSize={15}
          color={"gray.500"}
          onChange={(e) => handleSearch(e)}
          name="status"
        >
          <option value="">Trạng thái đơn hàng</option>
          <option value="processing">Chờ xử lí</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="delivering">Đang giao</option>
          <option value="delivered">Đã giao</option>
          <option value="cancelled">Đã hủy</option>
        </Select>
        <Select
          w={"22%"}
          fontSize={15}
          color={"gray.500"}
          onChange={(e) => handleSearch(e)}
          name="payment_method"
        >
          <option value="">Phương thức thanh toán</option>
          <option value="MOMO">Momo</option>
          <option value="TIENMAT">Trực tiếp</option>
        </Select>
        <Button fontSize={15} bgColor={"cyan.400"} color={"white"} w={"10%"}>
          Lọc
        </Button>
      </Flex>
    </Box>
  );
};

export default OrderFilter;
