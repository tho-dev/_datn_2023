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
import CardThinkPro from "~/components/CardThinkPro";

type PropTypes = {
  title: any;
};

const DiscountProducts = ({ title }: PropTypes) => {
  // comps

  return (
    <Box px="9">
      <Heading as="h2" fontSize="28px" mb={6}>
        {title}
      </Heading>
      {/* Category slider */}
      <Flex mb={6}>
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={8}
          navigation={{
            nextEl: `.discount__btn-next-cate`,
            prevEl: `.discount__btn-prev-cate`,
          }}
        >
          {thinkpro.data.map((item: any, index: number) => {
            return (
              <SwiperSlide
                style={{
                  width: "auto",
                }}
                key={index}
              >
                <Link
                  to="/slug"
                  as={ReactRouterLink}
                  display="inline-flex"
                  gap="3"
                  px="3"
                  py="2"
                  rounded="md"
                  alignItems="center"
                  bgColor="bg.white"
                  transition="all 0.2s ease-in"
                  textDecoration="none"
                  _hover={{
                    bgColor: "bg.gray",
                  }}
                >
                  <Text fontSize="xs" color="text.black" fontWeight="semibold">
                    {item?.name}
                  </Text>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Flex
          gap="2"
          display={{
            sm: "none",
            lg: "flex",
          }}
        >
          <Flex
            w="9"
            h="9"
            rounded="full"
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            backgroundColor="bg.white"
            className="discount__btn-prev-cate"
            _hover={{
              bgColor: "bg.gray",
            }}
          >
            <NavArrowLeflIcon size={4} strokeWidth={3} color="text.black" />
          </Flex>

          <Flex
            w="9"
            h="9"
            rounded="full"
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            backgroundColor="bg.white"
            className="discount__btn-next-cate"
            _hover={{
              bgColor: "bg.gray",
            }}
          >
            <NavArrowRightIcon size={4} strokeWidth={3} color="text.black" />
          </Flex>
        </Flex>
      </Flex>
      {/* Products' slider */}
      <Flex position="relative">
        <Swiper
          modules={[Navigation]}
          speed={400}
          spaceBetween={16}
          loop={true}
          navigation={{
            nextEl: ".discount__btn-next-products",
            prevEl: ".discount__btn-prev-products",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
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
                  <CardThinkPro />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Flex
          w="9"
          h="9"
          position="absolute"
          top={"calc(50% - 24px)"}
          translateY="-50%"
          left={-4}
          zIndex="5"
          rounded="full"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          backgroundColor="bg.gray"
          className="discount__btn-prev-products"
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
          className="discount__btn-next-products"
        >
          <NavArrowRightIcon size={4} strokeWidth={3} color="text.black" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default DiscountProducts;
