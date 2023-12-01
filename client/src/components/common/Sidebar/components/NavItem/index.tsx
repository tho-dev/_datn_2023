import { NavLink as ReactRouterLink } from "react-router-dom";
import { Link, Collapse, useDisclosure } from "@chakra-ui/react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { ChevronDownIcon } from "~/components/common/Icons";

type Props = {
  item?: any;
  index?: number;
  isCheck?: boolean;
  handleClick?: any;
};

const NavItem = ({ item, index, isCheck, handleClick }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const Icon = item?.icon;

  const CheckComponent = item?.children?.length > 0 ? Box : (Link as any);

  return (
    <>
      <CheckComponent
        as={item?.children?.length > 0 ? "div" : ReactRouterLink}
        to={item?.children?.length > 0 ? "/" : item?.to}
        py="4"
        px="4"
        maxH="44px"
        rounded="8px"
        display="flex"
        alignItems="center"
        transition="all 0.25s ease"
        cursor="pointer"
        justifyContent={{
          sm: "center",
          md: "center",
          lg: "space-between",
          xl: "space-between",
          "2xl": "space-between",
        }}
        group="role"
        _hover={{
          textDecor: "none",
        }}
        onClick={() => {
          handleClick(index as any);
          item?.children?.length > 0 && onToggle();
        }}
        bgColor={isCheck ? "bg.bgPro" : "transparent"}
      >
        <Flex
          gap="3"
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          <Flex as="span" justifyContent="center" alignItems="center">
            <Icon size="5" color={isCheck ? "#0bcbe0" : "#637381"} />
          </Flex>
          <Text
            fontSize="13px"
            lineHeight="0.5"
            fontWeight="semibold"
            color={isCheck ? "#0bcbe0" : "#637381"}
            display={{
              sm: "none",
              md: "none",
              lg: "block",
              xl: "block",
              "2xl": "block",
            }}
          >
            {item?.title}
          </Text>
        </Flex>
        {item?.children?.length > 0 && (
          <Flex
            as="span"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            transition="all 0.25s ease"
            transform={isOpen ? "rotateZ(360deg)" : "rotateZ(270deg)"}
            display={{
              sm: "none",
              md: "none",
              lg: "flex",
              xl: "flex",
              "2xl": "flex",
            }}
          >
            <ChevronDownIcon size={4} strokeWidth={1} color="#637381" />
          </Flex>
        )}
      </CheckComponent>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          gap="1"
          px="2"
          py="1"
          rounded="8px"
          flexDir="column"
          bgColor="#ffffff"
        >
          {item?.children?.map((item: any, index: number) => (
            <Link
              as={ReactRouterLink}
              to={item?.to}
              key={index}
              gap="3"
              py="3"
              px="4"
              maxH="9"
              w="full"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize="13px"
              fontWeight="semibold"
              color="#637381"
              _hover={{
                textDecor: "none",
              }}
            >
              <Box w="3px" h="3px" rounded="full" bgColor="#637381" />
              <Text flex="1" ml="2">
                {item?.title}
              </Text>
            </Link>
          ))}
        </Flex>
      </Collapse>
    </>
  );
};

export default NavItem;
