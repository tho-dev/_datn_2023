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
} from "@chakra-ui/react";

type Props = {};

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" },
  { title: "Third", description: "Select Rooms" },
  { title: "Third", description: "Select Rooms" },
];

const OrderStatus = (props: Props) => {
  const { activeStep } = useSteps({
    index: 1,
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
              <StepDescription>{step.description}</StepDescription>
            </Box>
          </Flex>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default OrderStatus;
