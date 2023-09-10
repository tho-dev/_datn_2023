import { Box, Flex, Text, Grid, GridItem, Spacer, Divider } from '@chakra-ui/layout'
import { Avatar, Image } from '@chakra-ui/react'
import { Annotation, Thumbs, Chat, Share, Check, Star } from "~/components/common/Icons"



type Props = {};

const Client = (props: Props) => {
    return (
        <Box>
            <Divider mt={6} />

            <Grid mt={5}
                gap={{
                    sm: "0",
                    md: "0",
                    xl: "8",
                }}
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(4, 1fr)",
                }}>
                <GridItem mr={7} colSpan={1}>
                    <Flex >
                        <Avatar
                            name="ThinkPro"
                            // src="https://bit.ly/broken-link"
                            w="10"
                            h="10"
                            color="#12AFF0"
                            fontSize="xs"
                            bgColor="#12AFF033"
                        />
                        <Box ml={3}>
                            <Text fontWeight={'black'}>
                                Duy Thuan
                            </Text>
                            <Text fontSize={13} color={"gray"}>
                                Đã tham gia 2 tháng
                            </Text>
                        </Box>

                    </Flex>
                    <Flex mt={3}>
                        <Annotation size={25} color='gray' />
                        <Text fontSize={14} m={1} color={"gray"}>
                            Đã viết
                        </Text>
                        <Spacer />
                        <Text fontSize={14} m={1} >
                            17 đánh giá
                        </Text>
                    </Flex>
                    <Divider mt={2} />
                    <Flex mt={3}>
                        <Thumbs size={5} color='gray' />
                        <Text fontSize={14} m={1} color={"gray"}>
                            Đã nhận
                        </Text>
                        <Spacer />
                        <Text fontSize={14} m={1} >
                            4 lượt cảm ơn
                        </Text>
                    </Flex>



                </GridItem>
                <GridItem  colSpan={3}>
                    <Flex>
                        <Star size={6} />
                        <Star size={6} />
                        <Star size={6} />
                        <Star size={6} />
                        <Star size={6} />



                        <Text
                            fontWeight={'black'} ml={2}
                        >Cực kì hài lòng</Text>

                    </Flex>
                    <Flex color={"#00ab56"}>
                        <Box borderRadius={"100%"} bg={"#00ab56"}>
                            <Check color='#ffffff' />
                        </Box>

                        <Box fontSize={"17px"} ml={3}>Đã mua hàng</Box>
                    </Flex>
                    <Text pt={4} color={"black"} fontSize={"13px"}>
                        Bàn phím gõ êm, vì size nhỏ gọn nên các phím mũi tên hơi gần các phím khác. 10 chế độ LED chủ yếu là chế độ chuyển động. Kết nối USB type A to C nên tiện tháo rời và di chuyển.
                    </Text>
                    <Grid pt={2} 
                     gap={{
                        sm: "2",
                        md: "2",
                        xl: "2",
                    }}
                    templateColumns={{
                        sm: "repeat(2, 1fr)",
                        md: "repeat(2, 1fr)",
                        xl: "repeat(4, 1fr)",
                    }}
                    >
                        <GridItem colSpan={1}> <Image color={"1"} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" /></GridItem>
                        <GridItem colSpan={1}> <Image color={"1"} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" /></GridItem>
                        <GridItem colSpan={1}> <Image color={"1"} src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2021/10/23/1-1634994418951166060599.png" /></GridItem>
                    </Grid >
                    <Text color={"gray"} pt={3} fontSize={"13px"}>
                        Màu sắc: Trắng, xanh
                    </Text>
                    <Text color={"gray"} fontSize={"13px"}>
                        Đánh giá vào 10 tháng trướcĐã dùng 1 ngày
                    </Text>
                    <Flex >
                        <Thumbs size={6} color='gray' />
                        <Text fontSize={20} mx={3} color={'gray'}>4</Text>
                        <Chat size={6} color='gray' />
                        <Text fontSize={15} ml={3} mt={"2px"} color={'gray'}>Bình luận</Text>
                        <Spacer />
                        <Share size={6} color='gray' />
                        <Text fontSize={15} ml={3} color={'gray'}>Chia sẻ</Text>


                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Client