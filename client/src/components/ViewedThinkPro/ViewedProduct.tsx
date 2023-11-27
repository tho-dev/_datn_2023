import { Box, Flex } from "@chakra-ui/layout";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// data fake
import CardThinkPro from "../CardThinkPro";

type PropTypes = {
  products: any;
};

const ViewedProduct = ({ products }: PropTypes) => {
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
            },
            768: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
        >
          {products?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Box
                  w="full"
                  h="full"
                  overflow="hidden"
                  rounded="lg"
                  borderWidth="1px"
                  borderColor="border.primary"
                >
                  <CardThinkPro product={item} />
                </Box>
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
