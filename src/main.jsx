import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={'loading'} persistor={persistor}>
          <App />
          <ToastContainer position='top-center' theme='colored' draggable />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
