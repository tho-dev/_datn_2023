import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import SelectThinkPro from "~/components/SelectThinkPro";
import { PlusCircleIcon, SearchIcon } from "~/components/common/Icons";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  search: string;
  handleSearched: (e: any) => void;
  setFilter: any;
};

const UserSearch = ({ search, handleSearched, setFilter }: Props) => {
  const { control, watch } = useForm();
  const role = watch("role") || "";
  const verified = watch("verified") || "";

  useEffect(() => {
    setFilter({ role: role?.value, verified: verified?.value });
  }, [role, verified]);
  return (
    <Flex alignItems="center" justifyContent="space-between" mb="6">
      <Flex gap="4" w="60%">
        <Box flex="1">
          <SelectThinkPro
            control={control}
            name="role"
            title=""
            placeholder="-- Chọn quyền --"
            data={[
              {
                label: "Quản trị viên",
                value: "admin",
              },
              {
                label: "Khách hàng",
                value: "customer",
              },
              {
                label: "Quản lý",
                value: "manager",
              },
              {
                label: "Chuyên gia",
                value: "expert",
              },
            ]}
          />
        </Box>

        <Box flex="1">
          <SelectThinkPro
            control={control}
            name="verified"
            title=""
            placeholder="-- Trạng thái --"
            data={[
              {
                label: "Đã xác thực",
                value: true,
              },
              {
                label: "Chưa xác thực",
                value: false,
              },
            ]}
          />
        </Box>

        <Flex
          flex="2"
          px="4"
          rounded="8px"
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
            placeholder="Tìm kiếm tài khoản"
            onChange={handleSearched}
            value={search}
          />
        </Flex>
      </Flex>
      <Flex flex="1" justifyContent="flex-end">
        <Button
          leftIcon={<PlusCircleIcon size={5} color="text.textSuccess" />}
          px="4"
          lineHeight="2"
          color="text.textSuccess"
          bgColor="bg.bgSuccess"
          as={ReactRouterLink}
          to="add"
        >
          Tạo Mới
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserSearch;
