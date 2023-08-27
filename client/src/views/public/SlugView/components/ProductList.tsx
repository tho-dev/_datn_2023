import React, { ChangeEvent, useState } from "react";
import { Grid, GridItem, Box, Switch, FormLabel, Flex } from "@chakra-ui/react";
import CardThinkPro from "~/components/CardThinkPro";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "~/components/common/Icons";

type Props = {};

const ProductList = (props: Props) => {
  const [listProducts, setListProducts] = useState<any[]>(
    Array.from([1, 2, 3, 4, 5, 6])
  );
  const [showCompare, setShowCompare] = useState<boolean>(false);

  const handleCompare = (event: ChangeEvent<HTMLInputElement>): void => {
    setShowCompare(!showCompare);
  };

  return (
    <Box m="30px 0">
      <Flex w="100%" justifyContent="space-between" m="30px 0">
        <Flex alignItems="center" gap={2}>
          <Switch
            size="md"
            id="isChecked"
            onChange={handleCompare}
            value={showCompare}
          />
          <FormLabel htmlFor="isChecked" fontSize="sm" marginTop={2}>
            So sánh
          </FormLabel>
        </Flex>

        <Box>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ArrowUpIcon size={4} />}
              bgColor="bg.white"
              textColor="bg.black"
              fontSize="xs"
              fontWeight="bold"
              padding={2}
            >
              Sắp xếp : Nổi bật nhất
            </MenuButton>
            <MenuList>
              <RadioGroup>
                <MenuItem textColor="black" fontSize="sm" fontWeight="500">
                  <Radio value="1">Nổi bật nhất</Radio>
                </MenuItem>
                <MenuItem textColor="black" fontSize="sm" fontWeight="500">
                  <Radio value="1">Giá thấp -&gt; cao</Radio>
                </MenuItem>
                <MenuItem textColor="black" fontSize="sm" fontWeight="500">
                  <Radio value="1">Giá thấp -&gt; cao</Radio>
                </MenuItem>
              </RadioGroup>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        {listProducts.map((product) => {
          return (
            <GridItem w="100%">
              <CardThinkPro showCompare={showCompare} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductList;
