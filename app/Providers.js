'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
      {children}
      </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
