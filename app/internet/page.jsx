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
  FormHelperText,
  FormLabel,
  Divider,
  Checkbox,
  Autocomplete,
  Modal,
} from "@mui/material";
import Image from "next/image";
import Link from 'next/link';
import axios from "axios";
import Alerts from "../components/alerts.jsx";
import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";
import direccionAutocomplete from "../constants/direccion.jsx";
import ala from "../constants/ala.jsx";
import pisos from "../constants/pisos.jsx";
import telefonoAutocomplete from "../constants/telefono.jsx";
import areas from "../constants/AREAS/areas.jsx";


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
    piso: "",
    ala: "",

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

    //POLITICAS
    politicasaceptadas: false,
  });

  // Nombre PDF
  const [nombreArchivo, setNombreArchivo] = useState("");

  // Generar PDF
  const [pdfUrl, setPdfUrl] = useState(null);

  // CATEGORÍAS
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
        } else {
          console.log("Checkbox 'descarga' desmarcado");
          updatedData.urlDescarga = "null";
          updatedData.justificaDescarga = "null";
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
      }
      return updatedData;
    });
  };

  // handleChange
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Boton
  const [botonEstado, setBotonEstado] = useState("Enviar");
  //Modal
   const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
      //No abrir el modal si ya está en modo descarga
      if (botonEstado === "Descargar PDF") return;
      const [isValid, getErrors] =
      validarCamposRequeridos(formData);
      setErrors(getErrors);
  
      //console.log("Lista getErrors en submit: ", getErrors);
  
      if (!isValid) {
        setAlert({
          message: "Por favor, complete todos los campos requeridos.",
          severity: "warning",
        });
      } else {
        setOpenModal(true);
        return;
      }
      setOpenAlert(true);
      return;
    };
    
    const handleCloseModal = () => {
      setOpenModal(false);
    };


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
        if (
          key !== "descarga" &&
          key !== "comercio" &&
          key !== "redes" &&
          key !== "foros" &&
          key !== "whats" &&
          key !== "videos" &&
          key !== "dropbox" &&
          key !== "onedrive" &&
          key !== "skype" &&
          key !== "wetransfer" &&
          key !== "team" &&
          key !== "otra" &&
          key !== "otra2" &&
          key !== "otra3" &&
          key !== "otra4" &&
          key !== "piso" &&
          key !== "ala" &&
          key !== "urlDescarga" &&
          key !== "urlComercio" &&
          key !== "urlRedes" &&
          key !== "urlForos" &&
          key !== "urlWhats" &&
          key !== "urlVideos" &&
          key !== "urlDropbox" &&
          key !== "urlOnedrive" &&
          key !== "urlSkype" &&
          key !== "urlWetransfer"
        ) {
          console.log("Campo requerido: ", key);
          errores[key] = "Este campo es requerido"; // Texto a mostrar en cada campo faltante
          isValid = false; // Al menos un campo está vacío
        }
      }
    }
    const descarga = Data.descarga;
    const comercio = Data.comercio;
    const redes = Data.redes;
    const foros = Data.foros;
    const whats = Data.whats;
    const videos = Data.videos;
    const dropbox = Data.dropbox;
    const skype = Data.skype;
    const wetransfer = Data.wetransfer;
    const team = Data.team;
    const onedrive = Data.onedrive;
    const otra = Data.otra;
    const otra2 = Data.otra2;
    const otra3 = Data.otra3;
    const otra4 = Data.otra4;

    // Verifica si al menos uno de los campos de categorías de navegación está lleno
    if (
      !descarga &&
      !comercio &&
      !redes &&
      !foros &&
      !whats &&
      !videos &&
      !dropbox &&
      !skype &&
      !wetransfer &&
      !team &&
      !onedrive &&
      !otra &&
      !otra2 &&
      !otra3 &&
      !otra4
    ) {
      // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
      errores.solicita = "Al menos uno de los campos es requerido";
      isValid = false;
    }

    return [isValid, errores]; // Todos los campos están llenos
  };

  // Llamada API
  const handleSubmit = async (event) => {
    handleCloseModal();
    event.preventDefault();
    console.log("datos de formdata internet:", formData);

    setAlert({
      message: "Información Enviada",
      severity: "success",
    });
    setOpenAlert(true);

    setBotonEstado("Cargando...");

    try {
      // Aqui llamamos a la primera api que valida campos
      const formResponse = await axios.post("/api2/v3/internet", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Respuesta: ", formResponse.data)
      const { message: formMessage, id: formId, epoch: epoch } = formResponse.data;
      console.log("Petición exitosa: ", formMessage);
      console.log("ID recibido: ", formId);
      console.log("Epoch recibido: ", epoch)
      setNombreArchivo(`INTERNET_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post("/api/v3/internet", { id: formId }, {
          responseType: "blob",
        });

        if (pdfResponse.status === 200) {
          setPdfUrl(URL.createObjectURL(pdfResponse.data));
          setBotonEstado("Descargar PDF");
          setAlert({
            message: "PDF listo para descargar",
            severity: "success",
          });
          setOpenAlert(true);
        } else {
          console.error("Ocurrio un error al generar el PDF");
          console.error(pdfResponse.status);
        }

      } catch (error) {
        console.error("Error:", error);
        setBotonEstado("Enviar"); // Vuelve a "Enviar" en caso de error
        setAlert({
          message: "Ocurrio un error al generar el PDF",
          severity: "error",
        });
        setOpenAlert(true);
      }

    } catch (error) {

      setBotonEstado("Enviar"); // Vuelve a "Enviar" en caso de error

      if (error.response) {
        // Si hay respuesta, podemos acceder al código de estado y a los datos.
        const statusCode = error.response.status;
        const errorData = error.response.data;

        console.error(`Error con código ${statusCode}:`, errorData.message);

        // Manejamos el caso específico del error 422.
        if (statusCode === 422) {
          setAlert({
            // Usamos el mensaje de error que viene de la API.
            message: errorData.message || "Hay errores en los datos enviados.",
            severity: "warning", // 'warning' o 'error' son buenas opciones aquí.
          });
        } else {
          // 3. Manejamos otros errores del servidor (ej. 404, 500).
          setAlert({
            message: `Error ${statusCode}: ${errorData.message || 'Ocurrió un error inesperado.'}`,
            severity: "error",
          });
        }
      } else {
        // 4. Este bloque se ejecuta si no hubo respuesta del servidor (ej. error de red).
        console.error("Error de red o de conexión:", error.message);
        setAlert({
          message: "No se pudo conectar con el servidor. Por favor, revisa tu conexión.",
          severity: "error",
        });
      } 
      setOpenAlert(true);
    }
  };

  ///POLITICAS Y SERVICIOS
  const savePoliticas = async (event) => {
    const { name, type, checked } = event.target;
    const isChecked = type === "checkbox" ? checked : false;

    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        [name]: isChecked, // Actualiza el valor del checkbox
      };
      return updatedData;
    });
  };

  //  VALIDADORES
  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extUsuario: value,
    }));
  };
  const handleTelefonoChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 10); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      teleUsuario: value,
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

  // Manejo de Autocomplete
  const handleUA = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      uaUsuario: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      areaUsuario:"",
    }));
  };
  // Manejo de Autocomplete de Área de Adscripción 
  const handleArea = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      areaUsuario: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)      
    }));
  };
  //FILTRADO DE ÁREA DE ADSCRIPCIÓN
  const filteredAreas = areas[formData.uaUsuario] || [];
  const handleDireccion = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      direccion: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  const handlePisos = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      piso: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  const handleAla = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ala: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  const handleTele = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      teleUsuario: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
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
            Formulario para solicitud de ampliación del servicio de internet
          </Typography>
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
          Datos del Usuario (a) que Utilizará el Servicio
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
            id="nombreUsuario"
            name="nombreUsuario"
            label="Nombre Completo"
            placeholder="Escriba el Nombre Completo del Usuario"
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
            label="Puesto o Cargo"
            placeholder="Escriba el Puesto o Cargo del Usuario"
            value={formData.puestoUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <Autocomplete
            disablePortal
            options={unidadesAdmin}
            //freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.uaUsuario}
                placeholder="Seleccione la Unidad Administrativa"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Unidad Administrativa"
              />
            )}
            id="uaUsuario"
            name="uaUsuario"
            onChange={(event, newValue) => {
              handleUA(newValue); // Maneja selección de opciones
            }}
           // onInputChange={(event, newInputValue) => {
             // if (event?.type === "change") {
               // handleUA(newInputValue); // Maneja texto escrito directamente
              //}
            //}}
            inputValue={formData.uaUsuario || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          {/**ÁREA DE ADSCRIPCIÓN */}
            <Autocomplete
              disablePortal
              options={filteredAreas}            
              //freeSolo
              renderInput={(params) => (
                <TextField
                  required
                  error={!!errors?.areaUsuario}
                  placeholder="Seleccione la Área de Adscripción"
                  sx={{ background: "#FFFFFF" }}
                  {...params}
                  label="Área de Adscripción"
                />
              )}
              id="areaUsuario"
              name="areaUsuario"
              onChange={(event, newValue) => {
                handleArea(newValue); // Maneja selección de opciones
              }}            
              inputValue={formData.areaUsuario || ""} // Controla el valor mostrado
              getOptionLabel={(option) => option || ""}
              isOptionEqualToValue={(option, value) => option === value}
            />    
          <TextField
            required
            error={!!errors?.ipUsuario}
            id="ipUsuario"
            name="ipUsuario"
            label="IP del Equipo Asignado"
            placeholder="Escriba la IP del Equipo"
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
            placeholder="correo@correo.com"
            type="email"
            value={formData.correoUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <Autocomplete
            disablePortal
            options={direccionAutocomplete}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.direccion}
                placeholder="Escriba o seleccione la dirección"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Dirección"
              />
            )}
            id="direccion"
            name="direccion"
            onChange={(event, newValue) => {
              handleDireccion(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleDireccion(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.direccion || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          {/**BOX PARA PISO Y ALA */}
          <Box
            sx={{
              display:
                formData.direccion ===
                "Av. Insurgentes Sur 2416 Col.Copilco el Bajo. CP.04340, Coyoacán, CDMX"
                  ? "flex"
                  : "none",
              align: "center",
              headerAlign: "center",
              textAlign: "center",

              //display:"flex"
            }}
          >
            <Autocomplete
              disablePortal
              options={pisos}
              freeSolo
              sx={{ width: "50%" }}
              renderInput={(params) => (
                <TextField
                  required
                  error={!!errors?.piso}
                  placeholder="Escriba o Seleccione el Piso"
                  sx={{ background: "#FFFFFF" }}
                  {...params}
                  label="Piso"
                />
              )}
              id="piso"
              name="piso"
              onChange={(event, newValue) => {
                handlePisos(newValue); // Maneja selección de opciones
              }}
              onInputChange={(event, newInputValue) => {
                if (event?.type === "change") {
                  handlePisos(newInputValue); // Maneja texto escrito directamente
                }
              }}
              inputValue={formData.piso || ""} // Controla el valor mostrado
              getOptionLabel={(option) => option || ""}
              isOptionEqualToValue={(option, value) => option === value}
            />
            <Autocomplete
              disablePortal
              options={ala}
              freeSolo
              sx={{ width: "50%" }}
              renderInput={(params) => (
                <TextField
                  required
                  error={!!errors?.ala}
                  placeholder="Escriba o Seleccione el Ala"
                  sx={{ background: "#FFFFFF" }}
                  {...params}
                  label="Ala"
                />
              )}
              id="ala"
              name="ala"
              onChange={(event, newValue) => {
                handleAla(newValue); // Maneja selección de opciones
              }}
              onInputChange={(event, newInputValue) => {
                if (event?.type === "change") {
                  handleAla(newInputValue); // Maneja texto escrito directamente
                }
              }}
              inputValue={formData.ala || ""} // Controla el valor mostrado
              getOptionLabel={(option) => option || ""}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Box>
          <Autocomplete
            disablePortal
            options={telefonoAutocomplete}
            freeSolo
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.teleUsuario}
                placeholder="Escriba o Seleccione el Teléfono"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Teléfono"
              />
            )}
            id="teleUsuario"
            name="teleUsuario"
            onChange={(event, newValue) => {
              handleTele(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleTele(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.teleUsuario || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <TextField
            required
            error={!!errors?.extUsuario}
            id="extUsuario"
            name="extUsuario"
            label="Extensión"
            placeholder="Escriba el Número de Extensión"
            value={formData.extUsuario}
            onChange={handleExtensionChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 4 }}
          />
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
          Información de la Solicitud 
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
            error={!!errors?.fechasoli}
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
          Autoriza Servicio
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
            label="Funcionario con Cargo de Subgerente, Homólogo o Superior"
            placeholder="Escriba el Nombre Completo del Funcionario"
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
            label="Puesto o Cargo del que Autoriza"
            placeholder="Escriba el Puesto o Cargo de quien Autoriza"
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
          Categoría de Navegación
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
                mt: 1,
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            mt: 2,
            ml: 10,
            mb: 1,
            mr: 8,
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
              sx={{ width: "33.33%", minWidth: "80px", textAlign: "left" }}
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
          <FormHelperText
            sx={{
              mx: "auto",
              mb: 1,
              justifyContent: "center",
              color: "red",
              isplay: errors?.solicita ? "block" : "none",
            }}
          >
            {errors?.solicita}
          </FormHelperText>
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
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

        {/*BOX DE FOROS*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaForos}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE COMERCIO*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaComercio}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE REDES*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaRedes}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE Videos*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaVideos}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE WhatsApp*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaWhats}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE DropBox*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la justificación"
            value={formData.justificaDropbox}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE Onedrive*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaOnedrive}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE Skype*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaSkype}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE wetransfer*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaWetransfer}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE Teamviewer*/}
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
            value={formData.justificaTeam}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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

        {/*BOX DE otra*/}
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
              ml: 0,
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
            placeholder="Escriba el Nombre del Servicio"
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
            label="Referencia del Servicio Requerido (URL)"
            placeholder="Escriba la URL del servicio"
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
            placeholder="Escriba la Justificación"
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
              mb: 2,
            }}
          />

          {/*selectBOX DE otra 2*/}
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
              placeholder="Escriba el Nombre del Servicio"
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
              label="Referencia del Servicio Requerido (URL)"
              placeholder="Escriba la URL del servicio"
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
              placeholder="Escriba la Justificación"
              value={formData.justificaOtra2}
              onChange={handleChange}
              sx={{ background: "#FFFFFF" }}
              inputProps={{ maxLength: 256 }}
            />
            {/*selectBOX DE otra 3*/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                ml: 2,
                mb: 0,
                mt: 2,
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
                placeholder="Escriba el Nombre del Servicio"
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
                placeholder="Escriba la URL del Servicio"
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
                placeholder="Escriba la Justificación"
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
                  mt: 2,
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
                  placeholder="Escriba el Nombre del Servicio"
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
                  label="Referencia del Servicio Requerido (URL)"
                  placeholder="Escriba la URL del Servicio"
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
                  placeholder="Escriba la Justificación"
                  value={formData.justificaOtra4}
                  onChange={handleChange}
                  sx={{ background: "#FFFFFF" }}
                  inputProps={{ maxLength: 256 }}
                />
                <FormLabel
                  component="legend"
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    fontSize: "0.6rem",
                    //ml: 4,
                  }}
                >
                  Si se desea agregar más categorías favor de sugerir cambio en
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
            mt: 3,
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

      {/* Datos de Politicas */}
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
          color="#9F2241"
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Políticas del Servicio
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 20,
              mr: 90,
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box sx={{ ml: 3, mr: 3 }}>
            <Typography
              variant="subtitle2"
              align="justify"
              gutterBottom
              color="#9F2241"
              sx={{ mt: 2, width: "calc(100% - 32px)", ml: 0, mr: 2 }}
            >
              
                • Es responsabilidad de los servidores públicos, así como personal externo de los activos de información 
                el adoptar las medidas que determine la CONAGUA para mantener y garantizar la seguridad de la Información, 
                siendo la Gerencia de Tecnología de la Información y Comunicaciones la responsable de establecer los mecanismos 
                que permitan garantizar la confidencialidad, integridad y disponibilidad de la Información. 
              
              <br />
              
                • La Subgerencia de Internet e Intranet, adscrita a la Gerencia de Tecnología de la Información y Comunicaciones, 
                como administrador del servicio es el área responsable de definir los lineamientos que deberán ser atendidos por 
                todos los usuarios y administradores en la ampliación del servicio de navegación de internet. 
              
              <br />
              
                • La Subgerencia de Internet e Intranet, será la responsable de implementar y garantizar la disponibilidad 
                en todo momento del servicio. 
              
              <br />
              
                 • Los accesos para los servicios habilitados serán exclusivamente para los usuarios que tengan debidamente la 
                 justificación y que cumplan con el llenado del formato y su formalización mediante el memorándum correspondiente 
                 para hacer uso de ella. 
              
              <br />
              
                • Es responsabilidad de quien autoriza los accesos solicitados y justificados anteriormente, así como
                 la supervisión del correcto uso de los recursos, siendo la Subgerencia de Internet e Intranet el área
                  responsable de la validación y supervisión periódica del buen uso de estos, lo anterior para salvaguardar 
                  el correcto funcionamiento de la infraestructura que soportan los servicios de la CONAGUA. 
              
              <br />
              
                • Los usuarios con ampliación en la Navegación de Internet deben usar responsablemente el servicio de 
                navegación web que es proporcionado por la Gerencia de Tecnología de la Información y Comunicaciones. 
              
              <br />
              
                 • Queda prohibido descargar y abrir páginas web o archivos sospechosos que puedan comprometer los equipos 
                 y la red. Para cualquier duda sobre algún sitio o página que represente actividad sospechosa, deberá hacer 
                 de conocimiento a la GTIC a través de la Mesa de Servicios. 
              

              <br />
              
                • La violación, desatento u omisión de las políticas y procedimientos de Seguridad de la Información 
                de la CONAGUA generan sanciones previstas en la Ley General de responsabilidades Administrativas; en la 
                Ley del Servicio Profesional de Carrera en la Administración Pública Federal y demás disposiciones 
                jurídicas aplicables.
              
              <br />
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 2,
              ml: 10,
              mr: 10,
              mb: 3,
              //mx: "auto"
            }}
          >
            {[
              {
                name: "politicasaceptadas",
                label: "He Leído y Acepto las Políticas del Servicio",
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{ width: "100%", minWidth: "60px", textAlign: "center" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData[item.name]}
                      onChange={savePoliticas}
                      name={item.name}
                      color="primary"
                    />
                  }
                  label={item.label}
                />
              </Box>
            ))}
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 1,
                mt: 2,
                justifyContent: "center",
                color: "red",
                display: errors?.politicasaceptadas ? "block" : "none",
              }}
            >
              {errors?.politicasaceptadas}
            </FormHelperText>
          </Box>
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
          Generar Solicitud
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
            //type="submit"
            onClick={handleOpenModal}
            variant="contained"
            sx={{
              mt: 3,
              mb: 3,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
              background:
                botonEstado === "Descargar PDF"
                  ? theme.palette.third.main
                  : theme.palette.secondary.main,
              color: "#FFFFFF",
              border: "1px solid gray",
            }}
            disabled={
              botonEstado === "Cargando..." || !formData.politicasaceptadas
            }
            {...(botonEstado === "Descargar PDF" && {
              href: pdfUrl,
              download: nombreArchivo,
            })}
          >
            {botonEstado}
          </Button>
          <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              background: "#F4F4F5",
              border: "2px solid grey",
              borderRadius: 2,
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3,
            }}>
              <Typography id="modal-modal-title" align="center" variant="h6" component="h2">
                ¡ADVERTENCIA!
              </Typography>
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  borderColor: "grey",
                  ml: 0,
                  mr: 0,
                  mt: 2,
                  mb: 1,
                }}
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                Asegurate de que la información registrada es correcta, ya que no se
                puede corregir una vez enviada.
              </Typography>
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  borderColor: "grey",
                  ml: 0,
                  mr: 0,
                  mt: 2,
                  mb: 0,
                }}
              />
              <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                mt: 3,
                mb: 0,
                width: "calc(50% - 16px)",
                ml: 0,
                mr: 0,
                background: "#98989A",
                color: "#FFFFFF",
                border: "1px solid gray",
              }}
            >
              Regresar
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                mt: 3,
                mb: 0,
                width: "calc(50% - 16px)",
                ml: 4,
                mr: 0,
                background: theme.palette.secondary.main,
                color: "#FFFFFF",
                border: "1px solid gray",
              }}
            >
              Enviar
            </Button>
            </Box>
          </Modal>
          <Button
            component={Link}
            href="/"
            variant="contained"
            sx={{
              mt: 0,
              mb: 3,
              width: "calc(50% - 32px)",
              ml: 2,
              mr: 0,
              background: "#98989A",
              color: "#FFFFFF",
              border: "1px solid gray",
            }}
          >
            Regresar al Inicio
          </Button>
          <Button
            type= "reset"
            variant="contained"
            sx={{
              mt: 0,
              mb: 3,
              width: "calc(50% - 32px)",
              ml: 4,
              mr: 0,
              background: theme.palette.secondary.main,
              color: "#FFFFFF",
              border: "1px solid gray",
            }}
            disabled={
              botonEstado !== "Descargar PDF"
            }
            onClick={() => {
              window.location.reload();
              window.scrollTo(0, 0);
            }}
          >
            Nueva solicitud
          </Button>
        </Box>
      </Box>

      {/* ALERT */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Container>
  );
}
