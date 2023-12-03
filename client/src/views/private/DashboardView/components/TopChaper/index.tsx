import CommonBox from "../CommonBox";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

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
			text: "2. Thương hiệu & sản phẩm",
		},
	},
};

const TopChaper = ({ data: values }: Props) => {
	const data = {
		labels: values?.categories?.labels,
		datasets: [
			{
				label: "Sản phẩm",
				data: values?.categories?.values,
				tension: 0.5,
				borderWidth: 2,
				borderColor: "#1ab17a",
				backgroundColor: "#1ab17a",
				pointBorderColor: "#1ab17a",
				pointBorderWidth: 0.5,
				pointColor: "#1ab17a",
				// fill: true,
			},
			{
				label: "Thương hiệu",
				data: values?.brands?.values,
				tension: 0.5,
				borderWidth: 2,
				borderColor: "#f8b11b",
				backgroundColor: "#f8b11b",
				pointBorderColor: "#f8b11b",
				pointBorderWidth: 0.5,
				pointColor: "#f8b11b",
				// fill: true,
			},
		],
	};

	return (
		<CommonBox>
			<Line
				data={data}
				width={600}
				height={360}
				options={options as any}
			/>
		</CommonBox>
	);
};

export default TopChaper;
