import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";

const ItemBonus = () => {
  return (
    <Box>
      <Box bgColor={"#FFFAF1"} px={"5"} style={{ marginTop: "4px" }} h={"full"}>
        <Flex>
          <Text
            border={"1px"}
            w={"fit-content"}
            fontSize={"12px"}
            lineHeight={"18px"}
            color={"#FC8800"}
            borderRadius={"4px"}
            px={"1"}
            my={"1"}
          >
            Tặng kèm
          </Text>
          <Text fontSize={"12px"} lineHeight={"18px"} pl={"2"} my={"1"}>
            Trị giá tới 149.000
          </Text>
        </Flex>
      </Box>
      <Flex mx={"4"} w={"full"}>
        <Box w={"10%"}>
          <Image
            src="https://res.cloudinary.com/dgpzzy5sg/image/upload/v1681573390/thinkpro/categories/owmv3uyns2zjpgbs6thb.png"
            alt="name"
          />
        </Box>
        <Box ml={"5"} w={"80%"}>
          <Text as={"p"} fontSize={"14px"}>
            Dell Inspiron 16 5630
          </Text>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Box>
              <Flex>
                <Text color={"#FE3463"} px={"2"}>
                  0
                </Text>
                <Text
                  as={"p"}
                  textDecoration={"line-through"}
                  fontSize={"16px"}
                  lineHeight={"24px"}
                >
                  28.490.000
                </Text>
                <Text
                  as={"p"}
                  fontSize={"12px"}
                  lineHeight={"24px"}
                  border={"0px solid #E6E8EA"}
                  bgColor={"#F6F9FC"}
                  px={"2"}
                  borderRadius={"4px"}
                  mx={"2"}
                >
                  X1
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
export default ItemBonus;
