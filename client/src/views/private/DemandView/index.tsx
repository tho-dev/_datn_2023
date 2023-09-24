import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import TableThinkPro from "~/components/TableThinkPro";
import ConfirmThinkPro from "~/components/ConfirmThinkPro";
import Demand from "./components/Demand";
import { useState } from "react";

type Props = {};

const DemandView = (props: Props) => {
    const columnHelper = createColumnHelper<any>();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [formValues, setFormValues] = useState(undefined)

    const columns = [
        columnHelper.accessor("#", {
            cell: (data) => {
                const index = data.row.index;
                return index + 1;
            },
            header: "#",
        }),
        columnHelper.accessor("id", {
            cell: (data) => {
                return <h1>{data.getValue()}</h1>;
            },
            header: "ID",
        }),
        columnHelper.accessor("name", {
            cell: (data) => data.getValue(),
            header: "Nhu cầu",
        }),
        columnHelper.accessor("action", {
            cell: (data) => {
                return (
                    <Menu>
                        <MenuButton
                            fontSize="sm"
                            fontWeight="bold"
                            w="5"
                            h="5"
                            rounded="sm"
                            alignItems="center"
                            justifyContent="center"
                            color="text.admin2"
                            bgColor="#f1f4f9"
                            css={{
                                "& span": {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: "-8px",
                                },
                            }}
                        >
                            ...
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onOpen}>Xóa</MenuItem>
                            <MenuItem onClick={() => setFormValues(data.row.original)}>Cập nhật</MenuItem>
                        </MenuList>
                    </Menu>
                );
            },
            header: "Action",
        }),
    ];
    const fakeData = [
        {
            id: 1,
            name: "Văn phòng, học tập",
        },
        {
            id: 2,
            name: "2D Design",
        },
        {
            id: 3,
            name: "3D Design",
        },
        {
            id: 4,
            name: "Hok lập trình",
        },
    ];
    return (
        <Box w="full" h="full">
            <Heading as="h1" fontSize={24} textTransform="uppercase">
                <Text>Quản lí nhu cầu</Text>
            </Heading>
            <Flex>
                <Box
                    w={{
                        sm: "100%",
                        lg: "25%",
                    }}
                    bgColor="bg.white"
                    mt="6"
                    p="6"
                    gap={4}
                >
                    <Demand data={formValues} />
                </Box>
                <Box
                    w={{
                        sm: "100%",
                        lg: "75%",
                    }}
                    bgColor="bg.white"
                    mt="6"
                    p="6"
                >
                    <TableThinkPro columns={columns} data={fakeData} />
                </Box>
            </Flex>
            <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export default DemandView;
