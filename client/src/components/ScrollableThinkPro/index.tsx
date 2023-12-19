import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavArrowLeflIcon, NavArrowRightIcon } from "../common/Icons";
import { useState } from "react";

type Props = {
  mt?: any; // khoảng cái margin-top
  items?: any; // ....
  isArrow?: any; // hiển thị nút
  nextEl?: string; // className của nút next
  prevEl?: string; // className của nút prev
  handleClick?: any;
};

const ScrollableThinkPro = ({
  items = [],
  mt = 4,
  isArrow = false,
  nextEl,
  prevEl,
  handleClick,
}: Props) => {
  const [active, setActive] = useState(1);

  return (
    <Flex mt={mt} gap="4">
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={8}
        navigation={{
          nextEl: `.${nextEl}`,
          prevEl: `.${prevEl}`,
        }}
      >
        {items?.map((item: any, index: number) => {
          return (
            <SwiperSlide
              key={index}
              style={{
                width: "auto",
              }}
            >
              {item.value !== "khong-xac-dinh" && (
                <Button
                  h="auto"
                  px="4"
                  py="3"
                  size="small"
                  lineHeight="150%"
                  rounded="lg"
                  color={active == index ? "text.textEdit" : "text.black"}
                  backgroundColor={active == index ? "bg.bgEdit" : "bg.white"}
                  onClick={() => {
                    setActive(index);
                    handleClick(item);
                  }}
                >
                  {item?.name}
                </Button>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      {isArrow && (
        <Flex gap="2">
          <Flex
            w="9"
            h="9"
            rounded="full"
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            backgroundColor="bg.white"
            className={prevEl}
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
            className={nextEl}
          >
            <NavArrowRightIcon size={4} strokeWidth={3} color="text.black" />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ScrollableThinkPro;
