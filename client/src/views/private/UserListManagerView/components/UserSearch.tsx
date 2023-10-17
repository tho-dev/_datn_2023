import { Grid, GridItem, Flex } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  PlusCircleIcon,
  SearchAdminIcon,
  SearchIcon,
} from "~/components/common/Icons";
import { Input } from "@chakra-ui/input";
import { Button, Select } from "@chakra-ui/react";

type Props = {
  search: string;
  handleSearched: (e: any) => void;
};

const UserSearch = ({ search, handleSearched }: Props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" mb="6">
      <Flex
        px="4"
        rounded="4px"
        alignItems="center"
        borderWidth="1px"
        borderColor="#e9ebec"
      >
        <Flex as="span" alignItems="center" justifyContent="center">
          <SearchIcon size={5} color="text.black" strokeWidth={1} />
        </Flex>
        <Input
          border="none"
          padding="0.6rem 0.9rem"
          fontSize="15"
          fontWeight="medium"
          lineHeight="1.5"
          w="260px"
          placeholder="Tài khoản..."
          value={search}
          onChange={handleSearched}
        />
      </Flex>
      <Button
        leftIcon={<PlusCircleIcon size={5} color="text.white" />}
        px="4"
        lineHeight="2"
        bgColor="bg.green"
        as={ReactRouterLink}
        to="add"
        _hover={{ bgColor: "green" }}
      >
        Tạo Mới
      </Button>
    </Flex>
  );
};

export default UserSearch;
