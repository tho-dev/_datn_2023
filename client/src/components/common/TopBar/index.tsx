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

type Props = {
  data_notification: any;
  handleChangeStatusNoti: (status: any) => void;
};

const TopBar = ({ data_notification, handleChangeStatusNoti }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useAppSelector((state) => state.persistedReducer.global);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogoutUser = () => {
    dispatch(logout());
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
    <Flex
      w={{
        sm: "calc(100% - 86px)",
        md: "calc(100% - 86px)",
        lg: "calc(100% - 260px)",
        xl: "calc(100% - 260px)",
        "2xl": "calc(100% - 260px)",
      }}
      maxH={{
        sm: "64px",
        md: "64px",
        lg: "86px",
        xl: "86px",
        "2xl": "86px",
      }}
      h="100%"
      pl="6"
      pr="8"
      transition="all 0.25s ease"
      borderBottomWidth="1px"
      borderColor="bg.admin1"
      backgroundColor="bg.white"
      position="fixed"
      top="0"
      zIndex="100"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex
        as="span"
        mr="8"
        cursor="pointer"
        transform="rotateZ(90deg)"
        display={{
          sm: "none",
          md: "none",
          lg: "flex",
          xl: "flex",
          "2xl": "flex",
        }}
      ></Flex>
      <Flex gap="5" alignItems="center" justifyContent="center">
        <Popover>
          <PopoverTrigger>
            <Flex
              as="span"
              alignItems="center"
              justifyContent="center"
              position="relative"
              cursor="pointer"
              _after={{
                content: `"${
                  data_notification?.filter((item: any) => !item.status)
                    .length || 0
                }"`,
                position: "absolute",
                top: "-6px",
                right: "-4px",
                w: "14px",
                h: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                rounded: "full",
                color: "text.white",
                fontSize: "9px",
                fontWeight: "600",
                backgroundColor: "#F47690",
                border: "2px solid #fff",
              }}
            >
              <BellIcon size={6} color="text.admin2" />
            </Flex>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Text fontSize="14px" fontWeight="bold">
                Thông báo
              </Text>
              <Flex gap={4} my={2}>
                <Button
                  rounded={"md"}
                  fontSize="12px"
                  px={2}
                  py={0}
                  h="30px"
                  bg={"bg.gray"}
                  color={"black"}
                  fontWeight="semibold"
                  _active={{ bg: "gray.300" }}
                  onClick={() => {
                    handleChangeStatusNoti(null);
                  }}
                >
                  Tất cả
                </Button>
                <Button
                  rounded={"md"}
                  fontSize="12px"
                  px={2}
                  py={0}
                  h="30px"
                  bg={"bg.gray"}
                  color={"black"}
                  fontWeight="semibold"
                  _active={{ bg: "gray.300" }}
                  onClick={() => {
                    handleChangeStatusNoti(false);
                  }}
                >
                  Chưa đọc
                </Button>
              </Flex>
            </PopoverHeader>
            <PopoverBody>
              <Box maxH={"300px"} overflow="auto">
                {data_notification.length > 0 ? (
                  data_notification.map((item: any, index: number) => {
                    return (
                      <Flex
                        to={`${item?.link}`}
                        as={ReactRouterLink}
                        key={index}
                        rounded={"md"}
                        gap={4}
                        alignItems="center"
                        padding="2px"
                        my={1}
                        transition="all .8s ease"
                        bgColor={item.status ? "bg.white" : "bg.gray"}
                        _hover={{
                          transform: "translateY(-5px)",
                          bgColor: "gray.200",
                        }}
                      >
                        <Avatar src="https://bit.ly/dan-abramov" size={"sm"} />
                        <Flex flexDirection={"column"}>
                          <Text fontSize={"14px"} fontWeight="semibold">
                            Hệ thống
                          </Text>
                          <Text fontSize={"12px"} fontWeight="semibold">
                            {item.message}
                          </Text>
                        </Flex>
                      </Flex>
                    );
                  })
                ) : (
                  <Text>Bạn chưa có thông báo nào</Text>
                )}
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Box h="8">
          <Divider orientation="vertical" />
        </Box>
        <Flex
          gap="4"
          px="4"
          py="2"
          alignItems="center"
          justifyContent="center"
          position="relative"
          rounded="md"
          onClick={onToggle}
          _hover={{ bg: "bg.gray" }}
          cursor="pointer"
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
            <Text as="h3" fontWeight="semibold" lineHeight="1.2">
              Chào mừng {user.userName}
            </Text>
            <Text
              as="h5"
              fontSize="xs"
              lineHeight="1.2"
              textTransform="capitalize"
            >
              Admin
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

          <Collapse
            in={isOpen}
            animateOpacity
            style={{
              position: "absolute",
              right: 0,
              top: 52,
            }}
          >
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
              <Button
                as={ReactRouterLink}
                to="/"
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
              </Button>
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
    </Flex>
  );
};

export default TopBar;
