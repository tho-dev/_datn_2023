import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// react

// style font
import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";

// custom them chakra ui
import customTheme from "~/theme";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider
			theme={customTheme}
			resetCSS={true}
		>
			<CSSReset />
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
