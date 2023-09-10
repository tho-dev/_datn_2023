import React from "react";

import { Grid, GridItem, Flex, Box, Center, Text, Heading } from "@chakra-ui/layout";
import { PlusIcon, SearchAdminIcon } from "~/components/common/Icons";
import { Input } from "@chakra-ui/input";
import { Button, Select } from "@chakra-ui/react";


type Props = {};



const UserSearch = (props: Props) => {
    return (
        <Grid
            mt="4"
            px="5"
            py="4"
            gap="6"
            bgColor="bg.white"
            rounded="md"
            templateColumns="repeat(4, 1fr)"
            justifyContent="space-between" alignItems="center" mb={4}
        >
            <GridItem colSpan={3}>
                <Flex
                    w="full"
                    h="full"
                    px="4"
                    maxW={{
                        sm: "160px",
                        md: "160px",
                        lg: "360px",
                        xl: "360px",
                        "2xl": "360px",
                    }}
                    maxH="48px"
                    alignItems="center"
                    rounded="md"
                    backgroundColor="bg.admin1"
                    display={{
                        sm: "flex",
                        md: "flex",
                        lg: "flex",
                        xl: "flex",
                        "2xl": "flex",
                    }}
                >
                    <Flex
                        as="span"
                        mt="1"
                    >
                        <SearchAdminIcon size={6} />
                    </Flex>
                    <Input
                        h="10"
                        border="none"
                        bgColor="transparent"
                        px="0"
                        pl="1"
                        placeholder="Tìm kiếm ..."
                    />
                </Flex>
            </GridItem>
            
            <Flex gap={2} >
                <Button fontSize={15} fontWeight={"semibold"} borderRadius={"md"} bgColor="#4b93ff">
                    Add User
                </Button>
                <Select fontSize={15}   borderRadius={"md"} placeholder='All'>
                    <option value='option1'>Last 7 Days</option>
                    <option value='option2'>Last 30 Days</option>
                    <option value='option3'>Last Month</option>
                    <option value='option4'>This Month</option>
                    <option value='option5'>Today</option> 
                    <option value='option6'>Yesterday</option> 
                </Select>
            </Flex>
        </Grid>
    );
};

export default UserSearch;
