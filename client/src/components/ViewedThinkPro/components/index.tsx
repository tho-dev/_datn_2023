
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Image, Divider, Button } from "@chakra-ui/react";
import { PlusIcon } from "./../../common/Icons";


type Props = {
	product?: any;
	mode?: string;
	showCompare?: boolean;
};

const ViewedList = ({ product, mode, showCompare }: Props) => {
  const saveToLocalStorage = () => {
    const dataToSave = {
      image: "https://images.thinkgroup.vn/unsafe/460x460/https://media-api-beta.thinkpro.vn/media/core/products/2022/8/3/LG-Gram-14-2022-ThinkPro-10.jpg",
      productName: "LG Gram 14 2022",
      price: 19999000,
      sale: "-31%",
      color: "",
      promotion: "Quà tặng 400.000",
    };

    const jsonData = JSON.stringify(dataToSave);

    localStorage.setItem("viewedProduct", jsonData);
  };

  const retrieveFromLocalStorage = () => {
    const jsonData = localStorage.getItem("viewedProduct");

    if (jsonData) {
      const data = JSON.parse(jsonData);

      console.log(data);

      return data;
    }
    return null;
  };

  const retrievedData = retrieveFromLocalStorage();


  return (
    <Link
      to={`laptop/lg-gram`}
      as={ReactRouterLink}
      w="full"
      h="full"
      overflow="hidden"
      rounded="md"
      display="inline-block"
      backgroundColor="bg.white"
      _hover={{
        textDecoration: "none",
      }}
      onClick={saveToLocalStorage}

    >
      <Box pb="100%" position="relative">
        <Box top="0" position="absolute">
          <Image
            w="full"
            h="full"
            objectFit="cover"
            src="https://images.thinkgroup.vn/unsafe/460x460/https://media-api-beta.thinkpro.vn/media/core/products/2022/8/3/LG-Gram-14-2022-ThinkPro-10.jpg"
          />
        </Box>
      </Box>
      <Flex p="4" flexDirection="column">
        <Heading as="h4" fontSize="sm" fontWeight="semibold">
          LG Gram 14 2022
        </Heading>
        <Flex gap="1" mt="1" alignItems="center" fontWeight="semibold">
          <Text fontSize="xs" color="text.gray">
            Từ
          </Text>
          <Text fontSize="md" color="text.red">
            19.999.000
          </Text>

          <Text
            p="2px"
            fontSize="10px"
            color="text.red"
            backgroundColor="#fff5f7"
          >
            -31%
          </Text>
        </Flex>
        <Flex gap="1" alignItems="center" fontWeight="semibold">
          <Text fontSize="xs" color="text.gray">
            Màu
          </Text>
          <Flex>
            <Box w="3" h="3" rounded="sm" backgroundColor="red.200" />
          </Flex>
        </Flex>
        <Divider my="3" />
        {mode == "home" && (
          <>
            <Box color="text.black" fontSize="xs" fontWeight="medium">
              <Text>CPU: Core i7 1260P, 12 Cores</Text>
              <Text>CPU: Core i7 1260P, 12 Cores</Text>
              <Text>CPU: Core i7 1260P, 12 Cores</Text>
              <Text>CPU: Core i7 1260P, 12 Cores</Text>
            </Box>
            <Divider my="3" />
          </>
        )}
        <Text
          color="text.black"
          fontSize="sm"
          fontWeight="medium"
          textDecoration="underline"
        >
          Quà tặng 400.000
        </Text>
        {showCompare && (
          <>
            <Divider my="3" />
            <Flex>
              <Button
                bgColor="white"
                color="blue"
                leftIcon={<PlusIcon size={4} />}
                padding={1}
              >
                So sánh
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Link>
  );
};

export default ViewedList;
