import { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Board from "./components/Board";
import Footer from "./components/Footer";

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#1976d2",
          },
          background: {
            default: "#ffffff",
            paper: "#f5f5f5",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                margin: 0,
                padding: 0,
                minHeight: "100vh",
                width: "100vw",
                overflow: "hidden",
                transition: "background-color 0.3s ease",
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          paddingBottom: "60px", // Make room for the footer
        }}
      >
        <Board />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
