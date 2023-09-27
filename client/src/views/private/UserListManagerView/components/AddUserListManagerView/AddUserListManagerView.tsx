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
  Text,
} from "@chakra-ui/react";
import Profine from "./components/Profine";
import Address from "./components/Address";
import Confirmation from "./components/Confirmation";

type Props = {};
const steps = [
  { title: "Profile" },
  { title: "Password and Address" },
  { title: "Preview" },
];
const AddUserListManagerView = (props: Props) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrevStep = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };
  return (
    <Box height="100vh" width="70%" margin="0 auto">
      <Stepper index={activeStep} cursor="pointer">
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>
                <Text fontSize={16} fontWeight="bold">
                  {step.title}
                </Text>
              </StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {activeStep == 0 && <Profine handleNextStep={handleNextStep} />}
      {activeStep == 1 && (
        <Address
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      )}
      {activeStep == 2 && <Confirmation handlePrevStep={handlePrevStep} />}
    </Box>
  );
};

export default AddUserListManagerView;
