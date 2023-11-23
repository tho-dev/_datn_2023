import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  UnorderedList,
  ListItem,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link as ReactRouterLink } from "react-router-dom";
import notfound from "~/assets/images/notfound.svg";

const NotFoundView = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Có lỗi xảy ra với trang bạn yêu cầu</title>
      </Helmet>
      <Flex
        w="full"
        h="100vh"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        bgColor="bg.gray"
      >
        <Center>
          <Box w="343px" h="343px">
            <Image src={notfound} w="full" h="full" objectFit="cover" />
          </Box>
        </Center>
        <Box mt="4">
          <Center>
            <Heading as="h3" fontSize="18px">
              Có lỗi xảy ra với trang bạn yêu cầu
            </Heading>
          </Center>
          <Text fontSize="sm" mt="4">
            Một số nguyên nhân phổ biến:
          </Text>
          <UnorderedList fontSize="sm">
            <ListItem>
              Các kỹ sư ThinkPro đang thực hiện bảo trì trang, bạn có thể thử
              truy cập lại sau
            </ListItem>
            <ListItem>
              Thanh URL bị gõ nhầm một ký tự nào đó (bạn thử check lại xem nhé)
            </ListItem>
            <ListItem>Trang đã bị gỡ khỏi hệ thống</ListItem>
          </UnorderedList>
          <Center mt="8">
            <Button w="200px" fontSize="md" bgColor="bg.blue" rounded="md">
              <Link as={ReactRouterLink} to="/">
                Về trang chủ
              </Link>
            </Button>
          </Center>
        </Box>
      </Flex>
    </HelmetProvider>
  );
};

export default NotFoundView;
