import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Input, useDisclosure } from "@chakra-ui/react";
import { SearchIcon, PlusCircleIcon } from "~/components/common/Icons";
import BrandList from "./components/BrandList";
import DialogThinkPro from "~/components/DialogThinkPro";
import ActionBrand from "./components/ActionBrand";

type Props = {};

const BrandView = (props: Props) => {
    const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();

    return (
        <Box
            bgColor="bg.white"
            px="6"
            py="8"
            rounded="md"
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                pb="5"
            >
                <Heading
                    as="h2"
                    fontSize="18"
                >
                    Thương Hiệu
                </Heading>
                <Box>
                    <Breadcrumb
                        spacing="8px"
                        separator="/"
                        fontSize="sm"
                    >
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                to="/admin"
                            >
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href="thuong-hieu">Thương hiệu</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Box>
            </Flex>
            <Flex
                alignItems="center"
                justifyContent="space-between"
                mb="6"
            >
                <Flex
                    px="4"
                    rounded="4px"
                    alignItems="center"
                    borderWidth="1px"
                    borderColor="#e9ebec"
                >
                    <Flex
                        as="span"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <SearchIcon
                            size={5}
                            color="text.black"
                            strokeWidth={1}
                        />
                    </Flex>
                    <Input
                        border="none"
                        padding="0.6rem 0.9rem"
                        fontSize="15"
                        fontWeight="medium"
                        lineHeight="1.5"
                        w="260px"
                        placeholder="Thương hiệu..."
                    />
                </Flex>
                <Button
                    leftIcon={
                        <PlusCircleIcon
                            size={5}
                            color="text.white"
                        />
                    }
                    px="4"
                    lineHeight="2"
                    bgColor="bg.green"
                    onClick={onOpenDialog}
                >
                    Tạo Mới
                </Button>
            </Flex>

            {/* Danh sách */}
            <BrandList />

            {/* Form */}
            <DialogThinkPro
                isOpen={isOpenDialog}
                onClose={onCloseDialog}
                isCentered
                title={<Heading fontSize="18">Tạo mới thương hiệu</Heading>}
            >
                <ActionBrand onClose={onCloseDialog} />
            </DialogThinkPro>
        </Box>
    );
};

export default BrandView;