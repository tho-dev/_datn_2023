import { Flex, Link } from "@chakra-ui/layout";
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

type Props = {};

const TheHeader = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex h="20" alignItems="center">
      {/* Logo */}
      <Link to="/" as={ReactRouterLink}>
        <Image src={logo} w="42px" h="24px" />
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
            leftIcon={<PhoneIcon size={5} color="text.blue" strokeWidth={2} />}
          >
            1900.63.2574
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
            <Cart />
          </SlideFade>
          <Link
            to="/gio-hang"
            as={ReactRouterLink}
            w="44px"
            h="44px"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="bg.gray"
            rounded="full"
            position="relative"
            _after={{
              content: `"1"`,
              position: "absolute",
              right: 0,
              bottom: 6,
              w: "18px",
              h: "18px",
              display: "flex",
              fontSize: "12px",
              fontWeight: 600,
              justifyContent: "center",
              alignItems: "center",
              color: "text.white",
              rounded: "full",
              bgColor: "bg.red",
            }}
          >
            <CartIcon size={4} strokeWidth={2} color="text.black" />
          </Link>
        </Flex>
        {/* <Link
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
              name="Dan Abrahmov"
              src={avatar}
              width="100%"
              height="100%"
            />
          </Link> */}
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
      </Flex>
    </Flex>
  );
};

export default TheHeader;
