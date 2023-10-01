import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import CardShippingDetail from "./CardShippingDetail";
import OrderStatus from "./OrderStatus";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

type Props = {};

const ShippingDetail = (props: Props) => {
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
          Ngày giao hàng :14 Jan, 2023
        </Text>
      </Flex>

      <Grid gridTemplateColumns="repeat(3,1fr)" gap={4} paddingY={7}>
        <GridItem>
          <CardShippingDetail />
        </GridItem>
        <GridItem>
          <CardShippingDetail />
        </GridItem>
        <GridItem>
          <CardShippingDetail />
        </GridItem>
      </Grid>
      <Box>
        <Text fontSize="18px" fontWeight="bold">
          Tình trạng đơn hàng
        </Text>
        <Box m="5px 0" padding={4}>
          <OrderStatus />
        </Box>
      </Box>
      <Box>
        <Text pb={5} fontSize="18px" fontWeight="bold">
          Xem bản đồ
        </Text>
        <Box width="100%" maxH="500px">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
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
