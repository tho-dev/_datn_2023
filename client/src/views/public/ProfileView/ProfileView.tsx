import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import Info from "./components/Info";
import ChangePassword from "./components/ChangePassword";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { InforOrder } from "./components/InforOrder";

type Props = {};

const ProfileView = (props: Props) => {
  const { user } = useAppSelector((state) => state.persistedReducer.global);
  return (
    <Box my="6" px="6" py="4" rounded="xl" bgColor="bg.white">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading py="4" color="text.black" fontSize="xl">
          Thông tin tài khoản
        </Heading>
      </Flex>
      <Divider />
      <Box my="6">
        <Flex alignItems="center" gap="6">
          <Box>
            <Image
              rounded="full"
              boxSize="120px"
              src={user?.avatar}
              objectFit="cover"
              alt="Dan Abramov"
              border="1px solid #ccc"
            />
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold">
              {user?.first_name + " " + user?.last_name}
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {user?.email}
            </Text>
          </Box>
        </Flex>
        <Tabs my="2">
          <TabList>
            <Tab fontSize="sm" fontWeight="semibold">
              Cập nhật thông tin
            </Tab>
            <Tab fontSize="sm" fontWeight="semibold">
              Đổi mật khẩu
            </Tab>
            <Tab fontSize="sm" fontWeight="semibold">
              Đơn hàng
            </Tab>
          </TabList>

          <TabPanels>
            {/* Thay đổi thông tin người dùng */}
            <TabPanel>
              <Info user={user} />
            </TabPanel>
            {/* Thay đổi mật khẩu */}
            <TabPanel>
              <ChangePassword user={user} />
            </TabPanel>
            {/* Chat */}
            <TabPanel>
              <InforOrder />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileView;
