import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./common/themes/AntDesignThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.tsx";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastContainer />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
