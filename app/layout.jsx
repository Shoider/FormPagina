//'use client';

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/global-theme";
import AppbarGlobal from "./components/appbar";
import FooterGlobal from "./components/footer";
import Tracker from "./components/tracker";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import "@fontsource/noto-sans";

export const metadata = {
  description: "Formularios de solicitudes GTIC",
  version: "1.0.9",
  author: "SSTTS (Brandon y Nidia)",
};

{
  /*const matomoInstance = createInstance({
  urlBase: 'http://localhost:8080',  // URL de tu servidor Matomo
  siteId: 1,                         // ID de tu sitio en Matomo
  trackerUrl: 'http://localhost:8080/matomo.php',  // Ruta del script
  srcUrl: 'http://localhost:8080/matomo.js'        // Ruta del tracker
});*/
}

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
              width: "100vw",           // <-- Añade esto
              overflowX: "hidden",      // <-- Y esto
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
