"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import axios from 'axios';

export default function Home() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    nombre: "",
    puesto: "",
    ua: "",
    id: "",
    extension: "",
    correo: "",
    marca: "",
    modelo: "",
    serie: "",
    macadress: "",
    jefe: "",
    puestojefe: "",
    servicios: "",
    justificacion: ""
  });

  const [pdfUrl, setPdfUrl] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
  
      // Generar PDF
      const pdfResponse = await axios.post("http://127.0.0.1:3001/api/v1/generar-pdf", formData, {
        responseType: "blob",
      });
  
      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
      } else {
        console.error("Error generating PDF");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container disableGutters maxWidth="xxl" sx={{background: "#C3FFFE"}}>
      <Box
        component="section"
        sx={{
          mx: "auto",
          width: 700,
          border: "2px solid grey",
          mt: 8,
          mb: 8,
          p: 3,
          borderRadius: 2,
          background: "#FFFFFF"
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Formulario de Registro 
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "100%" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          <TextField
            required
            id="nombre"
            name="nombre"
            label="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <TextField
            required
            id="puesto"
            name="puesto"
            label="Puesto"
            value={formData.puesto}
            onChange={handleChange}
          />
          <TextField
            required
            id="ua"
            name="ua"
            label="UA"
            value={formData.ua}
            onChange={handleChange}
          />
          <TextField
            required
            id="id"
            name="id"
            label="ID"
            value={formData.id}
            onChange={handleChange}
          />
          <TextField
            required
            id="extension"
            name="extension"
            label="Extension"
            value={formData.extension}
            onChange={handleChange}
          />
          <TextField
            required
            id="correo"
            name="correo"
            label="Correo Electrónico"
            type="email"
            value={formData.correo}
            onChange={handleChange}
          />
          <TextField
            required
            id="marca"
            name="marca"
            label="Marca"
            value={formData.marca}
            onChange={handleChange}
          />
          <TextField
            required
            id="modelo"
            name="modelo"
            label="Modelo"
            value={formData.modelo}
            onChange={handleChange}
          />
          <TextField
            required
            id="serie"
            name="serie"
            label="Serie"
            value={formData.serie}
            onChange={handleChange}
          />
          <TextField
            required
            id="macadress"
            name="macadress"
            label="MACADRESS"
            value={formData.macadress}
            onChange={handleChange}
          />
          <TextField
            required
            id="jefe"
            name="jefe"
            label="Nombre del Jefe"
            value={formData.jefe}
            onChange={handleChange}
          />
          <TextField
            required
            id="puestojefe"
            name="puestojefe"
            label="Puesto del Jefe"
            value={formData.puestojefe}
            onChange={handleChange}
          />
          <TextField
            required
            id="servicios"
            name="servicios"
            label="Servicios"
            value={formData.servicios}
            onChange={handleChange}
          />
          <TextField
            required
            id="justificacion"
            name="justificacion"
            label="Justificacion"
            value={formData.justificacion}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, width: "100%" }}
          >
            Enviar
          </Button>
          {pdfUrl && (
            <Button variant="outlined" sx={{ mt: 2, width: "100%" }} href={pdfUrl} download="registro.pdf">Descargar PDF</Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}