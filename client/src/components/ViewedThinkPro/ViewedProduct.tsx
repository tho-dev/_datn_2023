import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// data fake
import thinkpro from "~/data/clone-thinkpro.json";
import ViewedList from "./components";

type PropTypes = {
  title: any;
};

const ViewedProduct = ({ title }: PropTypes) => {
  // comps

  return (
    <Box
      bg="white"
      w="100%"
      borderRadius="2xl"
      py={7}
      px={{
        sm: "10",
        md: "10",
        lg: "15",
        xl: "15",
      }}
    >
      <Text fontSize={"18px"} fontWeight={"bold"}>
        Sản phẩm đã xem
      </Text>
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
              slidesPerView: 5,
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
                  <ViewedList />
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

export default ViewedProduct;
