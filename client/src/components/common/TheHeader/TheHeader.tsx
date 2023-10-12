import { Box, Flex, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import logo from "~/assets/images/logo-thinkpro.svg";
import Search from "./components/Search";
import { Button, SlideFade, useDisclosure, Avatar } from "@chakra-ui/react";
import {
  PhoneIcon,
  PhonesIcon,
  NewIcon,
  MapIcon,
  CartIcon,
  UserIcon,
} from "../Icons";
import Cart from "./components/Cart";
import { useAppSelector } from "~/redux/hook/hook";
import { useGetCartQuery } from "~/redux/api/cart";

type Props = {};

const TheHeader = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  if (isError) {
    return <Box>isError...</Box>;
  }
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
          lg: "space-between",
        }}
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
            leftIcon={<MapIcon size={5} color="text.blue" strokeWidth={2} />}
          >
            Địa chỉ cửa hàng
          </Button>
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
            leftIcon={<PhonesIcon size={5} color="text.blue" strokeWidth={2} />}
          >
            Khiếu nại
          </Button>
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
            <Cart data={data ? data?.data : []} />
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
          <Link
            to="/thong-tin"
            as={ReactRouterLink}
            w="44px"
            h="44px"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="bg.gray"
            rounded="full"
            position="relative"
            border="1px solid #ccc"
          >
            <Avatar
              name={user?.first_name + " " + user?.last_name}
              src={user?.avatar}
              width="100%"
              height="100%"
            />
          </Link>
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
