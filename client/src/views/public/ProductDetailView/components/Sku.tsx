import { Box, Divider, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Button, Input, Text } from "@chakra-ui/react";
import { CopyIcon, MinusIcon, PlusIcon } from "~/components/common/Icons";
import CustomRadio from "./CustomRadio";
import { formatNumber } from "~/utils/fc";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
import clipboardCopy from "clipboard-copy";
type Props = {
  product: any;
  handleDercement: () => void;
  handleIncement: () => void;
  handleAddToCart: () => void;
  handleByNow: () => void;
  quantity: number;
  isLoading: any;
  loading: any;
};

const Sku = ({
  product,
  handleAddToCart,
  handleDercement,
  handleIncement,
  handleByNow,
  quantity,
  isLoading,
  loading,
}: Props) => {
  const new_option_value = product?.option_value?.map(
    (item: any) => item?.label
  );
  const toast = useToast();
  const navigate = useNavigate();

  // const new_variants = sortJSON(product?.variants);
  const new_variants = product?.variants;

  const handeChangeSku = (value: any, index: any) => {
    const new_option_valued = JSON.parse(JSON.stringify(new_option_value));
    new_option_valued.splice(index, 1, value);
    const new_data = product.skus.filter((item: any) => {
      const new_data2 = item.option_value.map((it: any) => {
        return it.label;
      });
      return JSON.stringify(new_data2) === JSON.stringify(new_option_valued);
    });

    if (new_data.length == 0) {
      toast({
        title: "Phiên bản không khả dụng",
        description: "Bạn có thể chọn lại phiên bản khác",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      navigate(`/${new_data[0].shared_url}`);
    }
  };
  const handleCopySku = () => {
    clipboardCopy(product?.SKU)
      .then(() => {
        toast({
          title: "Đã sao chép vào bộ nhớ tạm",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("Lỗi khi copy văn bản:", err);
      });
  };
  return (
    <>
      <Box bgColor={"white"} rounded={"6px"} p="6" mt="4">
        <Text
          fontSize={"sm"}
          rounded={"6px"}
          color="text.black"
          fontWeight="medium"
        >
          SKU: {product?.SKU}
          <CopyIcon
            size={4}
            ml="2"
            color="text.blue"
            cursor="pointer"
            onClick={handleCopySku}
          />
        </Text>
        <Text fontSize={"md"} fontWeight={600} rounded={"6px"} mt="2">
          {product?.name}
        </Text>
        <Divider my="4" />
        <Flex flexDirection="column" gap="3">
          {new_variants?.map((item: any, index: number) => {
            return (
              <>
                <Text fontSize={"13px"} fontWeight="semibold" color={"#6B7075"}>
                  {item?.name == "phien-ban" && "Phiên bản"}
                  {item?.name == "mau" && "Màu sắc"}
                  {item?.name == "loai-hang" && "Loại hàng"}
                </Text>
                <Flex gap="1" flexWrap="wrap">
                  <CustomRadio
                    arrayRadio={item?.options}
                    defaultRadio={new_option_value}
                    handeChangeSku={handeChangeSku}
                    index={index}
                  />
                </Flex>
              </>
            );
          })}

          <Text fontSize={"14px"} fontWeight={"semibold"} color={"#6B7075"}>
            Số lượng
          </Text>
          <Flex h="38px">
            <Button
              border={"1px solid #ccc"}
              w={"20px"}
              h="full"
              borderRadius={"4px 0px 0px 4px"}
              bgColor={"White"}
              borderRight={"none"}
              color={"black"}
              onClick={handleDercement}
            >
              <MinusIcon size={5} />
            </Button>
            <Input
              value={quantity}
              w={"70px"}
              textAlign={"center"}
              borderRadius={"0px"}
              border={"1px solid #ccc"}
              h="full"
              fontWeight="bold"
              fontSize="md"
            />
            <Button
              border={"1px solid #ccc"}
              w={"20px"}
              borderRadius={"0px 4px 4px 0px"}
              bgColor={"White"}
              color={"black"}
              borderLeft={"none"}
              h="full"
              onClick={handleIncement}
            >
              <PlusIcon size={5} />
            </Button>
          </Flex>
          <Divider my="4" />
          <Grid
            templateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              xl: `repeat(3, 1fr)`,
            }}
            gap={4}
          >
            <GridItem>
              <Text
                fontSize={{
                  sm: "12px",
                  xl: "18px",
                }}
                fontWeight={600}
                color={"#FE3464"}
              >
                {formatNumber(`${product?.price}`)}
              </Text>
              <Flex pt={"1"} gap={2}>
                <Text
                  as={"p"}
                  textDecoration={"line-through"}
                  fontSize={"12px"}
                  lineHeight={"18px"}
                  pl={"1"}
                >
                  {formatNumber(`${product?.price_before_discount}`)}
                </Text>
                <Text
                  as={"p"}
                  fontSize={"12px"}
                  lineHeight={"18px"}
                  color={"#FE3464"}
                >
                  {product?.price_discount_percent}%
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"#0065EE"}
                bg={"#F5F6FC"}
                onClick={handleAddToCart}
                _hover={{ bg: "bg.darkGray" }}
                isLoading={isLoading}
              >
                Thêm vào giỏ
              </Button>
            </GridItem>
            <GridItem>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                _hover={{ bg: "red" }}
                onClick={handleByNow}
                isLoading={loading}
              >
                Mua Ngay
              </Button>
            </GridItem>
          </Grid>
        </Flex>
      </Box>
      {/* Quà Tặng kèm */}
      {/* <Gift /> */}
      {/* Mua thêm được giảm */}
      {/* <Buy /> */}
    </>
  );
};

export default Sku;
