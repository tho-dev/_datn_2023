import { FormControl, FormErrorMessage, FormLabel, Text } from "@chakra-ui/react";
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
	control: any;
	name: any;
	title: string;
	placeholder: string;
	data: Array<TOptions> | any;
	defaultValue?: Array<{
		label: any;
		value: any;
	}>;
	rules?: any;
};

const OptionComponent = {
	Option: ({ children, ...props }: any) => (
		<chakraComponents.Option {...props}>
			<Text
				as="div"
				fontSize="sm"
			>
				{children}
			</Text>
		</chakraComponents.Option>
	),
	Control: ({ children, ...props }: any) => (
		<chakraComponents.Control {...props}>
			<Text
				as="div"
				w="full"
				display="flex"
				fontSize="sm"
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
					<FormControl isInvalid={!!error}>
						<FormLabel
							fontSize="sm"
							fontWeight="semibold"
						>
							{title}
						</FormLabel>

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
