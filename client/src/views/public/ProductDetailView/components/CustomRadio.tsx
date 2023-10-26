import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Stack, useRadio, chakra, useRadioGroup } from "@chakra-ui/react";

type Props = {
	arrayRadio: any[];
	defaultRadio: any[];
	handeChangeSku: (value: any, index: any) => void;
	index: number;
};

const CustomRadio = (props: Props) => {
	const handleChange = (value: any) => {
		props.handeChangeSku(value, props.index);
	};

	const new_default_value = props.defaultRadio.find((item) => {
		return props?.arrayRadio?.some((value) => value?.label == item);
	});

	const { value, getRadioProps, getRootProps } = useRadioGroup({
		defaultValue: new_default_value,
		onChange: handleChange,
	});

	const CustomRadioButton = (props: any) => {
		const { label, ...radioProps } = props;
		const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } = useRadio(radioProps);
		return (
			<chakra.label
				{...htmlProps}
				cursor="pointer"
			>
				<input
					{...getInputProps({})}
					hidden
				/>
				<Box
					{...getRadioProps()}
					bg={`${state.isChecked ? "#EBF3FF" : "white"}`}
					color={`${state.isChecked ? "#0065EE" : "#111"}`}
					border={`${state.isChecked ? "1px solid #0065EE" : "1px solid #ccc"}`}
					fontSize={"12px"}
					px="4"
					py="6px"
					fontWeight="semibold"
					maxW="max-content"
					h="full"
					maxH="max-content"
					whiteSpace="pre-line"
					rounded="4px"
				>
					{label}
				</Box>
			</chakra.label>
		);
	};

	return (
		<div>
			<Stack {...getRootProps()}>
				<Flex
					gap="3"
					flexWrap="wrap"
				>
					{props?.arrayRadio?.map((variant) => {
						return (
							<CustomRadioButton
								key={variant.label}
								label={variant.label}
								{...getRadioProps({
									value: variant.label,
								})}
							/>
						);
					})}
				</Flex>
			</Stack>
		</div>
	);
};

export default CustomRadio;
