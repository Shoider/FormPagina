import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/global-theme";
import AppbarGlobal from "./components/appbar";
import FooterGlobal from "./components/footer";
import "@fontsource/noto-sans";

export const metadata = {  
  description: "Formularios de solicitudes de acceso",
  version: "5.0.0",
  author: "CONAGUA (Brandon y Nidia)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="version" content={metadata.version} />
        <title>Solicitudes</title>
        <link rel="icon" href="/logo_blanco.ico" />
        <meta name="author" content={metadata.author} />
      </head>
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
