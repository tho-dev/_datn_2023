import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Flex,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
type Props = {};

const Atstore = (props: Props) => {
  return (
    <Box mt={"12px"}>
      <Text mb={"16px"} fontSize={"16px"} lineHeight={"150%"} fontWeight={600}>
        Cửa hàng
      </Text>
      <Box my={4}>
        <RadioGroup borderRadius={4} background="#f1f1f1" padding={4}>
          <Radio value="1">
            <Box w="250px" maxH="100px" fontSize={14} fontWeight="semibold">
              Số 5 - 7 Nguyễn Huy Tưởng, Phường 6, Quận Bình Thạnh, Hồ Chí Minh
            </Box>
          </Radio>
        </RadioGroup>
      </Box>
      <Text mb={"16px"} fontSize={"16px"} lineHeight={"150%"} fontWeight={600}>
        Thông tin người nhận
      </Text>

      <Flex gap={"16px"}>
        <FormControl>
          <FormLabel>Tên người nhận</FormLabel>
          <Input
            type="text"
            border={"none"}
            p={"8px 12px"}
            placeholder="Nhập họ và tên"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Số điện thoại</FormLabel>
          <Input
            type="text"
            border={"none"}
            p={"8px 12px"}
            placeholder="Nhập số điện thoại"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
          />
        </FormControl>
      </Flex>
      <Box my={2}>
        <FormControl>
          <FormLabel>Lời nhắn</FormLabel>
          <Textarea
            border={"none"}
            p={"8px 12px"}
            placeholder="Lời nhắn của bạn"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default Atstore;
