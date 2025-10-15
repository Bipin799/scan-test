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
    // primary: { main: '#70af4cff' },
     primary: { main: '#1976d2' },
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
    borderRadius: "24px !important",
  },
  spacing: 8,
  components: {

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '4px !important',
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

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          backgroundColor: "#fff",
          fontFamily: "Nunito, sans-serif",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
          "& fieldset": {
            borderRadius: "20px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
          },
          "&:hover fieldset": {
            borderColor: "#1976d2",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
          },
          "& input": {
            padding: "16.5px 14px",
            font: "inherit",
            letterSpacing: "inherit",
            color: "currentColor",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
            WebkitTextFillColor: "#000",
            transition: "background-color 5000s ease-in-out 0s",
          },
          "& .MuiSelect-select": {
            padding: "16.5px 14px",
            font: "inherit",
            letterSpacing: "inherit",
            color: "currentColor",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#1976d2",
        },
      },
    },

    // MuiRadio: {
    //   styleOverrides: {
    //     root: {
    //       color: "#1976d2",
    //       padding: "10px",
    //       borderRadius: "50%",
    //       backgroundColor: "#f5f8ff",
    //       boxShadow:
    //         "rgba(95, 157, 231, 0.48) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
    //       transition: "all 0.2s ease-in-out",

    //       "&:hover": {
    //         boxShadow:
    //           "rgba(95, 157, 231, 0.65) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
    //         backgroundColor: "#f0f6ff",
    //       },

    //       "&.Mui-checked": {
    //         color: "#1976d2",
    //         backgroundColor: "#e3f2fd",
    //         boxShadow:
    //           "rgba(25, 118, 210, 0.6) 4px 2px 8px 0px inset, rgb(255, 255, 255) -4px -2px 8px 0px inset",
    //       },

    //       "&.Mui-disabled": {
    //         opacity: 0.5,
    //       },
    //     },
    //   },
    // },


    MuiFormControlLabel: {
    styleOverrides: {
      root: {
        borderRadius: "20px",
        backgroundColor: "#fff",
        boxShadow:
          "inset 2px 2px 8px rgba(95,157,231,0.48), inset -2px -2px 8px #FFF",
        margin: "6px",
        padding: "8px 20px",
        transition: "all 0.2s ease-in-out",

        "&:hover": {
          backgroundColor: "#fff",
          boxShadow:
            "inset 3px 3px 10px rgba(95,157,231,0.6), inset -3px -3px 10px #fff",
        },

        "& .MuiFormControlLabel-label": {
          fontFamily: "Nunito, sans-serif",
          fontWeight: 500,
          color: "#333",
        },
      },
    },
    },

    MuiCssBaseline: {
      styleOverrides: {
        /* Remove spin buttons for number inputs globally */
        "input[type=number]": {
          MozAppearance: "textfield", /* Firefox */
        },
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          WebkitAppearance: "none", /* Chrome, Safari, Edge */
          margin: 0,
        },
      },
    },



    //  MuiDateCalendar: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#fff",
    //       color: "#000",
    //       // borderRadius: "12px",
    //       // boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    //       // padding: "15px",
    //     },
    //   },
    // },
    //  MuiDatePicker: {
    //   defaultProps: {
    //     slotProps: {
    //       popper: {
    //         placement: "bottom-start", // always below input
    //         modifiers: [
    //           {
    //             name: "flip",
    //             enabled: false, // prevent flipping above
    //           },
    //           {
    //             name: "preventOverflow",
    //             enabled: true,
    //             options: {
    //               altBoundary: true,
    //               rootBoundary: "viewport",
    //               tether: false,
    //             },
    //           },
    //           {
    //             // 🧩 Custom modifier to match field width
    //             name: "sameWidth",
    //             enabled: true,
    //             phase: "beforeWrite",
    //             requires: ["computeStyles"],
    //             fn: ({ state }) => {
    //               state.styles.popper.width = `${state.rects.reference.width}px`;
    //             },
    //           },
    //           {
    //             name: "offset",
    //             options: { offset: [0, 8] }, // small gap between input & popup
    //           },
    //         ],
    //       },
    //     },
    //   },
    // },
    // MuiPickersDay: {
    //   styleOverrides: {
    //     root: {
    //       color: "#000",
    //       "&:hover": {
    //         backgroundColor: "#f5f5f5",
    //       },
    //       "&.Mui-selected": {
    //         backgroundColor: "#1976d2",
    //         color: "#fff",
    //         "&:hover": {
    //           backgroundColor: "#1565c0",
    //         },
    //       },
    //       "&.Mui-disabled": {
    //         color: "#ccc",
    //       },
    //     },
    //   },
    // },
    // MuiPickersCalendarHeader: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#fff",
    //       color: "#000",
    //       fontWeight: 600,
    //       "& .MuiPickersArrowSwitcher-button": {
    //         color: "#000",
    //       },
    //     },
    //   },
    // },
    // MuiPickersYear: {
    //   styleOverrides: {
    //     yearButton: {
    //       color: "#000",
    //       "&.Mui-selected": {
    //         backgroundColor: "#1976d2",
    //         color: "#fff",
    //       },
    //     },
    //   },
    // },
    // MuiPickersMonth: {
    //   styleOverrides: {
    //     monthButton: {
    //       color: "#000",
    //       "&.Mui-selected": {
    //         backgroundColor: "#1976d2",
    //         color: "#fff",
    //       },
    //     },
    //   },
    // },

    
    
      
  },
});

export default theme;
