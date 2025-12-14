import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.jsx";
import "./index.css";
const theme = {
  token: { colorPrimary: "#a33131" },
  components: {
    Form: {
      labelFontSize: 16,
      itemMarginBottom: 16,
    },
    Card: {},
  },
};
createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>
);
