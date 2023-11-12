import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import CheckPhone from "./components/CheckPhone";
import ListOrder from "./components/ListOrder";

type Props = {};

const HistoryOrderView = (props: Props) => {
  const [checkPhone, setCheckPhone] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [dataOrder, setDataOrder] = useState([] as any);

  const handleGetPhoneNumber = (phoneNumber: any) => {
    setPhoneNumber(phoneNumber);
  };
  return (
    <Box m="30px 0">
      {checkPhone ? (
        <>
          <CheckPhone
            setCheckPhone={setCheckPhone}
            handleGetPhoneNumber={handleGetPhoneNumber}
            setDataOrder={setDataOrder}
          />
        </>
      ) : (
        <ListOrder dataOrder={dataOrder} phoneNumber={phoneNumber} />
      )}
    </Box>
  );
};

export default HistoryOrderView;
