import { Box, Flex, Grid, GridItem } from '@chakra-ui/layout'
import { Avatar, Button, Image, Text } from '@chakra-ui/react'

const Confirmation = () => {
    return (
        <Box>
            <Box
                w={"100%"}
                h={40}
                bg={"#b3e7ff"}
                borderTopRadius={"15px"}
            position={'relative'}
            >
                <Image
                    position={'absolute'}
                    m={"80px 42%"}
                    borderRadius='full'
                    boxSize='150px'
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'
                />
            </Box>
            {/* Location */}
            <Grid
                mt={120}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Location
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    Location
                </GridItem>
            </Grid>

            {/* Email */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Email
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    abc@gmail.com
                </GridItem>
            </Grid>

            {/* Phone */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Phone
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    (+84)842 842 842
                </GridItem>
            </Grid>

            {/* Organization */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Organization
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    Htmlstream
                </GridItem>
            </Grid>

            {/* Department */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Department
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    -
                </GridItem>
            </Grid>

            {/* Account type */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Account type
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    Individual
                </GridItem>
            </Grid>

            {/* Country */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Country
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    <Flex>
                        <Avatar fontSize={10} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQURUxmaB6hWnC4i27EXKPI0GwFdVItmQTq6YyEDxIN-dxlbLe62ry4_TEzqInSrym4S_o&usqp=CAU' />
                        <Text ml={2}>Vietnam</Text>
                    </Flex>
                </GridItem>
            </Grid>

            {/* City */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    City
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    Hanoi
                </GridItem>
            </Grid>

            {/* Address line 1 */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Address line 1
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    Bac Tu Liem District, Hanoi
                </GridItem>
            </Grid>


            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Country
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    Individual
                </GridItem>
            </Grid>

            {/* Address line 2 */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Address line 2
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    -
                </GridItem>
            </Grid>

            {/* Zip code */}
            <Grid
                mt={"17px"}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}>
                <GridItem fontSize={16} textAlign={'end'} mr={10} fontWeight={500} color={'gray'}>
                    Zip code
                </GridItem>
                <GridItem fontSize={16}  fontWeight={700} >
                    100000
                </GridItem>
            </Grid>

            <Button
                    type="submit"
                    bgColor="text.textSuccess"
                    textColor="text.white"
                    fontWeight="bold"
                    px="4"
                    
                >
                    Tạo mới
                </Button>
        </Box>
    )
}

export default Confirmation