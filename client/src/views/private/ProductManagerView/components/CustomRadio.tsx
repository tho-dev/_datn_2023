import React from "react";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Stack,
  useRadio,
  chakra,
  useRadioGroup,
  HStack,
  Text,
} from "@chakra-ui/react";
import { CheckedIcon } from "~/components/common/Icons";

type Props = {
  arrayRadio: any[];
};

const CustomRadio = (props: Props) => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  const { value, getRadioProps, getRootProps } = useRadioGroup({
    onChange: handleChange,
  });

  const CustomRadioButton = (props: any) => {
    const { code, ...radioProps } = props;
    const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
      useRadio(radioProps);

    return (
      <chakra.label {...htmlProps} cursor="pointer">
        <input {...getInputProps({})} hidden />
        <Box
          {...getRadioProps()}
          bgColor={code}
          w={8}
          h={8}
          rounded="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {state.isChecked && <CheckedIcon color="white" size={6} />}
        </Box>
      </chakra.label>
    );
  };

  return (
    <div>
      <Stack {...getRootProps()}>
        <HStack>
          {props.arrayRadio.map((avatar) => {
            return (
              <CustomRadioButton
                key={avatar.name}
                code={avatar.code}
                {...getRadioProps({ value: avatar.name })}
              />
            );
          })}
        </HStack>
      </Stack>
    </div>
  );
};

export default CustomRadio;
