// import React from 'react';
// import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Image, Box } from '@chakra-ui/react';

// type Props = {
//   imageSrc: string,
//   onClose: any,
//   isOpen: any,
// }

// const ImagePreviewModal = ({ imageSrc, onClose, isOpen }: Props) => {
//   return (
//     <Box >
//       <Modal onClose={onClose} isOpen={isOpen} size={"3xl"}>
//         <ModalOverlay />
//         <ModalContent >
//           <ModalCloseButton />
//           <ModalBody >
//             <Image objectFit={"cover"} src={imageSrc} />
//       </ModalBody>
//     </ModalContent>
//   </Modal>
// </Box>

//   );
// };

// export default ImagePreviewModal;
import { Img, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Image } from "@chakra-ui/react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import "./index.css";

type Props = {
  onClose: any,
  isOpen: any,
  product: any
}

function ImagePreviewModal({ onClose, isOpen, product }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const swiperRef = useRef<any>(null);

  // handle swiper change
  // const handleSwiperChange = (swiper: any) => {
  //   setThumbsSwiper(swiper);
  //   console.log(swiper.realIndex)
  //   // swiper.style.borderColor = "1px solid red";
  // }

  return (
    <Box overflow={"hidden"} >
      <Modal onClose={onClose} isOpen={isOpen} size={"full"} >
        <ModalOverlay />
        <ModalContent >
          <ModalCloseButton />
          <ModalBody >
            <Box>
              <Text fontWeight={"bold"} fontSize={"20px"}>Dell Inspiron 13 5330</Text>
            </Box>
            <Flex
              p="6"
              rounded="6px"
              bgColor="bg.white"
              justifyContent="space-between"

            >
              {thumbsSwiper && (
                <Flex
                  w="90%"
                  maxH={"90vh"}

                >
                  <Swiper
                    spaceBetween={10}
                    modules={[Navigation, FreeMode, Thumbs, Zoom]}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    watchSlidesProgress={true}
                    slidesPerView={1}
                    navigation={false}
                    ref={swiperRef}
                    zoom={true}
                  >
                    {Array(6)
                      .fill(0)
                      .map((item: any, index: number) => {
                        return (
                          <SwiperSlide key={index}>
                            <Box
                              w="full"
                              h="full"
                              bgColor="bg.gray"
                              rounded="6px"

                            >
                              <Flex
                                w="full"
                                h="full"
                                className="swiper-zoom-container"
                                justifyContent={"center"}
                              >
                                <Img
                                  src="https://images.thinkgroup.vn/unsafe/1000x1000/https://media-api-beta.thinkpro.vn/media/core/products/2022/12/23/lenovo-thinkpad-x1-carbon-gen-11-thinkpro-01.png"

                                  objectFit="contain"
                                  cursor={"pointer"}
                                />
                              </Flex>


                            </Box>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </Flex>
              )}
              <Box
                w="100px"
                display={{ base: "none", md: "block" }}
              >
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode, Thumbs]}
                  onSwiper={(swiper) => setThumbsSwiper(swiper)}
                  direction="vertical"
                  mousewheel={true}
                  slidesPerView={4}
                  watchSlidesProgress={true}
                  spaceBetween={10}
                >
                  {Array(6)
                    .fill(0)
                    .map((item: any, index: number) => {
                      return (
                        <SwiperSlide
                          className="slide"
                          style={{
                            height: "100px",
                          }}
                          key={index}
                        >
                          <Box
                            w="full"
                            h="full"
                          >
                            <Img
                              src="https://images.thinkgroup.vn/unsafe/200x200/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2022/12/23/lenovo-thinkpad-x1-carbon-gen-11-thinkpro-01.png"
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

            </Flex>

          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ImagePreviewModal;
