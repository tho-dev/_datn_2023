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
  CheckboxGroup,
} from "@chakra-ui/react";
import { Controller, useFieldArray } from "react-hook-form";
import { ArrowUpIcon } from "~/components/common/Icons";

type Props = {
  title: string;
  data: any;
  name: string;
  control: any;
  watch: any;
  nested: number;
  register: any;
};

const FilterProduct = ({ nested, title, data, control }: Props) => {
  const { fields } = useFieldArray({
    control,
    name: `filters.${nested}.options`,
  });

  return (
    data?.length > 0 && (
      <Popover>
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
        <PopoverContent w="auto">
          <PopoverHeader fontWeight="medium">
            <Radio defaultChecked>
              <Text fontSize="sm">Tất cả</Text>
            </Radio>
            <Box py={3} maxHeight="400px">
              <Grid gap="3" gridTemplateColumns="repeat(3, minmax(0px, 1fr))">
                {fields?.map((option: any, index: number) => {
                  return (
                    <GridItem key={option.id}>
                      <Controller
                        control={control}
                        name={`filters.${nested}.options.[${index}].checked`}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <CheckboxGroup onChange={onChange} value={[value]}>
                            <Checkbox
                              onChange={onChange}
                              defaultValue={option?.value}
                              name={name}
                              ref={ref}
                            >
                              <Text fontSize="14px">{option?.label}</Text>
                            </Checkbox>
                          </CheckboxGroup>
                        )}
                      />
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>
          </PopoverHeader>
          <PopoverBody>
            <Text fontSize="xs">Xem thêm</Text>
          </PopoverBody>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    )
  );
};

export default FilterProduct;
