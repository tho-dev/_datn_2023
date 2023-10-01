import { GridItem, Flex, Heading, Box, Text } from "@chakra-ui/layout"; 

type Props = {
  heading: string;
  text: string;
  icon: any;
  color: string;
};

const OrderDetailMetricItem = ({ heading, text, icon, color }: Props) => {
  return (
    <GridItem
      borderWidth={{
        sm: "0",
        md: "0",
        lg: "1px",
        xl: "1px",
        "2xl": "1px",
      }}
      minH={"20"}
      borderColor="#F1F4F9"
      rounded="md"
      bgColor={color + ".50"}
      transition="all .8s ease"
      _hover={{
        transform: "translateY(-10px)",
        bgColor: "gray.200",
      }}
    >
      <Flex padding={5} justifyContent="space-between" gap={4}>
        <Box>
          <Heading as="h3" fontSize="18" my="2">
            {heading}
          </Heading>
          <Flex gap="1" alignItems="center">
            <Text fontSize="15" fontWeight="semibold">
              {text}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex
            p={4}
            rounded="md"
            bgColor={color + ".100"}
            justifyContent="start"
          >
            {icon}
          </Flex>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default OrderDetailMetricItem;
