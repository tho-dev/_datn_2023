import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { ArrowRightIcon } from '~/components/common/Icons';
type Props = {
  category: any;
};

const CategoryItem = ({ category }: Props) => {
  console.log(category);
  return (
    <Box border='1px solid #eff2f7' p='3' rounded='4'>
      <Flex justifyContent='space-between'>
        <Text fontSize='md' fontWeight='bold'>
          {category.category_title}
        </Text>
        <Flex>
          <Button size='xs' background='#cdf7ec' color='#4b93ff' type='submit' fontSize='sm' fontWeight='bold' mr='2' rounded='3'>
            Edit
          </Button>
          <Button size='xs' background='#fcdae2' color='#ef476f' type='submit' fontSize='sm' fontWeight='bold' rounded='3'>
            Delete
          </Button>
        </Flex>
      </Flex>
      <Box>
        {category.items.map((item: any) => {
          return (
            <Text key={item} color='#878a99' fontSize='sm' cursor='pointer' lineHeight='8' fontWeight='medium'>
              {item}
            </Text>
          );
        })}
      </Box>
      <Flex
        alignItems='center'
        cursor='pointer'
        my='4'
        _hover={{
          transition: 'all 1s ease-in',
          borderBottom: '1px solid #1ea6d3',
          width: '100px',
        }}
      >
        <Text color='#1ea6d3' fontSize='sm' fontWeight='bold' mr='1'>
          Read More
        </Text>
        <ArrowRightIcon size={5} color='#1ea6d3' />
      </Flex>
    </Box>
  );
};

export default CategoryItem;
