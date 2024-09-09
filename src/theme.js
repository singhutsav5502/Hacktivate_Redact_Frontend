import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Light blue
            contrastText: '#666e96', // Dark text for readability
            sharp: '#a5c2f0'
        },
        secondary: {
            main: '#555', // Dark grey
            contrastText: '#ffffff', // Light text for readability
        },
        background: {
            light:'#ddd',
            default: '#212121', // Dark background
            paper: '#424242', // Dark paper
        },
        text: {
            primary: '#444', 
            secondary: '#e0e0e0', 
            // logout: '#d9928d'
            // logout: '#dbb9b2'
            logout: '#8c7a76'
        },
    },
    typography: {
        fontFamily: '"Geist", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.75rem',
            // color: '#ffffff', // Light color for headings
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.25rem',
            // color: '#ffffff', // Light color for headings
        },
        h3: {
            fontWeight: 600,
            fontSize: '2rem',
            // color: '#ffffff', // Light color for headings
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.75rem',
            // color: '#ffffff', // Light color for headings
        },
        h5: {
            fontWeight: 500,
            fontSize: '1.5rem',
            // color: '#ffffff', // Light color for headings
        },
        h6: {
            fontWeight: 500,
            fontSize: '1.25rem',
            // color: '#ffffff', // Light color for headings
        },
        body1: {
            fontSize: '1rem',
            // color: '#e0e0e0', // Light grey for body text
        },
        body2: {
            fontSize: '0.875rem',
            // color: '#b0b0b0', // Medium grey for secondary body text
        },
        monospace: {
            fontFamily: '"Geist", monospace',
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
                        borderColor: '#4CAF50', // Soft green on hover
                        color: '#4CAF50', // Soft green on hover
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
