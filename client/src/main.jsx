import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <StrictMode>
        <App />
      </StrictMode>
    </Router>
  </Provider>
);
