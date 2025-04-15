import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/global-theme";
import AppbarGlobal from "./components/appbar";
import FooterGlobal from "./components/footer";
import "@fontsource/noto-sans";

export const metadata = {
  title: "Solicitudes",
  description: "Formularios de solicitudes de acceso",
  version: "4.0.0",
  keywords: "VPN, RFC, INTERNET, TELEFONIA",
  author: "CONAGUA (Brandon y Nidia)",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
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
