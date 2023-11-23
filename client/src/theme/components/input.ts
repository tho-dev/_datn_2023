import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({});

const small = defineStyle({
	w: "full",
	px: "4",
	h: "48px",
	fontSize: "sm",
	_placeholder: {
		fontSize: "13px",
	},
});

const medium = defineStyle({
	w: "full",
	px: "4",
	h: "48px",
	fontSize: "sm",
	_placeholder: {
		fontSize: "13px",
	},
});

const lager = defineStyle({
	w: "full",
	px: "4",
	h: "48px",
	fontSize: "sm",
	_placeholder: {
		fontSize: "13px",
	},
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
		borderRadius: "8px",
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
