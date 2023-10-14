import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import CardShippingDetail from "./CardShippingDetail";
import OrderStatus from "./OrderStatus";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useGetOneShippingQuery } from "~/redux/api/order";
import moment from "moment";
import { CartIcon, UserIcon, AddressIcon } from "~/components/common/Icons";
type Props = {
  orderId: any;
};

const ShippingDetail = ({ orderId }: Props) => {
  const { data, isLoading, isFetching, isError } = useGetOneShippingQuery({
    id: orderId,
  });
  if (isLoading) {
    return <Box>isLoading...</Box>;
  }
  if (isFetching) {
    return <Box>isFetching...</Box>;
  }
  if (isError) {
    return <Box>isError...</Box>;
  }
  console.log(data);
  return (
    <Box width="100%">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        border="1px solid #ccc"
      >
        <Text fontSize="18px" fontWeight="bold">
          Chi tiết hoá đơn
        </Text>
        <Text fontSize="14px" fontWeight="semibold">
          Ngày giao hàng :
          {moment(data?.data.shipping_info.estimated_delivery_date).format(
            "YYYY-MM-DD HH:mm:ss"
          )}
        </Text>
      </Flex>

      <Grid gridTemplateColumns="repeat(3,1fr)" gap={4} paddingY={7}>
        <GridItem>
          <CardShippingDetail
            title="Thông tin hoá đơn"
            id={`ID:${data?.data._id}`}
            total={`Amount Total:${data?.data.total_amount}`}
            date={`Ngày giao dự kiến: ${moment(
              data?.data.shipping_info.estimated_delivery_date
            ).format("YYYY-MM-DD")}`}
            icon={<CartIcon size={6} />}
            color="#00FFFF"
          />
        </GridItem>
        <GridItem>
          <CardShippingDetail
            title="Địa chỉ giao hàng"
            id={data?.data.shipping_info.shipping_address}
            total={`Mã đơn hàng: ${data?.data.shipping_info.order_code}`}
            icon={<AddressIcon size={6} />}
            color="#FFFFCC"
          />
        </GridItem>
        <GridItem>
          <CardShippingDetail
            title="Thông tin khách hàng"
            id={data?.data.customer_name}
            total={`Phone number:+${data?.data.phone_number}`}
            date="Email: không có"
            icon={<UserIcon size={6} />}
            color="#CCFFFF"
          />
        </GridItem>
      </Grid>
      <Box>
        <Text fontSize="18px" fontWeight="bold">
          Tình trạng đơn hàng
        </Text>
        <Box m="5px 0" padding={4}>
          <OrderStatus data={data?.data.status} />
        </Box>
      </Box>
      <Box>
        <Text pb={5} fontSize="18px" fontWeight="bold">
          Xem bản đồ
        </Text>
        <Box width="100%" minH="700px">
          <MapContainer
            center={[
              data?.data?.order_info.data.to_location.lat,
              data?.data?.order_info.data.to_location.long,
            ]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                data?.data?.order_info.data.to_location.lat,
                data?.data?.order_info.data.to_location.long,
              ]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ShippingDetail;
