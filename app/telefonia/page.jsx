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
  Checkbox,
  Divider,
  MenuItem,
  FormHelperText,
  Autocomplete,
  Modal,
  LinearProgress,
  Tooltip, 
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import Alerts from "../components/alerts.jsx";

import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";
import puestos from "../constants/PUESTOS/puestos.jsx";

import direccionAutocomplete from "../constants/direccion.jsx";
import ala from "../constants/ala.jsx";
import pisos from "../constants/pisos.jsx";
import modelos from "../constants/MODELOSTELEFONOS/modelos.jsx";
import DownloadIcon from "@mui/icons-material/Download";


export default function Home() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    activacion: "",
    expiracion: "",
    justificacion: "",
    nombreUsuario: "",
    correoUsuario: "",
    direccion: "",
    uaUsuario: "",
    puestoUsuario: "",

    extinterno:"",

    nombreEnlace: "",
    

    tipoUsuario: "Interno", // Default
    piso: "",
    ala: "",

    
    // USUARIO EXTERNO
    extEmpleado: "",
    correoEmpleado: "",
    puestoEmpleado: "",
    nombreEmpleado: "",
    idEmpleado: "",

    // AREA QUE AUTORIZA
    nombreJefe: "",
    puestoJefe: "",

    // Caracteristicas
    marca: "Huawei", //Default
    modelo: "",
    serie: "",
    //version: "",

    // Radios
    movimiento: "", //ALTA, BAJA, CAMBIO

    // Servicios solicitados
    //local: "",
    celular: "",
    nacional: "",
    mundo: "",
    //cNacional: "",
    //eua: "",

    // Politicas
    politicasaceptadas: false,
  });

     //Capitalizar
//   function capitalizeWords(str) {
//   const exceptions = ["de", "para", "por", "y", "en", "a", "la", "el", "del", "al", "con", "sin", "o", "u"];
//   return str
//     .split(" ")
//     .map((word, idx) => {
//       // Si la palabra es solo números, no la modifica
//       if (/^[0-9]+$/.test(word)) return word;
//       // Si la palabra tiene letras, capitaliza solo la primera letra que sea letra
//       const match = word.match(/^([0-9]*)([a-zA-ZÁÉÍÓÚÑáéíóúñ])(.*)$/);
//       if (match) {
//         const [, nums, firstLetter, rest] = match;
//         const lower = (firstLetter + rest).toLowerCase();
//         const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
//         return idx === 0 || !exceptions.includes(lower)
//           ? (nums || "") + capitalized
//           : (nums || "") + lower;
//       }
//       // Si no tiene letras, solo minúsculas (ej: símbolos)
//       return word;
//     })
//     .join(" ");
// }
// // Lista de campos a capitalizar
// const fieldsToCapitalize = [
//   "nombreUsuario",
//   "puestoUsuario",
//   "puestoEmpleado",
//   "nombreEmpleado",
//   "nombreJefe",
//   "puestoJefe"
// ];

  const Tipos = [
    {
      value: "Interno",
      label: "Interno",
    },
    {
      value: "Externo",
      label: "Externo",
    },
  ];
  const Marcas = [
    {
      value: "Avaya",
      label: "Avaya",
    },
    {
      value: "Huawei",
      label: "Huawei",
    },
  ];
  //Descarga de formatos
    const [open3, setOpen3] = useState(false);
    const handleClickOpen3 = () => {
      setOpen3(true);
    };
    const handleClose3 = () => {
      setOpen3(false);
    }

  // Nombre PDF
  const [nombreArchivo, setNombreArchivo] = useState("");

  // Generar PDF
  const [pdfUrl, setPdfUrl] = useState(null);

  // Cambios
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  ///NÚMERO DE EMPLEADO
  const handleNumeroEmpleado = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 5); // Limita la longitud a 5 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      idEmpleado: value,
    }));
  };

  const handlePuestosUsuario = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoUsuario: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  const hanldePuestosEmpleado = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoEmpleado: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  //prueba de capitalizar
  // const handleChange = (event) => {
  //    const { name, value, type, checked } = event.target;
  // setFormData((prevFormData) => ({
  //   ...prevFormData,
  //   [name]:
  //     type === "checkbox"
  //       ? checked
  //       : fieldsToCapitalize.includes(name)
  //       ? capitalizeWords(value)
  //       : value,
  // }));
  // };

  // Boton
  const [botonEstado, setBotonEstado] = useState("Enviar");

  // Alertas
  const [openAlert, setOpenAlert] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    //No abrir el modal si ya está en modo descarga
    if (botonEstado === "Descargar PDF") return;
    const [isValid, getErrors] = validarCamposRequeridos(formData);
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

  const [errors, setErrors] = useState({});

  const [alert, setAlert] = useState({
    message: "",
    severity: "",
  });

  const validarCamposRequeridos = (Data) => {
    const errores = {};
    let isValid = true;

    let camposRequeridos =[
      "activacion",
      "expiracion",
      "justificacion",
      "nombreUsuario",
      "correoUsuario",
      "uaUsuario",
      "puestoUsuario",
      "direccion",
      "nombreEnlace",
      "tipoUsuario",
      "nombreJefe",
      "puestoJefe",
      "movimiento",
    ];
    if (Data.direccion ===   "Av. Insurgentes Sur 2416 Col.Copilco el Bajo. CP.04340, Coyoacán, CDMX"){
      const nuevosCampos =[
        "ala",
        "piso"
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];

    }
    if (Data.tipoUsuario === "Externo"){
      const nuevosCampos = [
        "extEmpleado",
        "correoEmpleado",
        "nombreEmpleado",
        "nombreEmpleado",
        "idEmpleado",
        "puestoEmpleado"
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
      
    }
    if (Data.movimiento === "BAJA"){
      const nuevosCampos=[
        "marca",
        "modelo",
        "serie",
        "extinterno"
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];

    }if (Data.movimiento === "CAMBIO"){
      const nuevosCampos=[
        "marca",
        "modelo",
        "serie",
        "celular",
        "nacional",
        "mundo",
        "extinterno"
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];

    } else if(Data.movimiento === "ALTA"){
      const nuevosCampos=["celular",
      "nacional",
      "mundo"];
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

  // Llamada API

  const handleSubmit = async (event) => {
    handleCloseModal();
    event.preventDefault();
    ////console.log("Lista formData en submit: ", formData);

    setAlert({
      message: "Información Enviada",
      severity: "success",
    });
    setOpenAlert(true);

    setBotonEstado("Cargando...");

    try {
      // PDF api
      const formResponse = await axios.post("/api2/v3/telefonia", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      ////console.log("Respuesta: ", formResponse.data);
      const {
        message: formMessage,
        id: formId,
        epoch: epoch,
      } = formResponse.data;
      ////console.log("Petición exitosa: ", formMessage);
      ////console.log("ID recibido: ", formId);
      ////console.log("Epoch recibido: ", epoch);
      setNombreArchivo(`TELEFONIA_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post(
          "/api/v3/telefonia",
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

        //console.error(`Error con código ${statusCode}:`, errorData.message, errorData.campo);

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

  const handleModelo = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      modelo: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  //FILTRADO DE MODELOS
  const filteredModelo = modelos[formData.marca] || [];

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
  const handleExtensionChange = (event) => {
  // Elimina todo lo que no sea dígito
    let value = event.target.value.replace(/\D/g, "");
    value = value.slice(0, 20); // Limita la longitud

    // Agrupa en bloques de 4 dígitos separados por guion
    value = value.match(/.{1,4}/g)?.join("-") || "";

    setFormData((prevFormData) => ({
      ...prevFormData,
      extEmpleado: value,
    }));
  };

  const handleExtensionInternoChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extinterno: value,
    }));
  };

  const handleDateChangeActiva = (event) => {
    const rawDate = new Date(event.target.value + "T00:00:00");
    //console.log("Fecha de activación: ", rawDate);

    const formattedDate = [
      rawDate.getDate().toString().padStart(2, "0"),
      (rawDate.getMonth() + 1).toString().padStart(2, "0"),
      rawDate.getFullYear(),
    ].join("-");

    setFormData((prevFormData) => ({
      ...prevFormData,
      activacion: formattedDate, ///ya da bien formato DD-MM-YYYY
      fecha: formattedDate, // Guarda la fecha formateada en el estado
    }));
  };
  const fechaActivacion = new Date(formData.activacion); //cambiar de objeto a fecha
  const handleDateChangeExpira = (event) => {
    //const rawDate = event.target.value;
    const rawDate = new Date(event.target.value + "T00:00:00");
    //console.log("Fecha de expiración: ", rawDate);

    const formattedDate = [
      rawDate.getDate().toString().padStart(2, "0"),
      (rawDate.getMonth() + 1).toString().padStart(2, "0"),
      rawDate.getFullYear(),
    ].join("-");
    // //console.log("Fecha de expiracion: ", rawDate);

    setFormData((prevFormData) => ({
      ...prevFormData,
      expiracion: formattedDate, //FECHA FORMATEADA DD-MM-YYYY PRUEBA 1
      fecha: formattedDate, // Guarda la fecha formateada en el estado
    }));
  };
  const fechaExpiracion = new Date(formData.expiracion); //cambiar de objeto a fecha

  const handleChangeMarca = (event) => {
    const selectedValue = event.target.value;
    //console.log(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      marca: selectedValue, // Guarda la marca seleccionado
      modelo: "",
    }));
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

  // Manejo de Autocomplete
  const handleUA = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      uaUsuario: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };

   const botones =[
      { icon: <DownloadIcon htmlColor="#FFFFFF" />, name: 'Descargar formatos',onClick: handleClickOpen3, color: "secondary" },
    ];
    
    const [openBotton, setOpenBotton] = React.useState(false);
    const handleOpenBotton = () => setOpenBotton(true);
    const handleCloseBotton = () => setOpenBotton(false);

    const handleDownloadDocx = () => {
    const link = document.createElement("a");
      link.href = "/archivos/Formato_TELEFONIA.docx"; // Ruta de archivo "General"
      link.download = "Solicitud_de_servicios_de_telefonia_v1.0.0.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
            Solicitud de servicios de telefonía
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
          Datos del usuario(a) que utilizará el servicio
        </Typography>
        {/* <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Datos del Usuario (a) que Utilizará el Servicio
        </Typography> */}

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
            //error={!!errors?.tipoUsuario}
            select
            id="tipoUsuario"
            name="tipoUsuario"
            label="Tipo de usuario"
            defaultValue="Interno"
            sx={{ background: "#FFFFFF" }}
            onChange={handleChange}
            //helperText="Porfavor selecciona el tipo de usuario"
          >
            {Tipos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            error={!!errors?.nombreUsuario}
            id="nombreUsuario"
            name="nombreUsuario"
            label="Nombre del usuario"
            placeholder="Escriba el nombre completo del usuario"
            value={formData.nombreUsuario}
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
            value={formData.correoUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          {/**PUESTO DE USUARIO, FALTABA */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoUsuario}
                placeholder="Escriba o seleccione el puesto del usuario"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Puesto del usuario"
              />
            )}
            id="puestoUsuario"
            name="puestoUsuario"
            onChange={(event, newValue) => {
              handlePuestosUsuario(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handlePuestosUsuario(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.puestoUsuario || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
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
            disablePortal
            options={unidadesAdmin}
            //freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.uaUsuario}
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Unidad Administrativa"
                placeholder="Seleccione la Unidad Administrativa"
              />
            )}
            id="uaUsuario"
            name="uaUsuario"
            onChange={(event, newValue) => {
              handleUA(newValue); // Maneja selección de opciones
            }}            
            inputValue={formData.uaUsuario || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Datos del enlace administrativo
        </Typography>
          <TextField
            required
            error={!!errors?.nombreEnlace}
            id="nombreEnlace"
            name="nombreEnlace"
            label="Nombre del enlace administrativo"
            placeholder="Escriba el nombre completo del enlace administrativo"
            value={formData.nombreEnlace}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
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
            padding: "2",
          },
          display: formData.tipoUsuario === "Externo" ? "block" : "none",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Datos del empleado(a) de CONAGUA responsable
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
            error={!!errors?.nombreEmpleado}
            id="nombreEmpleado"
            name="nombreEmpleado"
            label="Nombre del empleado responsable"
            placeholder="Escriba el nombre completo del empleado responsable"
            value={formData.nombreEmpleado}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 32 }}
          />
          <TextField
            required
            error={!!errors?.idEmpleado}
            id="idEmpleado"
            name="idEmpleado"
            label="Número de empleado"
            placeholder="Escriba el número de empleado"
            value={formData.idEmpleado}
            //HandleChange
            onChange={handleNumeroEmpleado}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 5 }}
          />

          <TextField
            required
            error={!!errors?.extEmpleado}
            id="extEmpleado"
            name="extEmpleado"
            label="Teléfono / Extensión"
            placeholder="Escriba el número de teléfono y extensión del empleado responsable"
            value={formData.extEmpleado}
            onChange={handleExtensionChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 20 }}
          />
          <TextField
            required
            error={!!errors?.correoEmpleado}
            id="correoEmpleado"
            name="correoEmpleado"
            label="Correo institucional"
            placeholder="correo@conagua.gob.mx"
            value={formData.correoEmpleado}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          {/**Puesto de usuario */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoEmpleado}
                placeholder="Escriba o seleccione el puesto del empleado"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Puesto de empleado responsable"
              />
            )}
            id="puestoEmpleado"
            name="puestoEmpleado"
            onChange={(event, newValue) => {
              hanldePuestosEmpleado(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                hanldePuestosEmpleado(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.puestoEmpleado || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
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
          Información de la solicitud
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
              Tipo de movimiento *
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
              <FormControlLabel value="ALTA" control={<Radio />} label="Alta" />
              <FormControlLabel value="BAJA" control={<Radio />} label="Baja" />
              <FormControlLabel
                value="CAMBIO"
                control={<Radio />}
                label="Cambio"
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
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificación de la solicitud"
            placeholder="Escriba la justificación del servicio"
            value={formData.justificacion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.activacion}
            id="activacion"
            name="activacion"
            label="Fecha de activación"
            type="date"
            //value={formData.activacion}
            onChange={handleDateChangeActiva}
            sx={{ background: "#FFFFFF" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            error={!!errors?.expiracion}
            id="expiracion"
            name="expiracion"
            label="Fecha de expiración"
            type="date"
            //value={formData.expiracion}
            onChange={handleDateChangeExpira}
            sx={{ background: "#FFFFFF" }}
            InputLabelProps={{ shrink: true }}
          />
          <Box
          sx={{
          display: (formData.movimiento && formData.movimiento === "BAJA" || formData.movimiento === "CAMBIO" )? "block" : "none",
            }}>         
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
          <FormLabel
              component="legend"
              sx={{
                mt: 0,
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              Información del usuario requerida para el movimiento*
            </FormLabel>
          <TextField
            required
            error={!!errors?.extinterno}
            id="extinterno"
            name="extinterno"
            label="Extensión del usuario"
            placeholder="Escriba la extensión del usuario"
            value={formData.extinterno}
            onChange={handleExtensionInternoChange}
            sx={{ background: "#FFFFFF" }}
          />
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
          Área que autoriza
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
            label="Funcionario con cargo de Gerente, Subgerente, Homólogo o Superior"
            placeholder="Escriba el nombre completo del funcionario"
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
            label="Puesto o cargo"
            placeholder="Escriba el puesto o cargo del funcionario que autoriza"
            value={formData.puestoJefe}
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
          display: (formData.movimiento && formData.movimiento === "BAJA" || formData.movimiento === "CAMBIO" )? "block" : "none",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Características del equipo
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
            //error={!!errors?.tipoUsuario}
            select
            id="marca"
            name="marca"
            label="Marca"
            //placeholder="Escriba la marca del equipo"
            defaultValue="Huawei"
            sx={{ background: "#FFFFFF" }}
            onChange={handleChangeMarca}
            //helperText="Porfavor selecciona el tipo de usuario"
          >
            {Marcas.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/**MODELO */}
          <Autocomplete
            //error={!!errors?.modelo}
            disablePortal
            options={filteredModelo}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.modelo}
                placeholder="Escriba o seleccione el modelo"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Modelo"
              />
            )}
            id="modelo"
            name="modelo"
            onChange={(event, newValue) => {
              handleModelo(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleModelo(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.modelo || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
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
            inputProps={{ maxLength: 16 }}
            sx={{ background: "#FFFFFF", mb:3 }}
          />
          {/* <TextField
            required
            error={!!errors?.version}
            id="version"
            name="version"
            label="Versión de sistema operativo"
            placeholder="Escriba la versión del sistema operativo"
            value={formData.version}
            onChange={handleChange}
            inputProps={{ maxLength: 16 }}
            sx={{ background: "#FFFFFF", mb: 3 }}
          /> */}
        </Box>
      </Box>

      {/* Datos del Servicio */}
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
          display: (formData.movimiento && formData.movimiento === "ALTA" || formData.movimiento === "CAMBIO" )? "block" : "none",

        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Características del servicio solicitado
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
            ml: 2,
            mr: 2,
            mt: 0,
            mb: 1,
          }}
        />

        {/* <Box
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
            Servicio Local *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Local"
            name="local"
            value={formData.local}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="Sí" />
            <FormControlLabel value="NO" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.local}
          </FormHelperText>
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
        /> */}

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
            ¿Requiere servicio celular local y foráneo? *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Celular Local"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="Sí" />
            <FormControlLabel value="NO" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.celular}
          </FormHelperText>
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
            ¿Requiere servicio de larga distancia nacional? *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Larga Distancia Nacional"
            name="nacional"
            value={formData.nacional}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="Sí" />
            <FormControlLabel value="NO" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.nacional}
          </FormHelperText>
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

        {/* <Box
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
            Servicio Celular Larga Distancia *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Celular Larga Distancia"
            name="cNacional"
            value={formData.cNacional}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="Sí" />
            <FormControlLabel value="NO" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.cNacional}
          </FormHelperText>
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
        /> */}

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
            ¿Requiere servicio de larga distancia internacional? *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Larga Distancia Estados Unidos y Canadá"
            name="mundo"
            value={formData.mundo}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="Sí" />
            <FormControlLabel value="NO" control={<Radio />} label="No" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.mundo}
          </FormHelperText>
        </Box>

        {/*         <Divider
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
            Servicio de Larga Distancia Resto del Mundo *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio de Larga Distancia Resto del Mundo"
            name="mundo"
            value={formData.mundo}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.mundo}
          </FormHelperText>
        </Box> */}

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
          Políticas y Lineamientos 
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
              1)	El formato deberá estar debidamente llenado y contener toda la información requerida facilitando 
              la aplicación expedida de las configuraciones solicitadas <br/>
              2)	El solicitante deberá presentar este formato adjuntando el memorando, sin los cuales no se podrá atender su solicitud<br/>
              3)	El solicitante deberá agregar en la <b>Justificación</b> si la solicitud ser deriva de un cambio de lugar (oficina, mampara o piso) 
              del usuario que a su vez haya derivado en un cambio de equipo o de servicios de telefonía<br/>
              4)	A todo solicitante que llene la solicitud se le otorga el acceso a “Servicio Interno” sin necesidad de marcar la casilla <br/>
              5)	El solicitante deberá conservar el acuse o copia del formato firmado y sellado, así como el memorando asociado, para posteriores 
              aclaraciones <br/>
              6)	Al firmar el usuario se da por enterado de las políticas y lineamientos y acepta la responsabilidad de cualquier uso inadecuado que 
              se le dé a los privilegios de acceso los cuales se haya solicitado<br/>
              7)	Al firmar el Gerente, Subgerente o Director Local que autoriza se da por enterado de las políticas y lineamientos y acepta la 
              corresponsabilidad del uso que el usuario que le dé el usuario al acceso otorgado.

            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 2,
              ml: 3,
              mr: 0,
              mb: 3,
              //mx: "auto"
            }}
          >
            {[
              {
                name: "politicasaceptadas",
                label:
                  "He leído y acepto los políticas y lineamientos  *",
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
        {
                !formData.politicasaceptadas ? (
                  <Tooltip title="Debes aceptar las políticas y lineamientos">
                    <span>
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
                        disabled
                      >
                        {botonEstado}
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
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
                )
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
                Asegurate de que la información registrada es correcta, ya que
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

      {/**Botón que muestra los varios botones */}
        <Box 
          sx={{ 
              position: "fixed",
              bottom: 10,
              right: 10,
              "& > :not(style)": { m: 1 },
              flexGrow:1
            }}>
          <Backdrop open={openBotton} />
          <SpeedDial
            ariaLabel="SpeedDial Menu"
            sx={{ 
              position: 'fixed', 
              bottom: 20, 
              right: 20,
              '& .MuiFab-root': { // Esto afecta todos los FABs (principal y acciones)
                backgroundColor: 'dial.secondary',
                '&:hover': {
                  backgroundColor: 'dial.main',
                }
              }
            }}
            icon={<SpeedDialIcon fontSize='large'/>}
            onClose={handleCloseBotton}
            onOpen={handleOpenBotton}
            open={openBotton}
          >        
            {botones.map((action) => (
              <SpeedDialAction
                sx={{ 
                  position:"center",
                  '& .MuiFab-root': {
                    backgroundColor: 'dial.third',
                    '&:hover': {
                      backgroundColor: 'dial.forty',
                    }
                  },
                  mt:1,
                  mb:1,
                }}
                key={action.name}
                icon={action.icon}
                slotProps={{tooltip:{title:action.name}}}
                //tooltipTitle={action.name}
                tooltipOpen
                onClick={action.onClick}
              />
            ))}
          </SpeedDial>
        </Box>
        {/* DIALOG */}
          <Dialog
            open={open3}
            onClose={handleClose3}
            sx={{
              "& .MuiDialog-container": {
                backgroundColor: "f5f5f5", // Or any other color
              },
              "& .MuiDialog-paper": {
                backgroundColor: "#f4f4f5", // Customize dialog content background
              },
            }}
            
          >
            <DialogContent>
              <DialogTitle
              align="center"
              sx={{
                mt: -2
              }}
              >
                Descarga de formato de solictud de servicios de telefonía .docx
                </DialogTitle>
              <DialogContentText>
                
              </DialogContentText>
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  borderColor: "grey",
                  ml: 2,
                  mr: 2,
                  mb: 0,
                  mt: 0,
                }}
              />
              <Button
                variant="contained"
                onClick={handleDownloadDocx}
                sx={{
                  mt: 2,
                  mb: 0,
                  width: "calc(100% - 32px)",
                  ml: 2,
                  mr: 4,
                  //color: theme.palette.third.main,
                  background:
                      theme.palette.secondary.main                 
                }}
              >
                Formato de solicitud de servicios de telefonía
              </Button>
              
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  borderColor: "grey",
                  ml: 2,
                  mr: 2,
                  mb: 0,
                  mt: 2,
                }}
              />
              <Button
                variant="contained"
                onClick={handleClose3}
                sx={{
                  mt: 2,
                  mb: 2,
                  width: "calc(100% - 32px)",
                  ml: 2,
                  mr: 4,
                  background: "#98989A",
                  color: "#FFFFFF",
                  border: "1px solid gray",
                }}
              >
                Cancelar
              </Button>
            </DialogContent>
          </Dialog>
    </Container>
  );
}
