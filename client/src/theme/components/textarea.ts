import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
	color: "text.black",
	fontWeight: "normal",
	borderWidth: "1px",
	borderStyle: "solid",
	borderColor: "border.primary",
	px: "4",
	pt: "3",
	fontSize: "sm",
	borderRadius: "4px",
	_placeholder: {
		fontSize: "14px",
	},
});

export const Textarea = defineStyleConfig({
	// Styles for the visual style variations
	variants: { primary },
	// The default `size` or `variant` values
	defaultProps: {
		variant: "primary",
	},
});
