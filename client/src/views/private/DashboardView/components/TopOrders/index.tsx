import { Box } from "@chakra-ui/layout";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import CommonBox from "../CommonBox";
import { formatMoney } from "~/utils/fc";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  orders: any;
};

const TopOrders = ({ orders }: Props) => {
  // custom plugins
  const progressBar = {
    id: "progressBar",
    beforeDatasetsDraw(chart: any) {
      const {
        ctx,
        chartArea: { left, right, width, height },
        scales: { y },
      } = chart;

      ctx.save();

      const barHeight =
        (height / y.ticks.length) *
        data.datasets[0].barPercentage *
        data.datasets[0].categoryPercentage;

      data.datasets[0].data.forEach((datapoint: any, index: number) => {
        // label text
        const fontSizeLabel = 12;
        ctx.font = `${fontSizeLabel}px sans-serif`;
        ctx.fillStyle = "#333333";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(
          data.labels[index],
          left,
          y.getPixelForValue(index) - fontSizeLabel - 5
        );

        // value text
        const fontSizeValue = 12;
        ctx.font = `bolder ${fontSizeValue}px sans-serif`;
        ctx.fillStyle = "#333333";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(
          formatMoney(datapoint),
          right,
          y.getPixelForValue(index) - fontSizeValue - 5
        );

        ctx.beginPath();
        ctx.fillStyle = data.datasets[0].borderColor[index];
        ctx.fillRect(
          left,
          y.getPixelForValue(index) - barHeight / 2,
          width,
          barHeight
        );
      });
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        border: {
          display: false,
        },
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
        labels: {
          usePointStyle: true,
          font: {
            size: 11,
          },
        },
      },
      title: {
        position: "bottom" as const,
        display: true,
        text: "2. Thống kê tình trạng đơn hàng",
      },
    },
  };

  const data = {
    labels: orders?.map((x: any) => x.label),
    datasets: [
      {
        label: "#Số lượng",
        data: orders?.map((x: any) => x.value),
        borderColor: orders?.map((x: any) => x.color),
        backgroundColor: orders?.map((x: any) => x.border),
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.3,
        categoryPercentage: 0.8,
      },
    ],
  };

  return (
    <CommonBox>
      <Box w="full" mt="4">
        <Bar
          data={data}
          width={460}
          height={400}
          options={options as any}
          plugins={[progressBar]}
        />
      </Box>
    </CommonBox>
  );
};

export default TopOrders;
