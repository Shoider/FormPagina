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
  Modal,
  LinearProgress,
  FormLabel,
  Tooltip, 
  Divider,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Alerts from "../components/alerts.jsx";
import direccionAutocomplete from "../constants/direccion.jsx";
import ala from "../constants/ala.jsx";
import pisos from "../constants/pisos.jsx";
import telefonoAutocomplete from "../constants/telefono.jsx";



export default function Home() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    //Tipo de movimiento
    movimiento: "",
    //Responsable
    nombreResponsable: "",
    puestoResponsable:"",
    //Usuario solicitante
    nombreUsuario: "",
    areaUsuario:"",
    puestousuario:"",
    //Dirección del usuario solicitante
    direccionUsuario:"",
    piso: "",
    ala: "",
    //Teléfono de usuario solicitante 
    telefonoUsuario:"",
    extUsuario: "",
    //Tipo de registro     
    registro: "",
    //Datos del registro  
    nombreRegistro:"",
    IP: "",
    nombreAplicacion:"",
    //Justificación 
    justificacion:"",
    //Quien aprueba la solicitud
    nombreAproba:"",
    puestoAproba:"",
       
  });

  // Nombre PDF
  const [nombreArchivo, setNombreArchivo] = useState("");

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

  //Validador de Campos 
  const validarCamposRequeridos = (Data) => {
    const errores = {};
    let isValid = true;

    let camposRequeridos =[
      "movimiento",
      "nombreResponsable",
      "puestoResponsable",
      "nombreUsuario",
      "areaUsuario",
      "puestousuario",
      "direccionUsuario",
      "telefonoUsuario",
      "extUsuario",
      "registro",
      "nombreRegistro",
      "IP",
      "nombreAplicacion",
      "justificacion",
      "nombreAproba",
      "puestoAproba"
    ];
    if (Data.direccionUsuario ===   "Av. Insurgentes Sur 2416 Col.Copilco el Bajo. CP.04340, Coyoacán, CDMX"){
      const nuevosCampos =[
        "ala",
        "piso"
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
    
    // Valida solo los campos requeridos
    for (const key of camposRequeridos) {
      if (!Data[key] || Data[key].trim() === "") {
        errores[key] = "Este campo es requerido";
        isValid = false;
      }
    }
    
    return [isValid, errores]; // Todos los campos están llenos
  };

   // Modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
      //No abrir el modal si ya está en modo descarga
      if (botonEstado === "Descargar PDF") return;
      const [isValid, getErrors] = validarCamposRequeridos(formData);
      setErrors(getErrors);
  
      console.log("Lista getErrors en submit: ", getErrors);
  
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
  //Para linea de progreso
    const [progress, setProgress] = React.useState(0);
    const [progresoCompleto, setProgresoCompleto] = React.useState(false);
    const [progresoMostrado, setProgresoMostrado] = React.useState(false);
    React.useEffect(() => {
      let timer;
      if (openModal && !progresoMostrado) {
        setProgress(0); // Reinicia progreso al abrir modal
        setProgresoCompleto(false); // Reinicia bandera
        timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress >= 100) {
              setProgresoCompleto(true); // Marca como completo
              clearInterval(timer); // Detiene el timer
              setProgresoMostrado(true);//Para que muestre progreso completo
              return 100;
            }
            const diff = Math.random() * 30;
            return Math.min(oldProgress + diff, 100);
          });
        }, 500);
      }
      return () => {
        clearInterval(timer);
      };
    }, [openModal, progresoMostrado]);
  // Llamada API

  const handleSubmit = async (event) => {
    handleCloseModal();
    event.preventDefault();
    console.log("Lista formData en submit: ", formData);

    setAlert({
      message: "Información Enviada",
      severity: "success",
    });
    setOpenAlert(true);

    setBotonEstado("Cargando...");

    try {
      // PDF api
      const formResponse = await axios.post("/api2/v3/dns", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta: ", formResponse.data);
      const {
        message: formMessage,
        id: formId,
        epoch: epoch,
      } = formResponse.data;
      console.log("Petición exitosa: ", formMessage);
      console.log("ID recibido: ", formId);
      console.log("Epoch recibido: ", epoch);
      setNombreArchivo(`DNS_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post(
          "/api/v3/dns",
          { id: formId },
          {
            responseType: "blob",
          },
        );

        if (pdfResponse.status === 200) {
          setPdfUrl(URL.createObjectURL(pdfResponse.data));
          setBotonEstado("Descargar PDF");
          setAlert({
            message: "PDF listo para descargar",
            severity: "success",
          });
          setOpenAlert(true);
        } else {
          console.error("Ocurrió un error al generar el PDF");
          console.error(pdfResponse.status);
        }
      } catch (error) {
        console.error("Error:", error);
        setBotonEstado("Enviar"); // Vuelve a "Enviar" en caso de error
        setAlert({
          message: "Ocurrió un error al generar el PDF",
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

        console.error(`Error con código ${statusCode}:`, errorData.message, errorData.campo);

        // Construct an object to update the errors state
        const newErrors = {
          [errorData.campo]: errorData.message, // Use the field name as the key and the message as the value
        };
        setErrors(newErrors);
        ////console.log("Errores API: ", newErrors); // Log the newErrors object

        ////console.log("Objeto Errors: ", errors)

        // Manejamos el caso específico del error 422.
        if (statusCode === 422) {
          setAlert({
            // Usamos el mensaje de error que viene de la API.
            message: errorData.message || "Hay errores en los datos enviados.",
            severity: "warning", // 'warning' o 'error' son buenas opciones aquí.
          });
        } else {
          // Manejamos otros errores del servidor (ej. 404, 500).
          setAlert({
            message: `Error ${statusCode}: ${errorData.message || "Ocurrió un error inesperado."}`,
            severity: "error",
          });
        }
      } else {
        // Este bloque se ejecuta si no hubo respuesta del servidor (ej. error de red).
        console.error("Error de red o de conexión:", error.message);
        setAlert({
          message:
            "No se pudo conectar con el servidor. Por favor, revisa tu conexión.",
          severity: "error",
        });
      }
      setOpenAlert(true);
    }
  };

  //  VALIDADORES
  const handleDireccion = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      direccionUsuario: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  const handleIPChange = (event) => {
  // Permite solo dígitos y puntos
    let value = event.target.value.replace(/[^\d.]/g, "");
    value = value.slice(0, 20); // Limita la longitud
    setFormData((prevFormData) => ({
      ...prevFormData,
      IP: value,
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

  //   const handleTelefonoChange = (event) => {
  // // Elimina todo lo que no sea dígito
  //   let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
  //   value = value.slice(0, 10); // Limita la longitud

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     telefonoUsuario: value,
  //   }));
  // };
  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extUsuario: value,
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
            Formulario para solicitud registros DNS internos 
          </Typography>
        </Box>
      </Box>

      {/* Datos del responsable de la solicitud */}    
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
          Datos del usuario(a) responsable de la aplicación 
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
            error={!!errors?.nombreResponsable}
            id="nombreResponsable"
            name="nombreResponsable"
            label="Nombre Completo"
            placeholder="Escriba únicamente el nombre completo del responsable de la aplicación"
            value={formData.nombreResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.puestoResponsable}
            id="puestoResponsable"
            name="puestoResponsable"
            label="Puesto o Cargo"
            placeholder="Escriba el puesto o cargo del responsable de la aplicación "
            value={formData.puestoResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            />    
        </Box>
      </Box>

      {/* Datos del Solicitante */}
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
          Datos del usuario(a) solicitante 
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
            placeholder="Escriba únicamente el nombre completo del usuario solicitante"
            value={formData.nombreUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.puestousuario}
            id="puestousuario"
            name="puestousuario"
            label="Puesto o Cargo"
            placeholder="Escriba el puesto o cargo del usuario(a) solicitante "
            value={formData.puestousuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          
          <TextField
            required
            error={!!errors?.areaUsuario}
            id="areaUsuario"
            name="areaUsuario"
            label="Área"
            placeholder="Escriba el área del solicitante"
            value={formData.areaUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <Autocomplete
            disablePortal
            options={direccionAutocomplete}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.direccionUsuario}
                placeholder="Escriba o seleccione la dirección"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Dirección"
              />
            )}
            id="direccionUsuario"
            name="direccionUsuario"
            onChange={(event, newValue) => {
              handleDireccion(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleDireccion(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.direccionUsuario || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          {/**BOX PARA PISO Y ALA */}
          <Box
            sx={{
              display:
                formData.direccionUsuario ===
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
                  placeholder="Escriba o seleccione el piso"
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
                  placeholder="Escriba o seleccione el ala"
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
            freeSolo
            options={telefonoAutocomplete}
            getOptionLabel={(option) => option.label || option.value || ""}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                handleChange({
                  target: { name: "telefonoUsuario", value: newValue },
                });
              } else if (newValue && newValue.value) {
                handleChange({
                  target: { name: "telefonoUsuario", value: newValue.value },
                });
              } else {
                handleChange({ target: { name: "telefonoUsuario", value: "" } });
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                error={!!errors?.telefonoUsuario}
                label="Teléfono del usuario"
                placeholder="Seleccione o escriba el teléfono del usuario"
                name="telefonoUsuario"
                value={formData.telefonoUsuario}
                sx={{ background: "#FFFFFF" }}
                onChange={handleChange}
                fullWidth
              />
            )}
          />       
          <TextField
            required
            error={!!errors?.extUsuario}
            id="extUsuario"
            name="extUsuario"
            label="Extensión"
            placeholder="Escriba el número de extensión"
            value={formData.extUsuario}
            onChange={handleExtensionChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 4 }}
          />
        </Box>
      </Box>     

      {/* Datos de la solicitud*/}    
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
          Datos del registro DNS
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
          {/**Tipo de registro */}
          <FormLabel
            component="legend"
            sx={{
              mt: 0,
              mb: 1,
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
          >
            En donde se realizará el registro
          </FormLabel>
          <RadioGroup
            row
            aria-label="Registro"
            name="registro"
            value={formData.registro}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, mb: 0, justifyContent: "center" }}
          >
            <FormControlLabel
              value="CNA"
              control={<Radio />}
              label="cna.gob.mx"
            />
            <FormControlLabel
              value="CONAGUA"
              control={<Radio />}
              label="conagua.gob.mx"
            />
            
          </RadioGroup>
          <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
          <FormHelperText
            sx={{
              mx: "auto",
              mb: 1,
              justifyContent: "center",
              color: "red",
            }}
          >
            {errors?.movimiento}
          </FormHelperText>
          </Box>
          <TextField
            required
            error={!!errors?.nombreRegistro}
            id="nombreRegistro"
            name="nombreRegistro"
            label="Nombre del registro DNS"
            placeholder="Escriba el nombre del registro DNS"
            value={formData.nombreRegistro}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.IP}
            id="IP"
            name="IP"
            label="Dirección IP"
            placeholder="Escriba la dirección IP"
            value={formData.IP}
            onChange={handleIPChange}
            sx={{ background: "#FFFFFF"}}
            />    
          <TextField
            required
            error={!!errors?.nombreAplicacion}
            id="nombreAplicacion"
            name="nombreAplicacion"
            label="Nombre de la aplicacicón asociado al DNS"
            placeholder="Escriba el nombre de la aplicación asociado al DNS"
            value={formData.nombreAplicacion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
          />
          <TextField
            required
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificación de la solicitud"
            placeholder="Escriba la justificación del servicio"
            value={formData.justificacion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3 }}
          />
          {/**Tipo de movimiento */}
          <FormLabel
            component="legend"
            sx={{
              mt: 0,
              mb: 1,
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
          >
            Tipo de movimiento
          </FormLabel>
          <RadioGroup
            row
            aria-label="Movimiento"
            name="movimiento"
            value={formData.movimiento}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, mb: 0, justifyContent: "center" }}
          >
            <FormControlLabel
              value="ALTA"
              control={<Radio />}
              label="Alta"
            />
            <FormControlLabel
              value="BAJA"
              control={<Radio />}
              label="Baja"
            />
            <FormControlLabel
              value="CAMBIO"
              control={<Radio />}
              label="Cambio"
            />
          </RadioGroup>
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormHelperText
            sx={{
              ml: 2,
              mr: 2,
              mb: 2,
              justifyContent: "center",
              color: "red",
            }}
          >
            {errors?.movimiento}
          </FormHelperText>
          </Box>
        </Box>
      </Box>

      {/**Quien autoriza la solicitud */}
      {/* Datos del responsable de la solicitud */}    
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
          Datos de quien autoriza la soliictud
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
            error={!!errors?.nombreAproba}
            id="nombreAproba"
            name="nombreAproba"
            label="Nombre Completo"
            placeholder="Escriba únicamente el nombre completo de la persona quien autoriza la solicitud"
            value={formData.nombreAproba}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.puestoAproba}
            id="puestoAproba"
            name="puestoAproba"
            label="Puesto o Cargo"
            placeholder="Escriba el puesto o cargo de la persona quien autoriza la solicitud "
            value={formData.puestoAproba}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
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
          Generar solicitud
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
          Asegúrate de que la información registrada es correcta, ya que no se
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
        {
                  <Button
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
                    disabled={botonEstado === "Cargando..."}
                    {...(botonEstado === "Descargar PDF" && {
                      href: pdfUrl,
                      download: nombreArchivo,
                    })}
                  >
                    {botonEstado}
                  </Button>
                
              }

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                background: "#F4F4F5",
                border: "2px solid grey",
                borderRadius: 2,
                boxShadow: 24,
                pt: 2,
                px: 4,
                pb: 3,
              }}
            >
              <Typography
                id="modal-modal-title"
                align="center"
                variant="h5"
                component="h2"
                color="#9F2241"
              >
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
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Asegúrate de que la información registrada es correcta, ya que
                no se puede corregir una vez enviada.
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                Revisa ortografía, acentos, mayúsculas...
              </Typography>

              <Box sx={{ width: "100%", color: "#FF0000" }}>
                <LinearProgress
                  color="secondary"
                  variant="determinate"
                  value={progress}
                />
              </Box>
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
                disabled={!progresoCompleto}
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
            Volver al Menú
          </Button>
          {
            botonEstado !== "Descargar PDF" ?(
              <Tooltip title = "Debes de generar una previamente">
                <span>
                <Button
                  type="reset"
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
                  disabled
                >
                  Nueva solicitud
                </Button>
                </span>
              </Tooltip>
            ) :(
              <Button
                  type="reset"
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
                  onClick={() => {
                    window.location.reload();
                    window.scrollTo(0, 0);
                  }}
                >
                  Nueva solicitud
                </Button>
            )
          }
        </Box>
      </Box>

      {/* ALERT */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Container>
  );
}
