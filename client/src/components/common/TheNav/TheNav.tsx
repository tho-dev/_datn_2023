import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { FilterIcon, CloseSmallIcon } from "~/components/common/Icons";
import { Button, SlideFade, useDisclosure } from "@chakra-ui/react";
import TheMenu from "./components/TheMenu";
import Categories from "./components/Categories";
import thinkpro from "~/data/clone-thinkpro.json";
import { useAppSelector } from "~/redux/hook/hook";
import { RootState } from "~/redux/store";

type Props = {};

const TheNav = (props: Props) => {
	const { isOpen, onToggle } = useDisclosure();
	const { homeSettings } = useAppSelector((state: RootState) => state.persistedReducer.global);

	return (
		<>
			<Flex
				h="88px"
				py="3"
				gap="6"
				position="relative"
				alignItems="center"
				// bgGradient="linear-gradient(to top, rgb(11 203 224), #fff)"
			>
				<Box h="full">
					<Button
						h="full"
						px="3"
						color="text.black"
						rounded="lg"
						fontWeight="semibold"
						backgroundColor="bg.white"
						leftIcon={
							isOpen ? (
								<CloseSmallIcon
									size={6}
									color="text.black"
								/>
							) : (
								<FilterIcon
									size={6}
									color="text.black"
								/>
							)
						}
						_hover={{
							backgroundColor: "bg.gray",
						}}
						onClick={onToggle}
					>
						Danh mục
					</Button>
				</Box>
				{/* Menu */}
				<SlideFade
					in={true}
					offsetY="16px"
					style={{
						position: "absolute",
						zIndex: -1,
						top: 100,
						width: "100%",
						visibility: isOpen ? "visible" : "hidden",
					}}
				>
					<TheMenu items={homeSettings?.category?.items} />
				</SlideFade>
				{/* Danh mục */}
				<Categories items={homeSettings?.category?.items} />
			</Flex>
		</>
	);
};

export default TheNav;
