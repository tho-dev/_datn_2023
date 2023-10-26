import React from "react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

type Props = {
  data: any;
};

const OrderStatus = ({ data }: Props) => {
  const steps = [
    { title: "First", description: "processing", tran: "chờ xác nhận" },
    { title: "Second", description: "confirmed", tran: "Đã xác nhận" },
    { title: "Third", description: "cancelled", tran: "Đã huỷ đơn" },
    { title: "Third", description: "delivering", tran: "Đang vận chuyển" },
    { title: "Third", description: "delivered", tran: "Đã vận chuyển" },
    { title: "Third", description: "returned", tran: "Đã hoàn hàng" },
  ];
  const findIndex = steps.findIndex((item) => item.description === data);
  const { activeStep } = useSteps({
    index: findIndex + 1,
    count: steps.length,
  });

  return (
    <Stepper size="md" index={activeStep} colorScheme="green">
      {steps.map((step, index) => (
        <Step key={index}>
          <Flex flexDirection="column" alignItems="center" gap={2}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box>
              <Box textAlign="center">{step.title}</Box>
              <StepDescription>
                <Text textTransform="capitalize">{step.tran}</Text>
              </StepDescription>
            </Box>
          </Flex>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default OrderStatus;
