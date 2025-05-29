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
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import Image from "next/image";
import axios from "axios";
import Alerts from "../components/alerts.jsx";
import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";

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
    justificacion: "",
    // Radios
    movimiento: "",
    malware: "",
    vigencia: "NO",
    so: "",
    licencia: "NO",
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
  const [botonEstado, setBotonEstado] = useState("Enviar");

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
        errores[key] = "Este campo es requerido"; // Texto a mostrar en cada campo faltante
        isValid = false; // Al menos un campo está vacío
      }
    }
    return [isValid, errores]; // Todos los campos están llenos
  };

  // Llamada API
  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log("Lista formData en submit: ", formData);

    const [isValid, getErrors] = validarCamposRequeridos(formData);
    setErrors(getErrors);

    //console.log("Lista getErrors en submit: ", getErrors)

    if (!isValid) {
      setAlert({
        //message: 'Por favor, complete todos los campos requeridos: ' + alertaValidacion[1],
        message: "Por favor, complete todos los campos requeridos.",
        severity: "error",
      });
      setOpenAlert(true);
      return;
    } else {
      setAlert({
        message: "Información Registrada",
        severity: "success",
      });
      setOpenAlert(true);
    }

    setBotonEstado("Cargando...");

    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v1/vpn", formData, {
        responseType: "blob",
      });

      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado("Descargar PDF");
      } else {
        console.error("Error generating PDF");
      }
    } catch (error) {
      console.error("Error:", error);
      setBotonEstado("Enviar"); // Vuelve a "Enviar" en caso de error
      setAlert({
        message: "Ocurrio un error",
        severity: "error",
      });
      setOpenAlert(true);
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
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extension: value,
    }));
  };

  // Manejo de Autocomplete
  const handleUA = (newValue) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      ua: newValue || '' // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };

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
            Formulario para solicitud del servicio de VPN
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
            padding: "2",
          },
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
         INFORMACIÓN DE LA SOLICITUD
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 3,
              mb: 1,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel
              component="legend"
              sx={{
                mt: 0,
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
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
              <FormControlLabel
                value="ALTA"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: errors?.movimiento ? "red" : undefined,
                      },
                    }}
                  />
                }
                label="ALTA"
              />
              <FormControlLabel value="BAJA" control={<Radio />} label="BAJA" />
              <FormControlLabel
                value="CAMBIO"
                control={<Radio />}
                label="CAMBIO"
              />
            </RadioGroup>
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 1,
                justifyContent: "center",
                color: "red",
              }}
            >
              {errors?.movimiento}
            </FormHelperText>
          </Box>
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mb: 0,
            }}
          />

          <TextField
            required
            error={!!errors?.servicios}
            id="servicios"
            name="servicios"
            label="Servicios"
            placeholder="Escriba los servicios a los que solicita acceso"
            value={formData.servicios}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificación"
            placeholder="Escriba la justificación"
            value={formData.justificacion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
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
            padding: "2",
          },
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          DATOS DEL USUARIO (A) QUE UTILIZARÁ EL SERVICIO
        </Typography>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            error={!!errors?.nombre}
            id="nombre"
            name="nombre"
            label="Nombre Completo"
            placeholder="Escriba el nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puesto}
            id="puesto"
            name="puesto"
            label="Puesto ó Cargo"
            placeholder="Escriba el puesto ó cargo"
            value={formData.puesto}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <Autocomplete
            disablePortal
            options={unidadesAdmin}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.ua}
                placeholder="Escriba o seleccione la unidad administrativa"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Unidad Administrativa"
              />
            )}
            id="ua"
            name="ua"
            onChange={(event, newValue) => {
              handleUA(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === 'change') {
                handleUA(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.ua || ''} // Controla el valor mostrado
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <TextField
            required
            error={!!errors?.id}
            id="id"
            name="id"
            label="ID de Empleado"
            placeholder="Escriba su ID de empleado"
            value={formData.id}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.extension}
            id="extension"
            name="extension"
            label="Extensión"
            placeholder="Escriba la extensión"
            value={formData.extension}
            onChange={handleExtensionChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            required
            error={!!errors?.correo}
            id="correo"
            name="correo"
            label="Correo"
            placeholder="correo@correo.com"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

      {/* Datos de Autoriza */}
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
            padding: "2",
          },
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          AUTORIZA
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            error={!!errors?.jefe}
            id="jefe"
            name="jefe"
            label="Funcionario con Cargo de Subgerente, Homólogo ó Superior"
            placeholder="Escriba el nombre completo del funcionario"
            value={formData.jefe}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puestojefe}
            id="puestojefe"
            name="puestojefe"
            label="Puesto ó Cargo del que Autoriza"
            placeholder="Escriba el puesto ó cargo del que autoriza"
            value={formData.puestojefe}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
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
            padding: "2",
          },
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          CARACTERÍSTICAS DEL EQUIPO
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
          }}
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
            placeholder="Escriba la marca del equipo"
            value={formData.marca}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.modelo}
            id="modelo"
            name="modelo"
            label="Modelo"
            placeholder="Escriba el modelo del equipo"
            value={formData.modelo}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.serie}
            id="serie"
            name="serie"
            label="Serie"
            placeholder="Escriba el No. de serie del equipo"
            value={formData.serie}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.macadress}
            placeholder="AA:AA:AA:AA:AA:AA"
            id="macadress"
            name="macadress"
            label="MAC Address"
            value={formData.macadress}
            onChange={handleMacAddressChange} // Usa handleMacAddressChange
            inputProps={{ maxLength: 17 }} // Limita la longitud
            sx={{ background: "#FFFFFF" }}
          />

          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 2,
              mb: 1,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel
              component="legend"
              sx={{
                mt: 0,
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
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
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 1,
                justifyContent: "center",
                color: "red",
              }}
            >
              {errors?.malware}
            </FormHelperText>
          </Box>

          <Divider
            sx={{
              display: formData.malware === "SI" ? "block" : "none",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          

          {formData.malware === "SI" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",              
            }}
          >
            
            <FormLabel
              component="legend"
              sx={{
                mt: 0,
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
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
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 1,
                justifyContent: "center",
                color: "red",
              }}
            >
              {errors?.vigencia}
            </FormHelperText>
          </Box>
              )}

          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel
              component="legend"
              sx={{
                mt: 0,
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
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
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 1,
                justifyContent: "center",
                color: "red",
              }}
            >
              {errors?.so}
            </FormHelperText>
          </Box>

          <Divider
            sx={{
              display: formData.so === "SI" ? "block" : "none",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
        {formData.so === "SI" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel
              component="legend"
              sx={{
                mt: 0,
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
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
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 1,
                justifyContent: "center",
                color: "red",
              }}
            >
              {errors?.licencia}
            </FormHelperText>
          </Box>
          )}

          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mb: 3,
            }}
          />
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
            padding: "2",
          },
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          GENERAR SOLICITUD
        </Typography>
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mb: 0,
          }}
        />

        <FormLabel
          component="legend"
          sx={{
            mx: "auto",
            mt: 2,
            mb: 0,
            display: "flex",
            justifyContent: "center",
            fontSize: "0.8rem",
            width: "calc(100% - 32px)",
          }}
        >
          Asegurate de que la información registrada es correcta, ya que no se
          puede corregir una vez enviada.
        </FormLabel>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
          }}
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
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
              background:
                botonEstado === "Descargar PDF"
                  ? theme.palette.secondary.main
                  : "#98989A",
              color: "#FFFFFF",
              border: "1px solid gray",
            }}
            disabled={botonEstado === "Cargando..."}
            {...(botonEstado === "Descargar PDF" && {
              href: pdfUrl,
              download: "RegistroVPN.pdf",
            })}
          >
            {botonEstado}
          </Button>
        </Box>
      </Box>

      {/* ALERT */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Container>
  );
}
