import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Flex, Box } from "@chakra-ui/layout";
import Sidebar from "~/components/common/Sidebar";
import TopBar from "~/components/common/TopBar";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PrivateRoute from "~/routes/protected";
import { useAppSelector } from "~/redux/hook/hook";
import { useGetByIdQuery, useGetAllQuery } from "~/redux/api/notification";
type Props = {};

const AdminLayout = (props: Props) => {
  const [status, setStatus] = useState(null);
  const user = useAppSelector((state) => state.persistedReducer.global.user);
  // const { data, isLoading, isFetching } = useGetAllQuery({ status: status });
  const [dataNotification, setDataNotification] = useState<any>([]);

  // useEffect(() => {
  //   if (data) {
  //     setDataNotification(data.data);
  //   }
  // }, [data]);

  const handleChangeStatusNoti = (status: any) => {
    setStatus(status);
  };
  // if (isLoading) {
  //   return <Box>Loading...</Box>;
  // }
  // if (isFetching) {
  //   return <Box>isFetching...</Box>;
  // }
  return (
    <HelmetProvider>
      <Helmet>
        <title>Quản Lý Hệ Thống | VanVietSoft</title>
      </Helmet>
      <Flex w="full" h="full">
        {/* Sidebar */}
        <Box w="15%">
          <Sidebar />
        </Box>
        <Flex w="full" h="full">
          <Box w="full" minH="100vh" pl="6" pr="8" pt="6" bgColor="bg.admin1">
            <PrivateRoute component={AdminLayout} />
          </Box>
        </Flex>
      </Flex>
    </HelmetProvider>
  );
};

export default AdminLayout;
