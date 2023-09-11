import React, { ChangeEvent, useState } from "react";
import { Grid, GridItem, Box, Switch, FormLabel, Flex } from "@chakra-ui/react";
import CardThinkPro from "~/components/CardThinkPro";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Radio,
    RadioGroup,
    Button,
    PopoverTrigger,
    Text,
    Popover,
    PopoverContent,
    PopoverHeader,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "~/components/common/Icons";
import ListThinkPro from "~/components/ListThinkPro";

type Props = {};

const ProductList = (props: Props) => {
    const [listProducts, setListProducts] = useState<any[]>(Array.from([1, 2, 3, 4, 5, 6]));
    const [showCompare, setShowCompare] = useState<boolean>(false);

    const handleCompare = (event: ChangeEvent<HTMLInputElement>): void => {
        setShowCompare(!showCompare);
    };

    return (
        <Box m="30px 0">
            <Flex
                w="100%"
                justifyContent="space-between"
                m="30px 0"
            >
                {/* <Flex
                    alignItems="center"
                    gap={2}
                >
                    <Switch
                        size="md"
                        id="isChecked"
                        onChange={handleCompare}
                        value={showCompare as any}
                    />
                    <FormLabel
                        htmlFor="isChecked"
                        fontSize="sm"
                        marginTop={2}
                    >
                        So sánh
                    </FormLabel>
                </Flex> */}

                <Box>
                    <Popover isLazy>
                        <PopoverTrigger>
                            <Button
                                bgColor="bg.white"
                                color="black"
                                fontSize="xs"
                                fontWeight="semibold"
                                rightIcon={<ArrowUpIcon size={4} />}
                                padding="3"
                                rounded="lg"
                            >
                                Sắp xếp : Nổi bật nhất
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent maxW="200px">
                            <PopoverHeader fontWeight="medium">
                                <Flex
                                    maxW="200px"
                                    flexDir="column"
                                    gap="2"
                                >
                                    <Box w="full">
                                        <Radio value="1">
                                            <Text fontSize="sm">Nổi bật nhất</Text>
                                        </Radio>
                                    </Box>
                                    <Box w="full">
                                        <Radio value="1">
                                            <Text fontSize="sm">Giá thấp -&gt; cao</Text>
                                        </Radio>
                                    </Box>
                                    <Box w="full">
                                        <Radio value="1">
                                            <Text fontSize="sm">Giá thấp -&gt; cao</Text>
                                        </Radio>
                                    </Box>
                                </Flex>
                            </PopoverHeader>
                        </PopoverContent>
                    </Popover>
                </Box>
            </Flex>

            <ListThinkPro />
        </Box>
    );
};

export default ProductList;
