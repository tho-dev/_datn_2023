import CommonBox from "../CommonBox";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  brands: any;
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {},
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: "Số lượng thương hiệu",
      },
      ticks: {
        // forces step size to be 50 units
        stepSize: 50,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "right" as const,
      labels: {
        usePointStyle: true,
        font: {
          size: 10,
        },
      },
    },
    title: {
      position: "bottom" as const,
      display: true,
      text: "2. Thống kê thương hiệu theo từng loại danh mục",
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      formatter: (value: any) => {
        return value;
      },
    },
  },
};

const TopBrand = ({ brands }: Props) => {
  const data = {
    labels: brands?.labels,
    datasets: [
      {
        label: "#thuong-hieu",
        data: brands?.values,
        // backgroundColor: brands?.colors,
        borderColor: "#0bcbe0",
        backgroundColor: "#0bcbe0",
        pointBorderColor: "#0bcbe0",
        // borderWidth: 1,
        borderRadius: 2,
      },
    ],
  };

  return (
    <CommonBox>
      <Bar data={data} width={700} height={300} options={options as any} />
    </CommonBox>
  );
};

export default TopBrand;
