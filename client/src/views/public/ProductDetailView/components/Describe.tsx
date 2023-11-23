import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DialogThinkPro from "~/components/DialogThinkPro";

type Props = {
  image: any;
  description: string;
};

const Describe = ({ image, description }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(image);

  return (
    <Box mb={"2"} maxH="300px">
      <Box>
        <Text as={"h5"} fontSize={"lg"} fontWeight={"600"} mb="4">
          Bài viết mô tả
        </Text>
      </Box>
      <Box position={"relative"}>
        <Box w="full" h="full">
          <Box
            h="200px"
            maxH="full"
            css={{
              display: "-webkit-box",
              WebkitLineClamp: 10,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            __css={{
              "& img": {
                mx: "auto",
                my: 5,
                rounded: "6px",
                objectFit: "contain",
              },
              "& h1, h2, h3, h4": {
                my: 2,
                fontWeight: 600,
                fontSize: "16px",
              },
              "& p, span, li, a": {
                fontWeight: 500,
              },
              "& li": {
                listStyle: "none",
              },
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          ></Box>
        </Box>
        <Box
          w="100%"
          h="100px"
          top="140px"
          bgGradient="linear(1turn,#fff 25.58%,hsla(0,0%,100%,0) 181.4%)"
          position={"absolute"}
          textAlign={"center"}
          alignItems={"center"}
        />
        <Flex textAlign={"center"} justifyContent={"center"}>
          <Button
            bg={"white"}
            color={"text.blue"}
            fontWeight={"bold"}
            onClick={onOpen}
          >
            Xem Thêm
          </Button>
        </Flex>
      </Box>

      {/* Model bài viết */}
      <DialogThinkPro
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="4xl"
        title={<Heading fontSize="xl">Bài viết mô tả</Heading>}
      >
        <Box
          dangerouslySetInnerHTML={{ __html: description }}
          __css={{
            "& img": {
              mx: "auto",
              my: 5,
              rounded: "6px",
              objectFit: "contain",
            },
            "& h1, h2, h3, h4": {
              my: 2,
              fontWeight: 600,
              fontSize: "20px",
            },
            "& p, span, li, a": {
              fontWeight: 500,
            },
            "& li": {
              listStyle: "none",
            },
          }}
        ></Box>
      </DialogThinkPro>
    </Box>
  );
};

export default Describe;
