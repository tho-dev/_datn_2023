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
			grid: {
				display: false,
			},
		},
		y: {
			title: {
				display: false,
				text: "Số lượng sản phẩm",
			},
			ticks: {
				// forces step size to be 50 units
				stepSize: 50,
			},
		},
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
				borderColor: "#ef476f",
				backgroundColor: "#ef476f",
				pointBorderColor: "#ef476f",
				pointBorderWidth: 0.5,
				pointColor: "#ef476f",
				// fill: true,
			},
			{
				label: "Thương hiệu",
				data: values?.brands?.values,
				tension: 0.5,
				borderWidth: 2,
				borderColor: "#f1be46",
				backgroundColor: "#f1be46",
				pointBorderColor: "#f1be46",
				pointBorderWidth: 0.5,
				pointColor: "#f1be46",
				// fill: true,
			},
		],
	};

	return (
		<CommonBox>
			<Line
				data={data}
				width={1400}
				height={360}
				options={options as any}
			/>
		</CommonBox>
	);
};

export default TopChaper;
