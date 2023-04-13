import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/router";
import ThemeProvider from "./theme/index";
import ScrollToTop from "./components/layout/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { useCancelApi } from "./hooks/useCancelApi";
import Snackbar from "./components/layout/snackbar";
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Snackbar />
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
