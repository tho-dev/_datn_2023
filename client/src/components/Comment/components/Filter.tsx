import { Box, Text, Grid, GridItem } from "@chakra-ui/layout";
import { Button, Divider } from "@chakra-ui/react";


const Filter = () => {
    return (
        <Box>
            <Divider mt={6} />
            <Text
                mt={3}
                fontWeight={'bold'}
            >
                Lọc theo
            </Text>
            <Grid mt={3} gap={{
                sm: "1",
                md: "1",
                xl: "0",
            }}
                templateColumns={{
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                    xl: "repeat(14, 1fr)",
                }}>
                <GridItem colSpan={1}>
                    <Button borderRadius={20} bgColor={"#e8e8e8"} color={"gray"} px={5} mr={2} >
                        Lọc
                    </Button>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button borderRadius={20} bgColor={"#e8e8e8"} color={"gray"} px={5} mr={2} >
                        Có hình ảnh
                    </Button>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button borderRadius={20} bgColor={"#e8e8e8"} color={"gray"} px={5} mr={2} >
                        Đã mua hàng
                    </Button>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button borderRadius={20} bgColor={"#e8e8e8"} color={"gray"} px={5} mr={2} >
                        5 sao
                    </Button>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button borderRadius={20} bgColor={"#e8e8e8"} color={"gray"} px={5} mr={2} >
                        4 sao
                    </Button>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button borderRadius={20} bgColor={"#e8e8e8"} color={"gray"} px={5} mr={2} >
                        3 sao
                    </Button>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button borderRadius={20} bgColor={"#e8e8e8"} color={"gray"} px={5} mr={2} >
                        2 sao
                    </Button>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button borderRadius={20} bgColor={"#e8e8e8"} color={"gray"} px={5} mr={2} >
                        1 sao
                    </Button>
                </GridItem>

            </Grid>
        </Box>
    )
}

export default Filter