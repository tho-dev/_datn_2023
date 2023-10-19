import { Box, Flex, Link } from "@chakra-ui/layout";
import { Collapse, Image } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import logo from "~/assets/images/logo-thinkpro.svg";
import Search from "./components/Search";
import { Button, SlideFade, useDisclosure, Avatar } from "@chakra-ui/react";
import {
  NewIcon,
  CartIcon,
  UserIcon,
  LogoutIcon,
  DashboardIcon,
} from "../Icons";
import Cart from "./components/Cart";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { useGetCartQuery } from "~/redux/api/cart";
import { useLogoutUserMutation } from "~/redux/api/user";
import { removeCart } from "~/redux/slices/cartSlice";
import { logout } from "~/redux/slices/globalSlice";

type Props = {};

const TheHeader = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenUser, onToggle: onToggleUser } = useDisclosure();
  const { user, isLogin } = useAppSelector(
    (state) => state.persistedReducer.global
  );
  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);

  const {
    data: data,
    isFetching,
    isLoading,
    isError,
  } = useGetCartQuery(cart_id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  if (isFetching) {
    return <Box>isFetching...</Box>;
  }
  if (isLoading) {
    return <Box>isLoading...</Box>;
  }
  if (isError) {
    return <Box>isError...</Box>;
  }
  const handleLogOut = () => {
    logoutUser(user).then(() => {
      dispatch(logout());
      dispatch(removeCart(""));
      navigate("/");
    });
  };
  return (
    <Flex h="20" alignItems="center">
      {/* Logo */}
      <Link to="/" as={ReactRouterLink}>
        <Image src={logo} w="100px" h="64px" objectFit="contain" />
      </Link>
      {/* Tìm kiếm */}
      <Search />

      {/* Liên hệ */}
      <Flex
        flex="1"
        ml={{
          sm: 4,
          lg: 6,
        }}
        justifyContent={{
          sm: "flex-end",
          lg: "flex-end",
        }}
        gap={4}
      >
        <Flex
          gap="3"
          display={{
            sm: "none",
            lg: "flex",
          }}
          justifyContent="space-between"
        >
          <Link
            to="/lich-su-mua-hang"
            as={ReactRouterLink}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              h="45px"
              px="4"
              bgColor="bg.white"
              transition="all 0.25s ease"
              color="text.black"
              fontWeight="semibold"
              _hover={{
                bgColor: "bg.gray",
              }}
              leftIcon={<CartIcon size={5} color="text.blue" strokeWidth={2} />}
            >
              Tra cứu đơn hàng
            </Button>
          </Link>

          <Link
            to="/tin-tuc"
            as={ReactRouterLink}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              h="45px"
              px="4"
              bgColor="bg.white"
              transition="all 0.25s ease"
              color="text.black"
              fontWeight="semibold"
              _hover={{
                bgColor: "bg.gray",
              }}
              leftIcon={<NewIcon size={5} color="text.blue" strokeWidth={2} />}
            >
              Tin công nghệ
            </Button>
          </Link>
        </Flex>
        <Flex
          gap="2"
          position="relative"
          onMouseLeave={onClose}
          onMouseOut={onOpen}
        >
          <SlideFade
            in={true}
            offsetY="20px"
            style={{
              position: "absolute",
              right: 0,
              top: 46,
              zIndex: 9999,
              display: isOpen ? "flex" : "none",
            }}
          >
            <Cart data={data && data?.data} />
          </SlideFade>
          <Box
            w="44px"
            h="44px"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="bg.gray"
            rounded="full"
            position="relative"
          >
            <Box
              position="absolute"
              right={0}
              bottom={6}
              width="18px"
              height="18px"
              display="flex"
              fontSize="12px"
              fontWeight="bold"
              justifyContent="center"
              alignItems="center"
              color="white"
              rounded="full"
              bgColor="red"
            >
              {data?.data.products.length || 0}
            </Box>
            <CartIcon size={4} strokeWidth={2} color="text.black" />
          </Box>
        </Flex>
        {isLogin ? (
          <>
            <Flex
              gap="4"
              alignItems="center"
              justifyContent="center"
              position="relative"
              rounded="full"
              _hover={{ bg: "bg.gray" }}
              cursor="pointer"
              onClick={onToggleUser}
            >
              <Avatar
                name={user?.first_name + " " + user?.last_name}
                src={user?.avatar}
                w="12"
                h="12"
                color="#12AFF0"
                fontSize="xs"
                bgColor="#12AFF033"
                border="1px solid #ccc"
              />
              <Collapse
                in={isOpenUser}
                animateOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 52,
                  zIndex: 999,
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
                  {user.role !== "customer" && (
                    <Button
                      as={ReactRouterLink}
                      to="/admin"
                      fontSize="sm"
                      fontWeight="semibold"
                      display="flex"
                      p="2"
                      w="full"
                      bg="none"
                      color="black"
                      _hover={{
                        bg: "bg.gray",
                      }}
                      leftIcon={<DashboardIcon size={4} />}
                    >
                      Trang quản trị
                    </Button>
                  )}
                  <Button
                    as={ReactRouterLink}
                    to="/thong-tin"
                    fontSize="sm"
                    fontWeight="semibold"
                    display="flex"
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
                    bg="none"
                    color="black"
                    fontSize="sm"
                    fontWeight="semibold"
                    display="flex"
                    p="2"
                    w="full"
                    _hover={{
                      bg: "bg.gray",
                    }}
                    leftIcon={<LogoutIcon size={4} />}
                    onClick={handleLogOut}
                  >
                    Đăng xuất
                  </Button>
                </Flex>
              </Collapse>
            </Flex>
          </>
        ) : (
          <Link
            to="/dang-nhap"
            as={ReactRouterLink}
            w="44px"
            h="44px"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="bg.gray"
            rounded="full"
            position="relative"
          >
            <UserIcon size={5} strokeWidth={2} color="text.black" />
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default TheHeader;
