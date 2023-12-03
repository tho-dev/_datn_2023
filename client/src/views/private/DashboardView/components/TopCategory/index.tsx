import { Box, Flex } from "@chakra-ui/layout";
import CommonBox from "../CommonBox";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
	values: any;
};

const TopCategory = ({ values }: Props) => {
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
					step: 50,
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
				text: "2. Thống kê sản phẩm & thương hiệu",
			},
		},
	};

	const data = {
		labels: values?.categories?.labels,
		datasets: [
			{
				label: "Sản phẩm",
				data: values?.categories?.values,
				borderColor: "#1ab17a",
				backgroundColor: "#1ab17a",
				pointBorderColor: "#1ab17a",
				pointBorderWidth: 0,
				pointColor: "#1ab17a",
				borderRadius: 4,
				// fill: true,
			},
			{
				label: "Thương hiệu",
				data: values?.brands?.values,
				tension: 0.5,
				borderColor: "#f8b11b",
				backgroundColor: "#f8b11b",
				pointBorderColor: "#f8b11b",
				pointColor: "#f8b11b",
				// fill: true,
			},
		],
	};

	return (
		<CommonBox>
			<Box
				w="full"
				mt="4"
			>
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

export default TopCategory;
