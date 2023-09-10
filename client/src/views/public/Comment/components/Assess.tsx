import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image, Divider } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Star, Star_Half, Star_Nocolor } from "~/components/common/Icons";

const Assess = () => {
  return (
    <Box>
      <Grid my="10"
        gap={{
          sm: "2",
          md: "2",
          xl: "8",
        }}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          xl: "repeat(3, 1fr)",
        }}>
        {/* Left */}
        <GridItem colSpan={1}>
          <Flex>

          </Flex>
          <Text
            fontWeight={'bold'}
          >
            Tổng quan
          </Text>
          <Flex
          // py={2}
          >
            <Text
              fontSize={"5xl"}
              fontWeight={"bold"}
            >
              4.4
            </Text>
            <Flex mt={5}>
              <Star size={10} />
              <Star size={10} />
              <Star size={10} />
              <Star size={10} />
              <Star_Half size={10} />
            </Flex>


          </Flex>
          <Text
            fontSize={"15px"} color={"gray.500"}
          >(64 đánh giá)</Text>
          <Flex>
            <Star size={5} />
            <Star size={5} />
            <Star size={5} />
            <Star size={5} />
            <Star size={5} />
            <Box w={"130px"} h={3} mt={1} ml={2} bg={"#0a68ff"} borderTopLeftRadius={"xl"} borderBottomLeftRadius={"xl"}></Box>
            <Box
              w={"70px"} h={3} mt={1} bg={"#e8e8e8"}
              borderTopRightRadius={"xl"} borderBottomRightRadius={"xl"}            >
            </Box>
            <Text fontSize={"14px"} ml={2}>40</Text>
          </Flex>

          <Flex>
            <Star size={5} />
            <Star size={5} />
            <Star size={5} />
            <Star size={5} />
            <Star_Nocolor size={5} />

            <Box w={"60px"} h={3} mt={1} ml={2} bg={"#0a68ff"} borderTopLeftRadius={"xl"} borderBottomLeftRadius={"xl"}></Box>
            <Box
              w={"140px"} h={3} mt={1} bg={"#e8e8e8"} borderTopRightRadius={"xl"} borderBottomRightRadius={"xl"}
            >
            </Box>
            <Text fontSize={"14px"} ml={2}>14</Text>
          </Flex>

          <Flex>
            <Star size={5} />
            <Star size={5} />
            <Star size={5} />
            <Star_Nocolor size={5} />
            <Star_Nocolor size={5} />
            <Box w={"20px"} h={3} mt={1} ml={2} bg={"#0a68ff"} borderTopLeftRadius={"xl"} borderBottomLeftRadius={"xl"}></Box>
            <Box
              w={"180px"} h={3} mt={1} bg={"#e8e8e8"} borderTopRightRadius={"xl"} borderBottomRightRadius={"xl"}
            >
            </Box>
            <Text fontSize={"14px"} ml={2}>4</Text>
          </Flex>

          <Flex>
            <Star size={5} />
            <Star size={5} />
            <Star_Nocolor size={5} />
            <Star_Nocolor size={5} />
            <Star_Nocolor size={5} />

            <Box w={"25px"} h={3} mt={1} ml={2} bg={"#0a68ff"} borderTopLeftRadius={"xl"} borderBottomLeftRadius={"xl"}></Box>
            <Box
              w={"175px"} h={3} mt={1} bg={"#e8e8e8"} borderTopRightRadius={"xl"} borderBottomRightRadius={"xl"}
            >
            </Box>
            <Text fontSize={"14px"} ml={2}>5</Text>
          </Flex>

          <Flex>
            <Star size={5} />
            <Star_Nocolor size={5} />
            <Star_Nocolor size={5} />
            <Star_Nocolor size={5} />
            <Star_Nocolor size={5} />

            <Box w={"5px"} h={3} mt={1} ml={2} bg={"#0a68ff"} borderTopLeftRadius={"xl"} borderBottomLeftRadius={"xl"}></Box>
            <Box
              w={"195px"} h={3} borderTopRightRadius={"xl"} borderBottomRightRadius={"xl"} mt={1} bg={"#e8e8e8"}
            >
            </Box>
            <Text fontSize={"14px"} ml={2}>1</Text>
          </Flex>
        </GridItem>


        {/* <Divider h={"310px"} orientation='vertical' /> */}

        {/* Right */}
        <GridItem colSpan={2}>
          <Text
            fontWeight={'bold'}
          >
            Tất cả hình ảnh
          </Text>
          <Grid
            gap={{
              sm: "2",
              md: "2",
              xl: "2",
            }}
            templateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
          >
            <GridItem colSpan={1}> <Image color={"1"} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" /></GridItem>
            <GridItem colSpan={1}> <Image color={"1"} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" /></GridItem>
            <GridItem colSpan={1}> <Image color={"1"} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" /></GridItem>
            <GridItem colSpan={1}> <Image color={"1"} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" /></GridItem>
            <GridItem colSpan={1}> <Image color={"1"} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" /></GridItem>
          </Grid >
        </GridItem>
      </Grid>

    </Box>
  )
}

export default Assess