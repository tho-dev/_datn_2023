import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle, defineStyleConfig } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
	field: {},
});

const small = defineStyle({
	px: "4",
	h: "40px",
	fontSize: "sm",
	_placeholder: {
		fontSize: "13px",
	},
});

const medium = defineStyle({
	px: "4",
	h: "42px",
	fontSize: "sm",
});

const lager = defineStyle({
	px: "4",
	h: "46px",
	fontSize: "sm",
});

const sizes = {
	small: definePartsStyle({ field: small, addon: small }),
	medium: definePartsStyle({ field: medium, addon: medium }),
	lager: definePartsStyle({ field: lager, addon: lager }),
};

const primary = definePartsStyle({
	field: {
		color: "text.black",
		fontWeight: "500",
		lineHeight: 1.5,
		borderRadius: "4px",
		border: "1px solid",
		borderColor: "border.primary",
		_focusVisible: {
			outline: "none",
		},
	},
});

export const Input = defineMultiStyleConfig({
	// Styles for the base style
	baseStyle,
	// Styles for the size variations
	sizes,
	// Styles for the visual style variations
	variants: { primary },
	// The default `size` or `variant` values
	defaultProps: {
		size: "medium",
		variant: "primary",
	},
});
