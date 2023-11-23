import { Box, Text, Button, Image } from "@chakra-ui/react";
import { Link, Flex } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";

type Props = {
  filters: any;
};

const Title = ({ filters }: Props) => {
  return (
    <Box w="100%" p="6" bg="white" my={6} borderRadius={12}>
      <Flex my={1} gap="6" alignItems="center">
        {filters?.type == "category_brand" && (
          <Box
            w="84px"
            h="84px"
            rounded="full"
            overflow="hidden"
            bgColor="bg.gray"
          >
            <Image
              w="full"
              h="full"
              objectFit="cover"
              src={filters?.detail?.thumbnail}
              p="2"
            />
          </Box>
        )}

        <Box flex="1">
          <Text fontSize="2xl" fontWeight="bold">
            {filters?.detail?.name}
          </Text>
          <Text
            fontSize="sm"
            w="100%"
            maxW="600px"
            fontWeight={500}
            lineHeight="20px"
            my="2"
          >
            {filters?.detail?.description}
          </Text>
          {filters?.detail?.brands?.length > 0 && (
            <>
              <Box w="100%" h="1px" bgColor="bg.gray" my="4"></Box>
              <Flex gap="4" mt="4" flexWrap="wrap">
                {filters?.detail?.brands.map((item: any, index: number) => {
                  return (
                    <Link
                      key={index}
                      to={`/${item?.shared_url}`}
                      as={ReactRouterLink}
                      _hover={{
                        textDecoration: "none",
                      }}
                    >
                      <Button
                        h="auto"
                        px="4"
                        py="3"
                        size="small"
                        lineHeight="150%"
                        rounded="lg"
                        color="text.black"
                        backgroundColor="bg.gray"
                        _hover={{ bg: "gray.200" }}
                      >
                        {item?.name}
                      </Button>
                    </Link>
                  );
                })}
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Title;
