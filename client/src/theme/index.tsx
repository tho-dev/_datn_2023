import { extendTheme } from "@chakra-ui/react";
import globalStyles from "./global";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Select } from "./components/select";
import { Tooltip } from "./components/tooltip";

const customTheme = extendTheme(globalStyles, {
	components: {
		Input,
		Button,
		Select,
		Tooltip,
	},
});

export default customTheme;
