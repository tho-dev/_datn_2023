import React from 'react';
import { Heading, Box, Divider, Flex, Image, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Input, GridItem, Grid, ChakraProvider, Stack, Button } from '@chakra-ui/react';
import { CheckedIcon, CloseSmallIcon } from '~/components/common/Icons';
type Props = {};

const ProfileView = (props: Props) => {
  return (
    <Box>
      <Heading py='4' fontSize='2xl'>
        Thông tin tài khoản
      </Heading>
      <Divider />
      <Box my='6'>
        <Flex alignItems='center' gap='6'>
          <Box>
            <Image borderRadius='full' boxSize='150px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </Box>
          <Box>
            <Text fontSize='lg' fontWeight='semibold'>
              Quỳnh
            </Text>
            <Text fontWeight='semibold'>quynh19396@gmail.com</Text>
          </Box>
        </Flex>
        <Tabs my='2'>
          <TabList>
            <Tab fontWeight='bold' fontSize='lg'>
              Cập nhật thông tin
            </Tab>
            <Tab fontWeight='bold' fontSize='lg'>
              Đổi mật khẩu
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(6, 1fr)',
                    xl: 'repeat(6, 1fr)',
                  }}
                  gap={4}
                  alignItems='center'
                  my='4'
                >
                  <GridItem colSpan={1}>
                    <Text fontWeight='semibold'>Ảnh đại diện</Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Image borderRadius='lg' boxSize='150px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                  </GridItem>
                </Grid>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(6, 1fr)',
                    xl: 'repeat(6, 1fr)',
                  }}
                  gap={4}
                  alignItems='center'
                  my='4'
                >
                  <GridItem colSpan={1}>
                    <Text fontWeight='semibold'>Tên tài khoản</Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Input placeholder='Nhập tên tài khoản' border='none' id='name' />
                  </GridItem>
                </Grid>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(6, 1fr)',
                    xl: 'repeat(6, 1fr)',
                  }}
                  gap={4}
                  alignItems='center'
                >
                  <GridItem colSpan={1}>
                    <Text fontWeight='semibold'>Email</Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Input placeholder='Nhập email' border='none' id='email' />
                  </GridItem>
                </Grid>
                <Divider my='6' />
                <Stack direction='row' spacing={4}>
                  <Button colorScheme='blue' leftIcon={<CheckedIcon />} variant='solid'>
                    Lưu lại
                  </Button>
                  <Button colorScheme='blue' leftIcon={<CloseSmallIcon />} variant='outline'>
                    Hủy
                  </Button>
                </Stack>
              </form>
            </TabPanel>
            <TabPanel>
              <form>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(6, 1fr)',
                    xl: 'repeat(6, 1fr)',
                  }}
                  gap={4}
                  alignItems='center'
                  my='4'
                >
                  <GridItem colSpan={1}>
                    <Text fontWeight='semibold'>Mật khẩu</Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Input placeholder='Mật khẩu' border='none' id='' type='text' />
                  </GridItem>
                </Grid>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(6, 1fr)',
                    xl: 'repeat(6, 1fr)',
                  }}
                  gap={4}
                  alignItems='center'
                  my='4'
                >
                  <GridItem colSpan={1}>
                    <Text fontWeight='semibold'>Mật khẩu mới</Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Input placeholder='Nhập mật khẩu mới' border='none' id='password' type='text' />
                  </GridItem>
                </Grid>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(6, 1fr)',
                    xl: 'repeat(6, 1fr)',
                  }}
                  gap={4}
                  alignItems='center'
                >
                  <GridItem colSpan={1}>
                    <Text fontWeight='semibold'>Xác nhận mật khẩu</Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Input placeholder='Xác nhận mật khẩu mới' border='none' id='repassword' type='password' />
                  </GridItem>
                </Grid>
                <Divider my='6' />
                <Stack direction='row' spacing={4}>
                  <Button colorScheme='blue' leftIcon={<CheckedIcon />} variant='solid'>
                    Lưu lại
                  </Button>
                  <Button colorScheme='blue' leftIcon={<CloseSmallIcon />} variant='outline'>
                    Hủy
                  </Button>
                </Stack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileView;
