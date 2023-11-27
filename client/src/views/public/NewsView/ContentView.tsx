import { useEffect, useState } from "react";
import { Box, Text, Flex, Divider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PostRelate from "./components/PostRelate";
import { useGetAllPostQuery, useGetSinglePostQuery } from "~/redux/api/post";
import { NavArrowLeflIcon, NavArrowRightIcon } from "~/components/common/Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import moment from "moment";
import LoadingPolytech from "~/components/LoadingPolytech";

const ContentView = () => {
  const { slug } = useParams();
  const { data: product, isLoading: isProductLoading } = useGetSinglePostQuery(
    slug as string
  );

  const [data, setData] = useState<any>([]);
  const { data: posts, isLoading: isPostsLoading } = useGetAllPostQuery({
    _order: "asc",
    _sort: "date",
    _page: 1,
    _limit: 10,
    _type: "",
  });

  useEffect(() => {
    if (posts) {
      const docs = posts?.data?.items as any;
      setData([...data, ...docs]);
    }
  }, [posts]);

  const now = moment();
  const diffInSeconds = now.diff(product?.data.created_at, "seconds");
  const diffInMinutes = Math.ceil(diffInSeconds / 60);
  const diffInHours = Math.ceil(diffInMinutes / 60);
  const diffInDays = Math.ceil(diffInHours / 24);

  if (isProductLoading || isPostsLoading) return <LoadingPolytech />;

  return (
    <>
      <Box my="6">
        <Box
          bg="white"
          w="100%"
          borderRadius="2xl"
          py={{
            sm: "6",
            lg: "9",
          }}
          px={{
            sm: "10",
            md: "10",
            lg: "28",
            xl: "28",
          }}
        >
          <Text fontSize={"3xl"} fontWeight={"bold"} py={5}>
            {product?.data.title}
          </Text>
          <Box py={5}>
            <Divider />
            <Flex my={"4"} fontWeight={"bold"}>
              <Text as="h3" fontWeight="black" lineHeight="1.3">
                {product?.data.created_by}
              </Text>
              <Text mx={2}>|</Text>
              <Text fontWeight="medium" fontSize="13px">
                {diffInSeconds <= 60 ? (
                  <Text fontWeight="medium" fontSize="13px">
                    {diffInSeconds} giây
                  </Text>
                ) : diffInMinutes <= 60 ? (
                  <Text fontWeight="medium" fontSize="13px">
                    {diffInMinutes} phút
                  </Text>
                ) : diffInHours <= 24 ? (
                  <Text fontWeight="medium" fontSize="13px">
                    {diffInHours} giờ
                  </Text>
                ) : (
                  <Text fontWeight="medium" fontSize="13px">
                    {diffInDays} ngày
                  </Text>
                )}
              </Text>
            </Flex>
            <Divider />
          </Box>
          <Box py={5}>
            <Flex fontSize={"xl"}>
              <Text color={"blue.600"} fontWeight={"extrabold"}>
                //{" "}
              </Text>
              <Text color={"black"} as="cite">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.data.description,
                  }}
                />
              </Text>
            </Flex>
          </Box>
          <Text py={5} fontSize={"xl"} fontWeight={"medium"}>
            <div dangerouslySetInnerHTML={{ __html: product?.data.content }} />
          </Text>

          <Box py={5}>
            <img
              src={product?.data.thumbnail.url}
              alt="Thumbnail"
              width="100%"
            />
          </Box>

          <Text py={5} fontSize={"xl"} fontWeight={"medium"}>
            <div
              dangerouslySetInnerHTML={{ __html: product?.data.meta_keyword }}
            />
          </Text>

          <Text py={5} fontSize={"xl"} fontWeight={"medium"}>
            <div
              dangerouslySetInnerHTML={{
                __html: product?.data.meta_description,
              }}
            />
          </Text>

          <Text py={5} fontSize={"xl"} fontWeight={"medium"}>
            <div
              dangerouslySetInnerHTML={{ __html: product?.data.meta_title }}
            />
          </Text>
        </Box>

        <Text py={10} fontSize={"2xl"} fontWeight={"bold"}>
          Bài viết liên quan
        </Text>
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
              },
              768: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
          >
            {data?.map((product: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    w="full"
                    h="full"
                    overflow="hidden"
                    rounded="lg"
                    // borderWidth="1px"
                    borderColor="border.primary"
                    bg={"white"}
                  >
                    <PostRelate product={product} key={index} />
                  </Box>
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
            backgroundColor="bg.bgEdit"
            className="discount__btn-prev"
          >
            <NavArrowLeflIcon size={4} color="text.textEdit" />
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
            backgroundColor="bg.bgEdit"
            className="discount__btn-next"
          >
            <NavArrowRightIcon size={4} color="text.textEdit" />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default ContentView;
