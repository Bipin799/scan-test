import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,    // mobile
      sm: 600,  // tablet
      md: 900,  // small desktop
      lg: 1200, // large desktop
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    primary: { main: '#70af4cff' },
    secondary: { main: '#e14211a9' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      "@media (max-width:600px)": {
        fontSize: "1.8rem", // smaller heading on mobile
      },
    },
    h4: {
      fontSize: "2rem",
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: '12px 24px',
          "@media (max-width:600px)": {
            padding: "8px 16px", // smaller padding on mobile
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (min-width:900px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "16px",
          "@media (max-width:600px)": {
            padding: "8px", // less padding on mobile
          },
        },
      },
    },
  },
});

export default theme;
