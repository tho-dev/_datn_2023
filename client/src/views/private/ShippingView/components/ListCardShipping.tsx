import { Box, Flex } from "@chakra-ui/layout";
import CardShipping from "./CardShipping";

type Props = {
  items: any;
  handleViewOrderDetail: (orderId: string) => void;
};

const ListCardShipping = ({ items, handleViewOrderDetail }: Props) => {
  return (
    <Flex
      maxHeight="100vh"
      padding={4}
      flexDirection="column"
      gap={4}
      overflow="auto"
    >
      {items.length > 0 ? (
        items.map((item: any) => {
          return (
            <Box key={item._id}>
              <CardShipping
                item={item}
                handleViewOrderDetail={handleViewOrderDetail}
              />
            </Box>
          );
        })
      ) : (
        <Box>Không tìm thấy đơn hàng</Box>
      )}
    </Flex>
  );
};

export default ListCardShipping;
