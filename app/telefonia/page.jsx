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
} from "@mui/material";
import Image from "next/image";
import Link from 'next/link';
import axios from "axios";

import Alerts from "../components/alerts.jsx";

import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";

import direccionAutocomplete from "../constants/direccion.jsx";
import ala from "../constants/ala.jsx";
import pisos from "../constants/pisos.jsx";

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

    // USUARIO EXTERNO
    extEmpleado: "0000",
    correoEmpleado: "null@null.null",
    puestoEmpleado: "null",
    nombreEmpleado: "null",
    idEmpleado: "null",

    // AREA QUE AUTORIZA
    nombreJefe: "",
    puestoJefe: "",

    marca: "HUAWEI", //Default
    modelo: "",
    serie: "",
    version: "",

    // Radios
    movimiento: "", //ALTA, BAJA, CAMBIO
    mundo: "",
    local: "",
    cLocal: "",
    nacional: "",
    cNacional: "",
    eua: "",
    tipoUsuario: "Interno", // Default
    piso: "",
    ala: "",

    usuaExterno: false, // Estado inicial como false
    //politicas
    politicasaceptadas: false,
  });

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
      value: "AVAYA",
      label: "AVAYA",
    },
    {
      value: "HUAWEI",
      label: "HUAWEI",
    },
  ];

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

  // Boton
  const [botonEstado, setBotonEstado] = useState("Enviar");

  // Alertas
  const [openAlert, setOpenAlert] = useState(false);

    // Modal
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
        if (key !== "usuaExterno" && key !== "ala" && key !== "piso") {
          console.log("Campo requerido: ", key);
          errores[key] = "Este campo es requerido"; // Texto a mostrar en cada campo faltante
          isValid = false; // Al menos un campo está vacío
        }
      }
    }
    return [isValid, errores]; // Todos los campos están llenos
  };

  // Llamada API

  const handleSubmit = async (event) => {
    handleCloseModal();
    event.preventDefault();
    handleCloseModal();

    console.log("Datos del formulario:", formData);

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
        message: "Información registrada",
        severity: "success",
      });
      setOpenAlert(true);
    }

    setBotonEstado("Cargando...");

    try {
      // PDF api
      const formResponse = await axios.post("/api2/v3/telefonia", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Respuesta: ", formResponse.data)
      const { message: formMessage, id: formId, epoch: epoch } = formResponse.data;
      console.log("Petición exitosa: ", formMessage);
      console.log("ID recibido: ", formId);
      console.log("Epoch recibido: ", epoch)
      setNombreArchivo(`TELEFONIA_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post("/api/v3/telefonia", { id: formId }, {
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
    // let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    let value = event.target.value.replace(/[^0-9-\s /]/g, "");
    value = value.slice(0, 20); // Limita la longitud a 20

    setFormData((prevFormData) => ({
      ...prevFormData,
      extEmpleado: value,
    }));
  };

  const handleDateChangeActiva = (event) => {
    const rawDate = new Date(event.target.value + "T00:00:00");
    console.log("Fecha de activación: ", rawDate);

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
    console.log("Fecha de expiración: ", rawDate);

    const formattedDate = [
      rawDate.getDate().toString().padStart(2, "0"),
      (rawDate.getMonth() + 1).toString().padStart(2, "0"),
      rawDate.getFullYear(),
    ].join("-");
    // console.log("Fecha de expiracion: ", rawDate);

    setFormData((prevFormData) => ({
      ...prevFormData,
      expiracion: formattedDate, //FECHA FORMATEADA DD-MM-YYYY PRUEBA 1
      fecha: formattedDate, // Guarda la fecha formateada en el estado
    }));
  };
  const fechaExpiracion = new Date(formData.expiracion); //cambiar de objeto a fecha

  const handleChangeExterno = (event) => {
    const selectedValue = event.target.value;
    const isExterno = selectedValue === "Externo";

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        tipoUsuario: selectedValue,
        usuaExterno: isExterno,
      };

      if (isExterno) {
        //console.log("Campo Externo desactivado");
        updatedData.extEmpleado = "";
        updatedData.correoEmpleado = "";
        updatedData.puestoEmpleado = "";
        updatedData.nombreEmpleado = "";
        updatedData.idEmpleado = "";
      } else {
        //console.log("Campo Externo activado");
        updatedData.extEmpleado = "0000";
        updatedData.correoEmpleado = "null@null.null";
        updatedData.puestoEmpleado = "null";
        updatedData.nombreEmpleado = "null";
        updatedData.idEmpleado = "null";
      }
      return updatedData;
    });
  };

  const handleChangeMarca = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      marca: selectedValue, // Guarda la marca seleccionado
    }));
  };

  // Manejo de Autocomplete
  const handleUA = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      uaUsuario: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
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
            //error={!!errors?.tipoUsuario}
            select
            id="tipoUsuario"
            name="tipoUsuario"
            label="Tipo de Usuario"
            defaultValue="Interno"
            sx={{ background: "#FFFFFF" }}
            onChange={handleChangeExterno}
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
            label="Nombre Completo"
            placeholder="Escriba el nombre completo"
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
          <TextField
            required
            error={!!errors?.puestoUsuario}
            id="puestoUsuario"
            name="puestoUsuario"
            label="Puesto"
            placeholder="Escriba el nombre puesto del usuario"
            value={formData.puestoUsuario}
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
                  placeholder="Escriba o seleccione la ala"
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
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.uaUsuario}
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Unidad Administrativa"
                placeholder="Escriba o seleccione la unidad administrativa"
              />
            )}
            id="uaUsuario"
            name="uaUsuario"
            onChange={(event, newValue) => {
              handleUA(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleUA(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.uaUsuario || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
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
          display: formData.usuaExterno ? "block" : "none",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          DATOS DEL EMPLEADO (A) DE CONAGUA RESPONSABLE
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
            label="Nombre Completo"
            placeholder="Escriba el nombre completo"
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
            label="Número De Empleado"
            placeholder="Escriba el número de empleado"
            value={formData.idEmpleado}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 32 }}
          />

          <TextField
            required
            error={!!errors?.extEmpleado}
            id="extEmpleado"
            name="extEmpleado"
            label="Teléfono / Extensión"
            placeholder="Escriba el número de teléfono o extensión"
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
            label="Correo"
            placeholder="correo@correo.com"
            value={formData.correoEmpleado}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 32 }}
          />
          <TextField
            required
            error={!!errors?.puestoEmpleado}
            id="puestoEmpleado"
            name="puestoEmpleado"
            label="Puesto"
            placeholder="Escriba el puesto del empleado"
            value={formData.puestoEmpleado}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
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
              <FormControlLabel value="ALTA" control={<Radio />} label="ALTA" />
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
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificación"
            placeholder="Escriba la justificación"
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
          ÁREA QUE AUTORIZA
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
            label="Puesto o Cargo"
            placeholder="Escriba el puesto o cargo del que autoriza"
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
            //error={!!errors?.tipoUsuario}
            select
            id="marca"
            name="marca"
            label="Marca"
            placeholder="Escriba la marca del equipo"
            defaultValue="HUAWEI"
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
            inputProps={{ maxLength: 16 }}
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
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.version}
            id="version"
            name="version"
            label="Versión de Sistema Operativo"
            placeholder="Escriba la versión del sistema operativo"
            value={formData.version}
            onChange={handleChange}
            inputProps={{ maxLength: 16 }}
            sx={{ background: "#FFFFFF" }}
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
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          CARACTERÍSTICAS DEL SERVICIO SOLICITADO
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
            Servicio de Larga Distancia Resto del Mundo*
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
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
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
            Servicio Celular Local *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Celular Local"
            name="cLocal"
            value={formData.cLocal}
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
            {errors?.cLocal}
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
            Servicio Larga Distancia Nacional *
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
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
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
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
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
            Servicio Larga Distancia Estados Unidos y Canadá: *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Larga Distancia Estados Unidos y Canadá:"
            name="eua"
            value={formData.eua}
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
            {errors?.eua}
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
          POLÍTICAS DEL SERVICIO
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
              {" •   Aquí debrán de ir las políticas"}
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
                label: "He leído y acepto las políticas del servicio",
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
