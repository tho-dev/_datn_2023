import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import TableThinkPro from '~/components/TableThinkPro';
const RecentOrders = () => {
  const columnHelper = createColumnHelper<any>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const OrderList = [
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
    {
      order_id: 1,
      product_name: 'Sản phẩm 1',
      customer_name: 'khách hàng 1',
      Amount: 3,
      order_date: '16/09/2023',
      delivery_date: '20/09/2023',
      ratings: '5',
      status: 'New',
    },
  ];
  const columns = [
    columnHelper.accessor('#', {
      cell: (info) => {
        const index = info.row.index;
        return index + 1;
      },
      header: '#',
    }),
    columnHelper.accessor('order_id', {
      cell: (info) => {
        return <h1>{info.getValue()?.filename}</h1>;
      },
      header: 'Mã đơn hàng',
    }),
    columnHelper.accessor('product_name', {
      cell: (info) => info.getValue(),
      header: 'Tên sản phẩm',
    }),
    columnHelper.accessor('customer_name', {
      cell: (info) => info.getValue(),
      header: 'Tên khách hàng',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('amount', {
      cell: (info) => info.getValue(),
      header: 'Số lượng',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('order_date', {
      cell: (info) => info.getValue(),
      header: 'Ngày đặt hàng',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('delivery_date', {
      cell: (info) => info.getValue(),
      header: 'Ngày giao hàng',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('ratings', {
      cell: (info) => info.getValue(),
      header: 'Đánh giá',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: 'Trạng thái',
      meta: {
        isNumeric: true,
      },
    }),

    columnHelper.accessor('action', {
      cell: () => {
        return (
          <Menu>
            <MenuButton
              fontSize='sm'
              fontWeight='bold'
              w='5'
              h='5'
              rounded='sm'
              alignItems='center'
              justifyContent='center'
              color='text.admin2'
              bgColor='#f1f4f9'
              css={{
                '& span': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '-8px',
                },
              }}
            >
              ...
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>Xóa</MenuItem>
              <MenuItem>Xem chi tiết</MenuItem>
              <MenuItem>Cập nhật</MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: 'Action',
    }),
  ];
  return (
    <Box w='full' h='full' my='6'>
      <Box bgColor='bg.white' p='6' border='1px solid #f1f4f9' rounded='md'>
        <Text fontSize='xl' fontWeight='bold' mb='6'>
          Đặt hàng
        </Text>
        <TableThinkPro columns={columns} data={OrderList} />
      </Box>
    </Box>
  );
};

export default RecentOrders;
