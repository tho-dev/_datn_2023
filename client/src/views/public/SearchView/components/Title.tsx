import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link, Flex } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";

type Props = {};

const Title = (props: Props) => {
    return (
        <Box
            w="100%"
            p="6"
            bg="white"
            my={6}
            borderRadius={12}
        >
            <Box my={1}>
                <Text
                    lineHeight="34px"
                    fontSize="xl"
                    fontWeight="inherit"
                    fontFamily="ui-sans-serif"
                >
                    Kết quả tìm kiếm cho
                    <span
                        style={{ fontStyle: "italic", fontWeight: "600" }}
                    >
                        "máy tính"
                    </span>
                </Text>
                <Text
                    fontSize="14px"
                    w="100%"
                    maxW="600px"
                    fontWeight={500}
                    lineHeight="150%"
                    my="2"
                >
                    Tìm thấy 33 sản phẩm
                </Text>
            </Box>


        </Box>
    );
};

export default Title;
