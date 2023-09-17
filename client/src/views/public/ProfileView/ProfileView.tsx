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
} from "@chakra-ui/react";
import Info from "./components/Info";
import ChangePassword from "./components/ChangePassword";
import Chat from "./components/Chat";

type Props = {};

const ProfileView = (props: Props) => {
  return (
    <Box my="6" px="6" py="4" rounded="xl" bgColor="bg.white">
      <Heading py="4" color="text.black" fontSize="xl">
        Thông tin tài khoản
      </Heading>
      <Divider />
      <Box my="6">
        <Flex alignItems="center" gap="6">
          <Box>
            <Image
              rounded="full"
              boxSize="120px"
              src="https://gratisography.com/wp-content/uploads/2023/05/gratisography-noir-cat-free-stock-photo-800x525.jpg"
              objectFit="cover"
              alt="Dan Abramov"
            />
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold">
              Quỳnh
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              quynh19396@gmail.com
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
              Chat
            </Tab>
          </TabList>

          <TabPanels>
            {/* Thay đổi thông tin người dùng */}
            <TabPanel>
              <Info />
            </TabPanel>
            {/* Thay đổi mật khẩu */}
            <TabPanel>
              <ChangePassword />
            </TabPanel>
            {/* Chat */}
            <TabPanel>
              <Chat />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileView;
