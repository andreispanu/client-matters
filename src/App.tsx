import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import PageLayout from "./layout";
import SearchPage from "./pages/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientDetails from "./pages/ClientDetails";
import HomePage from "./pages/HomePage"; 

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navigation />
          <PageLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/clients" element={<SearchPage />} />
              <Route path="/client/:clientId" element={<ClientDetails />} />
            </Routes>
          </PageLayout>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
