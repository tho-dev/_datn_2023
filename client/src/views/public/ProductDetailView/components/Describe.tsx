import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Flex,
  Box,
  Image,
  Heading,
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";

type Props = {
  image: any;
  description: string;
};

const Describe = ({ image, description }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState<any>("inside");
  const btnRef = useRef(null);

  return (
    <Box mb={"2"} maxH="300px">
      <Box>
        <Text as={"h5"} fontSize={"lg"} fontWeight={"600"}>
          Bài viết mô tả
        </Text>
      </Box>
      <Box position={"relative"}>
        <Box w="full" h="full">
          <Image
            w="full"
            h="full"
            maxH="200px"
            src={image?.url}
            objectFit="cover"
          />
        </Box>
        <Box
          w="100%"
          h="100px"
          bgGradient="linear(1turn,#fff 25.58%,hsla(0,0%,100%,0) 181.4%)"
          position={"absolute"}
          top={"140px"}
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
        <Box dangerouslySetInnerHTML={{ __html: description }}></Box>
      </DialogThinkPro>
    </Box>
  );
};

export default Describe;
