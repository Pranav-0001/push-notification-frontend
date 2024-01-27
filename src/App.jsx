import { useState } from "react";

import "./App.css";
import Layout from "./pages/Layout";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Modals from "./components/modals/Modals";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Layout />
            <Modals/>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
