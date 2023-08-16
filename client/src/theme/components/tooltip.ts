import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = {
	borderRadius: "md", // add a border radius
	fontWeight: "normal", // change the font weight
	border: "1px solid", // add a border
};

// define custom sizes
const sizes = {
	sm: defineStyle({
		fontSize: "sm",
		py: "1",
		px: "2",
		w: "200px",
		maxW: "full",
	}),
	md: defineStyle({
		fontSize: "md",
		py: "2",
		px: "3",
		w: "500px",
		maxW: "full",
	}),
	lg: defineStyle({
		fontSize: "lg",
		py: "2",
		px: "4",
		w: "800px",
		maxW: "full",
	}),
};

// export the component theme
export const Tooltip = defineStyleConfig({
	baseStyle,
	sizes,
});
