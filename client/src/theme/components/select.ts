import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys);

const small = defineStyle({
	px: "4",
	h: "8",
	fontSize: "sm",
});

const medium = defineStyle({
	px: "4",
	h: "44px",
	fontSize: "sm",
});

const lager = defineStyle({
	px: "4",
	h: "44px",
	fontSize: "sm",
});

const sizes = {
	small: definePartsStyle({ field: small }),
	medium: definePartsStyle({ field: medium }),
	lager: definePartsStyle({ field: lager }),
};

const baseStyle = definePartsStyle({
	// define the part you're going to style
	field: {
		rounded: "sm",
		_placeholder: {
			fontSize: "12px",
		},
	},
	icon: {},
});

export const Select = defineMultiStyleConfig({
	// Styles for the base style
	baseStyle,
	// Styles for the size variations
	sizes,
	// Styles for the visual style variations
	variants: {},
	// The default `size` or `variant` values
	defaultProps: {
		size: "medium",
	},
});
