"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import Image from "next/image"; 

export default function Home() {

  const theme = useTheme();

  return (
    <Container disableGutters maxWidth="xxl" sx={{background: "#FFFFFF"}}>
      
      {/* Banner Responsive */}
      <Box
        sx={{
          width: '100vw', // Ocupa todo el ancho de la ventana gráfica
          overflow: 'hidden',
          height: '430px', // Ajusta la altura según sea necesario
          [theme.breakpoints.down('sm')]: {
            height: 'auto', // Ajusta la altura automáticamente en pantallas pequeñas
          },
        }}
      >
        <Image
          src="/background_Conagua_header_150.jpg" // Ruta de la imagen recortable
          alt="Imagen recortable"
          width={6000} // Ajusta el ancho según sea necesario
          height={1200} // Ajusta la altura según sea necesario
          style={{
            maxWidth: '100vw', // Usa max-width en lugar de width
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center', // Centra la imagen
          }}
          sizes="(max-width: 600px) 100vw, 1920px" // Ajusta los sizes según sea necesario
        />
        {/* Imagen fija para pantallas pequeñas */}
        <Box
          sx={{
            display: { xs: 'block', sm: 'none' }, // Mostrar solo en pantallas pequeñas
          }}
        >
          <Image
            src="/mobile_background_Icono_150.jpg" // Ruta de la imagen fija
            alt="Imagen fija"
            width={1690} // Ajusta el ancho según sea necesario
            height={1312} // Ajusta la altura según sea necesario
            style={{
              width: '100%',
              height: 'auto',
            }}
            sizes="100vw"
          />
        </Box>
      </Box>

      {/* Banner Responsive Title*/}
      <Box sx={{ justifyContent: "center", mt: 0, background: "#FFFFFF", width: "100%"}}>
        <Box sx={{ justifyContent: "center", display: "flex", ml: 3}}>
        {/* Title */}
        <Typography variant="h3" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Catalogo de Formatos
        </Typography>
        </Box>
      </Box>

      {/* VPN */}
      <Button
        variant="outlined"
        href="/vpn"
        sx={{
          width: 'auto%',
          height: 'calc(100% - 32px)',
          border: "2px solid grey", 
          mt: 2,
          mb: 3,
          ml: 2,
          mr: 2,
          p: 2,
          color: theme.palette.text.dark,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: "#F4F4F5",
          boxSizing: 'border-box',
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2"
          },
          fontSize: theme.typography.h4.fontSize,
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        Solicitud Del Servicio De VPN
      </Button>

      {/* RFC */}
      <Button
        variant="outlined"
        href="/rfc"
        sx={{
          width: 'auto%',
          height: 'calc(100% - 32px)',
          border: "2px solid grey", //
          mt: 2,
          mb: 3,
          ml: 2,
          mr: 2,
          p: 2,
          color: theme.palette.text.dark,
          borderRadius: 2,
          display: 'flex',
          background: "#F4F4F5",
          boxSizing: 'border-box',
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2"
          },
          fontSize: theme.typography.h4.fontSize,
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        RFC
      </Button>

    </Container>
  );
}