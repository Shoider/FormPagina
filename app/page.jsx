"use client";

import React, { useState } from "react";
import { Box, Container, Typography, Button, useTheme, Popover } from "@mui/material";
import Image from "next/image";

export default function Home() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handlePopoverOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };
  const open2 = Boolean(anchorEl2);
  return (
    <Container disableGutters maxWidth="xxl" sx={{ background: "#FFFFFF" }}>
      {/* Banner Responsive */}
      <Box
        sx={{
          width: "100", // Ocupa todo el ancho de la ventana gráfica
          overflow: "hidden",
          height: "200px", // Ajusta la altura según sea necesario
          [theme.breakpoints.down("md")]: {
            height: "auto", // Ajusta la altura automáticamente en pantallas pequeñas
          },
          display: { xs: "none", md: "block" },
        }}
      >
        <Image
          src="/background_Conagua_header_150.jpg" // Ruta de la imagen recortable
          alt="Imagen recortable"
          width={6000}
          height={1200}
          style={{
            maxWidth: "100vw",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          sizes="(max-width: 900px) 100vw, 1920px"
        />
      </Box>

      {/* Imagen fija para pantallas pequeñas */}
      <Box
        sx={{
          display: { xs: "block", md: "none" }, // Mostrar solo en pantallas pequeñas
        }}
      >
        <Image
          src="/mobile_background_Icono_150.jpg" // Ruta de la imagen fija
          alt="Imagen fija"
          width={1690}
          height={1312}
          style={{
            width: "100%",
            height: "auto",
          }}
          sizes="100vw"
        />
      </Box>

      {/* Banner Responsive Title*/}
      <Box
        sx={{
          justifyContent: "center",
          mt: 0,
          background: "#FFFFFF",
          width: "100%",
        }}
      >
        <Box sx={{ justifyContent: "center", display: "flex", ml: 3 }}>
          {/* Title */}
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            CATÁLOGO DE SOLICITUDES DE SERVICIO
          </Typography>
        </Box>
      </Box>

      {/* RFC */}
      <Button
        variant="outlined"
        href="/rfc"
        sx={{
          width: "auto%",
          height: "calc(100% - 32px)",
          border: "2px solid grey", //
          mt: 2,
          mb: 3,
          ml: 2,
          mr: 2,
          p: 2,
          color: theme.palette.text.dark,
          borderRadius: 2,
          display: "flex",
          background: "#F4F4F5",
          boxSizing: "border-box",
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2",
          },
          fontSize: theme.typography.h4.fontSize,
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 2, ml: 2, mr: 2 }}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          Solicitud de cambios en cortafuegos (RFC)
          
        </Typography>
        <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>Se utiliza para solicitar la apertura de comunicaciones de red entre servidores, entre sistemas de cómputo de usuarios y los sistemas (servidores) que utilizan o para acceder algún servicio de Internet que requiera conexión por puertos distintos a TCP 80 y 443.</Typography>
      </Popover>
      </Button>

      {/* VPN 2 */}
      <Button
        variant="outlined"
        href="/vpn2"
        sx={{
          width: "auto%",
          height: "calc(100% - 32px)",
          border: "2px solid grey",
          mt: 2,
          mb: 3,
          ml: 2,
          mr: 2,
          p: 2,
          color: theme.palette.text.dark,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F4F4F5",
          boxSizing: "border-box",
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2",
          },
          fontSize: theme.typography.h4.fontSize,
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 2, ml: 2, mr: 2 }}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen2}
          onMouseLeave={handlePopoverClose2}
        >
          Solicitud Del Servicio De VPN
        </Typography>
        <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open2}
        anchorEl={anchorEl2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose2}
        disableRestoreFocus
      >
       <Typography sx={{ p: 2 }}>Se utiliza para...</Typography>
      </Popover>
      </Button>

      {/* TELEFONIA */}
      {/* <Button
        variant="outlined"
        href="/telefonia"
        sx={{
          width: "auto%",
          height: "calc(100% - 32px)",
          border: "2px solid grey", //
          mt: 2,
          mb: 3,
          ml: 2,
          mr: 2,
          p: 2,
          color: theme.palette.text.dark,
          borderRadius: 2,
          display: "flex",
          background: "#F4F4F5",
          boxSizing: "border-box",
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2",
          },
          fontSize: theme.typography.h4.fontSize,
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2, ml: 2, mr: 2 }}>
          SOLICITUD DE SERVICIOS DE TELEFONÍA
        </Typography>
      </Button> */}

      {/* TELEFONIA */}
      {/* <Button
        variant="outlined"
        href="/internet"
        sx={{
          width: "auto%",
          height: "calc(100% - 32px)",
          border: "2px solid grey", //
          mt: 2,
          mb: 3,
          ml: 2,
          mr: 2,
          p: 2,
          color: theme.palette.text.dark,
          borderRadius: 2,
          display: "flex",
          background: "#F4F4F5",
          boxSizing: "border-box",
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2",
          },
          fontSize: theme.typography.h4.fontSize,
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2, ml: 2, mr: 2 }}>
          SOLICITUD DE AMPLIACIÓN DE INTERNET
        </Typography>
      </Button> */}

      {/* VPN */}
      {/* 
      <Button
        variant="outlined"
        href="/vpn"
        sx={{
          width: "auto%",
          height: "calc(100% - 32px)",
          border: "2px solid grey",
          mt: 2,
          mb: 3,
          ml: 2,
          mr: 2,
          p: 2,
          color: theme.palette.text.dark,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F4F4F5",
          boxSizing: "border-box",
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2",
          },
          fontSize: theme.typography.h4.fontSize,
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2, ml: 2, mr: 2 }}>
        Solicitud Del Servicio De VPN
        </Typography>
      </Button>
      */}       
    </Container>
  );
}
