import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import Datepicker from "./Datepicker";
import { Button, Select } from "@chakra-ui/react";
import {
  FilterIcon,
  PlusCircleIcon,
  SearchAdminIcon,
} from "~/components/common/Icons";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

type Props = {
  handleSearch: (e: any) => void;
  search: any;
  handleDate: (date: any) => void;
  handleStatus: (data: any) => void;
  handlePayment: (data: any) => void;
};

const OrderFilter = ({
  handleSearch,
  search,
  handleDate,
  handleStatus,
  handlePayment,
}: Props) => {
  const [date, setDate] = React.useState<Date>();
  return (
    <Box w={"70%"}>
      <Flex gap={4}>
        <Flex
          alignItems="center"
          justifyContent="space-around"
          bgColor="bg.white"
          rounded="4px"
          border="1px solid #e2e8f0"
          px="4"
          w={"32%"}
        >
          <Flex as="span" display="inline-flex" mt="1" mr={2}>
            <SearchAdminIcon size={5} />
          </Flex>
          <Input
            maxH="40px"
            border="none"
            px="0"
            placeholder="Tìm kiếm theo tên khách hàng..."
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
        <Popover>
          <PopoverTrigger>
            <Button
              leftIcon={<FilterIcon size={5} color="text.white" />}
              px="4"
              lineHeight="2"
              bgColor="bg.green"
              _hover={{ bg: "green.400" }}
            ></Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Box padding={2}>
                <Text fontSize="16px" fontWeight="bold" my={2}>
                  Phương thức thanh toán
                </Text>
                <RadioGroup
                  onChange={(e) => handlePayment(e)}
                  name="payment_method"
                >
                  <Radio value="" defaultChecked>
                    <Text fontSize="14px" fontWeight="semibold">
                      Tất cả phương thức
                    </Text>
                  </Radio>
                  <Radio value="MOMO">
                    <Text fontSize="14px" fontWeight="semibold">
                      Thanh toán Momo
                    </Text>
                  </Radio>
                  <Radio value="TIENMAT">
                    <Text fontSize="14px" fontWeight="semibold">
                      Thanh toán Tiền mặt
                    </Text>
                  </Radio>
                </RadioGroup>
              </Box>

              <Box padding={2}>
                <Text fontSize="16px" fontWeight="bold" my={2}>
                  Trạng thái đơn hàng
                </Text>
                <RadioGroup onChange={(e) => handleStatus(e)} name="status">
                  <Stack spacing={4} direction="column">
                    <Radio value="">
                      <Text fontSize="14px" fontWeight="semibold">
                        Tất cả
                      </Text>
                    </Radio>
                    <Radio value="processing">
                      <Text fontSize="14px" fontWeight="semibold">
                        Chờ xử lí
                      </Text>
                    </Radio>
                    <Radio value="confirmed">
                      <Text fontSize="14px" fontWeight="semibold">
                        Đã xác nhận
                      </Text>
                    </Radio>
                    <Radio value="delivering">
                      <Text fontSize="14px" fontWeight="semibold">
                        Đang giao
                      </Text>
                    </Radio>
                    <Radio value="delivered">
                      <Text fontSize="14px" fontWeight="semibold">
                        Đã giao
                      </Text>
                    </Radio>
                    <Radio value="cancelled">
                      <Text fontSize="14px" fontWeight="semibold">
                        Đã huỷ
                      </Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Box padding={2}>
                <Text fontSize="16px" fontWeight="bold" my={2}>
                  Chọn ngày
                </Text>
                <Flex>
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
                    style={{
                      border: "1px solid black",
                      padding: "4px",
                      borderRadius: "4px",
                    }}
                  />
                </Flex>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
};

export default OrderFilter;
