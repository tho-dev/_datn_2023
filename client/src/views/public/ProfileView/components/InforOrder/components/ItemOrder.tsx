import { Box, Divider, Flex, Text, Button } from "@chakra-ui/react";
import ItemCart from "./ItemCart";
import { checkOrderStatus, formatNumber } from "~/utils/fc";

type Props = {
  item: any;
  handleOpenModelReturn: (order: any) => void;
  handleOpenModelCancel: (order: any) => void;
  handleConfirmCompleted: (order: any) => void;
  handleOrderDetail: (order: any) => void;
};

const ItemOrder = ({
  item,
  handleOpenModelReturn,
  handleOpenModelCancel,
  handleConfirmCompleted,
  handleOrderDetail,
}: Props) => {
  const currentDate = new Date();
  const targetTime = new Date(item.created_at);
  targetTime.setMinutes(targetTime.getMinutes() + 15);

  const targetTimeReturn = new Date(item?.updated_at);

  targetTimeReturn.setDate(targetTimeReturn.getDate() + 1);

  return (
    <Box
      p="6"
      my={4}
      py="8"
      px="6"
      rounded="xl"
      borderWidth="1px"
      borderColor="#eef1f6"
      boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
    >
      <Flex justifyContent="space-between">
        <Text fontSize="14px" fontWeight={"bold"}>
          Mã đơn hàng: #{item._id}
        </Text>

        <Text
          py="1"
          px="4"
          fontSize="xs"
          fontWeight="semibold"
          display="inline-block"
          rounded="4px"
          bg={checkOrderStatus(item.status as string)?.background}
          color={checkOrderStatus(item.status as string)?.color}
        >
          {checkOrderStatus(item.status as string)?.status}
        </Text>
      </Flex>
      <Divider my="1" />
      <Box>
        <ItemCart product={item?.new_order_details[0]} />
      </Box>
      <Divider />
      <Flex justifyContent="space-between" alignItems="center" mt={2}>
        <Flex gap={4}>
          {item.status == "processing" && currentDate < targetTime && (
            <Button
              fontWeight={"600"}
              type="button"
              bgColor="bg.bgDelete"
              color="text.textDelete"
              h="40px"
              fontSize="13px"
              rounded="md"
              onClick={() => handleOpenModelCancel(item)}
            >
              Huỷ đơn
            </Button>
          )}

          <Button
            fontWeight={"600 "}
            bgColor="bg.bgEdit"
            color="text.textEdit"
            h="40px"
            fontSize="13px"
            rounded="md"
            onClick={() => handleOrderDetail(item)}
          >
            Chi tiết
          </Button>
          {item.status == "delivered" && currentDate < targetTimeReturn && (
            <Button
              fontWeight={"600 "}
              bgColor="bg.bgSuccess"
              color="text.textSuccess"
              h="40px"
              fontSize="13px"
              rounded="md"
              onClick={() => handleOpenModelReturn(item)}
            >
              Hoàn hàng
            </Button>
          )}
          {item.status == "pendingComplete" && (
            <Button
              fontWeight={"600 "}
              bgColor="bg.bgSuccess"
              color="text.textSuccess"
              h="40px"
              fontSize="13px"
              rounded="md"
              onClick={() => handleConfirmCompleted(item)}
            >
              Đã nhận hàng
            </Button>
          )}
        </Flex>
        <Text fontSize="14px" fontWeight="bold">
          Thành tiền: {formatNumber(`${item?.total_amount}`)} VND
        </Text>
      </Flex>
    </Box>
  );
};

export default ItemOrder;
