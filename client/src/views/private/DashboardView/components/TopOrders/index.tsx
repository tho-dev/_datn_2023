import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
	orders: any;
};

const TopOrders = ({ orders }: Props) => {
	const [values, setValues] = useState(orders);

	useEffect(() => {
		if (orders) {
			setValues(orders);
		}
	}, [orders]);

	// custom plugins
	const progressBar = {
		id: "progressBar",
		beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
			const {
				ctx,
				chartArea: { top, bottom, left, right, width, height },
				scales: { x, y },
			} = chart;

			ctx.save();

			const barHeight =
				(height / y.ticks.length) * data.datasets[0].barPercentage * data.datasets[0].categoryPercentage;

			values.forEach((_x: any, index: number) => {
				// label text
				const fontSizeLabel = 12;
				ctx.font = `${fontSizeLabel}px sans-serif`;
				ctx.fillStyle = "#333333";
				ctx.textAlign = "left";
				ctx.textBaseline = "middle";
				ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);

				// value text
				const fontSizeValue = 12;
				ctx.font = `bolder ${fontSizeValue}px sans-serif`;
				ctx.fillStyle = "#333333";
				ctx.textAlign = "right";
				ctx.textBaseline = "middle";
				ctx.fillText("", right, y.getPixelForValue(index) - fontSizeValue - 5);

				ctx.beginPath();
				ctx.fillStyle = data.datasets[0].borderColor[index];
				ctx.fillRect(left, y.getPixelForValue(index) - barHeight / 2, width, barHeight);
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
		labels: values?.map((x: any) => x.label),
		datasets: [
			{
				label: "#Số lượng",
				data: values?.map((x: any) => x.value),
				borderColor: values?.map((x: any) => x.color),
				backgroundColor: values?.map((x: any) => x.border),
				borderWidth: 0,
				borderRadius: 4,
				borderSkipped: false,
				barPercentage: 0.3,
				categoryPercentage: 1,
			},
		],
	};

	return (
		<Bar
			data={data}
			width={400}
			height={360}
			options={options as any}
			plugins={[progressBar]}
		/>
	);
};

export default TopOrders;
