import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/global-theme";
import AppbarGlobal from "./components/appbar";
import FooterGlobal from "./components/footer";
import "@fontsource/noto-sans";

export const metadata = {
  title: "Formulario",
  description: "Llenar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="antialiased">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <AppbarGlobal />
            {children}
            <FooterGlobal />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}