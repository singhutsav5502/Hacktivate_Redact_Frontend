import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#000000', // Black color for primary
            contrastText: '#ffffff', // White text on primary buttons
        },
        secondary: {
            main: '#ffffff', // Vibrant orange for secondary actions and highlights
            contrastText: '#ffffff', // White text on secondary buttons
        },
        background: {
            default: '#ffffff', // Default background color (white)
            paper: '#f5f5f5', // Light grey for paper backgrounds
        },
        text: {
            primary: '#000000', // Primary text color (black)
            secondary: '#666666', // Secondary text color (dark gray)
        },
        divider: '#dddddd', // Light grey for dividers
    },
    typography: {
        fontFamily: '"GeistSans", sans-serif', // Default font
        h1: {
            fontFamily: '"GeistSans", sans-serif', // Header font
            fontWeight: 700,
            color: '#000000', // Black color for headers
        },
        h2: {
            fontFamily: '"GeistSans", sans-serif', // Header font
            fontWeight: 700,
            color: '#000000', // Black color for headers
        },
        h3: {
            fontFamily: '"GeistSans", sans-serif', // Header font
            fontWeight: 600,
            color: '#000000', // Black color for headers
        },
        h4: {
            fontFamily: '"GeistSans", sans-serif', // Header font
            fontWeight: 600,
            color: '#000000', // Black color for headers
        },
        h5: {
            fontFamily: '"GeistSans", sans-serif', // Header font
            fontWeight: 500,
            color: '#000000', // Black color for headers
        },
        h6: {
            fontFamily: '"GeistSans", sans-serif', // Header font
            fontWeight: 500,
            color: '#000000', // Black color for headers
        },
        body1: {
            fontFamily: '"GeistSans", sans-serif', // Body font
            color: '#333333', // Darker gray for body text
        },
        body2: {
            fontFamily: '"GeistSans", sans-serif', // Body font
            color: '#666666', // Medium gray for secondary body text
        },
        monospace: {
            fontFamily: '"GeistMono", monospace', // Monospace font
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    textTransform: 'none',
                    padding: '8px 16px',
                    boxShadow: 'none',
                },
                contained: {
                    color: '#ffffff',
                    backgroundColor: '#000000', // Black background for contained buttons
                    '&:hover': {
                        backgroundColor: '#333333', // Dark grey on hover
                    },
                },
                outlined: {
                    color: '#000000',
                    borderColor: '#000000', // Black border for outlined buttons
                    '&:hover': {
                        borderColor: '#ff5722', // Vibrant orange border on hover
                        color: '#ff5722', // Vibrant orange text on hover
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    color: '#000000', // Black color for headers
                },
                h2: {
                    color: '#000000', // Black color for headers
                },
                h3: {
                    color: '#000000', // Black color for headers
                },
                h4: {
                    color: '#000000', // Black color for headers
                },
                h5: {
                    color: '#000000', // Black color for headers
                },
                h6: {
                    color: '#000000', // Black color for headers
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for paper elements
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // More pronounced shadow for cards
                },
            },
        },
    },
});
theme = responsiveFontSizes(theme);
export default theme;
