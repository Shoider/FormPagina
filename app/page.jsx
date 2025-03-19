"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import Image from "next/image"; 

export default function Home() {

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
      <Box
        component="section"
        sx={{
          mx: "auto",
          width: "calc(100% - 32px)",
          border: "2px solid grey",
          mt: 2,
          mb: 3,
          p: 2,
          borderRadius: 2,
          background: "#F4F4F5",
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2"
          },
        }}
      >

        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, ml: 2, mr:4, mb: 3, width: "calc(100% - 32px)"}}>
          Formulario Para Solicitud Del Servicio De VPN
        </Typography>

      </Box>

      {/* RFC */}
      <Box
        component="section"
        sx={{
          mx: "auto",
          width: "calc(100% - 32px)",
          border: "2px solid grey",
          mt: 2,
          mb: 3,
          p: 2,
          borderRadius: 2,
          background: "#F4F4F5",
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2"
          },
        }}
      >

        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, ml: 2, mr:4, mb: 3, width: "calc(100% - 32px)"}}>
          RFC
        </Typography>

      </Box>

      {/* Enviar Informacion */}
      {/* Box Responsive */}
      <Box
        component="section"
        sx={{
          mx: "auto",
          width: "calc(100% - 32px)",
          border: "2px solid grey",
          mt: 2,
          mb: 3,
          p: 2,
          borderRadius: 2,
          background: "#F4F4F5",
          padding: "0 8px",
          "@media (min-width: 960px)": {
            maxWidth: "50.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2"
          },
        }}
      > 
        {/* SubTitle */}
        <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          GENERAR SOLICITUD
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          {/* Buttons */}
          <Button
            type="submit"
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 3, 
              width: "calc(100% - 32px)",
              ml: 2, 
              mr:4, 
              background: "#98989A",
              border: "1px solid gray",
            }}
          >
            Enviar
          </Button>
          {pdfUrl && (
            <Button
              variant="contained" // Cambia a "contained" para que tenga fondo
              sx={{
                mb: 3,
                ml: 2,
                mr:4,
                width: "calc(100% - 32px)",
                backgroundColor: theme.palette.secondary.main, // Establece el color de fondo
                color: "#FFFFFF", // Establece el color del texto a blanco
                border: "1px solid gray",
              }}
              href={pdfUrl}
              download="registro.pdf"
            >
              Descargar PDF
            </Button>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          padding: '8px 16px',
          textAlign: 'center',
        }}
      ></Box>
    </Container>
  );
}