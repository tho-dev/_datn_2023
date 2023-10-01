import React from "react";
import { Grid, GridItem, Box, Text, Heading, Flex, Badge } from "@chakra-ui/layout";
import { Image, useDisclosure } from "@chakra-ui/react";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";

type Props = {
    items?: any;
};

const BrandList = ({ items }: Props) => {
    const { isOpen: isOpenComfirm, onOpen: onOpenComfirm, onClose: onCloseComfirm } = useDisclosure();

    const handleRemove = () => {
        onOpenComfirm();
    };

    return (
        <>
            <Grid
                gap="4"
                templateColumns="repeat(5, 1fr)"
            >
                {Array(12)
                    .fill(0)
                    .map((item: any, index: number) => {
                        return (
                            <GridItem key={index}>
                                <Box
                                    rounded="4px"
                                    border="1px solid #e9ebec"
                                    position="relative"
                                    pb="100%"
                                >
                                    <Flex
                                        position="absolute"
                                        w="full"
                                        h="full"
                                        flexDir="column"
                                        justifyContent="space-evenly"
                                    >
                                        <Flex
                                            w="full"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Image
                                                src="https://res.cloudinary.com/dgpzzy5sg/image/upload/v1681573393/thinkpro/brands/rphabza8ipjbntdzilsi.png"
                                                w="100px"
                                                h="100px"
                                                objectFit="cover"
                                            />
                                        </Flex>
                                        <Box>
                                            <Heading
                                                as="h4"
                                                textAlign="center"
                                                fontSize="18"
                                            >
                                                Dell
                                            </Heading>
                                            <Text
                                                textAlign="center"
                                                fontSize="15"
                                            >
                                                12 brand sub
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex
                                        position="absolute"
                                        top="3"
                                        right="3"
                                        gap="2"
                                    >
                                        <Badge
                                            px="2"
                                            fontSize="15"
                                            rounded="4px"
                                            cursor="pointer"
                                            textTransform="inherit"
                                            bgColor="bg.bgEdit"
                                            textColor="text.textEdit"
                                            transition="all 0.5s ease"
                                            _hover={{
                                                transform: "translateY(-4px)",
                                            }}
                                        >
                                            Sửa
                                        </Badge>
                                        <Badge
                                            px="2"
                                            fontSize="15"
                                            rounded="4px"
                                            cursor="pointer"
                                            textTransform="inherit"
                                            bgColor="bg.bgDelete"
                                            textColor="text.textDelete"
                                            onClick={handleRemove}
                                            transition="all 0.5s ease"
                                            _hover={{
                                                transform: "translateY(-4px)",
                                            }}
                                        >
                                            Xóa
                                        </Badge>
                                    </Flex>
                                </Box>
                            </GridItem>
                        );
                    })}
            </Grid>
            {/*  */}
            <ConfirmThinkPro
                isOpen={isOpenComfirm}
                onClose={onCloseComfirm}
                content="Bạn có muốn xóa bỏ thương hiệu này không?"
            />
        </>
    );
};

export default BrandList;