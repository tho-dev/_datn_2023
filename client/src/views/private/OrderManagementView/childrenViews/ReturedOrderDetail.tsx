import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { chuyenDoiSoDienThoaiVe0 } from "~/utils/fc";

type Props = {
  returnDetail: any;
  handleOpenModelReturned: (id: any) => void;
};

const ReturedOrderDetail = ({
  returnDetail,
  handleOpenModelReturned,
}: Props) => {
  return (
    <Box
      backgroundColor={"white"}
      borderRadius={"md"}
      w={{ md: "100%", base: "full" }}
    >
      {/* tên người nhận và số điện thoại */}
      <Flex gap={"16px"}>
        <FormControl>
          <FormLabel fontWeight="bold">Tên khách hàng</FormLabel>
          <Input
            type="text"
            border={"none"}
            p={"8px 12px"}
            placeholder="Nhập họ và tên"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
            value={returnDetail?.customer_name}
            isReadOnly
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">Số điện thoại</FormLabel>
          <Input
            type="number"
            border={"none"}
            p={"8px 12px"}
            placeholder="Nhập số điện thoại"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
            isReadOnly
            value={chuyenDoiSoDienThoaiVe0(returnDetail?.phone_number)}
          />
        </FormControl>
      </Flex>
      <Flex mt={"16px"}>
        <FormControl>
          <FormLabel fontWeight="bold">Lý do</FormLabel>
          <Textarea
            placeholder="Nhập Lý do hoàn hàng"
            bg={"#F6F9FC"}
            borderRadius={"6px"}
            fontSize={"14px"}
            border={"none"}
            value={returnDetail?.reason}
            isReadOnly
          />
        </FormControl>
      </Flex>
      <Box mt={"16px"}>
        <Text fontSize={"16px"} fontWeight="bold">
          Hình ảnh minh hoạ
        </Text>
        <Flex flexWrap={"wrap"} gap={4} mt={6}>
          {returnDetail.images.length > 0 &&
            returnDetail?.images.map((image: any, index: number) => {
              return (
                <Image
                  src={image?.url}
                  key={index}
                  w="150px"
                  h="150px"
                  rounded="md"
                  objectFit={"cover"}
                />
              );
            })}
        </Flex>
        {returnDetail?.images == 0 && (
          <Text fontSize={"16px"} fontWeight={"600"}>
            Không có hình ảnh
          </Text>
        )}
      </Box>
      <Flex py={"5"} justifyContent="flex-end" gap={6}>
        <Button
          w={"15%"}
          fontSize={"16px"}
          fontWeight={"600 "}
          bg={"bg.green"}
          _hover={{ bgColor: "green" }}
          onClick={() => handleOpenModelReturned(returnDetail?._id)}
        >
          Xác nhận
        </Button>
      </Flex>
    </Box>
  );
};

export default ReturedOrderDetail;
