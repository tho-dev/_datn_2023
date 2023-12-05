import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatNumber } from "~/utils/fc";
import CommonBox from "../CommonBox";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type Props = {
  data: any;
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      border: {
        display: false,
      },
      grid: {
        display: true,
      },
      ticks: {
        // forces step size to be 50 units
        stepSize: 100,
      },
    },
  },
  interaction: {
    mode: "index",
  },
  plugins: {
    legend: {
      // display: false,
      labels: {
        font: {
          size: 11,
        },
        usePointStyle: true,
      },
    },
    title: {
      position: "bottom" as const,
      display: true,
      text: "3. Top 3 sản phẩm so sánh nhiều nhất",
    },
  },
};

const TopComparsion = ({ data: values }: Props) => {
  console.log(values);

  const colors = ["#1ab17a", "#16afcc", "#f5724f"];

  const data = {
    labels: values[0].data.map((_x: any) => `Tháng ${_x.month}`),
    datasets: values.map((_x: any, index: number) => {
      return {
        label: _x.product.name,
        data: _x.data.map((_y: any) => _y.quantity),
        tension: 0.5,
        borderWidth: 2,
        borderColor: colors[index],
        backgroundColor: colors[index],
        pointBorderColor: colors[index],
        pointBorderWidth: 0,
        pointColor: colors[index],
      };
    }),
  };

  return (
    <CommonBox>
      <Flex gap="8" alignItems="center">
        <Flex w="400px" gap="4" flexDir="column">
          {values.map((value: any, index: number) => {
            return (
              <Flex
                gap="4"
                px="6"
                py="4"
                key={index}
                rounded="lg"
                borderWidth="1px"
                borderColor="#eef1f6"
                boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
              >
                <Box
                  w="64px"
                  h="64px"
                  rounded="lg"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor="border.primary"
                >
                  <Image
                    src={value.product.image}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
                <Box>
                  <Text fontSize="13px" fontWeight="bold">
                    {value.product.name}
                  </Text>
                  <Text fontSize="13px" fontWeight="semibold">
                    {formatNumber(`${value.product.price}`)}đ
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </Flex>
        <Box flex="1">
          <Line data={data} width={600} height={360} options={options as any} />
        </Box>
      </Flex>
    </CommonBox>
  );
};

export default TopComparsion;
