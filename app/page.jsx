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
      <Box sx={{ justifyContent: "center", mt: 0, background: "#F4F4F5", width: "100%"}}>
        <Box sx={{ justifyContent: "center", display: "flex", ml: 3}}>
        <Image
          src="/Conagua.png"
          alt="Logo CONAGUA"
          width={750}
          height={200}
          style={{ maxWidth: "100%", height: "auto" }}
          priority
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