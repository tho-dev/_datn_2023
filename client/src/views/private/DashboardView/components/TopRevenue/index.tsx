import { Box, Flex } from "@chakra-ui/layout";
import CommonBox from "../CommonBox";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import SelectThinkPro from "~/components/SelectThinkPro";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
	revenues: any;
	handleClick: (x: string) => void;
};

const days = [
	{
		label: "7 Ngày",
		value: "week",
	},
	{
		label: "30 Ngày",
		value: "month",
	},
	{
		label: "180 Ngày",
		value: "3-months-ago",
	},
	{
		label: "260 Ngày",
		value: "6-months-age",
	},
	{
		label: "360 Ngày",
		value: "year",
	},
];

const TopRevenue = ({ revenues, handleClick }: Props) => {
	const [active, setActive] = useState(0);
	const orders = revenues?.map((x: any) => x.order);
	const quantity = revenues?.map((x: any) => x.quantity);

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
				beginAtZero: true,
				title: {
					display: false,
					text: "Tính theo VND",
				},
				ticks: {
					// forces step size to be 50 units
					stepSize: 20000000,
				},
			},
		},
		interaction: {
			mode: "index",
		},
		plugins: {
			legend: {
				display: true,
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
				text: "1. Thống kê doanh thu & lợi nhuận",
			},
			tooltip: {
				callbacks: {
					beforeTitle: function (context: any) {
						const count = quantity[context[0]?.dataIndex];
						return `Đơn hàng: ${count}`;
					},
					title: function (context: any) {
						const count = orders[context[0]?.dataIndex];
						return `Đã bán: ${count}`;
					},
				},
			},
			datalabels: {
				formatter: (value: any, context: any) => {
					return value;
				},
			},
		},
	};

	const data = {
		labels: revenues?.map((x: any) => x.period),
		datasets: [
			{
				label: "Doanh thu",
				data: revenues?.map((x: any) => x.sales),
				// backgroundColor: brands?.colors,
				tension: 0.5,
				// borderWidth: 2,

				borderColor: "#ef476f",
				backgroundColor: "#ef476f",
				pointBorderColor: "#ef476f",
				pointBorderWidth: 0,
				pointColor: "#ef476f",
				borderRadius: 4,
				// fill: true,
			},
			{
				label: "Lợi nhuận",
				data: revenues?.map((x: any) => x.profit),
				// backgroundColor: brands?.colors,
				tension: 0.5,
				// borderWidth: 1,
				borderColor: "#f1be46",
				backgroundColor: "#f1be46",
				pointBorderColor: "#f1be46",
				pointBorderWidth: 0,
				pointColor: "#f1be46",
				borderRadius: 4,
				// fill: true,
			},
		],
	};

	return (
		<CommonBox>
			<Flex gap="4">
				{days?.map((day: any, i: number) => {
					return (
						<Box
							key={i}
							px="4"
							py="2"
							fontSize="12px"
							color={active == i ? "text.textPro" : "#637381"}
							bgColor={active == i ? "bg.bgPro" : "transparent"}
							fontWeight="semibold"
							borderWidth="1px"
							borderColor={active == i ? "text.textPro" : "#eef1f6"}
							rounded="full"
							cursor="pointer"
							onClick={() => {
								setActive(i);
								handleClick(day?.value);
							}}
						>
							{day.label}
						</Box>
					);
				})}
			</Flex>
			<Box w="full">
				<Bar
					data={data}
					width={700}
					height={360}
					options={options as any}
				/>
			</Box>
		</CommonBox>
	);
};

export default TopRevenue;
