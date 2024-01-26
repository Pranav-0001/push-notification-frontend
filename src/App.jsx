import { useState } from "react";

import "./App.css";
import Layout from "./pages/Layout";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

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
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
