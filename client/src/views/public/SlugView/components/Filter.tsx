import React from "react";
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  PopoverArrow,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "~/components/common/Icons";

type Props = {
  title: string;
};

const FilterProduct = ({ title }: Props) => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button
          bgColor="bg.white"
          color="black"
          fontWeight="bold"
          rightIcon={<ArrowUpIcon size={4} />}
          padding={2}
        >
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="medium">
          <Radio value="1">
            <Text fontSize="sm"> Tất cả</Text>
          </Radio>
          <Box py={3} maxHeight="400px">
            <Grid
              gridTemplateColumns="repeat(3, minmax(0px, 1fr))"
              columnGap="2rem"
              rowGap="0.25rem"
            >
              <GridItem>
                <Checkbox value="Asus">
                  <Text fontSize="14px">Asus</Text>
                </Checkbox>
              </GridItem>
              <GridItem>
                <Checkbox value="Asus" fontSize="sm">
                  <Text fontSize="14px">Asus</Text>
                </Checkbox>
              </GridItem>
              <GridItem>
                <Checkbox value="Asus" fontSize="sm">
                  <Text fontSize="14px">Asus</Text>
                </Checkbox>
              </GridItem>
              <GridItem>
                <Checkbox value="Asus" fontSize="sm">
                  <Text fontSize="14px">Asus</Text>
                </Checkbox>
              </GridItem>
              <GridItem>
                <Checkbox value="Asus" fontSize="sm">
                  <Text fontSize="14px">Asus</Text>
                </Checkbox>
              </GridItem>
              <GridItem>
                <Checkbox value="Asus" fontSize="sm">
                  <Text fontSize="14px">Asus</Text>
                </Checkbox>
              </GridItem>
              <GridItem>
                <Checkbox value="Asus" fontSize="sm">
                  <Text fontSize="14px">Asus</Text>
                </Checkbox>
              </GridItem>
            </Grid>
          </Box>
        </PopoverHeader>
        <PopoverBody>
          <Text fontSize="xs">Xem thêm</Text>
        </PopoverBody>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};

export default FilterProduct;
