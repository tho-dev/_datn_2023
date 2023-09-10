import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Heading, Input, Text, GridItem, Select, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';
import CategoryItem from './components/CategoryItem';
import { SearchIcon, ArrowRightIcon, ArrowLeftIcon } from '~/components/common/Icons';
type Props = {};

const CategoryManagerView = (props: Props) => {
  const [value, setValue] = useState('');
  const handleInputChange = (e: any) => {
    console.log(e);
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  const categorySchema = Joi.object({
    category_title: Joi.string().required().trim().messages({
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
    slug: Joi.string().required().trim().messages({
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
    image: Joi.string().required().messages({
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
    description: Joi.string().required().trim().messages({
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
  });
  const listCategory = [
    {
      id: '1',
      category_title: 'Other Accessories',
      items: ['Bags', 'Eyewear', 'Belts', 'Hair accessories'],
    },
    {
      id: '2',

      category_title: 'Books',
      items: ['Bags', 'Eyewear', 'Belts', 'Hair accessories'],
    },
    {
      id: '3',

      category_title: 'Beauty & Personal Care',
      items: ['Bags', 'Eyewear', 'Belts', 'Hair accessories'],
    },
    {
      id: '4',

      category_title: 'Other Accessories 2',
      items: ['Bags', 'Eyewear', 'Belts', 'Hair accessories'],
    },
    {
      id: '5',

      category_title: 'Books 2',
      items: ['Bags', 'Eyewear', 'Belts', 'Hair accessories'],
    },
    {
      id: '6',

      category_title: 'Beauty & Personal Care 2',
      items: ['Bags', 'Eyewear', 'Belts', 'Hair accessories'],
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: joiResolver(categorySchema),
  });
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(listCategory.slice(0, itemsPerPage));
  const totalPages = Math.ceil(listCategory.length / itemsPerPage);
  const handleNextPages = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      const start = (currentPage + 1 - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setDisplayedItems(listCategory.slice(start, end));
    }
  };
  const handlePrevPages = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const start = (currentPage - 1 - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setDisplayedItems(listCategory.slice(start, end));
    }
  };
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Box background='white' p='6'>
      <Heading as='h2' my='4' fontSize='2xl' color='text.black' fontWeight='bold'>
        Danh mục
      </Heading>
      <Flex gap='6'>
        <Box background='white' border='1px solid #eff2f7' borderRadius='6'>
          <Text py='4' px='6' fontSize='lg' color='text.black' fontWeight='bold' borderBottom='1px solid #eff2f7'>
            Tạo danh mục
          </Text>
          <Box px='6' py='2'>
            <form
              action=''
              style={{
                width: '100%',
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl isInvalid={errors.category_title as any}>
                <FormLabel fontWeight='semibold'>Tiêu đề</FormLabel>
                <Input id='category_title' type='text' placeholder='Nhận tiêu đề' size='lager' border='1px solid #eff2f7' />
                <FormErrorMessage>{(errors.category_title as any) && (errors?.email?.message as any)}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.category_title as any} my='4'>
                <FormLabel fontWeight='semibold'>Slug</FormLabel>
                <Input id='slug' type='text' placeholder='Enter slug' size='lager' border='1px solid #eff2f7' />
                <FormErrorMessage>{(errors.category_title as any) && (errors?.email?.message as any)}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.category_title as any} my='4'>
                <FormLabel fontWeight='semibold'>Ảnh</FormLabel>
                <Input id='image' type='file' placeholder='Nhập ảnh' size='lager' border='1px solid #eff2f7' py='2' />
                <FormErrorMessage>{(errors.category_title as any) && (errors?.email?.message as any)}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.category_title as any}>
                <FormLabel fontWeight='semibold'>Mô tả</FormLabel>
                <Textarea value={value} id='description' onChange={handleInputChange} placeholder='Nhập mô tả' size='sm' border='1px solid #eff2f7' />
                <FormErrorMessage>{(errors.category_title as any) && (errors?.email?.message as any)}</FormErrorMessage>
              </FormControl>
              <Flex justifyContent='end'>
                <Button size='lager' type='submit' w='120px' mt='4' rounded='4' background='#06d6a0' fontWeight='semibold'>
                  Thêm danh mục
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
        <Box background='white' border='1px solid #eff2f7' borderRadius='6'>
          <Box px='6' mt='6'>
            <form
              action=''
              style={{
                width: '100%',
              }}
            >
              <Flex gap='6' alignItems='center' my='2'>
                <FormControl isInvalid={errors.category_title as any}>
                  <Flex px='4' py='14px' rounded='4' alignItems='center' backgroundColor='bg.white' border='1px solid #eff2f7'>
                    <SearchIcon size={4} color='#adb5bd' />
                    <Input
                      w='full'
                      h='full'
                      px='0'
                      pl='2'
                      border='none'
                      lineHeight='1.6'
                      backgroundColor='bg.white'
                      placeholder='Tên sản phẩm, nhu cầu, hàng'
                      _placeholder={{
                        color: '#6b7075',
                        opacity: 0.5,
                        fontWeight: 500,
                      }}
                    />
                  </Flex>
                  <FormErrorMessage>{(errors.category_title as any) && (errors?.email?.message as any)}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.category_title as any}>
                  <Select placeholder='Select option'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                  <FormErrorMessage>{(errors.category_title as any) && (errors?.email?.message as any)}</FormErrorMessage>
                </FormControl>
              </Flex>
            </form>
          </Box>
          <Box w='full' px='6'>
            <Grid gap='6' templateColumns='repeat(3, 1fr)' my='6'>
              {displayedItems.map((category) => {
                return (
                  <GridItem key={category.id}>
                    <CategoryItem category={category} />
                  </GridItem>
                );
              })}
            </Grid>
            <Flex mb='6' justifyContent='end'>
              <Button size='sm' leftIcon={<ArrowLeftIcon size={6} />} onClick={handlePrevPages}></Button>
              <Flex mx='2' gap='2'>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    size='sm'
                    key={i}
                    onClick={() => {
                      console.log(i + 1);
                      setCurrentPage(i + 1);
                    }}
                    background='#cdf7ec'
                    color='#4b93ff'
                  >
                    {i + 1}
                  </Button>
                ))}
              </Flex>
              <Button size='sm' leftIcon={<ArrowRightIcon size={6} />} onClick={handleNextPages}></Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CategoryManagerView;
