import CommonBox from "../CommonBox";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
	categories: any;
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
			text: "3. Thống kê sản phẩm theo từng loại danh mục",
		},
		tooltip: {
			enabled: true,
		},
		datalabels: {
			formatter: (value: any, context: any) => {
				return value;
			},
		},
	},
};

const TopBrand = ({ categories }: Props) => {
	const data = {
		labels: categories?.labels,
		datasets: [
			{
				label: "#san-pham",
				data: categories?.values,
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
			<Bar
				data={data}
				width={700}
				height={300}
				options={options as any}
			/>
		</CommonBox>
	);
};

export default TopBrand;
