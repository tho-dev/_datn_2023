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
		{ title: "First", description: "processing", tran: "Chờ xác nhận" },
		{ title: "Second", description: "confirmed", tran: "Đã xác nhận" },
		{ title: "Third", description: "cancelled", tran: "Đã huỷ đơn" },
		{ title: "Third", description: "delivering", tran: "Đang vận chuyển" },
		{ title: "Third", description: "pendingComplete", tran: "Chờ hoàn thành" },
		{ title: "Third", description: "delivered", tran: "Đã hoàn thành" },
		{ title: "Third", description: "returned", tran: "Đã hoàn hàng" },
	];
	const findIndex = steps.findIndex((item) => item.description === data);
	const { activeStep } = useSteps({
		index: findIndex + 1,
		count: steps.length,
	});

	return (
		<Stepper
			size="md"
			index={activeStep}
			colorScheme="green"
			py="4"
		>
			{steps.map((step, index) => (
				<Step key={index}>
					<Flex
						flexDirection="column"
						alignItems="center"
						gap={2}
					>
						<StepIndicator
						// color="text.textWarning"
						// bgColor="bg.bgWarning"
						// border="none"
						>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>
						<Box>
							<Box
								textAlign="center"
								fontWeight="semibold"
								fontSize="13px"
								textTransform="capitalize"
							>
								{step.tran}
							</Box>
						</Box>
					</Flex>

					<StepSeparator />
				</Step>
			))}
		</Stepper>
	);
};

export default OrderStatus;
