// src/utils/ThemeProvider.js
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6a994e',
        },
        secondary: {
            main: '#386641',
        },
        tertiary: {
            main: '#14213d',
        },
        error: {
            main: '#bc4749',
        },
        warning: {
            main: '#f4a261',
        },
        info: {
            main: '#2a9d8f',
        },
        success: {
            main: '#6a994e',
        },
    },
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: '#14213d', // Tertiary color for default state
                    '&.Mui-selected': {
                        color: '#fff', // Text color when selected
                        backgroundColor: '#6a994e', // Primary color when selected
                        '&:hover': {
                            backgroundColor: '#386641', // Secondary color on hover
                        },
                    },
                    '&:hover': {
                        color: '#fff', // Text color on hover
                        backgroundColor: '#386641', // Warning color on hover when not selected
                    },
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    borderColor: '#6a994e', // Primary color for the border
                    '& .Mui-selected': {
                        color: '#6a994e', // Color for selected item
                        borderColor: '#6a994e', // Border color for selected item
                    },
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff', // Color de fondo para la tabla
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    // backgroundColor: '#6a994e', // Color de fondo para el encabezado
                    '& th': {
                        color: '#ffffff', // Color del texto en el encabezado
                        fontWeight: 'bold',
                    }
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #14213d', // Borde inferior de las celdas
                    color: '#14213d', // Color del texto
                },
                head: {
                    backgroundColor: '#386641', // Color de fondo para las celdas del encabezado
                    color: '#ffffff', // Color del texto del encabezado
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#d9e2db', // Color de fondo para las filas impares
                    },
                    // '&:hover': {
                    //     backgroundColor: '#fff', // Color de fondo al hacer hover
                    // },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: '#6a994e', // Color de fondo para los chips
                    color: '#fff', // Color del texto para los chips
                },
            },
        },
    },
});

export default function Theme({ children }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
