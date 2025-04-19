import { createTheme } from '@mui/material/styles';

// Create a custom theme with a unique color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#004d7a', // A strong blue for primary actions
    },
    secondary: {
      main: '#008891', // A contrasting teal for accents
    },
    background: {
      default: '#f5f5f5', // A light gray background
    },
    text: {
      primary: '#333333', // Dark gray for primary text
      secondary: '#555555', // Slightly lighter for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
