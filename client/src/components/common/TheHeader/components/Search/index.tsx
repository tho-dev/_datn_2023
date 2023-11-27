import {
  Box,
  Fade,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import { SearchIcon, UserIcon } from "~/components/common/Icons";
import { useGetSearchQuery } from "~/redux/api/product";
import { addViewedItem, setKeywords } from "~/redux/slices/globalSlice";
import { AppDispatch, RootState } from "~/redux/store";
import { formatNumber } from "~/utils/fc";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const debounceKeyword = useDebounce(keyword, 200);
  const { keywords } = useSelector(
    (state: RootState) => state.persistedReducer.global
  );

  const { data, isFetching } = useGetSearchQuery(
    {
      _page: 1,
      _limit: 1000,
      _keyword: debounceKeyword,
      _sort: "created_at",
      _order: "asc",
    },
    {
      skip: !keyword,
    }
  );

  const handleFocus = () => {
    setIsFocus(true);
    onOpen();
  };

  const handleBlur = () => {
    setIsFocus(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleViewProduct = (product: any) => {
    dispatch(addViewedItem(product));
  };
  return (
    <Flex
      w="full"
      maxW="360px"
      px="4"
      py="14px"
      ml="6"
      display={{
        sm: "none",
        md: "flex",
      }}
      rounded="full"
      alignItems="center"
      backgroundColor="bg.gray"
      borderWidth="1px"
      borderColor={isFocus ? "text.blue" : "none"}
      transition="all 0.2s ease"
      position="relative"
    >
      <SearchIcon size={4} />
      <Input
        w="full"
        h="full"
        px="0"
        pl="2"
        border="none"
        lineHeight="1.6"
        backgroundColor="bg.gray"
        placeholder="Tên sản phẩm, mã sản phẩm..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setKeyword(e?.target?.value?.trim())}
        onKeyDown={(e: any) => {
          if (e?.keyCode == 13) {
            navigate(decodeURIComponent(`/tim-kiem?keyword=${keyword}`));
            dispatch(setKeywords(keyword));
          }
        }}
      />
      <Fade
        in={isOpen}
        style={{
          position: "absolute",
          top: "60px",
          zIndex: 999,
          left: "-16px",
          width: "calc(100% + 32px)",
          height: "400px",
          maxHeight: "100%",
        }}
      >
        <Box
          display={isOpen ? "block" : "none"}
          bg="bg.white"
          rounded="md"
          shadow="md"
          w="full"
          px="4"
          py="5"
          h="400px"
          maxHeight="400px"
          overflowY="auto"
          overflowX="hidden"
        >
          <Box mb="5">
            <Heading as="h3" fontSize="md" fontWeight="semibold">
              Tìm kiếm gần đây
            </Heading>
            <Flex mt="4" gap="1" flexDir="column">
              {keywords?.map((_key: any, index: number) => {
                return (
                  <Link
                    key={index}
                    as={ReactRouterLink}
                    to={decodeURIComponent(`/tim-kiem?keyword=${_key}`)}
                    fontSize="sm"
                    color="text.blue"
                    cursor="pointer"
                  >
                    {_key}
                  </Link>
                );
              })}
            </Flex>
          </Box>
          <Flex
            gap="2"
            p="4"
            ml="-4"
            w="calc(100% + 32px)"
            alignItems="center"
            justifyContent="center"
            bgColor="rgb(245 253 255 / 1)"
          >
            <Box
              w="5"
              h="5"
              rounded="full"
              bgColor="#00d4ff"
              justifyContent="center"
              alignItems="center"
              display="inline-flex"
            >
              <UserIcon size={3} />
            </Box>
            <Text
              flex="1"
              fontSize="13px"
              color="text.black"
              fontWeight="medium"
            >
              Tăng thời gian khách đến 24h00, trở thành chuỗi cửa hàng bán lẻ
              Phục vụ khách hàng lâu nhất
            </Text>
          </Flex>
          {/* Sản phẩm */}
          <Flex mt="5" flexDir="column">
            <Heading as="h3" fontSize="sm" fontWeight="semibold">
              Sản phẩm
            </Heading>
            <Flex gap="3" mt="4" flexDir="column">
              {!isFetching ? (
                data?.data?.items?.map((item: any, index: number) => {
                  return (
                    <Flex
                      key={index}
                      gap="4"
                      alignItems="center"
                      justifyContent="flex-start"
                      as={ReactRouterLink}
                      to={`/${item?.shared_url}`}
                      display="inline-flex"
                      _hover={{
                        textDecor: "none",
                        bgColor: "#f1f1f1",
                      }}
                      rounded="6px"
                      onClick={() => handleViewProduct(item)}
                    >
                      <Box
                        w="20"
                        h="20"
                        minW="20"
                        borderWidth="1px"
                        borderColor="border.gray"
                        rounded="6px"
                        overflow="hidden"
                      >
                        <Image
                          src={item?.image}
                          w="full"
                          h="full"
                          objectFit="contain"
                        />
                      </Box>
                      <Flex flexDir="column" justifyContent="flex-start">
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          css={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item?.name}
                        </Text>
                        <Flex gap="2">
                          <Text
                            as="span"
                            color="text.red"
                            fontSize="sm"
                            fontWeight="semibold"
                          >
                            {formatNumber(`${item?.price_before_discount}`)}
                          </Text>
                          <Text
                            as="span"
                            fontSize="xs"
                            fontWeight="semibold"
                            color="text.red"
                          >
                            {`-${item?.price_discount_percent}%`}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  );
                })
              ) : (
                <Text fontSize="sm" fontWeight="semibold">
                  Đang tìm kiếm cho {keyword} ...
                </Text>
              )}
            </Flex>

            {data?.data?.items?.length == 0 && (
              <Text fontSize="sm" fontWeight="semibold">
                Không có kết quả nào được tìm thấy
              </Text>
            )}
          </Flex>
        </Box>
      </Fade>
    </Flex>
  );
};

export default Search;
