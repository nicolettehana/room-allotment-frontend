import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/inter";
import "material-icons/iconfont/material-icons.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import theme from "./components/core/theme/theme.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { pdfjs } from "react-pdf";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// QueryClient
const queryClient = new QueryClient();

const emotionCache = createCache({
  key: "chakra",
  nonce: "random123", // must match the nonce in your CSP
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter basename="/epass"> */}
      <BrowserRouter>
        <CacheProvider value={emotionCache}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </CacheProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
