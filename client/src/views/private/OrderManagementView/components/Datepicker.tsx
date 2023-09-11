import { Box, Flex } from "@chakra-ui/layout";
import "flatpickr/dist/themes/material_green.css";
import React from "react";

import Flatpickr from "react-flatpickr";

const Datepicker = () => {
  const [date, setDate] = React.useState<Date>();
  return (
    <Flex
      w={"20%"}
      borderWidth={1}
      borderColor={"gray.200"}
      px={4}
      alignItems={"center"}
      rounded={"sm"}
    >
      <Flatpickr
        placeholder="Chọn ngày..."
        options={{
          mode: "single",
          dateFormat: "d/m/Y",
          format: "d/m/Y"
        }}
        value={date}
        onChange={(date) => {
          setDate(date);
        }}
      />
    </Flex>
  );
};

export default Datepicker;
