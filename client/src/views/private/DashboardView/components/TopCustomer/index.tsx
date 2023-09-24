import { Box, Flex, Text } from '@chakra-ui/layout';
import { ArrowUpIcon, MapIcon } from '~/components/common/Icons';
import { Image } from '@chakra-ui/react';
type Props = {
  title: string;
};
const TopCustomer = ({ title }: Props) => {
  console.log(title);
  return (
    <Box width='33%' border='1px solid #f1f4f9' rounded='md'>
      <Flex justifyContent='space-between' borderBottom='1px solid #f1f4f9' p='4'>
        <Text fontSize='xl' fontWeight='bold'>
          {title}
        </Text>
        <Flex alignItems='center'>
          <Text mr='2'>Repost</Text>
          <ArrowUpIcon size={4} color='black' />
        </Flex>
      </Flex>

      <Box my='2'>
        <Flex p='4' justifyContent='space-between' borderBottom='2px dashed #ef476f' alignItems='center'>
          <Flex alignItems='center' gap='2'>
            <Image width='35' height='35' rounded='md' src='https://themesbrand.com/toner/html/assets/images/users/avatar-2.jpg' alt='Dan Abramov' />
            <Box>
              <Text fontWeight='semibold'>United States</Text>
              <Text fontSize='sm'>02 Jan, 2023</Text>
            </Box>
          </Flex>
          <Box
            fontWeight='semibold'
            display='flex'
            p='2'
            backgroundColor='rgba(239, 71, 111, 0.1)'
            cursor='pointer'
            rounded='md'
            color='#ef476f'
            _hover={{
              transition: 'all 0.3s ease-in',
              backgroundColor: '#d74064',
              color: '#fff',
            }}
          >
            <MapIcon size={5} />
          </Box>
        </Flex>
        <Flex p='4' justifyContent='space-between' borderBottom='2px dashed #ef476f' alignItems='center'>
          <Flex alignItems='center' gap='2'>
            <Image width='35' height='35' rounded='md' src='https://themesbrand.com/toner/html/assets/images/users/avatar-2.jpg' alt='Dan Abramov' />
            <Box>
              <Text fontWeight='semibold'>United States</Text>
              <Text fontSize='sm'>02 Jan, 2023</Text>
            </Box>
          </Flex>
          <Box
            fontWeight='semibold'
            display='flex'
            p='2'
            backgroundColor='rgba(239, 71, 111, 0.1)'
            cursor='pointer'
            rounded='md'
            color='#ef476f'
            _hover={{
              transition: 'all 0.3s ease-in',
              backgroundColor: '#d74064',
              color: '#fff',
            }}
          >
            <MapIcon size={5} />
          </Box>
        </Flex>
        <Flex p='4' justifyContent='space-between' borderBottom='2px dashed #ef476f' alignItems='center'>
          <Flex alignItems='center' gap='2'>
            <Image width='35' height='35' rounded='md' src='https://themesbrand.com/toner/html/assets/images/users/avatar-2.jpg' alt='Dan Abramov' />
            <Box>
              <Text fontWeight='semibold'>United States</Text>
              <Text fontSize='sm'>02 Jan, 2023</Text>
            </Box>
          </Flex>
          <Box
            fontWeight='semibold'
            display='flex'
            p='2'
            backgroundColor='rgba(239, 71, 111, 0.1)'
            cursor='pointer'
            rounded='md'
            color='#ef476f'
            _hover={{
              transition: 'all 0.3s ease-in',
              backgroundColor: '#d74064',
              color: '#fff',
            }}
          >
            <MapIcon size={5} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default TopCustomer;
