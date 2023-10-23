import { Box, Text, Grid, GridItem } from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  Radio,
  Checkbox,
  PopoverArrow,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "~/components/common/Icons";

type Props = {
  title: string;
  data: any;
};

const FilterProduct = ({ title, data }: Props) => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button
          bgColor="bg.white"
          color="black"
          fontSize="xs"
          fontWeight="semibold"
          rightIcon={<ArrowUpIcon size={4} />}
          padding="3"
          rounded="lg"
        >
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="medium">
          <Radio value="" defaultChecked>
            <Text fontSize="sm">Tất cả</Text>
          </Radio>
          <Box py={3} maxHeight="400px">
            <Grid
              gridTemplateColumns="repeat(3, minmax(0px, 1fr))"
              columnGap="2rem"
              rowGap="0.25rem"
            >
              {data?.map((option: any, index: number) => {
                return (
                  <GridItem>
                    <Checkbox
                      name={title}
                      value={option?.value}
                      key={index}
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <Text fontSize="14px">{option?.label}</Text>
                    </Checkbox>
                  </GridItem>
                );
              })}

              {/* <GridItem>
								<Checkbox
									value="Asus"
									fontSize="sm"
								>
									<Text fontSize="14px">Asus</Text>
								</Checkbox>
							</GridItem>
							<GridItem>
								<Checkbox
									value="Asus"
									fontSize="sm"
								>
									<Text fontSize="14px">Asus</Text>
								</Checkbox>
							</GridItem>
							<GridItem>
								<Checkbox
									value="Asus"
									fontSize="sm"
								>
									<Text fontSize="14px">Asus</Text>
								</Checkbox>
							</GridItem>
							<GridItem>
								<Checkbox
									value="Asus"
									fontSize="sm"
								>
									<Text fontSize="14px">Asus</Text>
								</Checkbox>
							</GridItem>
							<GridItem>
								<Checkbox
									value="Asus"
									fontSize="sm"
								>
									<Text fontSize="14px">Asus</Text>
								</Checkbox>
							</GridItem>
							<GridItem>
								<Checkbox
									value="Asus"
									fontSize="sm"
								>
									<Text fontSize="14px">Asus</Text>
								</Checkbox>
							</GridItem> */}
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
