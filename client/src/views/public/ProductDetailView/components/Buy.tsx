import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Flex,
  Box,
  Stack,
  RadioGroup,
  Radio,
  ModalFooter,
  Image,
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import { GiftIcon } from "~/components/common/Icons";

const dataFake = [
  {
    id: "1",
    name: "Balo Cao Cấp",
    sale: "47%",
    price: 1499000,
    salePrice: 799000,
    img: "https://images.thinkgroup.vn/unsafe/108x108/https://media-api-beta.thinkpro.vn/media/core/products/2023/5/27/balo-cao-cap-element-by-nicedesign-thinkpro-nicespace-dhO.jpg",
  },
];
const Buy = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("1");
  return (
    <Box>
      <Box bgColor={"bg.white"} rounded={"6px"} p="6" mt="4">
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <GiftIcon size={18} />
            <Text fontSize={"16px"} fontWeight={600} pl={"2"}>
              Mua kèm
            </Text>
          </Flex>
          <Box>
            <Flex
              onClick={onOpen}
              as={"button"}
              fontSize={"12px"}
              bg={"white"}
              alignItems={"center"}
              color={"#FE3464"}
            >
              Tiết kiệm 700.000đ
              <Flex
                w="9"
                h="9"
                right="4"
                top={"calc(50% - 24px)"}
                translateY="-50%"
                zIndex="5"
                rounded="full"
                cursor="pointer"
                alignItems="center"
                justifyContent="center"
                className="btn-next"
                pl={"-6"}
              >
                <NavArrowRightIcon size={3} strokeWidth={3} color="#FE3464" />
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Box fontSize={"12px"} pl={"9"} py={"2"}>
          <Text>
            Balo Cao Cấp Element - By NiceDesign, Balo Cao Cấp Element - By
          </Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"20px"}>Mua Kèm</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={"2"}>
            <Flex alignItems={"center"}>
              <GiftIcon color="blue" size={17} />
              <Text pl={"2"} fontSize={"14px"}>
                Bạn hãy chọn 1 quà tặng yêu thích
              </Text>
            </Flex>
            <RadioGroup onChange={setValue} value={value} my={"4"}>
              <Stack direction="column">
                {dataFake.map((item: any) => (
                  <Radio value={item.id}>
                    <Box>
                      <Flex>
                        <Box w={"60px"} h={"60px"} objectFit={"cover"}>
                          <Image src={item.img} w={"full"} />
                        </Box>
                        <Box>
                          <Text fontSize={"14px"} fontWeight={600}>
                            {item.name}
                          </Text>
                          <Flex pt={"1"} alignItems={"center"}>
                            <Text
                              fontSize={"14px"}
                              fontWeight={600}
                              color={"#FE3464"}
                            >
                              {item.salePrice}
                            </Text>
                            <Text
                              as={"p"}
                              textDecoration={"line-through"}
                              fontSize={"12px"}
                              lineHeight={"18px"}
                              pl={"1"}
                              px={"2"}
                            >
                              {item.price}
                            </Text>
                            <Text
                              as={"p"}
                              fontSize={"12px"}
                              lineHeight={"18px"}
                              color={"#FE3464"}
                            >
                              {item.sale}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter w={"full"}>
            <Box w={"66%"}>
              <Flex>
                <Text as={"p"} fontSize={"12px"} lineHeight={"18px"}>
                  Tổng cộng:
                </Text>
                <Text
                  as={"p"}
                  fontSize={"12px"}
                  lineHeight={"18px"}
                  color={"#FE3464"}
                >
                  20.589.000
                </Text>
                <Text
                  as={"p"}
                  textDecoration={"line-through"}
                  fontSize={"12px"}
                  lineHeight={"18px"}
                  pl={"1"}
                >
                  20.589.000
                </Text>
              </Flex>
              <Flex>
                <Text as={"p"} fontSize={"12px"} lineHeight={"18px"}>
                  Tiết kiệm:
                </Text>
                <Text
                  as={"p"}
                  fontSize={"12px"}
                  lineHeight={"18px"}
                  color={"#FE3464"}
                >
                  9.000.000
                </Text>
              </Flex>
            </Box>
            <Button
              onClick={onClose}
              w={"full"}
              fontSize={"16px"}
              fontWeight={600}
            >
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default Buy;
