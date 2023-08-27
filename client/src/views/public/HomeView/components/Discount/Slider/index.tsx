import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// data fake
import thinkpro from "~/data/clone-thinkpro.json";
import { Image } from "@chakra-ui/react";

type PropTypes = {
  title: any;
};

const Slider = ({ title }: PropTypes) => {
  // comps

  return (
    <Box px="9" mb={12}>
      <Heading as="h2" fontSize="28px" mb={6}>
        {title}
      </Heading>
      <Flex position="relative">
        <Swiper
          modules={[Navigation]}
          speed={400}
          spaceBetween={16}
          loop={true}
          navigation={{
            nextEl: ".discount__btn-next",
            prevEl: ".discount__btn-prev",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 2.2,
            },
            1200: {
              slidesPerView: 2.2,
            },
          }}
        >
          {thinkpro?.data?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Link
                  as={ReactRouterLink}
                  w="full"
                  rounded="lg"
                  display="inline-flex"
                  flexDir="column"
                  backgroundColor="bg.white"
                  _hover={{
                    transition: "all 0.3s ease-in",
                    textDecoration: "none",
                  }}
                >
                  <Flex flexDir="column" gap={1} p={4}>
                    <Flex>
                      <Box
                        fontSize="xs"
                        px={2}
                        py={0.5}
                        backgroundColor="bg.lightGray"
                        mr={2}
                        rounded="md"
                      >
                        33 loa
                      </Box>
                      <Box
                        fontSize="xs"
                        px={2}
                        py={0.5}
                        backgroundColor="bg.lightGray"
                        mr={2}
                        rounded="md"
                      >
                        {" "}
                        3 tai nghe
                      </Box>
                    </Flex>
                    <Text
                      mt="2"
                      color="text.black"
                      fontSize="xl"
                      fontWeight="semibold"
                    >
                      {item?.name.length > 30
                        ? `${item?.name.slice(0, 10)}...`
                        : item?.name}
                    </Text>
                    <Flex color="text.darkPink">
                      <Box
                        fontSize="xs"
                        px={2}
                        py={0.5}
                        backgroundColor="bg.lightGray"
                        mr={2}
                        rounded="md"
                      >
                        -51%
                      </Box>
                      <Box
                        fontSize="xs"
                        px={2}
                        py={0.5}
                        backgroundColor="bg.lightGray"
                        mr={2}
                        rounded="md"
                      >
                        {" "}
                        Chỉ từ 1.999.000đ
                      </Box>
                    </Flex>
                    <Text
                      mt="1"
                      color="text.gray"
                      fontSize="xs"
                      fontWeight="medium"
                    >
                      Từ 31/12/2023
                    </Text>
                    <Flex justifyContent="space-between" gap={1}>
                      <Box>
                        <Image
                          src={item?.thumbnail?.path}
                          minW="66px"
                          h="66px"
                          p={2}
                          objectFit="cover"
                          border="1px"
                          borderColor="bg.gray"
                          rounded="md"
                        />
                      </Box>
                      <Box>
                        <Image
                          src={item?.thumbnail?.path}
                          minW="66px"
                          h="66px"
                          p={2}
                          objectFit="cover"
                          border="1px"
                          borderColor="bg.gray"
                          rounded="md"
                        />
                      </Box>
                      <Box>
                        <Image
                          src={item?.thumbnail?.path}
                          minW="66px"
                          h="66px"
                          p={2}
                          objectFit="cover"
                          border="1px"
                          borderColor="bg.gray"
                          rounded="md"
                        />
                      </Box>
                      <Box>
                        <Image
                          src={item?.thumbnail?.path}
                          minW="66px"
                          h="66px"
                          p={2}
                          objectFit="cover"
                          border="1px"
                          borderColor="bg.gray"
                          rounded="md"
                        />
                      </Box>
                      <Box>
                        <Image
                          src={item?.thumbnail?.path}
                          minW="66px"
                          h="66px"
                          p={2}
                          objectFit="cover"
                          border="1px"
                          borderColor="bg.gray"
                          rounded="md"
                        />
                      </Box>
                      {/* Box cuối cùng */}
                      <Box pos="relative">
                        <Image
                          src={item?.thumbnail?.path}
                          minW="66px"
                          h="66px"
                          p={2}
                          objectFit="cover"
                          border="1px"
                          borderColor="bg.gray"
                          rounded="md"
                        />
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          opacity={0.4}
                          minW="66px"
                          h="66px"
                          pos="absolute"
                          top="0"
                          rounded="md"
                          bgColor="bg.black"
                        ></Flex>
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          minW="66px"
                          h="66px"
                          pos="absolute"
                          top="0"
                          rounded="md"
                          color="text.white"
                        >
                          +99
                        </Flex>
                      </Box>
                    </Flex>
                  </Flex>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Flex
          w="9"
          h="9"
          position="absolute"
          left="-4"
          top={"calc(50% - 24px)"}
          translateY="-50%"
          zIndex="5"
          rounded="full"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          backgroundColor="bg.gray"
          className="discount__btn-prev"
        >
          <NavArrowLeflIcon size={4} strokeWidth={3} color="text.black" />
        </Flex>
        <Flex
          w="9"
          h="9"
          position="absolute"
          right="-4"
          top={"calc(50% - 24px)"}
          translateY="-50%"
          zIndex="5"
          rounded="full"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          backgroundColor="bg.gray"
          className="discount__btn-next"
        >
          <NavArrowRightIcon size={4} strokeWidth={3} color="text.black" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Slider;
