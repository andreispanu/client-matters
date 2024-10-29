import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import PageLayout from "./layout";
import SearchPage from "./pages/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientDetails from "./pages/ClientDetailsPage";
import ClientPdf from "./pages/ClientPdf";
import NotFound from "./pages/404";
import SearchDropdown from "./pages/SearchDropdown";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <PageLayout>
            <Navigation />

            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/client/:clientId" element={<ClientDetails />} />
              <Route path="/client-pdf" element={<ClientPdf fileUrl={'./TechnicalTest.pdf'} />} />
              <Route path="/search-dropdown" element={<SearchDropdown />} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </PageLayout>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
