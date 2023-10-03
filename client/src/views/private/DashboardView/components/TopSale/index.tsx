import { Box, Flex, Text } from '@chakra-ui/layout';
import { ArrowUpIcon } from '~/components/common/Icons';
import { Image } from '@chakra-ui/react';
type Props = {
  title: string;
};
const TopSale = ({ title }: Props) => {
  console.log(title);
  return (
    <Box width='35%' border='1px solid #f1f4f9' rounded='md'>
      <Flex justifyContent='space-between' borderBottom='1px solid #f1f4f9' p='4'>
        <Text fontSize='18' fontWeight='bold'>
          {title}
        </Text>
        <Flex alignItems='center'>
          <Text mr='2'>Repost</Text>
          <ArrowUpIcon size={4} color='black' />
        </Flex>
      </Flex>
      <Box my='2' p='4'>
        <Flex alignItems='center'>
          <Text fontSize='18' fontWeight='bold' mr='2'>
            6,343
          </Text>
          <Text>Total Sales</Text>
        </Flex>
        <Text>Sales from Jan - Dec 2022</Text>
      </Box>
      <Box>
        <Flex backgroundColor='#cdf7ec' px='4' py={2} justifyContent='space-between' border='1px solid #f1f4f9'>
          <Flex>
            <Image width='5' height='5' rounded='full' src='https://themesbrand.com/toner/html/assets/images/flags/us.svg' alt='Dan Abramov' />
            <Text ml='2' fontWeight='semibold'>
              United States
            </Text>
          </Flex>
          <Text fontWeight='semibold'>23413</Text>
        </Flex>
        <Flex backgroundColor='#cdf7ec' px='4' py={2}  justifyContent='space-between' border='1px solid #f1f4f9'>
          <Flex>
            <Image width='5' height='5' rounded='full' src='https://themesbrand.com/toner/html/assets/images/flags/us.svg' alt='Dan Abramov' />
            <Text ml='2' fontWeight='semibold'>
              United States
            </Text>
          </Flex>
          <Text fontWeight='semibold'>23413</Text>
        </Flex>
        <Flex backgroundColor='#cdf7ec' px='4' py={2}  justifyContent='space-between' border='1px solid #f1f4f9'>
          <Flex>
            <Image width='5' height='5' rounded='full' src='https://themesbrand.com/toner/html/assets/images/flags/us.svg' alt='Dan Abramov' />
            <Text ml='2' fontWeight='semibold'>
              United States
            </Text>
          </Flex>
          <Text fontWeight='semibold'>23413</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default TopSale;
