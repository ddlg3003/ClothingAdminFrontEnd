import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './app/store';
import './app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <ScrollToTop /> */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
