import { Box, FormControl, FormErrorMessage, FormLabel, Text } from "@chakra-ui/react";
import { Select, chakraComponents } from "chakra-react-select";
import { Controller } from "react-hook-form";

// control từ useForm
// name là filed trong useForm
// defaultValue dùng trong edit

type TOptions = {
	label: any;
	value: any;
};

type Props = {
	control?: any;
	name?: any;
	title?: string;
	placeholder?: string;
	data?: Array<TOptions> | any;
	defaultValue?: any;
	rules?: any;
};

const OptionComponent = {
	Option: ({ children, ...props }: any) => (
		<Box
			p="1"
			rounded="sm"
			overflow="hidden"
			__css={{
				"& > div": {
					px: "2",
					py: "2",
					m: 0,
					rounded: "md",
					_hover: {
						bgColor: "#f8f9fa",
					},
				},
			}}
		>
			<chakraComponents.Option {...props}>
				<Text
					as="div"
					fontSize="12px"
					fontWeight="medium"
					px="2"
					py="1"
					w="full"
					maxH="max-content"
				>
					{children}
				</Text>
			</chakraComponents.Option>
		</Box>
	),
	Control: ({ children, ...props }: any) => (
		<chakraComponents.Control {...props}>
			<Text
				as="div"
				w="full"
				display="flex"
				fontSize="sm"
				h="42px"
			>
				{children}
			</Text>
		</chakraComponents.Control>
	),
};

const SelectThinkPro = ({ control, name, data, placeholder, title = "Select", defaultValue, rules }: Props) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
				return (
					<FormControl
						isInvalid={!!error}
						h="max-content"
						w="full"
						minWidth="full"
					>
						{title && (
							<FormLabel
								fontSize="sm"
								fontWeight="semibold"
							>
								{title}
							</FormLabel>
						)}

						<Select
							name={name}
							ref={ref}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							options={data}
							defaultValue={defaultValue}
							placeholder={
								<Text
									as="span"
									fontSize="13px"
								>
									{placeholder}
								</Text>
							}
							components={OptionComponent}
							closeMenuOnSelect={false}
						/>

						<FormErrorMessage>{error && error.message}</FormErrorMessage>
					</FormControl>
				);
			}}
		/>
	);
};

export default SelectThinkPro;
