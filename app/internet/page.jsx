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
  FormLabel,
  Divider,
  Checkbox,
} from "@mui/material";
import Image from "next/image";

import axios from "axios";

import Alerts from "../components/alerts.jsx";

export default function Home() {
  const theme = useTheme();
  // Tipo de CATEGORIA

  const [formData, setFormData] = useState({
    fechasoli: "",
    uaUsuario: "",
    areaUsuario: "",
    nombreUsuario: "",
    puestoUsuario: "",
    ipUsuario: "",
    correoUsuario: "",
    direccion: "",
    teleUsuario: "",
    extUsuario: "",
    nombreJefe: "",
    puestoJefe: "",

    descarga: false,
    comercio: false,
    redes: false,
    foros: false,
    whats: false,
    videos: false,
    dropbox: false,
    skype: false,
    wetransfer: false,
    team: false,
    onedrive: false,
    otra: false,
    otra2: false,
    otra3: false,
    otra4: false,

    // OPCIONALES
    urlDescarga: "null",
    justificaDescarga: "null",

    urlForos: "null",
    justificaForos: "null",

    urlComercio: "null",
    justificaComercio: "null",

    urlRedes: "null",
    justificaRedes: "null",

    urlVideos: "null",
    justificaVideos: "null",

    urlWhats: "null",
    justificaWhats: "null",

    urlDropbox: "null",
    justificaDropbox: "null",

    urlOnedrive: "null",
    justificaOnedrive: "null",

    urlSkype: "null",
    justificaSkype: "null",

    urlWetransfer: "null",
    justificaWetransfer: "null",

    urlTeam: "null",
    justificaTeam: "null",

    // OTRAS
    urlOtra: "null",
    justificaOtra: "null",
    otraC: "null",

    urlOtra2: "null",
    justificaOtra2: "null",
    otraC2: "null",

    urlOtra3: "null",
    justificaOtra3: "null",
    otraC3: "null",

    urlOtra4: "null",
    justificaOtra4: "null",
    otraC4: "null",
  });

  // CATEGORIAS
  const saveCategorias = async (event) => {
    const { name, type, checked } = event.target;
    const isChecked = type === "checkbox" ? checked : false;

    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        [name]: isChecked, // Actualiza el valor del checkbox
      };

      if (name === "descarga") {
        if (isChecked) {
          console.log("Checkbox 'descarga' marcado");
          updatedData.urlDescarga = "";
          updatedData.justificaDescarga = "";
          console.log("URL Descarga:", updatedData.urlDescarga);
        } else {
          console.log("Checkbox 'descarga' desmarcado");
          updatedData.urlDescarga = "null";
          updatedData.justificaDescarga = "null";
          console.log("URL Descarga:", updatedData.urlDescarga);
        }
      } else if (name === "comercio") {
        if (isChecked) {
          updatedData.urlComercio = "";
          updatedData.justificaComercio = "";
        } else {
          updatedData.urlComercio = "null";
          updatedData.justificaComercio = "null";
        }
      } else if (name === "redes") {
        if (isChecked) {
          updatedData.urlRedes = "";
          updatedData.justificaRedes = "";
        } else {
          updatedData.urlRedes = "null";
          updatedData.justificaRedes = "null";
        }
      } else if (name === "foros") {
        if (isChecked) {
          updatedData.urlForos = "";
          updatedData.justificaForos = "";
        } else {
          updatedData.urlForos = "null";
          updatedData.justificaForos = "null";
        }
      } else if (name === "whats") {
        if (isChecked) {
          updatedData.urlWhats = "";
          updatedData.justificaWhats = "";
        } else {
          updatedData.urlWhats = "null";
          updatedData.justificaWhats = "null";
        }
      } else if (name === "videos") {
        if (isChecked) {
          updatedData.urlVideos = "";
          updatedData.justificaVideos = "";
        } else {
          updatedData.urlVideos = "null";
          updatedData.justificaVideos = "null";
        }
      } else if (name === "dropbox") {
        if (isChecked) {
          updatedData.urlDropbox = "";
          updatedData.justificaDropbox = "";
        } else {
          updatedData.urlDropbox = "null";
          updatedData.justificaDropbox = "null";
        }
      } else if (name === "onedrive") {
        if (isChecked) {
          updatedData.urlOnedrive = "";
          updatedData.justificaOnedrive = "";
        } else {
          updatedData.urlOnedrive = "null";
          updatedData.justificaOnedrive = "null";
        }
      } else if (name === "skype") {
        if (isChecked) {
          updatedData.urlSkype = "";
          updatedData.justificaSkype = "";
        } else {
          updatedData.urlSkype = "null";
          updatedData.justificaSkype = "null";
        }
      } else if (name === "wetransfer") {
        if (isChecked) {
          updatedData.urlWetransfer = "";
          updatedData.justificaWetransfer = "";
        } else {
          updatedData.urlWetransfer = "null";
          updatedData.justificaWetransfer = "null";
        }
      } else if (name === "team") {
        if (isChecked) {
          updatedData.urlTeam = "";
          updatedData.justificaTeam = "";
        } else {
          updatedData.urlTeam = "null";
          updatedData.justificaTeam = "null";
        }
      } else if (name === "otra") {
        if (isChecked) {
          updatedData.urlOtra = "";
          updatedData.justificaOtra = "";
          updatedData.otraC = "";
        } else {
          updatedData.urlOtra = "null";
          updatedData.justificaOtra = "null";
          updatedData.otraC = "null";
        }
      } else if (name === "otra2") {
        if (isChecked) {
          updatedData.urlOtra2 = "";
          updatedData.justificaOtra2 = "";
          updatedData.otraC2 = "";
        } else {
          updatedData.urlOtra2 = "null";
          updatedData.justificaOtra2 = "null";
          updatedData.otraC2 = "null";
        }
      } else if (name === "otra3") {
        if (isChecked) {
          updatedData.urlOtra3 = "";
          updatedData.justificaOtra3 = "";
          updatedData.otraC3 = "";
        } else {
          updatedData.urlOtra3 = "null";
          updatedData.justificaOtra3 = "null";
          updatedData.otraC3 = "null";
        }
      } else if (name === "otra4") {
        if (isChecked) {
          updatedData.urlOtra4 = "";
          updatedData.justificaOtra4 = "";
          updatedData.otraC4 = "";
        } else {
          updatedData.urlOtra4 = "null";
          updatedData.justificaOtra4 = "null";
          updatedData.otraC4 = "null";
        }
      } else {
        console.log("No se encontró el nombre del checkbox:", name);
      }
      return updatedData;
    });
  };

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
        //if (key !== "usuaExterno") {
        console.log("Campo requerido: ", key);
        errores[key] = "Este campo es requerido"; // Texto a mostrar en cada campo faltante
        isValid = false; // Al menos un campo está vacío
        //}
      }
    }
    return [isValid, errores]; // Todos los campos están llenos
  };

  // Llamada API

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("datos de formdata internet:", formData);

    const [isValid, getErrors] = validarCamposRequeridos(formData);
    setErrors(getErrors);

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
        message: "Informacion Registrada",
        severity: "success",
      });
      setOpenAlert(true);
    }

    setBotonEstado("Cargando...");

    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v1/inter", formData, {
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
    }
  };

  //  VALIDADORES
  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extUsuario: value,
    }));
  };

  const handleDateChange = (event) => {
    const rawDate = new Date(event.target.value + "T00:00:00");
    console.log("Fecha de Solicitud: ", rawDate);

    const formattedDate = [
      rawDate.getDate().toString().padStart(2, "0"),
      (rawDate.getMonth() + 1).toString().padStart(2, "0"),
      rawDate.getFullYear(),
    ].join("-");

    setFormData((prevFormData) => ({
      ...prevFormData,
      fechasoli: formattedDate, ///ya da bien formato DD-MM-YYYY
    }));
  };

  return (
    <Container disableGutters maxWidth="xxl" sx={{ background: "#FFFFFF" }}>
      {/* Banner Responsive */}
      <Box
        sx={{
          width: "100vw", // Ocupa todo el ancho de la ventana gráfica
          overflow: "hidden",
          height: "430px", // Ajusta la altura según sea necesario
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
            Formulario Para Solicitud De Ampliación del Servicio de Internet
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
          SOLICITUD
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
          <TextField
            required
            //error={!!errors?.activacion}
            id="fechasoli"
            name="fechasoli"
            label="Fecha de Solicitud"
            type="date"
            onChange={handleDateChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            InputLabelProps={{ shrink: true }}
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
          DATOS DEL USUARIO (A)
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
            error={!!errors?.nombreUsuario}
            //helperText={"Escriba su nombre"}
            id="nombreUsuario"
            name="nombreUsuario"
            label="Nombre Completo"
            value={formData.nombreUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puestoUsuario}
            id="puestoUsuario"
            name="puestoUsuario"
            label="Puesto ó Cargo"
            value={formData.puestoUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.areaUsuario}
            id="areaUsuario"
            name="areaUsuario"
            label="Área"
            value={formData.areaUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
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
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.ipUsuario}
            id="ipUsuario"
            name="ipUsuario"
            label="IP del Equipo Asignado"
            value={formData.ipUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.correoUsuario}
            id="correoUsuario"
            name="correoUsuario"
            label="Correo"
            type="email"
            value={formData.correoUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
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
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.teleUsuario}
            id="teleUsuario"
            name="teleUsuario"
            label="Teléfono"
            value={formData.teleUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />

          <TextField
            required
            error={!!errors?.extUsuario}
            id="extUsuario"
            name="extUsuario"
            label="Extensión"
            value={formData.extUsuario}
            onChange={handleExtensionChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 4 }}
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
            error={!!errors?.nombreJefe}
            id="nombreJefe"
            name="nombreJefe"
            label="Funcionario con Cargo de Subgerente, Homologo ó Superior"
            value={formData.nombreJefe}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puestoJefe}
            id="puestoJefe"
            name="puestoJefe"
            label="Puesto ó Cargo del que Autoriza"
            value={formData.puestoJefe}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

      {/* Categorias de Navegacion */}
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
          CATEGORIAS DE NAVEGACIÓN
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
              mt: 2,
              mb: 1,
            }}
          />

          {/* Checkbox */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Perfiles avanzados de navegación.
            </FormLabel>
            <FormLabel
              component="legend"
              sx={{
                mt: 0,
                display: "flex",
                justifyContent: "center",
                fontSize: "0.8rem",
              }}
            >
              Seleccione las opciones de navegación requeridas:
            </FormLabel>
          </Box>
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            ml: 8,
            mb: 0,
          }}
        >
          {[
            { name: "descarga", label: "Descarga de software" },
            { name: "foros", label: "Foros y Blogs" },
            { name: "comercio", label: "Comercio Electrónico" },
            { name: "redes", label: "Redes Sociales" },
            { name: "videos", label: "Videos-YouTube (Streaming)" },
            { name: "whats", label: "WhatsApp Web" },
            { name: "dropbox", label: "DropBox" },
            { name: "onedrive", label: "OneDrive" },
            { name: "skype", label: "Skype" },
            { name: "wetransfer", label: "Wetransfer" },
            { name: "team", label: "TeamViewer" },
            { name: "otra", label: "Otra" },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{ width: "33.33%", minWidth: "100px", textAlign: "left" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData[item.name]}
                    onChange={saveCategorias}
                    name={item.name}
                    color="primary"
                  />
                }
                label={item.label}
              />
            </Box>
          ))}
        </Box>

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mb: 3,
          }}
        />

        <FormLabel
          component="legend"
          sx={{
            mx: "auto",
            mt: 2,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            fontSize: "0.8rem",
            width: "calc(100% - 32px)",
          }}
        >
          Considera estrictamente las necesarias para el desempeño de sus
          funciones; misma que deberán ser justificadas plenamente y autorizadas
          por el Director o Gerente del área de adscripción.
        </FormLabel>
      </Box>
      {/* Justificaciones */}
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
          //display: formData.usuaExterno ? 'block' : 'none'
        }}
      >
        {/* Justificacion*/}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Justificación de Servicios Requeridos
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
        ></Box>
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.descarga ? "block" : "none",
          }}
        />

        {/*BOX DE DESCARGA*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.descarga ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Descarga de Software.
            </FormLabel>
          </Box>

          <TextField
            //required
            //error={!!errors?.urlDescarga}
            id="urlDescarga"
            name="urlDescarga"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlDescarga}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaDescarga}
            id="justificaDescarga"
            name="justificaDescarga"
            label="Justificación"
            value={formData.justificaDescarga}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE DESCARGA*/}
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.descarga ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.foros ? "block" : "none",
          }}
        />

        {/*BOX DE FOROS*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.foros ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Foros y Blogs.
            </FormLabel>
          </Box>
          <TextField
            //required
            //error={!!errors?.urlForos}
            id="urlForos"
            name="urlForos"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlForos}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaForos}
            id="justificaForos"
            name="justificaForos"
            label="Justificación"
            value={formData.justificaForos}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE FOROS*/}

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.foros ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.comercio ? "block" : "none",
          }}
        />

        {/*BOX DE COMERCIO*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.comercio ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Comercio Electrónico.
            </FormLabel>
          </Box>
          <TextField
            //required
            //error={!!errors?.urlComercio}
            id="urlComercio"
            name="urlComercio"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlComercio}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaComercio}
            id="justificaComercio"
            name="justificaComercio"
            label="Justificación"
            value={formData.justificaComercio}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE COMERCIO*/}

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.comercio ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.redes ? "block" : "none",
          }}
        />

        {/*BOX DE REDES*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.redes ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Redes Sociales.
            </FormLabel>
          </Box>
          <TextField
            //required
            //error={!!errors?.urlRedes}
            id="urlRedes"
            name="urlRedes"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlRedes}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaRedes}
            id="justificaRedes"
            name="justificaRedes"
            label="Justificación"
            value={formData.justificaRedes}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE REDES*/}
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.redes ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.videos ? "block" : "none",
          }}
        />

        {/*BOX DE Videos*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.videos ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Videos-YouTube(Streaming).
            </FormLabel>
          </Box>
          <TextField
            //required
            //error={!!errors?.urlVideos}
            id="urlVideos"
            name="urlVideos"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlVideos}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaVideos}
            id="justificaVideos"
            name="justificaVideos"
            label="Justificación"
            value={formData.justificaVideos}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE Videos*/}

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.videos ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.whats ? "block" : "none",
          }}
        />

        {/*BOX DE WhatsApp*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.whats ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              WhatsApp Web.
            </FormLabel>
          </Box>
          <TextField
            // required
            //error={!!errors?.urlWhats}
            id="urlWhats"
            name="urlWhats"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlWhats}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaWhats}
            id="justificaWhats"
            name="justificaWhats"
            label="Justificación"
            value={formData.justificaWhats}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE WhatsApp*/}

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.whats ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.dropbox ? "block" : "none",
          }}
        />

        {/*BOX DE DropBox*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.dropbox ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              DropBox.
            </FormLabel>
          </Box>
          <TextField
            // required
            // error={!!errors?.urlDropbox}
            id="urlDropbpx"
            name="urlDropbox"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlDropbox}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaDropbox}
            id="justificaDropbox"
            name="justificaDropbox"
            label="Justificación"
            value={formData.justificaDropbox}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE DropBox*/}
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.dropbox ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.onedrive ? "block" : "none",
          }}
        />
        {/*BOX DE Onedrive*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.onedrive ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              OneDrive.
            </FormLabel>
          </Box>
          <TextField
            // required
            // error={!!errors?.urlOnedrive}
            id="urlOnedrive"
            name="urlOnedrive"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlOnedrive}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaOnedrive}
            id="justificaOnedrive"
            name="justificaOnedrive"
            label="Justificación"
            value={formData.justificaOnedrive}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE Onedrive*/}

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.onedrive ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.skype ? "block" : "none",
          }}
        />

        {/*BOX DE Skype*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.skype ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Skype.
            </FormLabel>
          </Box>
          <TextField
            //required
            //error={!!errors?.urlSkype}
            id="urlSkype"
            name="urlSkype"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlSkype}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaSkype}
            id="justificaSkype"
            name="justificaSkype"
            label="Justificación"
            value={formData.justificaSkype}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE Skype*/}
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.skype ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.wetransfer ? "block" : "none",
          }}
        />

        {/*BOX DE wetransfer*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.wetransfer ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Wetransfer.
            </FormLabel>
          </Box>
          <TextField
            //  required
            //  error={!!errors?.urlWetransfer}
            id="urlWetransfer"
            name="urlWetransfer"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlWetransfer}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaWetransfer}
            id="justificaWetransfer"
            name="justificaWetransfer"
            label="Justificación"
            value={formData.justificaWetransfer}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE Wetransfer*/}
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.wetransfer ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.team ? "block" : "none",
          }}
        />
        {/*BOX DE Teamviewer*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.team ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Teamviewer.
            </FormLabel>
          </Box>
          <TextField
            //  required
            //  error={!!errors?.urlTeam}
            id="urlTeam"
            name="urlTeam"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlTeam}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaTeam}
            id="justificaTeam"
            name="justificaTeam"
            label="Justificación"
            value={formData.justificaTeam}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        {/*BOX DE Team*/}
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 2,
            display: formData.team ? "block" : "none",
          }}
        />

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
            display: formData.otra ? "block" : "none",
          }}
        />

        {/*BOX DE otraprin*/}
        <Box
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
            },
            display: formData.otra ? "block" : "none",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
              mb: 0,
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
              Otra(s).
            </FormLabel>
          </Box>
          <TextField
            required
            error={!!errors?.otraC}
            id="otraC"
            name="otraC"
            label="Describe cual"
            value={formData.otraC}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.urlOtra}
            id="urlOtra"
            name="urlOtra"
            label="Referencia del servicio requerido (URL)"
            value={formData.urlOtra}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.justificaOtra}
            id="justificaOtra"
            name="justificaOtra"
            label="Justificación"
            value={formData.justificaOtra}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 3,
              mr: 2,
              mb: 3,
            }}
          />
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 3,
              mr: 2,
              mb: 0,
            }}
          />

          {/*selectBOX DE otrap2*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              ml: 2,
              mb: 0,
            }}
          >
            {[{ name: "otra2", label: "Agregar otra" }].map((item, index) => (
              <Box
                key={index}
                sx={{ width: "100%", minWidth: "100px", textAlign: "center" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData[item.name]}
                      onChange={saveCategorias}
                      name={item.name}
                      color="primary"
                    />
                  }
                  label={item.label}
                />
              </Box>
            ))}
          </Box>
          {/*BOX DE otra2*/}
          <Box
            sx={{
              "& .MuiTextField-root": {
                mt: 2,
                width: "calc(100% - 32px)",
                ml: 2,
                mr: 4,
              },
              display: formData.otra2 ? "block" : "none",
            }}
          >
            <TextField
              required
              error={!!errors?.otraC2}
              id="otraC2"
              name="otraC2"
              label="Describe cual"
              value={formData.otraC2}
              onChange={handleChange}
              sx={{ background: "#FFFFFF" }}
              inputProps={{ maxLength: 256 }}
            />
            <TextField
              required
              error={!!errors?.urlOtra2}
              id="urlOtra2"
              name="urlOtra2"
              label="Referencia del servicio requerido (URL)"
              value={formData.urlOtra2}
              onChange={handleChange}
              sx={{ background: "#FFFFFF" }}
              inputProps={{ maxLength: 256 }}
            />
            <TextField
              required
              error={!!errors?.justificaOtra2}
              id="justificaOtra2"
              name="justificaOtra2"
              label="Justificación"
              value={formData.justificaOtra2}
              onChange={handleChange}
              sx={{ background: "#FFFFFF" }}
              inputProps={{ maxLength: 256 }}
            />
            {/*selectBOX DE otrap3*/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                ml: 2,
                mb: 0,
                display: formData.otra2 ? "block" : "none",
              }}
            >
              {[{ name: "otra3", label: "Agregar otra" }].map((item, index) => (
                <Box
                  key={index}
                  sx={{ width: "100%", minWidth: "100px", textAlign: "center" }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData[item.name]}
                        onChange={saveCategorias}
                        name={item.name}
                        color="primary"
                      />
                    }
                    label={item.label}
                  />
                </Box>
              ))}
            </Box>
            {/*BOX DE otra3*/}
            <Box
              sx={{
                "& .MuiTextField-root": {
                  mt: 2,
                  width: "calc(100% - 32px)",
                  ml: 2,
                  mr: 4,
                },
                display: formData.otra3 ? "block" : "none",
              }}
            >
              <TextField
                required
                error={!!errors?.otraC3}
                id="otraC3"
                name="otraC3"
                label="Describe cual"
                value={formData.otraC3}
                onChange={handleChange}
                sx={{ background: "#FFFFFF" }}
                inputProps={{ maxLength: 256 }}
              />
              <TextField
                required
                error={!!errors?.urlOtra3}
                id="urlOtra3"
                name="urlOtra3"
                label="Referencia del servicio requerido (URL)"
                value={formData.urlOtra3}
                onChange={handleChange}
                sx={{ background: "#FFFFFF" }}
                inputProps={{ maxLength: 256 }}
              />
              <TextField
                required
                error={!!errors?.justificaOtra3}
                id="justificaOtra3"
                name="justificaOtra3"
                label="Justificación"
                value={formData.justificaOtra3}
                onChange={handleChange}
                sx={{ background: "#FFFFFF" }}
                inputProps={{ maxLength: 256 }}
              />
              {/*selectBOX DE otrap4*/}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  ml: 2,
                  mb: 0,
                  display: formData.otra3 ? "block" : "none",
                }}
              >
                {[{ name: "otra4", label: "Agregar otra" }].map(
                  (item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        minWidth: "100px",
                        textAlign: "center",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData[item.name]}
                            onChange={saveCategorias}
                            name={item.name}
                            color="primary"
                          />
                        }
                        label={item.label}
                      />
                    </Box>
                  ),
                )}
              </Box>
              {/*BOX DE otra4*/}
              <Box
                sx={{
                  "& .MuiTextField-root": {
                    mt: 2,
                    width: "calc(100% - 32px)",
                    ml: 2,
                    mr: 4,
                  },
                  display: formData.otra4 ? "block" : "none",
                }}
              >
                <TextField
                  required
                  error={!!errors?.otraC4}
                  id="otraC4"
                  name="otraC4"
                  label="Describe cual"
                  value={formData.otraC4}
                  onChange={handleChange}
                  sx={{ background: "#FFFFFF" }}
                  inputProps={{ maxLength: 256 }}
                />
                <TextField
                  required
                  error={!!errors?.urlOtra4}
                  id="urlOtra4"
                  name="urlOtra4"
                  label="Referencia del servicio requerido (URL)"
                  value={formData.urlOtra4}
                  onChange={handleChange}
                  sx={{ background: "#FFFFFF" }}
                  inputProps={{ maxLength: 256 }}
                />
                <TextField
                  required
                  error={!!errors?.justificaOtra4}
                  id="justificaOtra4"
                  name="justificaOtra4"
                  label="Justificación"
                  value={formData.justificaOtra4}
                  onChange={handleChange}
                  sx={{ background: "#FFFFFF" }}
                  inputProps={{ maxLength: 256 }}
                />
                <FormLabel
                  component="legend"
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    ml: 4,
                  }}
                >
                  Si se desea agregar más categorias favor de sugerir cambio en
                  contacto: req.seguridad17@conagua.gob.mx.
                </FormLabel>
              </Box>
              {/*BOX DE otra4*/}
            </Box>
            {/*BOX DE otra3*/}
          </Box>
          {/*BOX DE otra2*/}
        </Box>
        {/*BOX DE otraprin*/}

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 3,
            mr: 2,
            mb: 3,
          }}
        />
        <FormLabel
          component="legend"
          sx={{
            mx: "auto",
            mt: 2,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            fontSize: "0.8rem",
            width: "calc(100% - 32px)",
          }}
        >
          Deberá JUSTIFICAR cada una de las categorías seleccionadas;
          considerando toda la información de referencia para validar los
          servicios solicitados (URL´s de los sitios); considerando en lo
          particular las solicitudes deben estar asociadas a requerimientos
          específicos de las funciones encomendadas e información institucional
          y NO para fines ni servicios personales.
        </FormLabel>
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
        <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mb:0 }} />
              
                <FormLabel
                  component="legend"
                  sx={{ mx: "auto", mt: 2,mb:0, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
                  > 
                 Asegurate de que la información registrada es correcta, ya que no se puede corregir una vez enviada.
                </FormLabel>
        
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
                      background: botonEstado === 'Descargar PDF' ? theme.palette.secondary.main : '#98989A',
                      color: '#FFFFFF',
                      border: '1px solid gray',
                    }}
                    disabled={botonEstado === 'Cargando...'}
                    {...(botonEstado === 'Descargar PDF' && { href: pdfUrl, download: "RegistroInternet.pdf" })}
                  >
                 {botonEstado}
                </Button>
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
              download: "RegistroTelefonia.pdf",
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
