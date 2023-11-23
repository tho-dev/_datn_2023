import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  Button,
  Flex,
  Box,
  Text,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import ItemModalOrder from "./ItemModalOrder";
import Flatpickr from "react-flatpickr";

type Props = {
  isOpen?: boolean;
  onClose?: any;
  handleClick?: any;
  icon?: React.ReactNode;
  size?: string;
  title?: string;
  textBtnClose?: string;
  mode?: string;
  data: any;
};
function findMostFrequentObject(arr: any) {
  const counts = {} as any;

  const mostFrequent = arr.reduce(
    (acc: any, current: any) => {
      const name = current.customer_name;
      counts[name] = (counts[name] || 0) + 1;

      if (counts[name] > acc.maxCount) {
        acc.maxCount = counts[name];
        acc.mostFrequentObject = current;
      }

      return acc;
    },
    { mostFrequentObject: null, maxCount: 0 }
  );

  return mostFrequent;
}

const ModalOrder = ({
  isOpen = false,
  onClose,
  size = "3xl",
  title = "Chi tiết thống kê đơn hàng",
  textBtnClose = "Đóng",
  mode,
  data,
}: Props) => {
  const [dataOrder, setDataOrder] = useState([]);
  const [user1, setUser1] = useState({} as any);
  const [user2, setUser2] = useState({} as any);
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(
    new Date().setDate(1) as any
  );
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date() as any);

  const cancelRef = React.useRef();
  const handleDateChangeFrom = (selectedDates: any) => {
    setSelectedDateFrom(selectedDates[0]);
  };
  const handleDateChangeTo = (selectedDates: any) => {
    setSelectedDateTo(selectedDates[0]);
  };

  useEffect(() => {
    if (selectedDateFrom > selectedDateTo) {
      return alert("ngày chọn sai");
    }
    const productsInCurrentMonth = data?.new_docs.filter((product: any) => {
      const productDate = new Date(product.created_at);
      return productDate >= selectedDateFrom && productDate <= selectedDateTo;
    });
    setDataOrder(productsInCurrentMonth);
    const user_order_total_money = productsInCurrentMonth?.reduce(
      (max: any, current: any) => {
        return max.total_amount > current.total_amount ? max : current;
      }
    );
    setUser1({
      customer_name: user_order_total_money.customer_name,
      total_amount: user_order_total_money.total_amount,
    });
    const { mostFrequentObject, maxCount } = findMostFrequentObject(
      productsInCurrentMonth
    );
    setUser2({
      customer_name: mostFrequentObject.customer_name,
      total_amount: maxCount,
    });
  }, [selectedDateFrom, selectedDateTo]);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef as any}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={size}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogCloseButton />
        <AlertDialogBody pb="0">
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            p="4"
          >
            <Flex
              m="2"
              justifyContent="space-between"
              w="100%"
              alignItems="center"
            >
              <Text fontSize="lg" textAlign="center" fontWeight="bold">
                {title}
              </Text>
              <Flex gap={4} alignItems="center">
                <Flatpickr
                  options={{
                    dateFormat: "d-m-Y", // Định dạng ngày
                    inline: false,
                  }}
                  value={selectedDateFrom}
                  onChange={handleDateChangeFrom}
                  placeholder="Nhấp để chọn ngày"
                  readOnly
                  style={{
                    border: "1px solid #ccc",
                    width: "100%",
                    padding: "9.5px",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                />
                <Text fontWeight="bold">to</Text>
                <Flatpickr
                  value={selectedDateTo}
                  options={{
                    dateFormat: "d-m-Y", // Định dạng ngày
                    inline: false,
                    maxDate: new Date().setDate(new Date().getDate() + 1),
                  }}
                  onChange={handleDateChangeTo}
                  placeholder="Nhấp để chọn ngày"
                  readOnly
                  style={{
                    border: "1px solid #ccc",
                    width: "100%",
                    padding: "9.5px",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                ></Flatpickr>
              </Flex>
            </Flex>
          </Flex>
          {mode === "order" && (
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <ItemModalOrder
                  title="Tổng số đơn hàng"
                  number={dataOrder.length}
                />
              </GridItem>
              <GridItem>
                <ItemModalOrder
                  title="Đơn hàng thành công"
                  number={
                    dataOrder?.filter((item: any) => item.status == "delivered")
                      .length
                  }
                />
              </GridItem>
              <GridItem>
                <ItemModalOrder
                  title="Đơn chờ xác nhận"
                  number={
                    dataOrder?.filter(
                      (item: any) => item.status == "processing"
                    ).length
                  }
                />
              </GridItem>
              <GridItem>
                <ItemModalOrder
                  title="Đơn đã xác nhận"
                  number={
                    dataOrder?.filter((item: any) => item.status == "confirmed")
                      .length
                  }
                />
              </GridItem>
              <GridItem>
                <ItemModalOrder
                  title="Đơn đang vận chuyển"
                  number={
                    dataOrder?.filter(
                      (item: any) => item.status == "delivering"
                    ).length
                  }
                />
              </GridItem>
              <GridItem>
                <ItemModalOrder
                  title="Đơn đã huỷ"
                  number={
                    dataOrder?.filter((item: any) => item.status == "cancelled")
                      .length
                  }
                />
              </GridItem>
            </Grid>
          )}
          {mode === "money" && (
            <>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <ItemModalOrder
                    title="Tổng số tiền hàng"
                    number={`${dataOrder
                      .reduce((acc, item: any) => {
                        return acc + item.total_amount;
                      }, 0)
                      .toLocaleString()} đ`}
                  />
                </GridItem>
                <GridItem>
                  <ItemModalOrder
                    title="Đơn hàng thành công"
                    number={`${dataOrder
                      .filter((item: any) => {
                        return item.status === "delivered";
                      })
                      .reduce((acc, item: any) => {
                        return acc + item.total_amount;
                      }, 0)
                      .toLocaleString()} đ`}
                  />
                </GridItem>
                <GridItem>
                  <ItemModalOrder
                    title="Đơn chờ xác nhận"
                    number={`${dataOrder
                      .filter((item: any) => {
                        return item.status === "processing";
                      })
                      .reduce((acc, item: any) => {
                        return acc + item.total_amount;
                      }, 0)
                      .toLocaleString()} đ`}
                  />
                </GridItem>
                <GridItem>
                  <ItemModalOrder
                    title="Đơn đã xác nhận"
                    number={`${dataOrder
                      .filter((item: any) => {
                        return item.status === "confirmed";
                      })
                      .reduce((acc, item: any) => {
                        return acc + item.total_amount;
                      }, 0)
                      .toLocaleString()} đ`}
                  />
                </GridItem>
                <GridItem>
                  <ItemModalOrder
                    title="Đơn đang vận chuyển"
                    number={`${dataOrder
                      .filter((item: any) => {
                        return item.status === "delivering";
                      })
                      .reduce((acc, item: any) => {
                        return acc + item.total_amount;
                      }, 0)
                      .toLocaleString()} đ`}
                  />
                </GridItem>
                <GridItem>
                  <ItemModalOrder
                    title="Đơn đã huỷ"
                    number={`${dataOrder
                      .filter((item: any) => {
                        return item.status === "cancelled";
                      })
                      .reduce((acc, item: any) => {
                        return acc + item.total_amount;
                      }, 0)
                      .toLocaleString()} đ`}
                  />
                </GridItem>
              </Grid>
              <Box mt={4}>
                <ItemModalOrder
                  title="Doanh Thu"
                  number={`${dataOrder
                    .filter((item: any) => {
                      return item.status === "delivered";
                    })
                    .reduce((acc, item: any) => {
                      return acc + item.total_amount;
                    }, 0)
                    .toLocaleString()} đ`}
                />
              </Box>
            </>
          )}
          {mode === "user" && (
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <ItemModalOrder
                  title="Tổng số khách hàng trong tháng"
                  number={
                    [
                      ...new Set(
                        dataOrder.map((item: any) => item.customer_name)
                      ),
                    ].length
                  }
                />
              </GridItem>
              <GridItem>
                <ItemModalOrder
                  title="Khách hàng đặt đơn giá trị nhất"
                  number={user1?.total_amount?.toLocaleString() || 0}
                />
              </GridItem>
              <GridItem>
                <ItemModalOrder
                  title="Khách hàng đặt nhiều đơn nhất"
                  number={user2?.total_amount || 0}
                />
              </GridItem>
            </Grid>
          )}
          {mode === "product" && (
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <ItemModalOrder
                  title="Tổng số sản phẩm đã bán"
                  number={dataOrder.reduce((total_order: any, item: any) => {
                    return total_order + item.products.length;
                  }, 0)}
                />
              </GridItem>
            </Grid>
          )}
        </AlertDialogBody>
        <AlertDialogFooter justifyContent="center" pt="6" pb="12">
          <Button
            ref={cancelRef as any}
            onClick={onClose}
            bgColor="#f3f6f9"
            color="text.black"
            transition="all 0.5s ease"
            _hover={{
              transform: "translateY(-5px)",
              bgColor: "#cfd1d4",
            }}
          >
            {textBtnClose}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalOrder;
