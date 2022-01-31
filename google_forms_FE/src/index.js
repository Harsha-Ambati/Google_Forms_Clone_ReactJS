import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./Store/sagas/configureStore";
import "./index.css";
import { Router } from "react-router-dom";
import history from "./history";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Router>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
