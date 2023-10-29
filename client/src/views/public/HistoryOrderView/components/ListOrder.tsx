import { Grid, Heading } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { InforOrder } from '../../ProfileView/components/InforOrder';
import { orders } from '~/data/clone-thinkpro.json';
import { Box, Divider, Flex, TabPanel, Text, Tag, GridItem } from '@chakra-ui/react';
import ItemCart from './ItemCart';
import DetailOrder from './DetailOrder';
import { useGetOrderByPhoneNumberMutation } from '~/redux/api/order';
import { useAppDispatch, useAppSelector } from '~/redux/hook/hook';
import { resetOtpPhone } from '~/redux/slices/orderSlice';

// type Props = {};

const ListOrder = () => {
  const dispatch = useAppDispatch();
  const { isPhoneNumber, isOtpCode } = useAppSelector((state) => state.persistedReducer.order);
  const payload = {
    phone_number: isPhoneNumber,
    code: isOtpCode,
  };
  const [getOrderByPhoneNumber, { isLoading }] = useGetOrderByPhoneNumberMutation();
  useEffect(() => {
    getOrderByPhoneNumber(payload);
  }, []);
  // dispatch(resetOtpPhone());
  return (
    <Box p='4' rounded='md' bgColor='bg.white'>
      <Heading p='4' color='text.black' fontSize='xl'>
        Đơn hàng của bạn : 0978278289
      </Heading>
      <Grid gridTemplateColumns='repeat(2,1fr)' gap={4}>
        <GridItem colSpan={1}>
          <Box overflow='auto' maxHeight='600px'>
            {orders.map((order) => (
              <Box key={order.id} p='4' my={4} rounded='md' backgroundColor='bg.gray'>
                <Flex justifyContent='space-between'>
                  <Text fontSize='14px' fontWeight={'bold'}>
                    Mã đơn hàng:{' '}
                    <Text as={'span'} fontSize='14px'>
                      {order.id}
                    </Text>
                  </Text>
                  <Tag fontSize='12px' fontWeight='bold' textTransform={'uppercase'} color={'text.red'}>
                    {order.deliveryStatus}
                  </Tag>
                </Flex>
                <Divider />
                <Box>
                  <ItemCart />
                </Box>
                <Divider />
                <Flex justifyContent='end'>
                  <Text fontSize='14px' fontWeight='bold'>
                    Thành tiền:{' '}
                    <Text as={'span'} fontSize='14px' fontWeight={'bold'} color={'text.red'}>
                      {order.amount} đ
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
