import { Box, Flex, Text } from "@chakra-ui/layout";
import { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";

const RenderThumbnailItem = (
  props: RenderThumbnailItemProps,
  setPageIndex: any
) => {
  return (
    <Flex key={props.key} gap="4" alignItems={"center"} w="100%">
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        border={`${props.currentPage === props.pageIndex && "4px solid gray"}`}
        mb="1"
        w="full"
        cursor={"pointer"}
        rounded={"md"}
      >
        <Box
          onClick={() => {
            props.onJumpToPage();
            setPageIndex(props.pageIndex);
          }}
        >
          {props.renderPageThumbnail}
        </Box>
        <Text fontSize={"md"}>Page {props.renderPageLabel}</Text>
      </Flex>
    </Flex>
  );
};
export default RenderThumbnailItem;
