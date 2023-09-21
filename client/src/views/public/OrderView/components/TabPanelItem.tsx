import { Box, Divider, Flex, TabPanel, Text } from '@chakra-ui/react';
import {orders} from '~/data/clone-thinkpro.json';
import React from 'react'
import ItemCart from './ItemCart';

type Props = {
    status: string
}

const TabPanelItem = ({ status}: Props) => {
  const filteredOrders = orders.filter(order => order.deliveryStatus == status);
  return (
    <TabPanel>
        {status == "all" ? (
            orders.map(order => (
                <Box
                    key={order.id}
                    p="6"
                    my={4}
                    rounded="md"
                    backgroundColor="bg.gray"
                >
                    <Flex justifyContent="space-between" pb={4}>
                        <Text as={"h2"} >Mã đơn hàng: <Text as={"span"} fontSize="md" fontWeight={"bold"}>{order.id}</Text></Text>
                        <Text as={"h2"} textTransform={"uppercase"} color={"text.red"}>{order.deliveryStatus}</Text>
                    </Flex>
                    <Divider/>
                    <Box>
                        <ItemCart/>
                    </Box>
                    <Divider/>
                    <Flex justifyContent="end" py={4}>
                        <Text as={"h2"} > Thành tiền: <Text as={"span"} fontSize="md" fontWeight={"bold"} color={"text.red"}>{order.amount} đ</Text></Text>
                    </Flex>
                </Box>
            ))
        ):(
            filteredOrders.map(order => (
                <Box
                    key={order.id}
                    p="6"
                    my={4}
                    rounded="md"
                    backgroundColor="bg.gray"
                >
                    <Flex justifyContent="space-between" pb={4}>
                        <Text as={"h2"} >Mã đơn hàng: <Text as={"span"} fontSize="md" fontWeight={"bold"}>{order.id}</Text></Text>
                        <Text as={"h2"} textTransform={"uppercase"} color={"text.red"}>{order.deliveryStatus}</Text>
                    </Flex>
                    <Divider/>
                    <Box>
                        <ItemCart/>
                    </Box>
                    <Divider/>
                    <Flex justifyContent="end" py={4}>
                        <Text as={"h2"} > Thành tiền: <Text as={"span"} fontSize="md" fontWeight={"bold"} color={"text.red"}>{order.amount} đ</Text></Text>
                    </Flex>
                </Box>
            ))
        )}
        
    </TabPanel>
  )
}

export default TabPanelItem