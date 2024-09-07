import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#0077FF', // Bright blue for primary
      contrastText: '#FFFFFF', // White text on primary buttons
    },
    secondary: {
      main: '#FF4081', // Pink for secondary actions and highlights
      contrastText: '#FFFFFF', // White text on secondary buttons
    },
    background: {
      default: '#F4F6F8', // Light grey for the main background
      paper: '#FFFFFF', // White for paper backgrounds
    },
    text: {
      primary: '#333333', // Dark grey for primary text
      secondary: '#666666', // Medium grey for secondary text
    },
    divider: '#E0E0E0', // Light grey for dividers
  },
  typography: {
    fontFamily: '"GeistSans", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.75rem',
      color: '#333333',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      color: '#333333',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#333333',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#333333',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#333333',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#333333',
    },
    body1: {
      fontSize: '1rem',
      color: '#555555', // Slightly darker grey for body text
    },
    body2: {
      fontSize: '0.875rem',
      color: '#777777', // Medium grey for secondary body text
    },
    monospace: {
      fontFamily: '"GeistMono", monospace',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 20px',
          boxShadow: 'none',
          fontWeight: 600,
        },
        contained: {
          color: '#FFFFFF',
          backgroundColor: '#0077FF',
          '&:hover': {
            backgroundColor: '#005BBB', // Darker blue on hover
          },
        },
        outlined: {
          color: '#0077FF',
          borderColor: '#0077FF',
          '&:hover': {
            borderColor: '#FF4081',
            color: '#FF4081', // Pink on hover
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: '0.5em',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Rounded corners for paper elements
          padding: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for paper elements
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Rounded corners for cards
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)', // More pronounced shadow for cards
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#FFFFFF', // White background for AppBar
          color: '#333333', // Dark text for AppBar
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
