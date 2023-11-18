import { Box, Divider, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { useAppSelector } from "~/redux/hook/hook";


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
    const { user } = useAppSelector((state) => state.persistedReducer.global);


    return (
        <Box
            bgColor="white"
            my={4}
            padding="16px 24px"
            borderRadius={6}
            w={"100%"}
            boxShadow="lg"
            p={"0px 80px 30px 80px"}
        >

            {/* title */}
            <Box
                fontSize={"2xl"}
                fontWeight={"bold"}
                py={3}
            >
                {title ? title : "Tiêu đề bài viết"}
            </Box>

            <Divider />
            <Box color="text.black" fontSize="sm" my={3}>
                <Text as="h3" fontWeight="black" lineHeight="1.2">
                    {user.first_name + " " + user.last_name}
                </Text>
            </Box>
            <Divider />


            {/* description */}
            <Flex
                py={5}
            >
                <Box fontSize={"larger"}>//</Box>
                <Box
                    // mt={"10px"}
                    fontSize={"larger"}
                    fontWeight={"medium"}
                    as="cite"
                    dangerouslySetInnerHTML={{ __html: description || "Bài viết của bạn" }}
                >

                </Box>
            </Flex>

            {/* content */}
            <Box
                mt={"25px"}
                py={3}
                fontSize={"larger"}
                fontWeight={"medium"}
                dangerouslySetInnerHTML={{ __html: content || "Nội dung bài viết" }}
            >

            </Box>

            {/* Image */}
            <Image
                justifyContent="center"
                m={"0px 35%"}
                w="300px"
                h="250px"
                alt="Dan Abramov"
                src={thumbnail ? thumbnail.url : "https://lapcity.vn/wp-content/uploads/2021/07/dell-xps-voi-man-hinh-4k.jpg"}
                objectFit="cover"
            />
 

            {/* meta_keyword */}
            <Box
                py={3}
                fontSize={"larger"}
                fontWeight={"medium"}
                dangerouslySetInnerHTML={{ __html: meta_keyword || "Meta keyword bài viết" }}
            >

            </Box>




            {/* meta_description */}
            <Box
                py={3}
                fontSize={"larger"}
                fontWeight={"medium"}
                dangerouslySetInnerHTML={{ __html: meta_description || "Meta description bài viết" }}
            >

            </Box>


            {/* meta_title */}
            <Box
                py={3}
                fontSize={"larger"}
                fontWeight={"medium"}
                dangerouslySetInnerHTML={{ __html: meta_title || "Meta title bài viết" }}
            >

            </Box>



        </Box>
    );
};

export default ReviewAddPostManger;
