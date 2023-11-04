import { Grid, Heading } from '@chakra-ui/layout';
import { Box, Divider, Flex, Text, Tag, GridItem, Image, Skeleton, IconButton, SkeletonText } from '@chakra-ui/react';
import { NavArrowLeflIcon } from '~/components/common/Icons/index';
import DetailOrder from './DetailOrder';
import { useAppDispatch, useAppSelector } from '~/redux/hook/hook';
import { getOneOrder, reset } from '~/redux/slices/orderSlice';

const ListOrder = () => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.persistedReducer.order);
  console.log('a', result);
  const handleShowDetail = (id: any) => {
    dispatch(getOneOrder(id));
  };

  const handleExit = () => {
    console.log('fsdaf');
    dispatch(reset());
  };
  return (
    <Box p='4' rounded='md' bgColor='bg.white'>
      <Flex justifyContent='space-between'>
        <IconButton variant='outline' colorScheme='teal' w='50px' aria-label='Call Sage' fontSize='30px' icon={<NavArrowLeflIcon />} onClick={handleExit} />
        <Heading p='4' color='text.black' fontSize='xl'>
          Đơn hàng của bạn : {result?.isPhoneNumber}
        </Heading>
      </Flex>
      <Grid gridTemplateColumns='repeat(2,1fr)' gap={4}>
        <GridItem colSpan={1}>
          <Box overflow='auto' maxHeight='600px'>
            {result?.isLoading && (
              <Box p='4' my={4} rounded='md' backgroundColor='bg.gray'>
                <Flex justifyContent='space-between' alignItems='center'>
                  <SkeletonText w='50%' h='30px' noOfLines={1} />
                </Flex>
                <Divider />
                <Box>
                  <Flex justifyContent={'space-between'} my={'4'}>
                    <Skeleton w='50px' h='50px' />
                    <SkeletonText w='100%' h='30px' ml='10px' noOfLines={4} />
                  </Flex>
                </Box>
                <Divider />
                <Flex justifyContent='end' display='flex' alignItems='center' pt='30px'>
                  <SkeletonText w='100px' h='30px' ml='10px' noOfLines={1} />
                </Flex>
              </Box>
            )}

            {result?.orders.map((order: any) => (
              <Box key={order?._id} p='4' my={4} rounded='md' backgroundColor='bg.gray' onClick={(e) => handleShowDetail(order?._id)}>
                <Flex justifyContent='space-between'>
                  <Text fontSize='14px' fontWeight={'bold'}>
                    Mã đơn hàng:{' '}
                    <Text as={'span'} fontSize='14px'>
                      {order?._id}
                    </Text>
                  </Text>
                  <Tag fontSize='12px' fontWeight='bold' textTransform={'uppercase'} color={'text.red'}>
                    {order?.status}
                  </Tag>
                </Flex>
                <Divider />
                <Box>
                  <Flex justifyContent={'space-between'} my={'4'}>
                    <Flex gap='2' alignItems='center'>
                      <Box w='56px' h='56px'>
                        <Image src={order?.orders[0]?.shared_url} alt='name' w='full' h='full' objectFit='cover' />
                      </Box>
                      <Box ml={'5'}>
                        <Text as={'p'} fontSize={'14px'} fontWeight={'bold'}>
                          {order?.orders[0]?.name}
                        </Text>
                        <Box>
                          <Text as={'p'} fontSize={'12px'} backgroundColor={'#F6F9FC'} my={'2'} fontWeight={'semibold'}>
                            i5 1340P, QHD+ 16GB, 512GB, Mới, Full box, Nhập khẩu
                          </Text>
                        </Box>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
                <Divider />
                <Flex justifyContent='end'>
                  <Text fontSize='14px' fontWeight='bold'>
                    Thành tiền:{' '}
                    <Text as={'span'} fontSize='14px' fontWeight={'bold'} color={'text.red'}>
                      {order?.total_amount} đ
                    </Text>
                  </Text>
                </Flex>
              </Box>
            ))}
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <DetailOrder />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ListOrder;
