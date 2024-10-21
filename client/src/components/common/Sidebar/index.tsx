import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import {
  AddIcon,
  DashboardIcon,
  NewsFeedIcon,
  OrderIcon,
  ProfileIcon,
  ScanIcon,
  SettingsIcon,
  WalletIcon,
} from "~/components/common/Icons";
import NavItem from "./components/NavItem";
import TopBar from "../TopBar";
import logo from "../../../../public/LOGO V2s 348px.png";
import { Image } from "@chakra-ui/react";

type Props = {};

const MENU = [
  {
    title: "Tổng Quan",
    to: "/admin",
    icon: DashboardIcon,
  },
  {
    title: "Quét tài liệu",
    to: "/admin/quet-tai-lieu",
    icon: ScanIcon,
  },
  {
    title: "Nhập Liệu",
    to: "/admin/nhap-lieu",
    icon: OrderIcon,
  },
  {
    title: "Kiếm tra, Soát Lỗi",
    to: "/admin/kiem-tra",
    icon: AddIcon,
  },
  {
    title: "Quản Lý Chung",
    to: "/admin/quan-ly-chung",
    icon: NewsFeedIcon,
    children: [
      { title: "Quản Lý Người Dùng", to: "/admin/qlnd" },
      { title: "Quản Lý Tài Khoản", to: "/admin/qltk" },
      { title: "Quản Lý Nhóm Người Dùng", to: "/admin/qlnnd" },
      { title: "Quản Lý Dự Án", to: "/admin/qlda" },
      { title: "Quản Lý Loại Hồ Sơ", to: "/admin/qlhs" },
      { title: "Cấu Hình Quy Trình", to: "/admin/chqt" },
      { title: "Tiến Độ Chất Lượng", to: "/admin/tdcl" },
    ],
  },
  {
    title: "Quản Lý Hệ Thống",
    to: "/admin/tai-khoan",
    icon: ProfileIcon,
    children: [
      { title: "Công Cụ", to: "/admin/cc" },
      { title: "Máy Chủ Vệ Tinh", to: "/admin/mcvt" },
      { title: "Tài Khoản Quản Trị", to: "/admin/tkqt" },
      { title: "Nhật Ký Hệ Thống", to: "/admin/nkht" },
    ],
  },
  {
    title: "Báo Cáo Thống Kê",
    to: "/admin/cau-hinh",
    icon: SettingsIcon,
    children: [
      {
        title: "Thống Kê Chi Tiết",
        to: "/admin/tkct",
      },
      { title: "Thống Kê Tổng Hợp", to: "/admin/tkth" },
      { title: "Báo Cáo Tiến Độ Công Việc", to: "/admin/thth" },
    ],
  },
];

const Sidebar = (props: Props) => {
  const [active, setActive] = useState(0);

  return (
    <Flex
      w="full"
      h="full"
      maxH="100vh"
      overflowY="auto"
      transition="all 0.25s ease"
      flexDir="column"
      justifyContent="space-between"
      borderRightWidth="1px"
      borderColor="bg.admin1"
    >
      <Box w="full" h="full">
        <Flex
          w="full"
          h="full"
          maxH={{
            sm: "64px",
            md: "64px",
            lg: "86px",
            xl: "86px",
            "2xl": "86px",
          }}
          alignItems="center"
          justifyContent="center"
          borderBottomWidth="1px"
          borderColor="bg.admin1"
          backgroundColor="rgb(11 203 224)"
          //   bgGradient="linear-gradient(to left, rgb(11 203 224), #fff)"
        >
          <Heading
            as="h3"
            fontSize={{
              sm: "md",
              md: "md",
              lg: "3xl",
              xl: "3xl",
              "2xl": "3xl",
            }}
            bgClip="text"
            color="white"
            fontWeight="bold"
          >
            DCMS
          </Heading>
        </Flex>
        <Flex gap="1" flexDir="column" mx="4" mt="6">
          <TopBar />
        </Flex>
        <Flex gap="1" flexDir="column" mx="4" mt="6" mb="8">
          {MENU?.map((item: any, index: number) => (
            <NavItem
              item={item}
              key={index}
              index={index}
              isCheck={active == index}
              handleClick={(value: any) => setActive(value)}
            />
          ))}
        </Flex>
      </Box>
      <Flex
        justifyContent={"center"}
        alignItems="center"
        my="4"
        flexDirection={"column"}
        mx="4"
      >
        <Image src={logo} alt="Logo VanViet" objectFit="cover" w="100px" />
        <Text fontSize={"sm"} fontWeight="semibold" textAlign="center">
          Phần mềm quản lý thi công chỉnh lý, số hoá tài liệu
        </Text>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
