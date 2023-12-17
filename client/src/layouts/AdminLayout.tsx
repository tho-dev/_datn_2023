import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";
import LoadingPolytech from "~/components/LoadingPolytech";
import Sidebar from "~/components/common/Sidebar";
import TopBar from "~/components/common/TopBar";
import { useGetAllQuery } from "~/redux/api/notification";

const AdminLayout = () => {
  const [status, setStatus] = useState(null);
  const { data, isLoading } = useGetAllQuery({ status: status });
  const [dataNotification, setDataNotification] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setDataNotification(data.data);
    }
  }, [data]);
  const handleChangeStatusNoti = (status: any) => {
    setStatus(status);
  };

  if (isLoading) {
    return <LoadingPolytech />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Polytech | CMS</title>
      </Helmet>
      <Flex w="full" h="full">
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
          <Box w="full" minH="100vh" px="8" pt="6" bgColor="#ffffff">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </HelmetProvider>
  );
};

export default AdminLayout;
