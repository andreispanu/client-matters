import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; 
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './navigation';
import PageLayout from './layout';
import HomePage from './pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
          </Routes>
        </PageLayout>
      </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
