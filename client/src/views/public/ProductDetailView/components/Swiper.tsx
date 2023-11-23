import { Img, useDisclosure } from "@chakra-ui/react";

import { Flex, Box } from "@chakra-ui/layout";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Thumbs,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import "./index.css";
import ImagePreviewModal from "~/components/ImagePreviewModal";

type Props = {
  assets: {
    url: string;
    id: string;
  }[];
  name: string;
};

const Gallery = ({ assets, name }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const swiperRef = useRef<any>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  // Hàm để di chuyển đến slide trước
  const previousSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Hàm để di chuyển đến slide kế tiếp
  const nextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <>
      <Flex
        p="6"
        rounded="6px"
        bgColor="bg.white"
        justifyContent="space-between"
      >
        <Box
          w="100px"
          display={{ base: "none", md: "block" }}
          __css={{
            "& .swiper-slide-thumb-active": {
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "bg.blue",
              rounded: "md",
            },
          }}
        >
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              Mousewheel,
              FreeMode,
              Thumbs,
            ]}
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            direction="vertical"
            mousewheel={true}
            slidesPerView={4}
            watchSlidesProgress={true}
            spaceBetween={10}
            speed={600}
            style={{
              maxHeight: "548px",
            }}
            slideActiveClass="assets"
          >
            {assets.map((item: any, index: number) => {
              return (
                <SwiperSlide
                  style={{
                    height: "100px",
                    overflow: "hidden",
                  }}
                  key={index}
                >
                  <Box
                    w="full"
                    h="100px"
                    bgColor="bg.gray"
                    rounded="md"
                    cursor="pointer"
                    overflow="hidden"
                  >
                    <Img
                      src={item.url}
                      w={"full"}
                      h={"full"}
                      objectFit="cover"
                    />
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
        {thumbsSwiper && (
          <Box w="full" maxW="548px" position="relative">
            <Swiper
              spaceBetween={10}
              modules={[Navigation, FreeMode, Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              watchSlidesProgress={true}
              slidesPerView={1}
              style={{
                maxHeight: "548px",
              }}
              navigation={false}
              ref={swiperRef}
              speed={600}
            >
              {assets.map((item: any, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <Box
                      w="full"
                      minH="548px"
                      bgColor="bg.gray"
                      rounded="6px"
                      overflow="hidden"
                    >
                      <Img
                        src={item.url}
                        w="full"
                        h="full"
                        objectFit="cover"
                        onClick={onOpen}
                        cursor={"pointer"}
                        rounded="6px"
                        overflow="hidden"
                      />
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Flex
              gap="2"
              position="absolute"
              bottom="4"
              right="4"
              justifyContent="end"
            >
              <Flex
                w="10"
                h="10"
                left="4"
                top={"calc(50% - 24px)"}
                translateY="-50%"
                zIndex="5"
                rounded="full"
                cursor="pointer"
                alignItems="center"
                justifyContent="center"
                backgroundColor="bg.white"
                className="btn-prev"
                onClick={previousSlide}
              >
                <NavArrowLeflIcon size={4} strokeWidth={3} color="text.black" />
              </Flex>
              <Flex
                w="10"
                h="10"
                right="4"
                top={"calc(50% - 24px)"}
                translateY="-50%"
                zIndex="5"
                rounded="full"
                cursor="pointer"
                alignItems="center"
                justifyContent="center"
                backgroundColor="bg.white"
                className="btn-next"
                onClick={nextSlide}
              >
                <NavArrowRightIcon
                  size={4}
                  strokeWidth={3}
                  color="text.black"
                />
              </Flex>
            </Flex>
          </Box>
        )}

        {/* // Box hiển thị ảnh */}
        <ImagePreviewModal
          products={assets}
          isOpen={isOpen}
          onClose={onClose}
          name={name}
        />
      </Flex>
    </>
  );
};

export default Gallery;
