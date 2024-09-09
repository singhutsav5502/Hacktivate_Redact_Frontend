import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let light_theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0077FF', // Bright blue for primary actions
            contrastText: '#FFFFFF', // White text for contrast
            sharp: '#005BBB', // Darker blue for accents,
            icon: '#555',
        },
        secondary: {
            main: '#4CAF50', // Soft green
            contrastText: '#FFFFFF', // White text for readability
        },
        background: {
            light: '#F5F5F5', // Very light grey background
            default: '#FFF', // White background
            paper: '#FFF', // White paper for cards and dialogs
        },
        text: {
            primary: '#444', 
            secondary: '#555', 
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
            color: '#333333', // Dark color for headings
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.25rem',
            color: '#333333', // Dark color for headings
        },
        h3: {
            fontWeight: 600,
            fontSize: '2rem',
            color: '#333333', // Dark color for headings
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.75rem',
            color: '#333333', // Dark color for headings
        },
        h5: {
            fontWeight: 500,
            fontSize: '1.5rem',
            color: '#333333', // Dark color for headings
        },
        h6: {
            fontWeight: 500,
            fontSize: '1.25rem',
            color: '#333333', // Dark color for headings
        },
        body1: {
            fontSize: '1rem',
            color: '#444444', // Dark grey for body text
        },
        body2: {
            fontSize: '0.875rem',
            color: '#666666', // Medium grey for secondary body text
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
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)', // Subtle shadow for paper elements
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px', // Rounded corners for cards
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', // More pronounced shadow for cards
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

light_theme = responsiveFontSizes(light_theme);
export default light_theme;
