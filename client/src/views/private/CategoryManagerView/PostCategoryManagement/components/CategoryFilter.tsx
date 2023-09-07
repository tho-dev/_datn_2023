import { Box, Button, Flex, Input, Select, filter } from "@chakra-ui/react";

type Props = {
};

const CategoryFilter = (props: Props) => {
  return (
    <Box px="5" pb="6" gap="2" bgColor="bg.white" rounded="md">
      <Flex gap={4} justifyContent={"end"}>
        <Input
          borderColor={"gray.200"}
          placeholder="Tìm kiếm..."
          w={"25%"}
        //   onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <Button bgColor={"cyan.400"} color={"white"} w={"10%"}>
          Lọc
        </Button>
      </Flex>
    </Box>
  );
};

export default CategoryFilter;