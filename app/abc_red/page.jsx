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
import tipoSolicitud from "../constants/tipoABC.jsx";
import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";
import areas from "../constants/AREAS/areas.jsx";




export default function Home() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    //DATOS DE LA SOLICITUD
    //Tipo de solicitud
    solicitud: "",
    //Reported de mesa de servicios
    reporteMesa:"",
    //Requisitante 
    nombreRequisitante:"",
    extensionRequisitante:"",
    //Solicitante
    nombreSolicitante:"",
    puestoSolicitante:"",
    //Autorización
    nombreAutoriza:"",
    puestoAutoriza:"",  
    //Usuario interno
    nombreInterno:"",
    apellidoInterno:"",
    puestoInterno:"",
    unidadInterno:"",
    areaInterno:"",
    CURPInterno:"",
    RFCInterno:"",
    extensionInterno:"",
    ciudadInterno:"",
    estadoInterno:"",
    cpInterno:"",
    direccionInterno:"",
    //Datos adicionales 
    inicioActividades:"",
    nombreCuenta:"",
    //Justificación
    justificacion:"",

    ///CASO DE BAJA EN DATOS DE CUENTA
    nombreResponsable:"",
    puestoResponsable:"",
    ciudadResponsable:"",
    estadoResponsable:"",
    cpResponsable:"",
    direccionResponsable:""
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
      "solicitud",
      "reporteMesa",
      "nombreRequisitante",
      "extensionRequisitante",
      "nombreSolicitante",
      //"puestoSolicitante",
      "nombreAutoriza",
      "puestoAutoriza",
      "justificacion",
      
    ];
    if (Data.solicitud ===   "Cambio de cuenta de servicio" || Data.solicitud ===   "Alta de cuenta de servicio" ){
      const nuevosCampos =[
        "nombreInterno",
        "apellidoInterno",
        "puestoInterno",
        "unidadInterno",
        "areaInterno",
        "CURPInterno",
        "RFCInterno",
        "extensionInterno",
        "ciudadInterno",
        "estadoInterno",
        "cpInterno",
        "direccionInterno",
        "nombreCuenta"
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
    if (Data.solicitud ===   "Baja de cuenta de servicio"){
      const nuevosCampos =[
        "nombreResponsable",
        "puestoResponsable",
        "ciudadResponsable",
        "estadoresponsable",
        "cpResponsable",
        "direccionResponsable"
        
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
    if (Data.solicitud ===   "Alta de cuenta de servicio"){
      const nuevosCampos =[
        "inicioActividades",

        
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
    
    //Descarga automática del formato en cuanto el botón esta en "Descargar PDF"
    React.useEffect(() => {
        if (!pdfUrl) return;

        if (botonEstado === "Descargar PDF") {
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = nombreArchivo || "document.pdf";
          document.body.appendChild(link);
          link.click();
          link.remove();
          // Liberar URL blob después de un corto retraso
          setTimeout(() => {
            try { URL.revokeObjectURL(pdfUrl); } catch (e) {}
          }, 1000);
        }
      }, [pdfUrl, botonEstado, nombreArchivo]);


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
  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extUsuario: value,
    }));
  };
  const handleSoli = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      solicitud: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  const handleReporteChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 6); // Limita la longitud a 6 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      reporteMesa: value,
    }));
  };
  const handleUA = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      unidadInterno: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      areaInterno: "",
    }));
  };
  const handleCURP = (event) => {
      let value = event.target.value.toUpperCase(); // Convierte a mayúsculas
      value = value.replace(/[^A-Z0-9]/g, ""); // Solo letras y números
      value = value.slice(0, 18); // Limita a 18 caracteres

      setFormData((prevFormData) => ({
        ...prevFormData,
        CURPInterno: value, // Asume que tienes un campo "curp" en formData
      }));
      };
  // Manejo de Autocomplete de Área de Adscripción
    const handleArea = (newValue) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        areaInterno: newValue || "",
      }));
    };
      //FILTRADO DE ÁREA DE ADSCRIPCIÓN
      const filteredAreas = areas[formData.unidadInterno] || [];    
      

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
            Formulario para solicitud de movimientos de la persona usuaria de la red (altas, bajas y cambios)
          </Typography>
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
          Datos de la solicitud
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
          
          {/**TIPO DE SOLIICTUD */}
          <Autocomplete
            disablePortal
            options={tipoSolicitud}
            //freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.solicitud}
                placeholder="Seleccione el tipo de solicitud"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Tipo de Solicitud"
              />
            )}
            id="solicitud"
            name="solicitud"
            onChange={(event, newValue) => {
              handleSoli(newValue); // Maneja selección de opciones
            }}
            inputValue={formData.solicitud || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <TextField
            required
            error={!!errors?.reporteMesa}
            id="reporteMesa"
            name="reporteMesa"
            label="Reporte de la Mesa de Servicios de TI"
            placeholder="Escriba el número de reporte que se le asignó"
            value={formData.reporteMesa}
            onChange={handleReporteChange}
            sx={{ background: "#FFFFFF" }}
            />    
            <TextField
            required
            error={!!errors?.nombreRequisitante}
            id="nombreRequisitante"
            name="nombreRequisitante"
            label="Nombre del requisitante"
            placeholder="Escriba el nombre completo del requisitante"
            value={formData.nombreRequisitante}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.extensionRequisitante}
            id="extensionRequisitante"
            name="extensionRequisitante"
            label="Extensión del requisitante"
            placeholder="Escriba la extensión del requisitante"
            value={formData.extensionRequisitante}
            onChange={handleExtensionChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificación"
            placeholder="Escriba la justificación de la solicitud"
            value={formData.justificacion}
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
            error={!!errors?.nombreSolicitante}
            id="nombreSolicitante"
            name="nombreSolicitante"
            label="Nombre Completo"
            placeholder="Escriba únicamente el nombre completo del usuario solicitante"
            value={formData.nombreSolicitante}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.puestoSolicitante}
            id="puestoSolicitante"
            name="puestoSolicitante"
            label="Puesto o Cargo"
            placeholder="Escriba el puesto o cargo del usuario(a) solicitante "
            value={formData.puestoSolicitante}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" , mb:3}}
          />         
        </Box>
      </Box>     

      {/* Datos de autorización*/}    
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
          Datos de autorización
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
            error={!!errors?.nombreAutoriza}
            id="nombreAutoriza"
            name="nombreAutoriza"
            label="Nombre Completo"
            placeholder="Escriba el nombre de la persona que autoriza"
            value={formData.nombreAutoriza}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.puestoAutoriza}
            id="puestoAutoriza"
            name="puestoAutoriza"
            label="Puesto o cargo"
            placeholder="Escriba el puesro de quien autoriza"
            value={formData.IP}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3}}
            />    
         
        </Box>
      </Box>

      {/* Datos de la cuenta de servicio*/}    
      <Box
      display={formData.solicitud === "Baja de cuenta de servicio"  ? "block" : "none"}
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
          Datos de la cuenta de servicio
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
            error={!!errors?.nombreCuenta}
            id="nombreCuenta"
            name="nombreCuenta"
            label="Nombre de la cuenta de servicio"
            placeholder="Escriba el nombre de la cuenta de servicio"
            value={formData.nombreCuenta}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.nombreResponsable}
            id="nombreResponsable"
            name="nombreResponsable"
            label="Nombre del responsable de la CONAGUA"
            placeholder="Escriba el nombre del responsable de la CONAGUA"
            value={formData.nombreResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            />   
            <TextField
            required
            error={!!errors?.puestoResponsable}
            id="puestoResponsable"
            name="puestoResponsable"
            label="Puesto del responsable de la CONAGUA"
            placeholder="Escriba del responsable de la CONAGUA"
            value={formData.puestoResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            />  
            <TextField
            required
            error={!!errors?.ciudadResponsable}
            id="ciudadResponsable"
            name="ciudadResponsable"
            label="Ciudad"
            placeholder="Escriba la ciudad"
            value={formData.ciudadResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.estadoResponsable}
            id="estadoResponsable"
            name="estadoResponsable"
            label="Estado"
            placeholder="Escriba el estado"
            value={formData.estadoResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.cpResponsable}
            id="cpResponsable"
            name="cpResponsable"
            label="Código Postal"
            placeholder="Escriba el código postal"
            value={formData.cpResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.direccionResponsable}
            id="direccionResponsable"
            name="direccionResponsable"
            label="Dirección"
            placeholder="Escriba la dirección"
            value={formData.direccionResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3}}
            /> 
         
        </Box>
      </Box>

      {/* Datos del usuario interno*/}    
      <Box
      display={formData.solicitud === "Alta de cuenta de servicio" || formData.solicitud == "Cambio de cuenta de servicio" ? "block" : "none"}
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
          Datos del usuario(a) interno
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
            error={!!errors?.nombreInterno}
            id="nombreInterno"
            name="nombreInterno"
            label="Nombre Completo"
            placeholder="Escriba el nombre del usuario interno"
            value={formData.nombreInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.apellidoInterno}
            id="apellidoInterno"
            name="apellidoInterno"
            label="Apellidos"
            placeholder="Escriba los apellidos del usuario interno"
            value={formData.apellidoInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            />  
            
            {/**UNIDAD ADMINISTRATIVA */}  
            <Autocomplete
                disablePortal
                options={unidadesAdmin}
                //freeSolo
                renderInput={(params) => (
                  <TextField
                    required
                    error={!!errors?.unidadInterno}
                    placeholder="Seleccione la Unidad Administrativa"
                    sx={{ background: "#FFFFFF" }}
                    {...params}
                    label="Unidad Administrativa"
                  />
                )}
                id="unidadInterno"
                name="unidadInterno"
                onChange={(event, newValue) => {
                  handleUA(newValue); // Maneja selección de opciones
                }}
                inputValue={formData.unidadInterno || ""} // Controla el valor mostrado
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
                        error={!!errors?.areaInterno}
                        placeholder="Seleccione la Área de Adscripción"
                        sx={{ background: "#FFFFFF" }}
                        {...params}
                        label="Área de Adscripción"
                      />
                    )}
                    id="areaInterno"
                    name="areaInterno"
                    onChange={(event, newValue) => {
                      handleArea(newValue); // Maneja selección de opciones
                    }}
                    inputValue={formData.areaInterno || ""} // Controla el valor mostrado
                    getOptionLabel={(option) => option || ""}
                    isOptionEqualToValue={(option, value) => option === value}
                  />

            <TextField
            required
            error={!!errors?.CURPInterno}
            id="CURPInterno"
            name="CURPInterno"
            label="CURP"
            placeholder="Escriba la CURP"
            value={formData.CURPInterno}
            onChange={handleCURP}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.RFCInterno}
            id="RFCInterno"
            name="RFCInterno"
            label="RFC"
            placeholder="Escriba RFC"
            value={formData.RFCInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.extensionInterno}
            id="extensionInterno"
            name="extensionInterno"
            label="Extensión"
            placeholder="Escriba la extensión"
            value={formData.extensionInterno}
            onChange={handleExtensionChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.ciudadInterno}
            id="ciudadInterno"
            name="ciudadInterno"
            label="Ciudad"
            placeholder="Escriba la ciudad"
            value={formData.ciudadInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.estadoInterno}
            id="estadoInterno"
            name="estadoInterno"
            label="Estado"
            placeholder="Escriba el estado"
            value={formData.estadoInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.cpInterno}
            id="cpInterno"
            name="cpInterno"
            label="Código Postal"
            placeholder="Escriba el código postal"
            value={formData.cpInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.direccionInterno}
            id="direccionInterno"
            name="direccionInterno"
            label="Dirección"
            placeholder="Escriba la direccción"
            value={formData.direccionInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3}}
            />          
        </Box>
      </Box>
      
      
      {/* Datos del adicionales */}
      <Box
      display={formData.solicitud !== "Baja de cuenta de servicio" ? "block" : "none"}
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
          Datos adicionales
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
          <Box
            display={
              formData.solicitud !== "Cambio de cuenta de servicio"
                ? "block"
                : "none"
            }
          >
            <TextField
            required
            error={!!errors?.inicioActividades}
            id="inicioActividades"
            name="inicioActividades"
            label="Fecha de inicio de actividades"
            placeholder="Escriba la fecha de inicio"
            value={formData.inicioActividades}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          </Box>          
          <TextField
            required
            error={!!errors?.nombreCuenta}
            id="nombreCuenta"
            name="nombreCuenta"
            label="Nombre de la cuenta de servicio"
            placeholder="Escriba el nombre de la cuenta de servicio"
            value={formData.nombreCuenta}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" , mb:3}}
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
