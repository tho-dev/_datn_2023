import { Box, Flex } from "@chakra-ui/layout";
import CommonBox from "../CommonBox";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import TopOrders from "../TopOrders";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
	values: any;
	handleClick: (x: string) => void;
};

const days = [
	{
		label: "Hôm nay",
		value: "this-day",
	},
	{
		label: "Tuần trước",
		value: "week",
	},
	{
		label: "Tháng này",
		value: "this-month",
	},
	{
		label: "Tháng trước",
		value: "month",
	},
];

const TopRevenue = ({ values, handleClick }: Props) => {
	const [active, setActive] = useState(0);
	const orders = values?.revenues?.map((x: any) => x.order);
	const quantity = values?.revenues?.map((x: any) => x.quantity);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		layout: {},
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
						const count = orders[context[0]?.dataIndex];
						return `Đơn hàng: ${count}`;
					},
					title: function (context: any) {
						const count = quantity[context[0]?.dataIndex];
						return `Đã bán: ${count}`;
					},
				},
			},
			datalabels: {
				formatter: (value: any) => {
					return value;
				},
			},
		},
	};

	const data = {
		labels: values?.revenues?.map((x: any) => x.period),
		datasets: [
			{
				label: "Doanh thu",
				data: values?.revenues?.map((x: any) => x.sales),
				// backgroundColor: brands?.colors,
				// tension: 0.5,
				// borderWidth: 2,

				borderColor: "#1ab17a",
				backgroundColor: "#1ab17a",
				pointBorderColor: "#1ab17a",
				pointBorderWidth: 0,
				pointColor: "#1ab17a",
				borderRadius: 4,
				// fill: true,
			},
			{
				label: "Lợi nhuận",
				data: values?.revenues?.map((x: any) => x.profit),
				// backgroundColor: brands?.colors,
				// tension: 0.5,
				// borderWidth: 1,
				borderColor: "#f8b11b",
				backgroundColor: "#f8b11b",
				pointBorderColor: "#f8b11b",
				pointBorderWidth: 0,
				pointColor: "#f8b11b",
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
							// borderWidth="1px"
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
			<Flex
				mt="4"
				gap="12"
			>
				<Box flex="1">
					<Bar
						data={data}
						width={600}
						height={360}
						options={options as any}
					/>
				</Box>
				<Box w="400px">{values?.order_status && <TopOrders orders={values?.order_status || []} />}</Box>
			</Flex>
		</CommonBox>
	);
};

export default TopRevenue;
