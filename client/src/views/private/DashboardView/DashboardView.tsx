import { Box, Flex } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import Metrics from './components/Metrics';
import ConfirmThinkPro from '~/components/ConfirmThinkPro';
import RecentOrders from './components/RecentOrders';
import TopSale from './components/TopSale';
import Revenue from './components/Revenue';
import TopCustomer from './components/TopCustomer';
import TopProduct from './components/TopProduct';
import TopCategory from './components/TopCategory';
type Props = {};

const DashboardView = (props: Props) => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <Box w='full' h='full'>
      {/* Số liệu */}
      <Metrics />

      {/* Test table */}
      <Box bgColor='bg.white' mt='6' p='6'>
        {/* <TableThinkPro columns={columns} data={thinkpro.data} /> */}
        <Flex gap='6'>
          <TopSale title='Top sales location ' />
          <Revenue></Revenue>
        </Flex>
        <RecentOrders />

        <Flex gap='6'>
          <TopCustomer title='Top customers' />
          <TopProduct title='Top Product' />
          <TopCategory title='Top Category' />
        </Flex>
      </Box>
      <ConfirmThinkPro isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DashboardView;
