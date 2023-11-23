import { GridItem, Flex, Heading, Box } from "@chakra-ui/layout";

type Props = {
  heading?: string;
  text?: string;
  icon?: any;
  color?: string;
  phone?: string;
  children?: React.ReactNode;
};

const OrderDetailMetricItem = ({ heading, icon, color, children }: Props) => {
  return (
    <GridItem
      w="full"
      borderWidth={{
        sm: "0",
        md: "0",
        lg: "1px",
        xl: "1px",
        "2xl": "1px",
      }}
      minH={"20"}
      p="5"
      rounded="xl"
      borderColor="#eef1f6"
      boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
      transition="all .8s ease"
      _hover={{
        transform: "translateY(-10px)",
      }}
    >
      <Flex gap={2}>
        <Flex gap="2" flex="1" flexDir="column" justifyContent="space-between">
          <Heading fontSize="sm" fontWeight="bold" textTransform="uppercase">
            {heading}
          </Heading>

          <Box>{children}</Box>
        </Flex>

        <Box>
          <Flex p="3" rounded="md" bgColor={color} justifyContent="start">
            {icon}
          </Flex>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default OrderDetailMetricItem;
