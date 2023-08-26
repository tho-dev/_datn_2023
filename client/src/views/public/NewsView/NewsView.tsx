import { Box, Grid, GridItem, Text, Flex, Heading, Wrap, WrapItem } from '@chakra-ui/layout';
import NewsCategory from './components/NewsCategory';
import { Divider } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
const NewsView = () => {
  return (
    <Box>
      <NewsCategory />
      <Divider />
      <Grid
        my='10'
        gap={{
          sm: '0',
          md: '0',
          xl: '8',
        }}
        templateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
      >
        <GridItem colSpan={2}>
          <Box my='6'>
            <Grid
              gap={6}
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                xl: 'repeat(2, 1fr)',
              }}
            >
              <GridItem>
                <Box rounded='lg' overflow='hidden'>
                  <Image src='https://images.thinkgroup.vn/unsafe/https://media-api-beta.thinkpro.vn/media/social/articles/2023/8/17/samsung-m2-ssd-thinkpro-1Kk.jpg' />
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize='lg' fontWeight='bold'>
                    Windows 11 vừa cập nhật, vá lỗi chậm SSD tới nhiều người dùng
                  </Text>
                  <Text fontSize='md' my='4'>
                    Mặc dù chưa bao giờ bình luận công khai về lỗi tốc độ SSD trên Windows 11, nhưng Microsoft vẫn âm thầm ghi nhận vấn đề này và liên tục tìm giải pháp khắc phục.
                  </Text>
                  <Flex>
                    <Text fontSize='md'>Nguyen Cong Minh</Text>
                    <Text mx={2}>|</Text>
                    <Text fontSize='md'>5 ngay</Text>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>
          </Box>
          <Box my='6'>
            <Grid
              gap={6}
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                xl: 'repeat(2, 1fr)',
              }}
            >
              <GridItem>
                <Box rounded='lg' overflow='hidden'>
                  <Image src='https://images.thinkgroup.vn/unsafe/https://media-api-beta.thinkpro.vn/media/social/articles/2023/8/17/samsung-m2-ssd-thinkpro-1Kk.jpg' />
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize='lg' fontWeight='bold'>
                    Windows 11 vừa cập nhật, vá lỗi chậm SSD tới nhiều người dùng
                  </Text>
                  <Text fontSize='md' my='4'>
                    Mặc dù chưa bao giờ bình luận công khai về lỗi tốc độ SSD trên Windows 11, nhưng Microsoft vẫn âm thầm ghi nhận vấn đề này và liên tục tìm giải pháp khắc phục.
                  </Text>
                  <Flex>
                    <Text fontSize='md'>Nguyen Cong Minh</Text>
                    <Text mx={2}>|</Text>
                    <Text fontSize='md'>5 ngay</Text>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>
          </Box>
          <Box my='6'>
            <Grid
              gap={6}
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                xl: 'repeat(2, 1fr)',
              }}
            >
              <GridItem>
                <Box rounded='lg' overflow='hidden'>
                  <Image src='https://images.thinkgroup.vn/unsafe/https://media-api-beta.thinkpro.vn/media/social/articles/2023/8/17/samsung-m2-ssd-thinkpro-1Kk.jpg' />
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize='lg' fontWeight='bold'>
                    Windows 11 vừa cập nhật, vá lỗi chậm SSD tới nhiều người dùng
                  </Text>
                  <Text fontSize='md' my='4'>
                    Mặc dù chưa bao giờ bình luận công khai về lỗi tốc độ SSD trên Windows 11, nhưng Microsoft vẫn âm thầm ghi nhận vấn đề này và liên tục tìm giải pháp khắc phục.
                  </Text>
                  <Flex>
                    <Text fontSize='md'>Nguyen Cong Minh</Text>
                    <Text mx={2}>|</Text>
                    <Text fontSize='md'>5 ngay</Text>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
        <GridItem colSpan={1} h='800px' overflowY='auto'>
          <Box scrollMarginY={3} maxH='100%'>
            <Heading as='h2' my='4' fontSize='xl' color='text.black' fontWeight='bold'>
              Hot nhất trong tuần
            </Heading>
            <Wrap>
              <WrapItem>
                <Box backgroundColor='bg.white' rounded='lg' py='2' px='4' fontSize='sm'>
                  lenovo yoga book 9i
                </Box>
              </WrapItem>
              <WrapItem>
                <Box backgroundColor='bg.white' rounded='lg' py='2' px='4' fontSize='sm'>
                  lenovo yoga book 9i
                </Box>
              </WrapItem>
              <WrapItem>
                <Box backgroundColor='bg.white' rounded='lg' py='2' px='4' fontSize='sm'>
                  lenovo yoga book 9i
                </Box>
              </WrapItem>
              <WrapItem>
                <Box backgroundColor='bg.white' rounded='lg' py='2' px='4' fontSize='sm'>
                  Slim 7 Pro X
                </Box>
              </WrapItem>
              <WrapItem>
                <Box backgroundColor='bg.white' rounded='lg' py='2' px='4' fontSize='sm'>
                  lenovo yoga book 9i
                </Box>
              </WrapItem>
              <WrapItem>
                <Box backgroundColor='bg.white' rounded='lg' py='2' px='4' fontSize='sm'>
                  lenovo yoga book 9i
                </Box>
              </WrapItem>
            </Wrap>
            <Box>
              <Heading as='h2' pt='6' fontSize='xl' color='text.black' fontWeight='bold'>
                Có thể bạn thích
              </Heading>
              <Flex gap={4} my='6'>
                <Box w='100px' h='100px'>
                  <Image
                    w='full'
                    h='full'
                    src='https://images.thinkgroup.vn/unsafe/200x200/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/21/tai-nghe-chup-tai-marshall-major-4-1.jpeg'
                  />
                </Box>
                <Box>
                  <Text fontSize='sm' fontWeight='bold'>
                    Tai nghe chụp tai Marshall Major 4
                  </Text>
                  <Flex my={2} alignItems='center'>
                    <Text fontSize='ld' color='text.red' fontWeight='bold'>
                      3.249.000
                    </Text>
                    <Text ml={2} fontSize='md' fontWeight='semibold' textDecoration='line-through'>
                      3.999.000
                    </Text>
                    <Text rounded='md' ml='2' color='text.white' px='1' w='50px' textAlign='center' backgroundColor='bg.red'>
                      -18%
                    </Text>
                  </Flex>
                  <Flex alignItems='center'>
                    <Text color='text.slate' fontSize='sm' fontWeight='semibold'>
                      Màu
                    </Text>
                    <Box h='3' rounded='sm' w='3' ml='2' backgroundColor='bg.blue'></Box>
                  </Flex>
                </Box>
              </Flex>
              <Flex gap={4} my='6'>
                <Box w='100px' h='100px'>
                  <Image
                    w='full'
                    h='full'
                    src='https://images.thinkgroup.vn/unsafe/200x200/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/21/tai-nghe-chup-tai-marshall-major-4-1.jpeg'
                  />
                </Box>
                <Box>
                  <Text fontSize='sm' fontWeight='bold'>
                    Tai nghe chụp tai Marshall Major 4
                  </Text>
                  <Flex my={2} alignItems='center'>
                    <Text fontSize='ld' color='text.red' fontWeight='bold'>
                      3.249.000
                    </Text>
                    <Text ml={2} fontSize='md' fontWeight='semibold' textDecoration='line-through'>
                      3.999.000
                    </Text>
                    <Text rounded='md' ml='2' color='text.white' px='1' w='50px' textAlign='center' backgroundColor='bg.red'>
                      -18%
                    </Text>
                  </Flex>
                  <Flex alignItems='center'>
                    <Text color='text.slate' fontSize='sm' fontWeight='semibold'>
                      Màu
                    </Text>
                    <Box h='3' rounded='sm' w='3' ml='2' backgroundColor='bg.blue'></Box>
                  </Flex>
                </Box>
              </Flex>
              <Flex gap={4} my='6'>
                <Box w='100px' h='100px'>
                  <Image
                    w='full'
                    h='full'
                    src='https://images.thinkgroup.vn/unsafe/200x200/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/21/tai-nghe-chup-tai-marshall-major-4-1.jpeg'
                  />
                </Box>
                <Box>
                  <Text fontSize='sm' fontWeight='bold'>
                    Tai nghe chụp tai Marshall Major 4
                  </Text>
                  <Flex my={2} alignItems='center'>
                    <Text fontSize='ld' color='text.red' fontWeight='bold'>
                      3.249.000
                    </Text>
                    <Text ml={2} fontSize='md' fontWeight='semibold' textDecoration='line-through'>
                      3.999.000
                    </Text>
                    <Text rounded='md' ml='2' color='text.white' px='1' w='50px' textAlign='center' backgroundColor='bg.red'>
                      -18%
                    </Text>
                  </Flex>
                  <Flex alignItems='center'>
                    <Text color='text.slate' fontSize='sm' fontWeight='semibold'>
                      Màu
                    </Text>
                    <Box h='3' rounded='sm' w='3' ml='2' backgroundColor='bg.blue'></Box>
                  </Flex>
                </Box>
              </Flex>
              <Flex gap={4} my='6'>
                <Box w='100px' h='100px'>
                  <Image
                    w='full'
                    h='full'
                    src='https://images.thinkgroup.vn/unsafe/200x200/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/21/tai-nghe-chup-tai-marshall-major-4-1.jpeg'
                  />
                </Box>
                <Box>
                  <Text fontSize='sm' fontWeight='bold'>
                    Tai nghe chụp tai Marshall Major 4
                  </Text>
                  <Flex my={2} alignItems='center'>
                    <Text fontSize='ld' color='text.red' fontWeight='bold'>
                      3.249.000
                    </Text>
                    <Text ml={2} fontSize='md' fontWeight='semibold' textDecoration='line-through'>
                      3.999.000
                    </Text>
                    <Text rounded='md' ml='2' color='text.white' px='1' w='50px' textAlign='center' backgroundColor='bg.red'>
                      -18%
                    </Text>
                  </Flex>
                  <Flex alignItems='center'>
                    <Text color='text.slate' fontSize='sm' fontWeight='semibold'>
                      Màu
                    </Text>
                    <Box h='3' rounded='sm' w='3' ml='2' backgroundColor='bg.blue'></Box>
                  </Flex>
                </Box>
              </Flex>
              <Flex gap={4} my='6'>
                <Box w='100px' h='100px'>
                  <Image
                    w='full'
                    h='full'
                    src='https://images.thinkgroup.vn/unsafe/200x200/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/21/tai-nghe-chup-tai-marshall-major-4-1.jpeg'
                  />
                </Box>
                <Box>
                  <Text fontSize='sm' fontWeight='bold'>
                    Tai nghe chụp tai Marshall Major 4
                  </Text>
                  <Flex my={2} alignItems='center'>
                    <Text fontSize='ld' color='text.red' fontWeight='bold'>
                      3.249.000
                    </Text>
                    <Text ml={2} fontSize='md' fontWeight='semibold' textDecoration='line-through'>
                      3.999.000
                    </Text>
                    <Text rounded='md' ml='2' color='text.white' px='1' w='50px' textAlign='center' backgroundColor='bg.red'>
                      -18%
                    </Text>
                  </Flex>
                  <Flex alignItems='center'>
                    <Text color='text.slate' fontSize='sm' fontWeight='semibold'>
                      Màu
                    </Text>
                    <Box h='3' rounded='sm' w='3' ml='2' backgroundColor='bg.blue'></Box>
                  </Flex>
                </Box>
              </Flex>
              <Flex gap={4} my='6'>
                <Box w='100px' h='100px'>
                  <Image
                    w='full'
                    h='full'
                    src='https://images.thinkgroup.vn/unsafe/200x200/https://media-api-beta.thinkpro.vn/media/core/products/2022/10/21/tai-nghe-chup-tai-marshall-major-4-1.jpeg'
                  />
                </Box>
                <Box>
                  <Text fontSize='sm' fontWeight='bold'>
                    Tai nghe chụp tai Marshall Major 4
                  </Text>
                  <Flex my={2} alignItems='center'>
                    <Text fontSize='ld' color='text.red' fontWeight='bold'>
                      3.249.000
                    </Text>
                    <Text ml={2} fontSize='md' fontWeight='semibold' textDecoration='line-through'>
                      3.999.000
                    </Text>
                    <Text rounded='md' ml='2' color='text.white' px='1' w='50px' textAlign='center' backgroundColor='bg.red'>
                      -18%
                    </Text>
                  </Flex>
                  <Flex alignItems='center'>
                    <Text color='text.slate' fontSize='sm' fontWeight='semibold'>
                      Màu
                    </Text>
                    <Box h='3' rounded='sm' w='3' ml='2' backgroundColor='bg.blue'></Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default NewsView;
