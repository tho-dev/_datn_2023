import { GridItem, Flex, Heading, Box, Text } from '@chakra-ui/layout'

type Props = {
    heading: string,
    text: string,
    icon: any
}

const ActiveUserItem = ({ heading, text, icon }: Props) => {
    return (
        <GridItem h={"85px"}
            borderColor="#F1F4F9"
            rounded="md"
        >
            <Flex
                padding={1}
                alignItems="center"
                gap={3}
            >
                <Box
                >
                    <Flex
                        gap="3"
                    >
                        <Flex
                            w="12"
                            h="12"
                            ml={1}
                            mt={"10px"}
                            rounded="md"
                            bgColor="red.200"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {icon}
                        </Flex>
                    </Flex>

                </Box>
                <Box>
                    <Heading
                        fontSize="18"
                        my="3"
                    >
                        {heading}
                    </Heading>
                    <Flex
                        gap="1"
                        alignItems="center"
                    >
                        <Text
                            color="gray"
                            fontSize="15"
                            fontWeight="semibold"
                        >
                            {text}
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </GridItem>
    )
}

export default ActiveUserItem