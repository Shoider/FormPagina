"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Image from "next/image"; 

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

  // Constants
  const mov = [
    {
      value: 'ALTA',
      label: 'ALTA',
    },
    {
      value: 'BAJA',
      label: 'BAJA',
    },
    {
      value: 'CAMBIO',
      label: 'CAMBIO',
    },
  ];

  const malware = [
    {
      value: 'SI',
      label: 'SI',
    },
    {
      value: 'NO',
      label: 'NO',
    },
  ];

  const vigencia = [
    {
      value: 'SI',
      label: 'SI',
    },
    {
      value: 'NO',
      label: 'NO',
    },
  ];

  const so = [
    {
      value: 'SI',
      label: 'SI',
    },
    {
      value: 'NO',
      label: 'NO',
    },
  ];

  const licencia = [
    {
      value: 'SI',
      label: 'SI',
    },
    {
      value: 'NO',
      label: 'NO',
    },
  ];

  
  // Generar PDF
  const [pdfUrl, setPdfUrl] = useState(null);

  // API
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
      // PDF api
      const pdfResponse = await axios.post("http://localhost/api/v1/generar-pdf", formData, {
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

  //  VALIDADORES
  const formatMacAddress = (value) => {
    let formattedValue = value.replace(/[^0-9a-fA-F]/g, "").toUpperCase();
    let result = "";
    for (let i = 0; i < formattedValue.length; i++) {
      if (i > 0 && i % 2 === 0) {
        result += ":";
      }
      result += formattedValue[i];
    }
    return result;
  };

  const handleMacAddressChange = (event) => {
    const formattedValue = formatMacAddress(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      macadress: formattedValue,
    }));
  };

  // Validador de numeros generico
  function NumberTextField({ name, label, maxLength, value, onChange }) {
    const handleNumberChange = (event) => {
      let inputValue = event.target.value.replace(/[^0-9]/g, "");
      inputValue = inputValue.slice(0, maxLength);
      onChange({ target: { name, value: inputValue } });
    };
  
    return (
      <TextField
        required
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={handleNumberChange}
        inputProps={{ maxLength }}
      />
    );
  }

  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extension: value,
    }));
  };

  function ExtensionTextField({ formData, setFormData, handleChange }) {
    const handleExtensionChange = (event) => {
      let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
      value = value.slice(0, 4); // Limita la longitud a 4 caracteres
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        extension: value,
      }));
    };
  
    return (
      <TextField
        required
        id="extension"
        name="extension"
        label="Extension"
        value={formData.extension}
        onChange={handleExtensionChange} // Usa handleExtensionChange
      />
    );
  }

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

      {/* Form Box Responsive */}
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
        
        {/* Title */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Formulario Para Solicitud Del Servicio De VPN
        </Typography>

        {/* Form */}
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-select-currency"
            select
            required
            label="Tipo De Movimiento"
            name="movimiento"
            onChange={handleChange}
            value={formData.movimiento}
            sx={{background: "#FFFFFF"}}
            //color="secondary"
            //defaultValue="ALTA"
            //helperText="Please select your currency"
          >
            {mov.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            id="nombre"
            name="nombre"
            label="Nombre Del Solicitante"
            value={formData.nombre}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="puesto"
            name="puesto"
            label="Puesto / Cargo Del Solicitante"
            value={formData.puesto}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="ua"
            name="ua"
            label="Unidad Administrativa"
            value={formData.ua}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="id"
            name="id"
            label="ID"
            value={formData.id}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="extension"
            name="extension"
            label="Extensión"
            value={formData.extension}
            onChange={handleExtensionChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            required
            id="correo"
            name="correo"
            label="Correo Electrónico"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="marca"
            name="marca"
            label="Marca"
            value={formData.marca}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="modelo"
            name="modelo"
            label="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="serie"
            name="serie"
            label="No. De Serie"
            value={formData.serie}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="macadress"
            name="macadress"
            label="MAC Address"
            value={formData.macadress}
            onChange={handleMacAddressChange} // Usa handleMacAddressChange
            inputProps={{ maxLength: 17 }} // Limita la longitud
            sx={{background: "#FFFFFF"}}
          />
          <TextField
            id="outlined-select-currency"
            select
            required
            label="Anti-Malware"
            name="malware"
            onChange={handleChange}
            value={formData.malware}
            sx={{background: "#FFFFFF"}}
          >
            {malware.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            required
            label="Vigente y Actualizado"
            name="vigencia"
            onChange={handleChange}
            value={formData.vigencia}
            sx={{background: "#FFFFFF"}}
          >
            {vigencia.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            required
            label="Sistema Operativo"
            name="so"
            onChange={handleChange}
            value={formData.so}
            sx={{background: "#FFFFFF"}}
          >
            {so.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            required
            label="Licenciado y Actualizado"
            name="licencia"
            onChange={handleChange}
            value={formData.licencia}
            sx={{background: "#FFFFFF"}}
          >
            {licencia.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="jefe"
            name="jefe"
            label="Nombre Del Que Autoriza"
            value={formData.jefe}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="puestojefe"
            name="puestojefe"
            label="Puesto / Cargo Del Que Autoriza"
            value={formData.puestojefe}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="servicios"
            name="servicios"
            label="Servicios Que Necesita Acceder"
            value={formData.servicios}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="justificacion"
            name="justificacion"
            label="Justificación"
            value={formData.justificacion}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />

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