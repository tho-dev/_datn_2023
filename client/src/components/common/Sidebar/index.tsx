import { Flex, Heading, Text, Box } from "@chakra-ui/layout";
import { StepIcon, Switch } from "@chakra-ui/react";
import NavItem from "./components/NavItem";
import {
  DashboardIcon,
  NewsFeedIcon,
  AddIcon,
  WalletIcon,
  MarketIcon,
  InboxIcon,
  ProfileIcon,
  SettingsIcon,
  LightDarkIcon,
  InfoIcon,
  OrderIcon,
} from "~/components/common/Icons";

type Props = {};

const MENU = [
  {
    title: "Dashboard",
    to: "/admin",
    icon: DashboardIcon,
  },
  {
    title: "Cửa hàng",
    to: "/admin/cua-hang",
    icon: MarketIcon,
  },
  {
    title: "Thông tin website",
    to: "/admin/cua-hang",
    icon: InfoIcon,
  },
  {
    title: "Quản lý khuyến mãi",
    to: "/admin/khuyen-mai",
    icon: WalletIcon,
    children: [
      { title: "Chương trình khuyến mãi", to: "/admin/khuyen-mai" },
      { title: "....", to: "/admin/don-hang" },
    ],
  },
  {
    title: "Quản lý đơn hàng",
    to: "/admin/don-hang",
    icon: OrderIcon,
    children: [
      { title: "Tất cả đơn hàng", to: "/admin/don-hang" },
      { title: "....", to: "/admin/don-hang" },
    ],
  },
  {
    title: "Quản lý sản phẩm",
    to: "/admin/san-pham",
    icon: AddIcon,
    children: [
      { title: "Sản phẩm", to: "/admin/san-pham" },
      { title: "Danh mục", to: "/admin/danh-muc" },
      { title: "Thương hiệu", to: "/admin/thuong-hieu" },
      { title: "Nhu cầu", to: "/admin/nhu-cau" },
    ],
  },
  {
    title: "Quản lý bài viết",
    to: "/admin/bai-viet",
    icon: NewsFeedIcon,
    children: [
      { title: "Bài viết", to: "/admin/bai-viet" },
      { title: "Danh mục", to: "/admin/danh-muc-bai-viet" },
    ],
  },
  {
    title: "Quản lý tài khoản",
    to: "/admin/tai-khoan",
    icon: ProfileIcon,
  },
  {
    title: "Shipping",
    to: "/admin/shipping",
    icon: InboxIcon,
    children: [
      { title: "Shipping List", to: "/admin/shipping" },
      { title: "Shipments", to: "/admin/shipping/shipments" },
    ],
  },

  {
    title: "Settings",
    to: "/admin/cau-hinh",
    icon: SettingsIcon,
  },
];

const Sidebar = (props: Props) => {
  return (
    <Flex
      w="full"
      h="full"
      maxWidth={{
        sm: "86px",
        md: "86px",
        lg: "260px",
        xl: "260px",
        "2xl": "260px",
      }}
      maxH="100vh"
      overflowY="auto"
      transition="all 0.25s ease"
      flexDir="column"
      justifyContent="space-between"
      borderRightWidth="1px"
      borderColor="bg.admin1"
      position="fixed"
      zIndex="999"
      backgroundColor="bg.white"
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
          // backgroundColor="rgb(11 203 224)"
          // bgGradient="linear-gradient(to left, rgb(11 203 224), #fff)"
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
            bgGradient="linear-gradient(to right, rgb(11 203 224), #fff)"
            bgClip="text"
            // color="rgb(11 203 224)"
            fontWeight="bold"
          >
            ThinkPro
          </Heading>
        </Flex>
        <Flex gap="1" flexDir="column" mx="4" mt="12" mb="8">
          {MENU?.map((item: any, index: number) => (
            <NavItem item={item} key={index} />
          ))}
        </Flex>
      </Box>
      {/* <Flex
				mx="4"
				my="6"
				justifyContent="center"
				alignItems="center"
				gap="4"
				display={{
					sm: "none",
					md: "none",
					lg: "flex",
					xl: "flex",
					"2xl": "flex",
				}}
			>
				<Flex
					as="span"
					w="5"
					h="5"
					justifyContent="center"
					alignItems="center"
				>
					<LightDarkIcon size={5} />
				</Flex>
				<Text
					color="text.admin2"
					fontSize="sm"
					fontWeight="semibold"
				>
					Dark mode
				</Text>
				<Switch size="md" />
			</Flex> */}
    </Flex>
  );
};

export default Sidebar;
