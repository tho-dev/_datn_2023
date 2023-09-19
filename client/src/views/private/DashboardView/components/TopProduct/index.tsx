import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { ArrowUpIcon, MailIcon } from '~/components/common/Icons';
import { Image, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
type Props = {
  title: string;
};
const TopProduct = ({ title }: Props) => {
  const [sliderValue, setSliderValue] = useState(50);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };
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

      <Box mb='2' p='4'>
        <Box my='4'>
          <Text fontSize='md' fontWeight='semibold'>
            Fashion & Clothing
          </Text>
          <Box>
            <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
              <SliderMark value={75} {...labelStyles}></SliderMark>
              <SliderMark value={sliderValue} textAlign='center' bg='blue.300' rounded='md' color='white' mt='-10' ml='-5' w='10'>
                {sliderValue}%
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
        <Box my='4'>
          <Text fontSize='md' fontWeight='semibold'>
            Fashion & Clothing
          </Text>
          <Box>
            <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
              <SliderMark value={95} {...labelStyles}></SliderMark>
              <SliderMark value={sliderValue} textAlign='center' bg='blue.300' rounded='md' color='white' mt='-10' ml='-5' w='10'>
                {sliderValue}%
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
        <Box my='4'>
          <Text fontSize='md' fontWeight='semibold'>
            Fashion & Clothing
          </Text>
          <Box>
            <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
              <SliderMark value={100} {...labelStyles}></SliderMark>
              <SliderMark value={sliderValue} textAlign='center' bg='blue.300' rounded='md' color='white' mt='-10' ml='-5' w='10'>
                {sliderValue}%
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopProduct;
