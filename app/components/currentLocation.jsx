"use client"; // Indica que este es un componente de cliente

import React, { useEffect } from "react";
import { usePathname } from "next/navigation"; // Importa usePathname
import { Typography } from "@mui/material";

function CurrentLocation() {
  const pathname = usePathname(); // Usa usePathname

  const routeTexts = {
    "/": "MENÚ",
    "/vpn": "VPN",
    "/rfc": "RFC",
    "/telefonia": "TELEFONÍA",
    "/internet": "INTERNET",
  };

  const currentText = routeTexts[pathname] || "Página Desconocida";

  // Actualiza el título de la pestaña
  useEffect(() => {
    document.title = `${currentText} `;
  }, [currentText]);

  return (
    <Typography
      variant="h6"
      sx={{
        mr: 1,
        fontWeight: 500,
        letterSpacing: ".1rem",
        color: "white",
        textDecoration: "none",
      }}
    >
      {currentText}
    </Typography>
  );
}

export default CurrentLocation;
