import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/core/styles";
import { mainTheme } from "./styled/config";
import { StylesProvider } from "@material-ui/core/styles";
import { StoreTechnologiesProvider } from "./store/technology";

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={mainTheme}>
      <StoreTechnologiesProvider>
        <App />
      </StoreTechnologiesProvider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
