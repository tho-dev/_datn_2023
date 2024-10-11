import React, { useState } from "react";
import { NavLink as ReactRouterLink, useLocation } from "react-router-dom";
import { Link, Image, Collapse, useDisclosure, Icon } from "@chakra-ui/react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { ChevronDownIcon } from "~/components/common/Icons";

type Props = {
  title?: any;
  index?: number;
  isCheck?: boolean;
  handleClick?: any;
  children: any;
};

const SideBarItem = ({
  title,
  index,
  isCheck,
  handleClick,
  children,
}: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Box
        my="2"
        py="2"
        display="flex"
        alignItems="center"
        transition="all 0.25s ease"
        cursor="pointer"
        justifyContent="space-between"
        bgColor={isCheck ? "#12AFF033" : "transparent"}
        _hover={{
          textDecor: "none",
          backgroundColor: "#12AFF033",
        }}
        onClick={() => {
          handleClick(index as any);
          onToggle();
        }}
        borderBottom="2px solid gray"
      >
        <Flex
          gap="3"
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          <Text
            fontSize="md"
            lineHeight="0.5"
            fontWeight="bold"
            color={"black"}
          >
            {title}
          </Text>
        </Flex>
        <Flex
          as="span"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          transition="all 0.25s ease"
          transform={isOpen ? "rotateZ(360deg)" : "rotateZ(270deg)"}
          display="flex"
        >
          <ChevronDownIcon size={6} strokeWidth={0.5} color={"black"} />
        </Flex>
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Flex gap="1" flexDir="column">
          {children}
        </Flex>
      </Collapse>
    </>
  );
};

export default SideBarItem;
