import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Flex, Box } from "@chakra-ui/layout";
import Sidebar from "~/components/common/Sidebar";
import TopBar from "~/components/common/TopBar";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PrivateRoute from "~/routes/protected";
import { useAppSelector } from "~/redux/hook/hook";
import { useGetByIdQuery, useGetAllQuery } from "~/redux/api/notification";
import { socket } from "~/App";
import { useToast } from "@chakra-ui/react";
type Props = {};

const AdminLayout = (props: Props) => {
	const [status, setStatus] = useState(null);
	const user = useAppSelector((state) => state.persistedReducer.global.user);
	const { data, isLoading, isFetching } = useGetAllQuery({ status: status });
	const [dataNotification, setDataNotification] = useState<any>([]);

	useEffect(() => {
		if (data) {
			setDataNotification(data.data);
		}
	}, [data]);

	useEffect(() => {
		socket.emit("joinRoom", "don-hang", user._id, user.role);
	}, []);

	useEffect(() => {
		if (data) {
			socket.on("notification", (notification: any) => {
				const { roomName, ...rest } = notification;
				setDataNotification([...data.data, rest]);
			});
		}
	}, [socket, data]);
	const handleChangeStatusNoti = (status: any) => {
		setStatus(status);
	};
	if (isLoading) {
		return <Box>Loading...</Box>;
	}
	if (isFetching) {
		return <Box>isFetching...</Box>;
	}
	return (
		<HelmetProvider>
			<Helmet>
				<title>ThinkPro | CMS</title>
			</Helmet>
			<Flex
				w="full"
				h="full"
			>
				{/* Sidebar */}
				<Sidebar />
				<Flex
					w="full"
					h="full"
					ml={{
						sm: "86px",
						md: "86px",
						lg: "86px",
						xl: "260px",
						"2xl": "260px",
					}}
					mt={{
						sm: "64px",
						md: "64px",
						lg: "86px",
						xl: "86px",
						"2xl": "86px",
					}}
					flexDir="column"
				>
					{/* Top bar */}
					<TopBar
						data_notification={dataNotification}
						handleChangeStatusNoti={handleChangeStatusNoti}
					/>
					<Box
						w="full"
						minH="100vh"
						pl="6"
						pr="8"
						pt="6"
						bgColor="bg.admin1"
					>
						<PrivateRoute component={AdminLayout} />
					</Box>
				</Flex>
			</Flex>
		</HelmetProvider>
	);
};

export default AdminLayout;
