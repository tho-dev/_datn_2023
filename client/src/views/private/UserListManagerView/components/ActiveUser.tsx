import { Box, Text, Flex, Link, Heading } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/layout";
import ActiveUserItem from "./ActiveUserItem";
import { CheckIcon } from "~/components/common/Icons";

type Props = {
    columns?: any;
};

const ActiveUser = ({ columns = 4 }: Props) => {
    return (
        <Grid
            w="full"
            gap="3"
            mt={5}
            templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
                xl: `repeat(${columns}, 1fr)`,
            }}
        >
            <GridItem >
                <Link
                    // to={"/"}

                    as={ReactRouterLink}
                    w="full"
                    rounded="xl"
                    overflow="hidden"
                    display="inline-block"
                    backgroundColor="bg.white"
                    _hover={{
                        textDecoration: "none",
                    }}
                >
                    <Box bg="#fcf2da">
                        <Text
                            p={5}
                            fontSize={19}
                            fontWeight={"semibold"}
                        >
                            7,845,102
                        </Text>
                        <Text
                            pl={5}
                            pb={5}
                            fontSize={15}
                            fontWeight={"semibold"}
                        >
                            TOTAL USERS
                        </Text>
                    </Box>
                </Link>
            </GridItem>
            <GridItem>
                <Link
                    // to={"/"}
                    as={ReactRouterLink}
                    w="full"
                    rounded="xl"
                    overflow="hidden"
                    display="inline-block"
                    backgroundColor="bg.white"
                    _hover={{
                        textDecoration: "none",
                    }}
                >
                    <Box bg={"#cdf7ec"}>
                        <Text
                            p={5}
                            fontSize={19}
                            fontWeight={"semibold"}
                        >
                            559.25k
                        </Text>
                        <Text
                            pl={5}
                            pb={5}
                            fontSize={15}
                            fontWeight={"semibold"}
                        >
                            ACTIVE USERS
                        </Text>
                    </Box>
                </Link>
            </GridItem>
            <GridItem>
                <Link
                    // to={"/"}
                    as={ReactRouterLink}
                    w="full"
                    rounded="xl"
                    overflow="hidden"
                    display="inline-block"
                    backgroundColor="bg.white"
                    _hover={{
                        textDecoration: "none",
                    }}
                >
                    <Box bg={"#d2edf6"}>
                        <Text
                            p={5}
                            fontSize={19}
                            fontWeight={"semibold"}
                        >
                            559.25k
                        </Text>
                        <Text
                            pl={5}
                            pb={5}
                            fontSize={15}
                            fontWeight={"semibold"}
                        >
                            UNACTIVE USERS
                        </Text>
                    </Box>
                </Link>
            </GridItem>
            <GridItem>
                <Link
                    // to={"/"}
                    as={ReactRouterLink}
                    w="full"
                    rounded="xl"
                    overflow="hidden"
                    display="inline-block"
                    backgroundColor="bg.white"
                    _hover={{
                        textDecoration: "none",
                    }}
                >
                    <Box
                        h={"100px"}
                    >
                        <Box
                            bg={"#f3f6f9"}
                            w='362px'
                            // h={"83px"}
                            m={"15px"}
                        >
                           <ActiveUserItem icon={<CheckIcon color="white"/>} heading={"Invite your friend to Thinkpro"} text={"Nor again is there anyone pursues"}/>

                        </Box>
                    </Box>
                </Link>
            </GridItem>
        </Grid>

    );
};

export default ActiveUser;
