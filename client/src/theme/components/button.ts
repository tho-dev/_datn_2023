import { defineStyleConfig } from "@chakra-ui/react";
export const Button = defineStyleConfig({
	// Styles for the base style
	baseStyle: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "6px",
		border: "none",
		color: "white",
		fontWeight: 500,
		_loading: {
			color: "white",
			bgColor: "bg.red",
		},
	},
	// Styles for the size variations
	sizes: {
		small: {
			fontSize: "13px",
			px: "24px",
			height: "44px",
		},
		medium: {
			fontSize: "13px",
			px: "24px",
			height: "44px",
		},
		lager: {
			fontSize: "13px",
			px: "24px",
			height: "44px",
		},
	},
	// Styles for the visual style variations
	variants: {
		primary: {
			bgColor: "bg.red",
		},
	},
	// The default `size` or `variant` values
	defaultProps: {
		size: "medium",
		variant: "primary",
	},
});
