import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Avatar, Button, Image, Text } from "@chakra-ui/react";

type Props = {
    thumbnail: any;
    title: string;
    description: string;
    content: string;
    meta_keyword: string;
    meta_description: string;
    meta_title: string;
};
const ReviewAddPostManger = ({
    thumbnail,
    title,
    description,
    content,
    meta_keyword,
    meta_description,
    meta_title,
}: Props) => {
    return (
        <Box
            bgColor="white"
            my={8}
            padding="16px 24px"
            borderRadius={6}
            w={"100%"}
            boxShadow="lg"
        >


            <Box h={40} position={"relative"}>
                <Image
                    position={"absolute"}
                    m={"20px 35%"}
                    boxSize="200px"
                    alt="Dan Abramov"
                    src={thumbnail ? thumbnail.url : "https://tanphat.com.vn/media/product/2797_ux8402ze_m3074w.jpg"}
                    objectFit="cover"
                />
            </Box>

            {/* title */}
            <Flex
                mt={"100px"}
            >
                <Box
                    fontSize={16}
                    mr={5}
                    fontWeight={500}
                    color={"gray"}
                >
                    Tiêu đề:
                </Box>
                <Box
                    fontSize={16}
                    fontWeight={700}
                    css={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {title ? title : "Tiêu đề bài viết"}
                </Box>
            </Flex>



            {/* description */}
            <Flex
                mt={"25px"}
            >
                <Box
                    fontSize={16}
                    textAlign={"end"}
                    mr={5}
                    fontWeight={500}
                    color={"gray"}
                >
                    Bài viết:
                </Box>
                <Box
                    fontSize={16}
                    fontWeight={700}
                    css={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {description ? description : "Bài viết của bạn"}
                </Box>
            </Flex>


            {/* content */}
            <Flex
                mt={"25px"}
            >
                <Box
                    fontSize={16}
                    textAlign={"end"}
                    mr={5}
                    fontWeight={500}
                    color={"gray"}
                >
                    Nội dung:
                </Box>
                <Box
                    fontSize={16}
                    fontWeight={700}
                    css={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {content ? content : "Nội dung bài viết"}
                </Box>
            </Flex>


            {/* meta_keyword */}
            <Flex
                mt={"25px"}
            >
                <Box
                    fontSize={16}
                    textAlign={"end"}
                    mr={5}
                    fontWeight={500}
                    color={"gray"}
                >
                    Meta keyword:
                </Box>
                <Box
                    fontSize={16}
                    fontWeight={700}
                    css={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {meta_keyword ? meta_keyword : "Meta keyword bài viết"}
                </Box>
            </Flex>




            {/* meta_description */}
            <Flex
                mt={"25px"}
            >
                <Box
                    fontSize={16}
                    textAlign={"end"}
                    mr={5}
                    fontWeight={500}
                    color={"gray"}
                >
                    Meta description:
                </Box>
                <Box
                    fontSize={16}
                    fontWeight={700}
                    css={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {meta_description ? meta_description : "Meta description bài viết"}
                </Box>
            </Flex>


            {/* meta_title */}
            <Flex
                mt={"25px"}
            >
                <Box
                    fontSize={16}
                    textAlign={"end"}
                    mr={5}
                    fontWeight={500}
                    color={"gray"}
                >
                    Meta title:
                </Box>
                <Box
                    fontSize={16}
                    fontWeight={700}
                    css={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {meta_title ? meta_title : "Meta title bài viết"}
                </Box>
            </Flex>



        </Box>
    );
};

export default ReviewAddPostManger;
