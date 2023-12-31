import ReactDOM from "react-dom/client";
import "./styles/fonts.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./config/theme.ts";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router.tsx";
import AuthProvider from "./components/Providers/AuthProvider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BoardProvider from "./components/Providers/BoardProvider.tsx";
import GlobalProvider from "./components/Providers/GlobalProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider>
        <GlobalProvider>
          <BoardProvider>
            <RouterProvider router={router} />
          </BoardProvider>
        </GlobalProvider>
      </AuthProvider>
    </ChakraProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
