import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/auth.context';
import { ThemeProvider } from './contexts/theme.context';
import { AppRouter } from './routes';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
    mutations: { retry: 0 },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '12px',
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-default)',
                fontSize: '14px',
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
