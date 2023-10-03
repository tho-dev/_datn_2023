import { Box, Button, Flex, Input, Select, filter } from "@chakra-ui/react";
import { SearchAdminIcon } from "~/components/common/Icons";

type Props = {
};

const CategoryFilter = (props: Props) => {
  return (
    <Box   pb="6" gap="2" bgColor="bg.white" rounded="md">
       <Flex
          alignItems="center"
          justifyContent="space-around"
          bgColor="bg.white"
          rounded="4px"
          border="1px solid #e2e8f0"
          px="4"
          w={"35%"}
        >
          <Flex as="span" display="inline-flex" mt="1" mr={2} >
            <SearchAdminIcon size={5} />
          </Flex>
          <Input
            maxH="38px"
            border="none"
            px="0"
            placeholder="Tìm kiếm"
            // w="200px"
            maxW="full"
            _placeholder={{
              fontSize: "14",
            }}
          />
        </Flex>
    </Box>
  );
};

export default CategoryFilter;