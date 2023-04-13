import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/router";
import ThemeProvider from "./theme/index";
import ScrollToTop from "./components/layout/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
