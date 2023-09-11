import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { SearchIcon } from "~/components/common/Icons";
import Flatpickr from "react-flatpickr";

type Props = {};

const FilterShipments = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState(null as any);
  const flatpickrRef: any = useRef(null);

  const handleInputClick = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.open();
    }
  };

  const handleDateChange = (selectedDates: any) => {
    setSelectedDate(selectedDates[0]);
  };
  return (
    <Box>
      <Grid gridTemplateColumns="repeat(12,1fr)" gap={2}>
        <GridItem colSpan={3}>
          <Box width="100%">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon size={4} />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Tìm kiếm hoá đơn..."
                outline="none"
                border="1px solid #ccc"
              />
            </InputGroup>
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <Box width="100%">
            <Flatpickr
              options={{
                dateFormat: "Y-m-d", // Định dạng ngày
                inline: false,
              }}
              onChange={handleDateChange}
              placeholder="Nhấp để chọn ngày"
              readOnly
              style={{
                border: "1px solid #ccc",
                width: "100%",
                padding: "9.5px",
                borderRadius: "4px",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box width="100%">
            <Select placeholder="Trạng thái">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box width="100%">
            <Select placeholder="All">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Button width="100%" bgColor="bg.blue">
            Filters
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FilterShipments;
