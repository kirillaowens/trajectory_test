import React from "react";
import { QueryProvider } from "./providers/QueryProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainPage from "../pages/MainPage/MainPage";
import { GlobalStyles } from "./style/style";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <QueryProvider>
        <MainPage />
      </QueryProvider>
    </Provider>
  );
}

export default App;
