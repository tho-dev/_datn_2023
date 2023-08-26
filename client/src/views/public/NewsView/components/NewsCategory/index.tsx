import { Box, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, Text, Heading } from '@chakra-ui/layout';
import { Image, color } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Link as ReactRouterLink } from 'react-router-dom';

const newsCategories = [
  {
    image: 'https://thinkpro.vn/post/post-category-thumbnail.jpeg',
    title: 'Tất cả ',
  },
  {
    image: 'https://images.thinkgroup.vn/unsafe/360x200/https://media-api-beta.thinkpro.vn/media/social/articles/2023/8/17/samsung-m2-ssd-thinkpro-1Kk.jpg',
    title: 'Tin tức',
  },
  {
    image: 'https://images.thinkgroup.vn/unsafe/360x200/https://media-api-beta.thinkpro.vn/media/social/articles/2023/8/15/dsc05780-thinkpro.jpeg',
    title: 'Đánh giá',
  },
  {
    image: 'https://images.thinkgroup.vn/unsafe/360x200/https://media-api-beta.thinkpro.vn/media/social/articles/2022/6/14/lenovo-thinkpad-13s-hero-1126.jpg',
    title: 'Tư vấn',
  },
  {
    image: 'https://images.thinkgroup.vn/unsafe/360x200/https://media-api-beta.thinkpro.vn/media/social/articles/2023/7/14/1990826390-huge-2-thinkpro.jpg',
    title: 'Thủ thuật',
  },
  {
    image:
      'https://images.thinkgroup.vn/unsafe/360x200/https://media-api-beta.thinkpro.vn/media/social/articles/2022/6/27/laptopnew-gigabyte-aorus-15p-gioi-thieu-69c89b23-7c9f-4776-bb59-54e5530b3432.jpg',
    title: 'Khuyến mại',
  },
];
const NewsCategory = () => {
  return (
    <Box>
      <Heading as='h2' my='6' fontSize='2xl' color='text.black' fontWeight='bold'>
        Tin tức công nghệ
      </Heading>
      <Flex gap='4'>
        <Swiper
          modules={[Navigation]}
          speed={400}
          slidesPerView={8}
          spaceBetween={20}
          loop={true}
          navigation={{
            nextEl: '.btn-next',
            prevEl: '.btn-prev',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 6,
            },
            768: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 6,
            },
          }}
        >
          {newsCategories.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Link
                  as={ReactRouterLink}
                  h='full'
                  role='group'
                  cursor='pointer'
                  rounded='lg'
                  overflow='hidden'
                  display='inline-flex'
                  flexDir='column'
                  backgroundColor='bg.white'
                  _hover={{
                    transition: 'all 0.3s ease-in',
                    backgroundColor: 'bg.blue',
                    '& > *': {
                      // Chọn phần thay đổi màu của thẻ con
                      color: 'text.white', // Đổi màu chữ của thẻ con khi hover vào thẻ cha
                    },
                  }}
                >
                  <Box>
                    <Image src={item?.image} w='full' h='120px' objectFit='cover' />
                  </Box>
                  <Text color='text.black' p='10px' fontSize='md' fontWeight='bold'>
                    {item.title}
                  </Text>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Flex>
    </Box>
  );
};

export default NewsCategory;
