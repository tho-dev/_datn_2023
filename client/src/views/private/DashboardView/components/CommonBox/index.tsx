import { Box } from "@chakra-ui/layout";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const CommonBox = ({ children }: Props) => {
  return (
    <Box
      py="8"
      px="6"
      rounded="16px"
      borderWidth="1px"
      borderColor="#eef1f6"
      boxShadow="0 0.375rem 0.75rem rgba(140,152,164,.075)"
    >
      {children}
    </Box>
  );
};

export default CommonBox;
