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
  
      // PDF
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

      <Box sx={{ justifyContent: "center", mt: 0, background: "#F4F4F5"}}>
        <Box sx={{ justifyContent: "center", display: "flex", mr: 2}}>
        <Image
          src="/Conagua.png"
          alt="Logo CONAGUA"
          width={750}
          height={200}
          priority
        />
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          mx: "auto",
          width: 700,
          border: "2px solid grey",
          mt: 4,
          mb: 8,
          p: 3,
          borderRadius: 2,
          background: "#F4F4F5"
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Formulario Para Solicitud Del Servicio De VPN
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "100%" } }}
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

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, width: "100%", background: "#98989A" }}
          >
            Enviar
          </Button>
          {pdfUrl && (
            <Button variant="solid bold" sx={{ mt: 2, width: "100%" }} href={pdfUrl} download="registro.pdf">Descargar PDF</Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}