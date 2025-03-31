import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, // Blue
    secondary: { main: '#4caf50' }, // Green
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

export default theme;