import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "flatpickr/dist/themes/material_green.css";
import "./index.css";
// redux-toolkit
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store.ts";
import { Provider } from "react-redux";

// style font
import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";

// custom them chakra ui
import customTheme from "~/theme";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

// cấu hình client state
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme} resetCSS={true}>
      <CSSReset />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
