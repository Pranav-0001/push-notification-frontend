import { useState } from "react";
import "./App.css";
import Layout from "./pages/Layout";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Modals from "./components/modals/Modals";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
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
            <ToastContainer/>
            <Modals />
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
