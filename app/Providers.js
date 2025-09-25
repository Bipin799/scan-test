'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
      {children}
      </Provider>
    </ThemeProvider>
  );
}
