import {
    Box,
    Text,
    Divider,
    Flex,
    Grid,
    GridItem,
    Checkbox,
    Select,
    Button,
    Switch,
    Spacer,
    Link,
} from "@chakra-ui/react";
import { FacebookIcon, GoogleIcon } from "~/components/common/Icons";

const Accounts = () => {
    return (
        <Box>
            {/*Connected accounts */}
            <Box
                mt={7}
                w={"100%"}
                bg={"#ffff"}
                borderRadius={"15px"}
                p={5}
                fontSize={18}
            >
                <Text fontSize={22} fontWeight={700} mb={5}>
                    Connected accounts
                </Text>
                <Divider />
                <Text py={3}>Integrated features from these accounts make it easier to collaborate with people you know on Front Dashboard. </Text>

                <Flex m={3}>
                    <Box mt={3} mr={5}>
                        <GoogleIcon fontSize="30" />
                    </Box>
                    <Box>
                        <Text fontWeight={"600"}>Google</Text>
                        <Text color={"#797a7b"}>Calendar and contacts</Text>
                    </Box>
                    <Spacer />
                    <Switch mt={3} pr={5} size={"lg"} id='email-alerts' />
                </Flex>
                <Divider />


                <Flex m={3}>
                    <Box mt={3} mr={5}>
                        <GoogleIcon fontSize="30" />
                    </Box>
                    <Box>
                        <Text fontWeight={"600"}>Google</Text>
                        <Text color={"#797a7b"}>Calendar and contacts</Text>
                    </Box>
                    <Spacer />
                    <Switch mt={3} pr={5} size={"lg"} id='email-alerts' />
                </Flex>
                <Divider />


                <Flex m={3}>
                    <Box mt={3} mr={5}>
                        <GoogleIcon fontSize="30" />
                    </Box>
                    <Box>
                        <Text fontWeight={"600"}>Google</Text>
                        <Text color={"#797a7b"}>Calendar and contacts</Text>
                    </Box>
                    <Spacer />
                    <Switch mt={3} pr={5} size={"lg"} id='email-alerts' />
                </Flex>
                <Divider />


                <Flex m={3}>
                    <Box mt={3} mr={5}>
                        <GoogleIcon fontSize="30" />
                    </Box>
                    <Box>
                        <Text fontWeight={"600"}>Google</Text>
                        <Text color={"#797a7b"}>Calendar and contacts</Text>
                    </Box>
                    <Spacer />
                    <Switch mt={3} pr={5} size={"lg"} id='email-alerts' />
                </Flex>



            </Box>


            {/*Social accounts */}
            <Box
                mt={7}
                w={"100%"}
                bg={"#ffff"}
                borderRadius={"15px"}
                p={5}
                fontSize={18}
            >
                <Text fontSize={22} fontWeight={700} mb={5}>
                    Social accounts
                </Text>
                <Divider />

                <Flex my={5}>
                    <Box mt={2} mr={5}>
                        <FacebookIcon fontSize="30" />
                    </Box>
                    <Box>
                        <Text fontWeight={"600"}>Facebook</Text>
                        <Link fontSize={15} fontWeight={600} color={"#377dff"} href='https://www.facebook.com/' isExternal>
                            https://www.facebook.com/
                        </Link>
                    </Box>
                    <Spacer />
                    <Button
                        type="submit"
                        bgColor="gray.100"
                        textColor="text.white"
                        fontWeight="bold"
                        color={"#797a7b"}
                    >
                        Disconnect
                    </Button>
                </Flex>
                <Divider />

                <Flex my={5}>
                    <Box mt={2} mr={5}>
                        <FacebookIcon fontSize="30" />
                    </Box>
                    <Box>
                        <Text fontWeight={"600"}>Facebook</Text>
                        <Link fontSize={15} fontWeight={600} color={"#377dff"} href='https://www.facebook.com/' isExternal>
                            https://www.facebook.com/
                        </Link>
                    </Box>
                    <Spacer />
                    <Button
                        type="submit"
                        bgColor="gray.100"
                        textColor="text.white"
                        fontWeight="bold"
                        color={"#797a7b"}
                    >
                        Disconnect
                    </Button>
                </Flex>
                <Divider />


                <Flex my={5}>
                    <Box mt={2} mr={5}>
                        <FacebookIcon fontSize="30" />
                    </Box>
                    <Box>
                        <Text fontWeight={"600"}>Facebook</Text>
                        <Link fontSize={15} fontWeight={600} color={"#377dff"} href='https://www.facebook.com/' isExternal>
                            https://www.facebook.com/
                        </Link>
                    </Box>
                    <Spacer />
                    <Button
                        type="submit"
                        bgColor="gray.100"
                        textColor="text.white"
                        fontWeight="bold"
                        color={"#797a7b"}
                    >
                        Disconnect
                    </Button>
                </Flex>




            </Box>


            {/*Delete your account */}
            <Box
                my={7}
                w={"100%"}
                bg={"#ffff"}
                borderRadius={"15px"}
                p={5}
                fontSize={18}
            >
                <Text fontSize={22} fontWeight={700} mb={5}>
                    Delete your account
                </Text>
                <Divider />
                <Text py={3}>When you delete your account, you lose access to Front account services, and we permanently delete your personal data. You can cancel the deletion for 14 days.</Text>
                <Checkbox size='lg' >
                    Confirm that I want to delete my account.
                </Checkbox>
                <Flex justifyContent="flex-end" alignItems="center" >
                    <Button
                        type="submit"
                        bgColor="gray.100"
                        textColor="text.white"
                        fontWeight="bold"
                        color={"#797a7b"}
                        mr={4}
                    >
                        Learn more
                    </Button>
                    <Button
                        type="submit"
                        bgColor="#ed4c78"
                        textColor="white"
                    >
                        Delete
                    </Button>
                </Flex>
            </Box>

        </Box>
    )
}

export default Accounts