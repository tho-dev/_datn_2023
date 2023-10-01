import React, { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Flex,
  Text,
  Button,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  Link,
} from "@chakra-ui/react";
import Transport from "./Transport";
import { ArrowRightUpIcon } from "~/components/common/Icons";

type Props = {
  registerShip: any;
  errors: any;
};
const addrs =
  "Tòa nhà FPT Polytechnic, Cổng số 2, 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội, Việt Nam";
const ShipProduct = ({ registerShip, errors }: Props) => {
  const [district, setDistrict] = useState<string>("");
  const [value, setValue] = React.useState("tructiep");
  const [valueaddress, setValueAddress] = React.useState(addrs);
  const addres = (value: string) => {
    setDistrict(value);
  };
  return (
    <Box mt={"12px"}>
      <Text mb={"16px"} fontSize={"16px"} lineHeight={"150%"} fontWeight={600}>
        Thông tin người nhận
      </Text>

      <Flex gap={"16px"}>
        <FormControl isInvalid={errors.name as any}>
          <FormLabel>Tên người nhận</FormLabel>
          <Input
            type="text"
            border={"none"}
            p={"8px 12px"}
            placeholder="Nhập họ và tên"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
            {...registerShip("name")}
          />
          <FormErrorMessage>
            {" "}
            {(errors.name as any) && (errors?.name?.message as any)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.phone as any}>
          <FormLabel>Số điện thoại</FormLabel>
          <Input
            type="text"
            border={"none"}
            p={"8px 12px"}
            placeholder="Nhập số điện thoại"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
            {...registerShip("phone")}
          />
          <FormErrorMessage>
            {" "}
            {(errors.phone as any) && (errors?.phone?.message as any)}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex gap={"16px"} mt={"16px"}>
        <FormControl isInvalid={errors?.district as any}>
          <FormLabel>Khu Vực</FormLabel>
          <Box display={district != "" ? "none" : "block"}>
            <Transport addres={addres} />
          </Box>
          <Input
            type="text"
            border={"none"}
            p={"8px 12px"}
            placeholder="Khu vực"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
            {...registerShip("district")}
            defaultValue={district}
            display={district == "" ? "none" : "block"}
          />
          <FormErrorMessage>
            {" "}
            {(errors?.district as any) && (errors?.district?.message as any)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.address as any}>
          <FormLabel>Địa chỉ nhận hàng</FormLabel>
          <Input
            type="text"
            border={"none"}
            p={"8px 12px"}
            placeholder="Địa chỉ nhận hàng"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
            {...registerShip("address")}
          />
          <FormErrorMessage>
            {" "}
            {(errors?.address as any) && (errors?.address?.message as any)}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Box mt={"16px"}>
        <FormControl isInvalid={errors?.payment as any}>
          <FormLabel>Chọn phương thức thanh toán</FormLabel>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row" gap={"16px"} spacing={4}>
              <Radio
                value="tructiep"
                fontSize={"12px"}
                {...registerShip("payment")}
              >
                Thanh toán khi nhận hàng
              </Radio>
              <Radio
                value="online"
                fontSize={"12px"}
                {...registerShip("payment")}
              >
                Thanh toán online
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box mt={"16px"}>
        <FormControl isInvalid={errors?.storeAddress as any}>
          <FormLabel>Địa chỉ cửa hàng</FormLabel>
          <RadioGroup
            onChange={setValueAddress}
            value={valueaddress}
            {...registerShip("storeAddress")}
          >
            <Stack
              direction="column"
              gap={"16px"}
              bg={"#F6F9FC"}
              borderRadius={"6px"}
              px={"8px"}
            >
              <Radio value={addrs} fontSize={"12px"}>
                <Box p="4" rounded="md" fontSize="sm" color="text.black">
                  <Text fontWeight="semibold">Thủ đô Hà Nội</Text>
                  <Text>
                    {" "}
                    Tòa nhà FPT Polytechnic, Cổng số 2, 13 P. Trịnh Văn Bô, Xuân
                    Phương, Nam Từ Liêm, Hà Nội, Việt Nam
                  </Text>
                  <Flex
                    mt="2"
                    alignItems="flex-end"
                    justifyContent="space-between"
                  >
                    <Box fontSize="xs">
                      <Text fontWeight="semibold" color="#f93920">
                        Đã đóng cửa, hẹn bạn 09:00 ngày mai
                      </Text>
                      <Text fontWeight="medium">09:00 - 21:00</Text>
                    </Box>
                    <Link
                      as={ReactRouterLink}
                      fontSize="xs"
                      color="text.blue"
                      fontWeight="bold"
                      textDecoration="none"
                    >
                      Chỉ đường
                      <ArrowRightUpIcon size={4} />
                    </Link>
                  </Flex>
                </Box>
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Flex mt={"16px"}>
        <FormControl isInvalid={errors?.note as any}>
          <FormLabel>Ghi chú</FormLabel>
          <Textarea
            placeholder="Nhập ghi chú"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
            {...registerShip("note")}
            border={"none"}
          />
        </FormControl>
      </Flex>
    </Box>
  );
};

export default ShipProduct;
