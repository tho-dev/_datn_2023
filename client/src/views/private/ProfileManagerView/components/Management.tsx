import {
    Box,
    Text,
    Divider,
    Flex,
    Grid,
    GridItem,
    Checkbox,
    Select,
    Button,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { AppIcon, ChromeIcon, ComputerIcon, EmailIcon, GlobeIcon, LaptopIcon, SmartPhoneIcon } from "~/components/common/Icons";
import TableThink from ".";

type Props = {};

const Management = (props: Props) => {
    const columnHelper = createColumnHelper<any>();

    const columns = [
        columnHelper.accessor("browser", {
            cell: (data) => (
                <>
                    <ChromeIcon size={5} /> {data.getValue()}
                </>
            ),
            header: "BROWSER",
        }),
        columnHelper.accessor("device", {
            cell: (data) => {
                const deviceType = data.getValue();
                let IconComponent;

                switch (deviceType) {
                    case "Laptop":
                        IconComponent = LaptopIcon;
                        break;
                    case "Phone":
                        IconComponent = SmartPhoneIcon;
                        break;
                    case "Computer":
                        IconComponent = ComputerIcon;
                        break;
                    default:
                        IconComponent = null; // Icon mặc định hoặc không hiển thị nếu giá trị không khớp
                }

                return (
                    <>
                        {IconComponent && <IconComponent size={5} />} {deviceType}
                    </>
                );
            },
            header: "DEVICE",
        }),
        columnHelper.accessor("location", {
            cell: (data) => data.getValue(),
            header: "LOCATION",
        }),
        columnHelper.accessor("recent", {
            cell: (data) => data.getValue(),
            header: "MOST RECENT ACTIVITY",
        }),
    ];

    // Data fake
    const fakeData = [
        {
            id: 1,
            browser: "Chrome on Windows",
            device: "Laptop",
            location: "London, UK",
            recent: "Now",
        },
        {
            id: 2,
            browser: "Chrome on Windows",
            device: "Phone",
            location: "London, UK",
            recent: "15, August 2020 15:08",
        },
        {
            id: 3,
            browser: "Chrome on Windows",
            device: "Computer",
            location: "London, UK",
            recent: "12, August 2020 20:07",
        },
    ];

    return (
        <Box>
            {/* Recent devices */}
            <Box
                mt={7}
                w={"100%"}
                bg={"#ffff"}
                borderRadius={"15px"}
                p={5}
                fontSize={18}
            >
                <Text fontSize={22} fontWeight={700} mb={5}>
                    Recent devices
                </Text>
                <Divider />
                <Text py={3}>Your current email address is </Text>
                <Box
                    w={{
                        sm: "100%",
                        lg: "100%",
                    }}
                    bgColor="bg.white"
                >
                    <TableThink columns={columns} data={fakeData} />
                </Box>
            </Box>


            {/* Notifications */}
            <Box
                mt={7}
                w={"100%"}
                bg={"#ffff"}
                borderRadius={"15px"}
                p={5}
                fontSize={18}
            >
                <Text fontSize={22} fontWeight={700} mb={5}>
                    Notifications
                </Text>
                <Divider />
                <Flex p={3} bg={"gray.200"}>
                    <Text mr={1}>We need permission from your browser to show notifications.</Text>
                    <Text fontWeight={600}>  Request permission</Text>
                </Flex>
                <Grid
                    h={"50px"}
                    bg={"#f1f4f9"}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(7, 1fr)",
                    }}>
                    <GridItem p={3} fontWeight={600} color={"#797a7b"} colSpan={4}>
                        TYPE
                    </GridItem>
                    <GridItem p={3} color={"gray.500"} colSpan={1}>
                        <EmailIcon size={7} />
                        Email
                    </GridItem>
                    <GridItem p={3} color={"gray.500"} colSpan={1}>
                        <GlobeIcon size={7} />
                        BROWSER
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <AppIcon color={"gray.500"} size={7} />
                        APP
                    </GridItem>
                </Grid>

                <Grid
                    h={"50px"}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(7, 1fr)",
                    }}>
                    <GridItem p={3} fontWeight={600} color={"#797a7b"} colSpan={4}>
                        New for you
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox size='lg' />
                    </GridItem>
                </Grid>

                <Grid
                    h={"50px"}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(7, 1fr)",
                    }}>
                    <GridItem p={3} fontWeight={600} color={"#797a7b"} colSpan={4}>
                        Account activity
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox defaultChecked size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox defaultChecked size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox defaultChecked size='lg' />
                    </GridItem>
                </Grid>

                <Grid
                    h={"50px"}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(7, 1fr)",
                    }}>
                    <GridItem p={3} fontWeight={600} color={"#797a7b"} colSpan={4}>
                        A new browser used to sign in
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox defaultChecked size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox size='lg' />
                    </GridItem>
                </Grid>

                <Grid
                    h={"50px"}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(7, 1fr)",
                    }}>
                    <GridItem p={3} fontWeight={600} color={"#797a7b"} colSpan={4}>
                        A new device is linked
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox defaultChecked size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox defaultChecked size='lg' />
                    </GridItem>
                </Grid>

                <Grid
                    h={"50px"}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(7, 1fr)",
                    }}>
                    <GridItem p={3} fontWeight={600} color={"#797a7b"} colSpan={4}>
                        A new device connected
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox defaultChecked size='lg' />
                    </GridItem>
                    <GridItem p={3} colSpan={1}>
                        <Checkbox size='lg' />
                    </GridItem>
                    <GridItem defaultChecked p={3} colSpan={1}>
                        <Checkbox size='lg' />
                    </GridItem>
                </Grid>
                <Divider />
                <Grid mt={5}
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        xl: "repeat(2, 1fr)",
                    }}>
                    <GridItem p={3} fontWeight={600} color={"#797a7b"} colSpan={1}>
                        <Text>When should we send you notifications?</Text>
                        <Select pt={3} color={"#797a7b"} fontSize={16} fontWeight={600} w={"xs"} borderRadius={"md"}  >
                            <option value='option1'>Always</option>
                            <option value='option2'>Only when I'm online</option>
                        </Select>
                    </GridItem>
                    <GridItem p={3} fontWeight={600} color={"#797a7b"} colSpan={1}>
                        <Text>Send me a daily summary ("Daily Digest") of task activity.</Text>
                        <Flex>
                            <Select mr={7} pt={3} color={"#797a7b"} fontSize={16} fontWeight={600} w={"32"} borderRadius={"md"}  >
                                <option value='option1'>Every day</option>
                                <option value='option2'>Weekday</option>
                                <option value='option3'>Never</option>
                            </Select>
                            <Select pt={3} color={"#797a7b"} fontSize={16} fontWeight={600} w={"32"} borderRadius={"md"}  >
                                <option value='option1'>at 12 AM</option>
                                <option value='option2'>at 1 AM</option>
                                <option value='option3'>at 2 AM</option>
                                <option value='option4'>at 3 AM</option>
                                <option value='option5'>at 4 AM</option>
                                <option value='option6'>at 5 AM</option>
                                <option value='option7'>at 6 AM</option>
                                <option value='option8'>at 7 AM</option>
                                <option value='option9'>at 8 AM</option>
                                <option value='option10'>at 9 AM</option>
                                <option value='option11'>at 10 AM</option>
                                <option value='option12'>at 11 AM</option>
                                <option value='option13'>at 12 AM</option>
                                <option value='option14'>at 1 PM</option>
                                <option value='option15'>at 2 PM</option>
                                <option value='option16'>at 3 PM</option>
                                <option value='option17'>at 4 PM</option>
                                <option value='option18'>at 5 PM</option>
                                <option value='option19'>at 6 PM</option>
                                <option value='option20'>at 7 PM</option>
                                <option value='option21'>at 8 PM</option>
                                <option value='option22'>at 9 PM</option>
                                <option value='option23'>at 10 PM</option>
                                <option value='option24'>at 11 PM</option>
                            </Select>
                        </Flex>
                    </GridItem>
                </Grid>
                <Text p={2}>In order to cut back on noise, email notifications are grouped together and only sent when you're idle or offline.</Text>
                <Button
                    type="submit"
                    bgColor="#377dff"
                    textColor="text.white"
                    fontWeight="bold"
                    m={"0px 0 0 auto"}
                >
                    Save changes
                </Button>






            </Box>

        </Box>
    );
};

export default Management;
