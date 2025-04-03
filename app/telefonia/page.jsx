"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Divider,
  FormHelperText
} from "@mui/material";
import Image from "next/image"; 

import axios from 'axios';

import Alerts from "../components/alerts.jsx";

export default function Home() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    activacion: "",
    expiracion: "",
    nombreUsuario: "",
    curpUsuario: "",
    direccion: "",
    uaUsuario: "",
    nombreEmpleado: "",
    idEmpleado: "",
    curpEmpleado: "",
    extEmpleado: "",
    correo: "",
    puestoEmpleado: "",
    justificacion: "",
    puestoUsuario: "",
    nombreJefe: "",
    puestoJefe: "",
    tipoEquipo: "",
    
    // Radios
    movimiento: "", //ALTA, BAJA, CAMBIO
    tipoUsuario: "", //???

    interno: "", // Opciones??
    mundo: "",
    local: "",
    cLocal: "",
    nacional: "",
    cNacional: "",
    eua: "",

  });
  
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

  // Boton
  const [botonEstado, setBotonEstado] = useState('Enviar');

  // Alertas
  const [openAlert, setOpenAlert] = useState(false);

  const [errors, setErrors] = useState({});

  const [alert, setAlert] = useState({
    message: "",
    severity: "",
  });

  const validarCamposRequeridos = (Data) => {
    
    const errores = {};
    let isValid = true;

    for (const key in Data) {
      if (Data.hasOwnProperty(key) && !Data[key]) {
        //var campo = traducirCampos(key);          // Traduce el error a la alerta
        errores[key] = 'Este campo es requerido'; // Texto a mostrar en cada campo faltante
        isValid = false;                          // Al menos un campo está vacío
      }
    }
    return [isValid, errores];                     // Todos los campos están llenos
  };

  // Llamada API

  const handleSubmit = async (event) => {
    event.preventDefault();

    const [isValid, getErrors] = validarCamposRequeridos(formData);
    setErrors(getErrors);

    //console.log("Lista getErrors en submit: ", getErrors)

    //var alertaValidacion = validarCamposRequeridos(formData);

    if (!isValid) {
      setAlert({
        //message: 'Por favor, complete todos los campos requeridos: ' + alertaValidacion[1],
        message: 'Por favor, complete todos los campos requeridos.',
        severity: "error",
      });
      setOpenAlert(true);
      return;
    } else {
      setAlert({
        message: 'Informacion Registrada',
        severity: 'success',
      });
      setOpenAlert(true);
    }

    setBotonEstado('Cargando...');
  
    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v1/tel", formData, {
        responseType: "blob",
    });
  
      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado('Descargar PDF');
      } else {
        console.error("Error generating PDF");
      }
    } catch (error) {
      console.error("Error:", error);
      setBotonEstado('Enviar'); // Vuelve a "Enviar" en caso de error
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

  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extension: value,
    }));
  };

  return (
    <Container disableGutters maxWidth="xxl" sx={{background: "#FFFFFF"}}>
      
      {/* Banner Responsive */}
      <Box
        sx={{
          width: '100vw', // Ocupa todo el ancho de la ventana gráfica
          overflow: 'hidden',
          height: '430px', // Ajusta la altura según sea necesario
          [theme.breakpoints.down('md')]: {
            height: 'auto', // Ajusta la altura automáticamente en pantallas pequeñas
          },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Image
        src="/background_Conagua_header_150.jpg" // Ruta de la imagen recortable
        alt="Imagen recortable"
        width={6000}
        height={1200}
        style={{
          maxWidth: '100vw',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        sizes="(max-width: 900px) 100vw, 1920px" 
        />
      </Box>
      
      {/* Imagen fija para pantallas pequeñas */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' }, // Mostrar solo en pantallas pequeñas
        }}
      >
        <Image
          src="/mobile_background_Icono_150.jpg" // Ruta de la imagen fija
          alt="Imagen fija"
          width={1690}
          height={1312} 
          style={{
            width: '100%',
            height: 'auto',
          }}
          sizes="100vw"
        />
      </Box>

      {/* Banner Responsive Title*/}
      <Box sx={{ justifyContent: "center", mt: 0, background: "#FFFFFF", width: "100%"}}>
        <Box sx={{ justifyContent: "center", display: "flex", ml: 3}}>
        {/* Title */}
        <Typography variant="h3" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Solicitud De Servicios de Telefonía
        </Typography>
        </Box>
      </Box>

      {/* Datos del la Solicitud */}
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
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          SOLICITUD
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 3, mb:1 }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: "flex", justifyContent: "center", fontSize: "1.2rem" }}
            >
              Tipo de Movimiento *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Tipo de Movimiento"
              name="movimiento"
              value={formData.movimiento}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel value="ALTA" control={<Radio />} label="ALTA" />
              <FormControlLabel value="BAJA" control={<Radio />} label="BAJA" />
              <FormControlLabel value="CAMBIO" control={<Radio />} label="CAMBIO" />
            </RadioGroup>
            <FormHelperText>{errors?.movimiento}</FormHelperText>
          </Box>
          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mb:3 }} />
          <TextField
            required
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificacion"
            value={formData.justificacion}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

      {/* Datos del Solicitante */}
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
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          DATOS DEL USUARIO (A) QUE UTLIZARA EL SERVICIO
        </Typography>

        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            error={!!errors?.tipoUsuario}
            //helperText={errors.nombre}
            id="tipoUsuario"
            name="tipoUsuario"
            label="Tipo de Usuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          /> 
          <TextField
            required
            error={!!errors?.nombre}
            //helperText={errors.nombre}
            id="nombre"
            name="nombre"
            label="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          /> 
          <TextField
            required
            error={!!errors?.curp}
            id="curp"
            name="curp"
            label="CURP"
            value={formData.curp}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.direccion}
            id="direccion"
            name="direccion"
            label="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.uaUsuario}
            id="uaUsuario"
            name="uaUsuario"
            label="Unidad Administrativa"
            value={formData.uaUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

      {/* Datos del Externo */}
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
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          DATOS DEL EMPLEADO DE CONAGUA RESPONSABLE
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            error={!!errors?.nombreEmpleado}
            id="nombreEmpleado"
            name="nombreEmpleado"
            label="Nombre"
            value={formData.nombreEmpleado}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.idEmpleado}
            id="idEmpleado"
            name="idEmpleado"
            label="Número De Empleado"
            value={formData.idEmpleado}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.curpEmpleado}
            id="curpEmpleado"
            name="curpEmpleado"
            label="CURP"
            value={formData.curpEmpleado}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.extEmpleado}
            id="extEmpleado"
            name="extEmpleado"
            label="Telefono / Extension"
            value={formData.extEmpleado}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.correo}
            id="correo"
            name="correo"
            label="Email" //PENDIENTE
            value={formData.correo}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puestoEmpleado}
            id="puestoEmpleado"
            name="puestoEmpleado"
            label="Puesto"
            value={formData.puestoEmpleado}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

      {/* Datos del Equipo */}
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
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          CARACTERISTICAS DEL EQUIPO
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            error={!!errors?.marca}
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
            error={!!errors?.modelo}
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
            error={!!errors?.serie}
            id="serie"
            name="serie"
            label="Serie"
            value={formData.serie}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.macadress}
            id="macadress"
            name="macadress"
            label="MAC Address"
            value={formData.macadress}
            onChange={handleMacAddressChange} // Usa handleMacAddressChange
            inputProps={{ maxLength: 17 }} // Limita la longitud
            sx={{background: "#FFFFFF"}}
          />

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 2, mb:1 }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: "flex", justifyContent: "center", fontSize: "1.2rem" }}
            >
              Cuenta con Anti-Malware *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Cuenta con Anti-Malware"
              name="malware"
              value={formData.malware}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
            </RadioGroup>
            <FormHelperText>{errors?.malware}</FormHelperText>
          </Box>

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: "flex", justifyContent: "center", fontSize: "1.2rem" }}
            >
              Se Encuentra Vigente y Actualizado (Anti-Malware) *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Se Encuentra Vigente y Actualizado (Anti-Malware)"
              name="vigencia"
              value={formData.vigencia}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
            </RadioGroup>
            <FormHelperText>{errors?.vigencia}</FormHelperText>
          </Box>

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: "flex", justifyContent: "center", fontSize: "1.2rem" }}
            >
              Cuenta con S.O. *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Cuenta con S.O."
              name="so"
              value={formData.so}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
            </RadioGroup>
            <FormHelperText>{errors?.so}</FormHelperText>
          </Box>

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: "flex", justifyContent: "center", fontSize: "1.2rem" }}
            >
              Se Encuentra Licenciado y Actualizado (S.O.) *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Se Encuentra Licenciado y Actualizado (S.O.)"
              name="licencia"
              value={formData.licencia}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel value="SI" control={<Radio />} label="SI" />
              <FormControlLabel value="NO" control={<Radio />} label="NO" />
            </RadioGroup>
            <FormHelperText>{errors?.licencia}</FormHelperText>
          </Box>

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mb:3 }} />

        </Box>
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
          sx={{ '& .MuiTextField-root': { mt: 2, width: 'calc(100% - 32px)', ml: 2, mr: 4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 3,
              width: 'calc(100% - 32px)',
              ml: 2,
              mr: 4,
              background: '#98989A',
              border: '1px solid gray',
            }}
            disabled={botonEstado === 'Cargando...'}
          >
            {botonEstado}
          </Button>
          {botonEstado === 'Descargar PDF' && (
            <Button
              variant="contained"
              sx={{
                mb: 3,
                ml: 2,
                mr: 4,
                width: 'calc(100% - 32px)',
                backgroundColor: theme.palette.secondary.main,
                color: '#FFFFFF',
                border: '1px solid gray',
              }}
              href={pdfUrl}
              download="registro.pdf"
            >
              Descargar PDF
            </Button>
          )}
        </Box>
      </Box>

      {/* ALERT */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Container>
  );
}