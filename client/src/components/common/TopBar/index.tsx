import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  Collapse,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import {
  BellIcon,
  CheveronUpIcon,
  ChevronDownIcon,
  DownArrowIcon,
  LogoutIcon,
  ShoppingCartIcon,
  UserIcon,
} from "~/components/common/Icons";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { logout } from "~/redux/slices/globalSlice";
import { openModal } from "~/redux/slices/scanSlice";

type Props = {};

const TopBar = ({}: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useAppSelector((state) => state.persistedReducer.global);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogoutUser = () => {
    dispatch(logout());
    dispatch(openModal());
    navigate("/");
    toast({
      title: "Thành công",
      duration: 1600,
      position: "bottom-right",
      status: "success",
      description: "Đã đăng xuất",
    });
  };
  return (
    <Flex w="full" _hover={{ bg: "bg.gray" }} rounded="md" cursor="pointer">
      <Flex
        gap="4"
        py="2"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        onClick={onToggle}
        flexDir={"column"}
        w="full"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap="4"
          w="full"
          p="2"
        >
          <Avatar
            name="ThinkPro"
            src={user.avatar}
            w="10"
            h="10"
            color="#12AFF0"
            fontSize="xs"
            bgColor="#12AFF033"
          />
          <Box color="text.black" fontSize="sm">
            <Text as="h3" fontWeight="semibold" lineHeight="1.2" fontSize="xs">
              Chào mừng {user.userName}
            </Text>
            <Text
              as="h5"
              fontSize="xs"
              lineHeight="1.2"
              textTransform="capitalize"
            >
              Vai trò: {user.role}
            </Text>
          </Box>
          <Flex flexDir="column" alignItems="center" justifyContent="center">
            <Flex as="span">
              <CheveronUpIcon size={4} color="bg.admin2" />
            </Flex>
            <Flex as="span">
              <ChevronDownIcon size={4} color="bg.admin2" />
            </Flex>
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Flex
            w="200px"
            p="3"
            mt="4"
            color="text.black"
            bg="bg.white"
            rounded="md"
            shadow="md"
            boxShadow="2xl"
            flexDir="column"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
            }}
          >
            <Button
              as={ReactRouterLink}
              to="profile"
              fontSize="sm"
              fontWeight="semibold"
              display="flex"
              justifyContent="flex-start"
              p="2"
              w="full"
              bg="none"
              color="black"
              _hover={{
                bg: "bg.gray",
              }}
              leftIcon={<UserIcon size={4} />}
            >
              Trang cá nhân
            </Button>
            {/* <Button
              as={ReactRouterLink}
              to="#"
              fontSize="sm"
              fontWeight="semibold"
              display="flex"
              justifyContent="flex-start"
              p="2"
              w="full"
              bg="none"
              color="black"
              _hover={{
                bg: "bg.gray",
              }}
              leftIcon={<ShoppingCartIcon size={4} />}
            >
              Trang người dùng
            </Button> */}
            <Button
              bg="none"
              color="black"
              fontSize="sm"
              fontWeight="semibold"
              display="flex"
              justifyContent="flex-start"
              p="2"
              w="full"
              _hover={{
                bg: "bg.gray",
              }}
              onClick={handleLogoutUser}
              leftIcon={<LogoutIcon size={4} />}
            >
              Đăng xuất
            </Button>
          </Flex>
        </Collapse>
      </Flex>
    </Flex>
  );
};

export default TopBar;
