import { Box, Flex, Text } from '@chakra-ui/layout';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const Revenue = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [10, 25, 30, 15, 45],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  const options = {};

  return (
    <Box width='70%' border='1px solid #f1f4f9' rounded='md'>
      <Flex justifyContent='space-between' borderBottom='1px solid #f1f4f9' p='4'>
        <Text fontSize='18' fontWeight='bold'>
          Doanh thu
        </Text>
        <Flex gap='2'>
          <Box backgroundColor='rgba(124, 107, 255, 0.1)' color='#7c6bff' py='1' px='3' fontSize='14' fontWeight='semibold' rounded='md'>
            ALL
          </Box>
          <Box backgroundColor='rgba(124, 107, 255, 0.1)' color='#7c6bff' py='1' px='3' fontSize='14' fontWeight='semibold' rounded='md'>
            1M
          </Box>
          <Box backgroundColor='rgba(124, 107, 255, 0.1)' color='#7c6bff' py='1' px='3' fontSize='14' fontWeight='semibold' rounded='md'>
            6M
          </Box>
          <Box backgroundColor='rgba(124, 107, 255, 0.1)' color='#7c6bff' py='1' px='3' fontSize='14' fontWeight='semibold' rounded='md'>
            1Y
          </Box>
        </Flex>
      </Flex>
      <Box>
        <Line options={options} data={data} />
      </Box>
    </Box>
  );
};

export default Revenue;
