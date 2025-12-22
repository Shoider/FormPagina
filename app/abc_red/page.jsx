"use client";

import React, { useState, useEffect } from "react";
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
import justificaciones from "../constants/justificaciones.jsx";
import puestos from "../constants/PUESTOS/puestos.jsx";

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
    direccionResponsable:"",

    //DATOS DE USUARIO EXTERNO
    nombreExterno:"",
    apellidoExterno:"",
    puestoExterno:"",
    unidadExterno:"",
    areaExterno:"",
    CURPExterno:"",
    RFCExterno:"",
    extensionExterno:"",
    ciudadExterno:"",
    estadoExterno:"",
    cpExterno:"",
    direccionExterno:"",

    //Datos adicionales de usuario externo
    finActividades:"",

    //Datos adicionales para bajas 
    datosAdicionales: ""
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
    if (Data.solicitud ===   "Cambio de cuenta de servicio" || Data.solicitud ===   "Alta de cuenta de servicio"  || Data.solicitud ===   "Alta de cuenta de usuario interno"|| Data.solicitud ===   "Baja de cuenta de usuario interno"|| Data.solicitud ===   "Cambio de cuenta de usuario interno"){
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
        //"nombreCuenta"
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
    if (Data.solicitud ===   "Cambio de cuenta de usuario externo" || Data.solicitud ===   "Alta de cuenta de usuario externo" ){
      const nuevosCampos =[
        "nombreExterno",
        "apellidoExterno",
        "puestoExterno",
        "unidadExterno",
        "areaExterno",
        "CURPExterno",
        "RFCExterno",
        "extensionExterno",
        "ciudadExterno",
        "estadoExterno",
        "cpExterno",
        "direccionExterno",
        "nombreCuenta",
        "nombreResponsable",
        "puestoResponsable",
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
    if (Data.solicitud ===   "Baja de cuenta de servicio"){
      const nuevosCampos =[
        "nombreCuenta",
        "nombreResponsable",
        "puestoResponsable",
        "ciudadResponsable",
        "estadoResponsable",
        "cpResponsable",
        "direccionResponsable"
        
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
    if (Data.solicitud ===   "Baja de cuenta de usuario externo"){
      const nuevosCampos =[
        "nombreCuenta",
        "nombreExterno",
        //"puestoExterno",
        "nombreResponsable",
        "puestoResponsable",
        "ciudadResponsable",
        "estadoResponsable",
        "cpResponsable",
        "direccionResponsable"
        
      ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
    if (Data.solicitud === "Alta de cuenta de usuario externo" || Data.solicitud === "Cambio de cuenta de usuario externo"){
      const nuevosCampos =[
        "finActividades",
       ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
    if (Data.solicitud ===   "Alta de cuenta de servicio" || Data.solicitud === "Alta de cuenta de usuario externo" || Data.solicitud ===   "Alta de cuenta de usuario interno"){
      const nuevosCampos =[
        "inicioActividades",
       ];
      camposRequeridos = [...camposRequeridos, ...nuevosCampos];
    }  
     if (Data.solicitud ===   "Cambio de cuenta de servicio" || Data.solicitud ===   "Alta de cuenta de servicio" ){
      const nuevosCampos =[
        "nombreCuenta",
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
    //Llamada a APIs para obtener catálogos

    
    // Estado para las opciones del autocomplete de dirección
    const [direccionOptions, setDireccionOptions] = useState([]);
    
    // Fetch opciones desde la API
    useEffect(() => {
      const fetchCatalogo = async () => {
        try {
          const response = await axios.post('/api2/v3/catalogodir', {});
          setDireccionOptions(response.data);
        } catch (error) {
          console.error('Error fetching catalogo:', error);
        }
      };
      fetchCatalogo();
    }, []);

    // Estados para las selecciones en cascada
    const [selectedEstado, setSelectedEstado] = useState('');
    const [selectedCiudad, setSelectedCiudad] = useState('');
    const [selectedCP, setSelectedCP] = useState('');

    // Calcular opciones filtradas
    const estadoOptions = [...new Set(direccionOptions.map(item => item.Estado))].filter(Boolean);
    const ciudadOptions = selectedEstado ? [...new Set(direccionOptions.filter(item => item.Estado === selectedEstado).map(item => item.Ciudad))].filter(Boolean) : [];
    const cpOptions = selectedCiudad ? [...new Set(direccionOptions.filter(item => item.Estado === selectedEstado && item.Ciudad === selectedCiudad).map(item => item.CP))].filter(Boolean) : [];
    const direccionFilteredOptions = selectedCP ? direccionOptions.filter(item => item.Estado === selectedEstado && item.Ciudad === selectedCiudad && item.CP === selectedCP) : [];
    
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
      const formResponse = await axios.post("/api2/v3/abc", formData, {
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
      setNombreArchivo(`Cuentas_de_servicio_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post(
          "/api/v3/abc",
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
  //extensionRequisitante
  const handleExtensionRequisitanteChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extensionRequisitante: value,
    }));
  };
//extensionInterno
const handleExtensionInternoChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extensionInterno: value,
    }));
  };
  const handleExtensionExternoChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extensionExterno: value,
    }));
  };
  const handleSoli = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      solicitud: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  //MANEJO DE AUTOCOMPLETE DE DIRECCIONES, ESTADO, CIUDAD Y CODIGO POSTAL DE RESPONSABLES
  const handleDireccionResponsable = (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Dirección : newValue;
    setFormData((prevFormData) => ({
      ...prevFormData,
      direccionResponsable: value || "",
    }));
  };
  const handleEstadoResponsable = (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Estado : newValue;
    setSelectedEstado(value || '');
    setSelectedCiudad('');
    setSelectedCP('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      estadoResponsable: value || "",
      ciudadResponsable: "",
      cpResponsable: "",
      direccionResponsable: "",
    }));
  };
  const handleCiudadResponsable = (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Ciudad : newValue;
    setSelectedCiudad(value || '');
    setSelectedCP('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      ciudadResponsable: value || "",
      cpResponsable: "",
      direccionResponsable: "",
    }));
  };
  const handleCPResponsable = (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.CP : newValue;
    setSelectedCP(value || '');
    setFormData((prevFormData) => ({
      ...prevFormData,
      cpResponsable: value || "",
      direccionResponsable: "",
    }));
  };
  //MANEJO DE AUTOCOMPLETE DE DIRECCIONES, ESTADO, CIUDAD Y CODIGO POSTAL DE EXTERNOS
  const handleDireccionExternos = (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Dirección : newValue;
    setFormData((prevFormData) => ({
      ...prevFormData,
      direccionExterno: value || "",
    }));
  };
  const handleEstadoExternos= (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Estado : newValue;
    setSelectedEstado(value || '');
    setSelectedCiudad('');
    setSelectedCP('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      estadoExterno: value || "",
      ciudadExterno: "",
      cpExterno: "",
      direccionExterno: "",
    }));
  };
  const handleCiudadExternos = (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Ciudad : newValue;
    setSelectedCiudad(value || '');
    setSelectedCP('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      ciudadExterno: value || "",
      cpExterno: "",
      direccionExterno: "",
    }));
  };
  const handleCPExternos= (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.CP : newValue;
    setSelectedCP(value || '');
    setFormData((prevFormData) => ({
      ...prevFormData,
      cpExterno: value || "",
      direccionExterno: "",
    }));
  };
  //MANEJO DE AUTOCOMPLETE DE DIRECCIONES, ESTADO, CIUDAD Y CODIGO POSTAL DE INTERNOS
  const handleDireccionInternos = (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Dirección : newValue;
    setFormData((prevFormData) => ({
      ...prevFormData,
      direccionInterno: value || "",
    }));
  };
  const handleEstadoInternos= (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Estado : newValue;
    setSelectedEstado(value || '');
    setSelectedCiudad('');
    setSelectedCP('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      estadoInterno: value || "",
      ciudadInterno: "",
      cpInterno: "",
      direccionInterno: "",
    }));
  };
  const handleCiudadInternos = (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.Ciudad : newValue;
    setSelectedCiudad(value || '');
    setSelectedCP('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      ciudadInterno: value || "",
      cpInterno: "",
      direccionInterno: "",
    }));
  };
  const handleCPInternos= (newValue) => {
    const value = (newValue && typeof newValue === 'object') ? newValue.CP : newValue;
    setSelectedCP(value || '');
    setFormData((prevFormData) => ({
      ...prevFormData,
      cpInterno: value || "",
      direccionInterno: "",
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
  const handleRFC = (event) => {
      let value = event.target.value.toUpperCase(); // Convierte a mayúsculas
      value = value.replace(/[^A-Z0-9]/g, ""); // Solo letras y números
      value = value.slice(0, 13); // Limita a 18 caracteres

      setFormData((prevFormData) => ({
        ...prevFormData,
        RFCInterno: value, // Asume que tienes un campo "curp" en formData
      }));
      };
  const handleRFCExt = (event) => {
      let value = event.target.value.toUpperCase(); // Convierte a mayúsculas
      value = value.replace(/[^A-Z0-9]/g, ""); // Solo letras y números
      value = value.slice(0, 13); // Limita a 18 caracteres

      setFormData((prevFormData) => ({
        ...prevFormData,
        RFCExterno: value, // Asume que tienes un campo "curp" en formData
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
  
      const handleUAExter = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      unidadExterno: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      areaExterno: "",
    }));
  };
  const handleCURPExt = (event) => {
      let value = event.target.value.toUpperCase(); // Convierte a mayúsculas
      value = value.replace(/[^A-Z0-9]/g, ""); // Solo letras y números
      value = value.slice(0, 18); // Limita a 18 caracteres

      setFormData((prevFormData) => ({
        ...prevFormData,
        CURPExterno: value, // Asume que tienes un campo "curp" en formData
      }));
      };
  // Manejo de Autocomplete de Área de Adscripción
    const handleAreaExt = (newValue) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        areaExterno: newValue || "",
      }));
    };
      //FILTRADO DE ÁREA DE ADSCRIPCIÓN
      const filteredAreasExt = areas[formData.unidadExterno] || [];  
      
  const handleDateChangeInicio = (event) => {
    const rawDate = new Date(event.target.value + "T00:00:00");
    const formattedDate = [
      rawDate.getDate().toString().padStart(2, "0"),
      (rawDate.getMonth() + 1).toString().padStart(2, "0"),
      rawDate.getFullYear(),
    ].join("-");

    setFormData((prevFormData) => ({
      ...prevFormData,
      inicioActividades: formattedDate, ///ya da bien formato DD-MM-YYYY
      //fecha: formattedDate, // Guarda la fecha formateada en el estado
    }));
  };
  //const fechaInicio = new Date(formData.inicioActividades); //cambiar de objeto a fecha
  const handleDateChangeFin = (event) => {
    const rawDate = new Date(event.target.value + "T00:00:00");
    const formattedDate = [
      rawDate.getDate().toString().padStart(2, "0"),
      (rawDate.getMonth() + 1).toString().padStart(2, "0"),
      rawDate.getFullYear(),
    ].join("-");

    setFormData((prevFormData) => ({
      ...prevFormData,
      finActividades: formattedDate, ///ya da bien formato DD-MM-YYYY
      //fecha: formattedDate, // Guarda la fecha formateada en el estado
    }));
  };

   const handleJustificacion = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      justificacion: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  //Manejo de autocomplete de puestos
  const handlePuestos = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoSolicitante: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      
    }));
  };
  const handlePuestoAutoriza = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoAutoriza: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      
    }));
  };
  const handlePuestoInterno = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoInterno: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      
    }));
  };
   const handlePuestoExterno = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoExterno: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      
    }));
  };
  const handlePuestoResponsable = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoResponsable: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      
    }));
  };
  //const fechaFin = new Date(formData.finActividades); //cambiar de objeto a fecha
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
            onChange={handleExtensionRequisitanteChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            {/* <TextField
            required
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificación"
            placeholder="Escriba la justificación de la solicitud"
            value={formData.justificacion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            />  */}
            <Autocomplete
              disablePortal
              options={justificaciones}
              freeSolo
              sx={{ mb: 3 }}
              //sx={{ width: "50%" }}
              renderInput={(params) => (
                <TextField
                  required
                  error={!!errors?.justificacion}
                  placeholder="Escriba o seleccione la justificación de la solicitud"
                  sx={{ background: "#FFFFFF" }}
                  {...params}
                  label="Justificación"
                />
              )}
              id="justificacion"
              name="justificacion"
              onChange={(event, newValue) => {
                handleJustificacion(newValue); // Maneja selección de opciones
              }}
              onInputChange={(event, newInputValue) => {
                if (event?.type === "change") {
                  handleJustificacion(newInputValue); // Maneja texto escrito directamente
                }
              }}
              inputValue={formData.justificacion || ""} // Controla el valor mostrado
              getOptionLabel={(option) => option || ""}
              isOptionEqualToValue={(option, value) => option === value}
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
          {/* <TextField
            required
            error={!!errors?.puestoSolicitante}
            id="puestoSolicitante"
            name="puestoSolicitante"
            label="Puesto o Cargo"
            placeholder="Escriba el puesto o cargo del usuario(a) solicitante "
            value={formData.puestoSolicitante}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" , mb:3}}
          /> */}
          {/**Puesto de Solicitante */}
            <Autocomplete
              disablePortal
              options={puestos}
              freeSolo
              renderInput={(params) => (
                <TextField
                  required
                  error={!!errors?.puestoSolicitante}
                  placeholder="Escriba o seleccione el puesto del solicitante"
                  sx={{ background: "#FFFFFF", mb:3 }}
                  {...params}
                  label="Puesto o cargo"
                />
              )}
              id="puestoSolicitante"
              name="puestoSolicitante"
              onChange={(event, newValue) => {
                handlePuestos(newValue); // Maneja selección de opciones
              }}
              onInputChange={(event, newInputValue) => {
                if (event?.type === "change") {
                  
                    handlePuestos(newInputValue); // Maneja texto escrito directamente
                  
                }
              }} 
              inputValue={formData.puestoSolicitante || ""} // Controla el valor mostrado
              getOptionLabel={(option) => option || ""}
              isOptionEqualToValue={(option, value) => option === value}
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
          {/* <TextField
            required
            error={!!errors?.puestoAutoriza}
            id="puestoAutoriza"
            name="puestoAutoriza"
            label="Puesto o cargo"
            placeholder="Escriba el puesro de quien autoriza"
            value={formData.IP}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3}}
            />  */}
          {/**Puesto de Autoriza */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoAutoriza}
                placeholder="Escriba o seleccione el puesto de quien autoriza"
                sx={{ background: "#FFFFFF", mb:3 }}
                {...params}
                label="Puesto o cargo"
              />
            )}
            id="puestoAutoriza"
            name="puestoAutoriza"
            onChange={(event, newValue) => {
              handlePuestoAutoriza(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                
                  handlePuestoAutoriza(newInputValue); // Maneja texto escrito directamente
                
              }
            }} 
            inputValue={formData.puestoAutoriza || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
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
            {/**Puesto de responsable */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoResponsable}
                placeholder="Escriba o seleccione el puesto del responsable en la CONAGUA"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Puesto o Cargo"
              />
            )}
            id="puestoResponsable"
            name="puestoResponsable"
            onChange={(event, newValue) => {
              handlePuestoResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                
                  handlePuestoResponsable(newInputValue); // Maneja texto escrito directamente
                
              }
            }} 
            inputValue={formData.puestoResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />           
          {/**Autocomplete para estado, ciudad, cp y dirección */}            
            <Autocomplete
            disablePortal
            options={estadoOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.estadoResponsable}
                placeholder="Escriba o seleccione el estado"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Estado"
              />
            )}
            id="estadoResponsable"
            name="estadoResponsable"
            onChange={(event, newValue) => {
              handleEstadoResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleEstadoResponsable(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.estadoResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          /> 
           <Autocomplete
            disablePortal
            options={ciudadOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.ciudadResponsable}
                placeholder="Escriba o seleccione la ciudad"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Ciudad"
              />
            )}
            id="ciudadResponsable"
            name="ciudadResponsable"
            onChange={(event, newValue) => {
              handleCiudadResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleCiudadResponsable(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.ciudadResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
            
          <Autocomplete
            disablePortal
            options={cpOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.cpResponsable}
                placeholder="Escriba o seleccione el cp"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Códido Postal"
              />
            )}
            id="cpResponsable"
            name="cpResponsable"
            onChange={(event, newValue) => {
              handleCPResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleCPResponsable(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.cpResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          /> 
          <Autocomplete
            disablePortal
            options={direccionFilteredOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.direccionResponsable}
                placeholder="Escriba o seleccione la dirección"
                sx={{ background: "#FFFFFF", mb: 3 }}
                {...params}
                label="Dirección"
              />
            )}
            id="direccionResponsable"
            name="direccionResponsable"
            onChange={(event, newValue) => {
              handleDireccionResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleDireccionResponsable(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.direccionResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option.Dirección || ""}
            isOptionEqualToValue={(option, value) => option.Dirección === value}
          />          
         
        </Box>
      </Box>

      {/* Datos de la cuenta genérica*/}    
      <Box
      display={formData.solicitud === "Baja de cuenta de usuario externo"  ? "block" : "none"}
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
          Datos de la cuenta genérica
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
            error={!!errors?.nombreExterno}
            id="nombreExterno"
            name="nombreExterno"
            label="Nombre"
            placeholder="Escriba el nombre del usuario externo"
            value={formData.nombreExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />     
          {/**Puesto de Usuario externo */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoExterno}
                placeholder="Escriba o seleccione el puesto del usuario"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Puesto o Cargo"
              />
            )}
            id="puestoExterno"
            name="puestoExterno"
            onChange={(event, newValue) => {
              handlePuestoExterno(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                
                  handlePuestoExterno(newInputValue); // Maneja texto escrito directamente
                
              }
            }} 
            inputValue={formData.puestoExterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />     
            {/* <TextField
            required
            error={!!errors?.puestoExterno}
            id="puestoExterno"
            name="puestoExterno"
            label="Puesto"
            placeholder="Escriba el puesto"
            value={formData.puestoExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> */}

            {/**Agregar autocomplete de puestoresponsable */}
          {/* <TextField
            required
            error={!!errors?.nombreResponsable}
            id="nombreResponsable"
            name="nombreResponsable"
            label="Nombre del responsable de la CONAGUA"
            placeholder="Escriba el nombre del responsable de la CONAGUA"
            value={formData.nombreResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            />    */}
          {/**Puesto de responsable */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoResponsable}
                placeholder="Escriba o seleccione el puesto del responsable en la CONAGUA"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Puesto del responsable de la CONAGUA"
              />
            )}
            id="puestoResponsable"
            name="puestoResponsable"
            onChange={(event, newValue) => {
              handlePuestoResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                
                  handlePuestoResponsable(newInputValue); // Maneja texto escrito directamente
                
              }
            }} 
            inputValue={formData.puestoResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />   
            
            {/*Agregar autocomplete de estado, ciudad, cp y direciión de reponsable */}
            {/* <TextField
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
            />  */}
            <Autocomplete
            disablePortal
            options={estadoOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.estadoResponsable}
                placeholder="Escriba o seleccione el estado"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Estado"
              />
            )}
            id="estadoResponsable"
            name="estadoResponsable"
            onChange={(event, newValue) => {
              handleEstadoResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleEstadoResponsable(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.estadoResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          /> 
           <Autocomplete
            disablePortal
            options={ciudadOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.ciudadResponsable}
                placeholder="Escriba o seleccione la ciudad"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Ciudad"
              />
            )}
            id="ciudadResponsable"
            name="ciudadResponsable"
            onChange={(event, newValue) => {
              handleCiudadResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleCiudadResponsable(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.ciudadResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
            {/* <TextField
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
            />  */}
         <Autocomplete
            disablePortal
            options={cpOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.cpResponsable}
                placeholder="Escriba o seleccione el cp"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Códido Postal"
              />
            )}
            id="cpResponsable"
            name="cpResponsable"
            onChange={(event, newValue) => {
              handleCPResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleCPResponsable(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.cpResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          /> 
          <Autocomplete
            disablePortal
            options={direccionFilteredOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.direccionResponsable}
                placeholder="Escriba o seleccione la dirección"
                sx={{ background: "#FFFFFF", mb: 3 }}
                {...params}
                label="Dirección"
              />
            )}
            id="direccionResponsable"
            name="direccionResponsable"
            onChange={(event, newValue) => {
              handleDireccionResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleDireccionResponsable(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.direccionResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option.Dirección || ""}
            isOptionEqualToValue={(option, value) => option.Dirección === value}
          />  
        </Box>
      </Box>

      {/* Datos del usuario interno*/}    
      <Box
      display={formData.solicitud === "Alta de cuenta de servicio" 
        || formData.solicitud == "Cambio de cuenta de servicio" 
        || formData.solicitud == "Alta de cuenta de usuario interno"
        || formData.solicitud == "Baja de cuenta de usuario interno"
        || formData.solicitud == "Cambio de cuenta de usuario interno"
        ? "block" : "none"}
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
            label="Nombre"
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
            {/* <TextField
            required
            error={!!errors?.puestoInterno}
            id="puestoInterno"
            name="puestoInterno"
            label="Puesto"
            placeholder="Escriba el puesto"
            value={formData.puestoInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> */}
            {/**Puesto de Interno */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoInterno}
                placeholder="Escriba o seleccione el puesto del usuario"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Puesto o Cargo"
              />
            )}
            id="puestoInterno"
            name="puestoInterno"
            onChange={(event, newValue) => {
              handlePuestoInterno(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                
                  handlePuestoInterno(newInputValue); // Maneja texto escrito directamente
                
              }
            }} 
            inputValue={formData.puestoInterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
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
            onChange={handleRFC}
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
            onChange={handleExtensionInternoChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            {/**Agregar autocomplete de estado, ciudad, cp y dirección de interno  */}
            {/* <TextField
            required
            error={!!errors?.ciudadInterno}
            id="ciudadInterno"
            name="ciudadInterno"
            label="Ciudad"
            placeholder="Escriba la ciudad"
            value={formData.ciudadInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            />  */}
            <Autocomplete
            disablePortal
            options={estadoOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.estadoInterno}
                placeholder="Escriba o seleccione el estado"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Estado"
              />
            )}
            id="estadoInterno"
            name="estadoInterno"
            onChange={(event, newValue) => {
              handleEstadoInternos(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleEstadoInternos(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.estadoInterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          /> 
          <Autocomplete
            disablePortal
            options={ciudadOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.ciudadInterno}
                placeholder="Escriba o seleccione la ciudad"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Ciudad"
              />
            )}
            id="ciudadInterno"
            name="ciudadInterno"
            onChange={(event, newValue) => {
              handleCiudadInternos(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleCiudadInternos(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.ciudadInterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
            {/* <TextField
            required
            error={!!errors?.estadoInterno}
            id="estadoInterno"
            name="estadoInterno"
            label="Estado"
            placeholder="Escriba el estado"
            value={formData.estadoInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            />  */}

            <Autocomplete
            disablePortal
            options={cpOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.cpInterno}
                placeholder="Escriba o seleccione el cp"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Códido Postal"
              />
            )}
            id="cpInterno"
            name="cpInterno"
            onChange={(event, newValue) => {
              handleCPInternos(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleCPInternos(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.cpInterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          /> 
            {/* <TextField
            required
            error={!!errors?.cpInterno}
            id="cpInterno"
            name="cpInterno"
            label="Código Postal"
            placeholder="Escriba el código postal"
            value={formData.cpInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            />  */}
            <Autocomplete
            disablePortal
            options={direccionFilteredOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.direccionInterno}
                placeholder="Escriba o seleccione la dirección"
                sx={{ background: "#FFFFFF", mb: 3 }}
                {...params}
                label="Dirección"
              />
            )}
            id="direccionInterno"
            name="direccionInterno"
            onChange={(event, newValue) => {
              handleDireccionInternos(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleDireccionInternos(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.direccionInterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option.Dirección || ""}
            isOptionEqualToValue={(option, value) => option.Dirección === value}
          /> 
            {/* <TextField
            required
            error={!!errors?.direccionInterno}
            id="direccionInterno"
            name="direccionInterno"
            label="Dirección"
            placeholder="Escriba la direccción"
            value={formData.direccionInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3}}
            />                    */}
        </Box>
      </Box>

      {/* Datos del usuario externo*/}    
      <Box
      display={formData.solicitud === "Alta de cuenta de usuario externo" || formData.solicitud == "Cambio de cuenta de usuario externo" ? "block" : "none"}
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
          Datos del usuario(a) externo
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
            error={!!errors?.nombreExterno}
            id="nombreExterno"
            name="nombreExterno"
            label="Nombre"
            placeholder="Escriba el nombre del usuario externo"
            value={formData.nombreExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.apellidoExterno}
            id="apellidoExterno"
            name="apellidoExterno"
            label="Apellidos"
            placeholder="Escriba los apellidos del usuario externo"
            value={formData.apellidoExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            />  
            {/* <TextField
            required
            error={!!errors?.puestoExterno}
            id="puestoExterno"
            name="puestoExterno"
            label="Puesto"
            placeholder="Escriba el puesto"
            value={formData.puestoExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> */}
            {/**Puesto de Usuario externo */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoExterno}
                placeholder="Escriba o seleccione el puesto del usuario"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Puesto o Cargo"
              />
            )}
            id="puestoExterno"
            name="puestoExterno"
            onChange={(event, newValue) => {
              handlePuestoExterno(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                
                  handlePuestoExterno(newInputValue); // Maneja texto escrito directamente
                
              }
            }} 
            inputValue={formData.puestoExterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
            
            {/**UNIDAD ADMINISTRATIVA */}  
            <Autocomplete
                disablePortal
                options={unidadesAdmin}
                //freeSolo
                renderInput={(params) => (
                  <TextField
                    required
                    error={!!errors?.unidadExterno}
                    placeholder="Seleccione la Unidad Administrativa"
                    sx={{ background: "#FFFFFF" }}
                    {...params}
                    label="Unidad Administrativa"
                  />
                )}
                id="unidadExterno"
                name="unidadExterno"
                onChange={(event, newValue) => {
                  handleUAExter(newValue); // Maneja selección de opciones
                }}
                inputValue={formData.unidadExterno || ""} // Controla el valor mostrado
                getOptionLabel={(option) => option || ""}
                isOptionEqualToValue={(option, value) => option === value}
              />
              {/**ÁREA DE ADSCRIPCIÓN */}
                  <Autocomplete
                    disablePortal
                    options={filteredAreasExt}
                    //freeSolo
                    renderInput={(params) => (
                      <TextField
                        required
                        error={!!errors?.areaExterno}
                        placeholder="Seleccione la Área de Adscripción"
                        sx={{ background: "#FFFFFF" }}
                        {...params}
                        label="Área de Adscripción"
                      />
                    )}
                    id="areaExterno"
                    name="areaExterno"
                    onChange={(event, newValue) => {
                      handleAreaExt(newValue); // Maneja selección de opciones
                    }}
                    inputValue={formData.areaExterno || ""} // Controla el valor mostrado
                    getOptionLabel={(option) => option || ""}
                    isOptionEqualToValue={(option, value) => option === value}
                  />

            <TextField
            required
            error={!!errors?.CURPExterno}
            id="CURPExterno"
            name="CURPExterno"
            label="CURP"
            placeholder="Escriba la CURP"
            value={formData.CURPExterno}
            onChange={handleCURPExt}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.RFCExterno}
            id="RFCExterno"
            name="RFCExterno"
            label="RFC"
            placeholder="Escriba RFC"
            value={formData.RFCExterno}
            onChange={handleRFCExt}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.extensionExterno}
            id="extensionExterno"
            name="extensionExterno"
            label="Extensión"
            placeholder="Escriba la extensión"
            value={formData.extensionExterno}
            onChange={handleExtensionExternoChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            {/* <TextField
            required
            error={!!errors?.ciudadExterno}
            id="ciudadExterno"
            name="ciudadExterno"
            label="Ciudad"
            placeholder="Escriba la ciudad"
            value={formData.ciudadExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.estadoExterno}
            id="estadoExterno"
            name="estadoExterno"
            label="Estado"
            placeholder="Escriba el estado"
            value={formData.estadoExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.cpExterno}
            id="cpExterno"
            name="cpExterno"
            label="Código Postal"
            placeholder="Escriba el código postal"
            value={formData.cpExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            /> 
            <TextField
            required
            error={!!errors?.direccionExterno}
            id="direccionExterno"
            name="direccionExterno"
            label="Dirección"
            placeholder="Escriba la direccción"
            value={formData.direccionExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3}}
            />           */}
            <Autocomplete
            disablePortal
            options={estadoOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.estadoExterno}
                placeholder="Escriba o seleccione el estado"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Estado"
              />
            )}
            id="estadoExterno"
            name="estadoExterno"
            onChange={(event, newValue) => {
              handleEstadoExternos(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleEstadoExternos(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.estadoExterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          /> 
           <Autocomplete
            disablePortal
            options={ciudadOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.ciudadExterno}
                placeholder="Escriba o seleccione la ciudad"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Ciudad"
              />
            )}
            id="ciudadExterno"
            name="ciudadExterno"
            onChange={(event, newValue) => {
              handleCiudadExternos(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleCiudadExternos(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.ciudadExterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <Autocomplete
            disablePortal
            options={cpOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.cpExterno}
                placeholder="Escriba o seleccione el cp"
                sx={{ background: "#FFFFFF"}}
                {...params}
                label="Códido Postal"
              />
            )}
            id="cpExterno"
            name="cpExterno"
            onChange={(event, newValue) => {
              handleCPExternos(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleCPExternos(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.cpExterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          /> 
          <Autocomplete
            disablePortal
            options={direccionFilteredOptions}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.direccionExterno}
                placeholder="Escriba o seleccione la dirección"
                sx={{ background: "#FFFFFF", mb: 3 }}
                {...params}
                label="Dirección"
              />
            )}
            id="direccionExterno"
            name="direccionExterno"
            onChange={(event, newValue) => {
              handleDireccionExternos(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleDireccionExternos(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.direccionExterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option.Dirección || ""}
            isOptionEqualToValue={(option, value) => option.Dirección === value}
          />  
        </Box>
      </Box>
      {/* Datos del adicionales */}
      <Box
      display={formData.solicitud === "Baja de cuenta de servicio" 
        || formData.solicitud === "Baja de cuenta de usuario externo"
        || formData.solicitud === "Baja de cuenta de usuario interno"
        || formData.solicitud === "Cambio de cuenta de usuario interno"
        
        ? "block" : "none"}
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
          <TextField
            required
            //error={!!errors?.datosAdicionales}
            id="datosAdicionales"
            name="datosAdicionales"
            label="Datos adicionales"
            placeholder="Escriba los datos adicionales"
            value={formData.datosAdicionales}
            onChange={handleChange}
            sx={{ background: "#FFFFFF",mb:3 }}
          />
          </Box>           
         
      </Box>
      
      {/* Datos del adicionales */}
      <Box
      display={formData.solicitud !== "Baja de cuenta de servicio" 
        && formData.solicitud !== "Baja de cuenta de usuario externo"
        && formData.solicitud !== "Baja de cuenta de usuario interno"
        && formData.solicitud !== "Cambio de cuenta de usuario interno"
        && formData.solicitud
        ? "block" : "none"}
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
              formData.solicitud === "Alta de cuenta de servicio" 
              || formData.solicitud === "Alta de cuenta de usuario externo"
                ? "block"
                : "none"
            }
          >
            {/* <TextField
            required
            error={!!errors?.inicioActividades}
            id="inicioActividades"
            name="inicioActividades"
            label="Fecha de inicio de actividades"
            placeholder="Escriba la fecha de inicio"
            value={formData.inicioActividades}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          /> */}
          <TextField
            required
            error={!!errors?.inicioActividades}
            id="inicioActividades"
            name="inicioActividades"
            label="Fecha de inicio de actividades"
            type="date"
            //value={formData.activacion}
            onChange={handleDateChangeInicio}
            sx={{ background: "#FFFFFF" }}
            InputLabelProps={{ shrink: true }}
          />
          </Box>   
          <Box          
            display={
             formData.solicitud === "Alta de cuenta de usuario interno"
                ? "block"
                : "none"
            }
          >
            {/* <TextField
            required
            error={!!errors?.inicioActividades}
            id="inicioActividades"
            name="inicioActividades"
            label="Fecha de inicio de actividades"
            placeholder="Escriba la fecha de inicio"
            value={formData.inicioActividades}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3}}
          /> */}
          <TextField
            required
            error={!!errors?.inicioActividades}
            id="inicioActividades"
            name="inicioActividades"
            label="Fecha de inicio de actividades"
            type="date"
            onChange={handleDateChangeInicio}
            sx={{ background: "#FFFFFF" , mb:3}}
            InputLabelProps={{ shrink: true }}
          />
          </Box>    
          <Box
            display={
              formData.solicitud === "Cambio de cuenta de usuario externo" || formData.solicitud === "Alta de cuenta de usuario externo"
                ? "block"
                : "none"
            }
          >
            {/* <TextField
            required
            error={!!errors?.finActividades}
            id="finActividades"
            name="finActividades"
            label="Fecha de fin de actividades"
            placeholder="Escriba la fecha de fin"
            value={formData.finActividades}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
          /> */}
          <TextField
            required
            error={!!errors?.finActividades}
            id="finActividades"
            name="finActividades"
            label="Fecha de fin de actividades"
            type="date"
            onChange={handleDateChangeFin}
            sx={{ background: "#FFFFFF" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            error={!!errors?.nombreCuenta}
            id="nombreCuenta"
            name="nombreCuenta"
            label="Nombre de la cuenta genérica"
            placeholder="Escriba el nombre de la cuenta genérica"
            value={formData.nombreCuenta}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
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
            sx={{ background: "#FFFFFF" }}
          /> 
          {/* <TextField
            required
            error={!!errors?.puestoResponsable}
            id="puestoResponsable"
            name="puestoResponsable"
            label="Puesto del responsable de la CONAGUA"
            placeholder="Escriba el puesto del responsable de la CONAGUA"
            value={formData.puestoResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" , mb:3}}
          /> */}
           {/**Puesto de responsable */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoResponsable}
                placeholder="Escriba o seleccione el puesto del responsable en la CONAGUA"
                sx={{ background: "#FFFFFF" , mb:3}}
                {...params}
                label="Puesto o Cargo"
              />
            )}
            id="puestoResponsable"
            name="puestoResponsable"
            onChange={(event, newValue) => {
              handlePuestoResponsable(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                
                  handlePuestoResponsable(newInputValue); // Maneja texto escrito directamente
                
              }
            }} 
            inputValue={formData.puestoResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          </Box> 
          
          <Box
            display={
              formData.solicitud === "Cambio de cuenta de servicio" || formData.solicitud === "Alta de cuenta de servicio"
                ? "block"
                : "none"
            }
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
            sx={{ background: "#FFFFFF" , mb:3}}
          />   
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
