import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import CheckPhone from "./components/CheckPhone";
import ListOrder from "./components/ListOrder";

type Props = {};

const HistoryOrderView = (props: Props) => {
  const [isOrder, setIsOrder] = useState<boolean>(true);
  const handleCheckOrdered = () => {
    setIsOrder(false);
  };

  return (
    <Box m="30px 0">
      {isOrder ? (
        <CheckPhone handleCheckOrdered={handleCheckOrdered} />
      ) : (
        <ListOrder />
      )}
    </Box>
  );
};

export default HistoryOrderView;
