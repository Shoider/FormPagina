"use client";

import React, { useState } from "react";
import { useEffect } from "react";
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
  Checkbox,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Alerts from "../components/alerts.jsx";
import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";
import areas from "../constants/AREAS/areas.jsx";

// ICONOS
import SyncIcon from "@mui/icons-material/Sync";

// TABLAS
import EditableTableWeb from "../components/EditableTableWeb.jsx";
import EditableTableRemoto from "../components/EditableTableRemoto.jsx";
import subgerencias from "../constants/SUBGERENCIAS/subgerencias.jsx";

export default function Home() {
  const theme = useTheme();

  // Actualizar Memorando
  const [formData2, setFormData2] = useState({
    numeroFormato: "",
    memorando: "",
  });

  // Llenar el formato
  const [formData3, setFormData3] = useState({
    numeroFormato: "",
  });

  const [formData, setFormData] = useState({
    unidadAdministrativa: "",
    areaAdscripcion: "",
    subgerencia: "",

    nombreEnlace: "",
    telefonoEnlace: "",

    solicitante: "",

    nombreInterno: "",
    puestoInterno: "",
    correoInterno: "",
    telefonoInterno: "",

    nombreExterno: "",
    correoExterno: "",
    empresaExterno: "",
    equipoExterno: "",

    numeroEmpleadoResponsable: "",
    nombreResponsable: "",
    puestoResponsable: "",
    unidadAdministrativaResponsable: "",
    telefonoResponsable: "",

    tipoEquipo: "",
    sistemaOperativo: "",
    versionSO: "",
    marca: "",
    modelo: "",
    serie: "",

    nombreAutoriza: "",
    puestoAutoriza: "",

    // Checkbox
    cuentaUsuario: false,
    accesoWeb: false,
    accesoRemoto: false,
    politicasaceptadas: false,

    // Servicios solicitados
    movimiento: "",
    justificacion: "",
  });

  // TABLAS INFORMACION
  const [webTableData, setWebTableData] = useState([]);
  const [remotoTableData, setRemotoTableData] = useState([]);

  // Nombre PDF
  const [nombreArchivo, setNombreArchivo] = useState("");

  // Generar PDF
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      registrosWeb: webTableData,
      registrosRemoto: remotoTableData,
    }));
  }, [webTableData, remotoTableData]);
 
  

  // Manejadores de cambios
  const handleWebTableDataChange = (data) => {
    setWebTableData(data);
  };
  const handleRemotoTableDataChange = (data) => {
    setRemotoTableData(data);
  };

  // HandleChange FormData
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // HandleChange FormData2
  const handleChange2 = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //NUMERO DE FORMATO
  const handleNumeroFormato2 = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 10); // Limita la longitud a 4 caracteres

    setFormData2((prevFormData) => ({
      ...prevFormData,
      numeroFormato: value,
    }));
  };
  //NUMERO DE FORMATO
  const handleNumeroFormatoActualizar = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 10); // Limita la longitud a 4 caracteres

    setFormData3((prevFormData) => ({
      ...prevFormData,
      numeroFormato: value,
    }));
  };

  // Boton
  const [botonEstado, setBotonEstado] = useState("Enviar");
  const [botonEstado2, setBotonEstado2] = useState("Enviar");

  // Dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData2({
      numeroFormato: "",
      memorando: "",
    });
    setBotonEstado2("Enviar");
  };

  //MODAL 2
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
    setFormData2({
      numeroFormato: "",
    });
    setBotonEstado2("Enviar");
  };


  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const handleOpenModal2 = () => {    
      setOpenModal2(true);
      return;
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };
  

  const handleOpenModal = () => {
    //No abrir el modal si ya está en modo descarga
    if (botonEstado === "Descargar PDF") return;
    const [isValid, isValidTabla, getErrors] =
    validarCamposRequeridos(formData);
    setErrors(getErrors);

    console.log("Lista errores en submit: ", getErrors);

    if (!isValid) {
      setAlert({
        message: "Por favor, complete todos los campos requeridos.",
        severity: "warning",
      });
    } else if (!isValidTabla) {
      setAlert({
        message: "Por favor, completa o elimina el registro de la(s) tabla(s).",
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
//este useEffect es necesario para el llenado del formulario, no borrar
  useEffect(()=>  {
    if (formData.subgerencia === "Subgerencia de Sistemas"){
      setFormData((prev) =>({
        ...prev,
        nombreResponsable:formData.nombreEnlace,
        telefonoResponsable:formData.telefonoEnlace,
        unidadAdministrativaResponsable:formData.areaAdscripcion
      }));
    }       
  }, [formData.subgerencia, formData.nombreEnlace, formData.telefonoEnlace, formData.areaAdscripcion]);

 const validarCamposRequeridos = (Data) => {
  const errores = {};
  let isValid = true;
  let isValidTabla = true;

  // Determina los campos requeridos según el tipo de solicitante
  let camposRequeridos = [
    "unidadAdministrativa",
      "areaAdscripcion",
      "subgerencia",
      "nombreEnlace",
      "telefonoEnlace",
      "sistemaOperativo",
      "versionSO",
      "solicitante",
      "tipoEquipo",
      "marca",
      "modelo",
      "serie",
      "justificacion"
  ];
  // Determina los campos requeridos según el tipo de solicitante
  if (Data.subgerencia !== "Subgerencia de Sistemas")
  {
    camposRequeridos = [
      "nombreAutoriza",
      "puestoAutoriza",
      "unidadAdministrativa",
      "areaAdscripcion",
      "subgerencia",
      "nombreEnlace",
      "telefonoEnlace",
      "versionSO",
      "solicitante",
      "sistemaOperativo",
      "tipoEquipo",
      "marca",
      "modelo",
      "serie",
      "justificacion"
    ]
  }

  if (Data.solicitante === "CONAGUA") {
    const nuevosCampos = [
      "nombreInterno",
      "puestoInterno",
      "correoInterno",
      "telefonoInterno"
    ];

    camposRequeridos = [...camposRequeridos, ...nuevosCampos];
  } else if (Data.solicitante === "EXTERNO") {
    const nuevosCampos = [
      "nombreExterno",
      "correoExterno",
      "empresaExterno",
      "numeroEmpleadoResponsable",
      "nombreResponsable",
      "puestoResponsable",
      "unidadAdministrativaResponsable",
      "telefonoResponsable"
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

  // Valida que al menos uno de los accesos esté seleccionado
  if (![Data.cuentaUsuario, Data.accesoWeb, Data.accesoRemoto].some(Boolean)) {
    errores.seleccion = "Al menos uno de los campos de justificación es requerido";
    isValid = false;
  }

  // Valida movimiento solo si cuentaUsuario es true
  if (Data.cuentaUsuario) {
    if (!Data.movimiento || Data.movimiento.trim() === "") {
      errores.movimiento = "Este campo es requerido";
      isValid = false;
    }
  }

  
  // Valor por defecto para subgerencia
  if (Data.subgerencia === "") {
    Data.subgerencia = "~";
  }

  // Validación de registros Web
  if (Data.accesoWeb) {
    if (!Array.isArray(Data.registrosWeb) || Data.registrosWeb.length === 0) {
      errores.registrosWeb = "Debe agregar al menos un registro web";
      isValidTabla = false;
    } else {
      Data.registrosWeb.forEach((row, idx) => {
        if (
          !row.movimiento ||
          !row.nombreSistema ||
          !row.url ||
          !row.puertosServicios
        ) {
          errores[`registrosWeb_${idx}`] = "Todos los campos del registro web son requeridos";
          isValidTabla = false;
        }
      });
    }
  }

  // Validación de registros Remoto
  if (Data.accesoRemoto) {
    if (!Array.isArray(Data.registrosRemoto) || Data.registrosRemoto.length === 0) {
      errores.registrosRemoto = "Debe agregar al menos un registro remoto";
      isValidTabla = false;
    } else {
      Data.registrosRemoto.forEach((row, idx) => {
        if (
          !row.movimiento ||
          !row.nomenclatura ||
          !row.nombreSistema ||
          !row.direccion ||
          !row.sistemaOperativo
        ) {
          errores[`registrosRemoto_${idx}`] = "Todos los campos del registro remoto son requeridos";
          isValidTabla = false;
        }
      });
    }
  }

  return [isValid, isValidTabla, errores];
};
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
      // Aqui llamamos a la primera api que valida campos
      const formResponse = await axios.post("/api2/v3/vpn", formData, {
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
      setNombreArchivo(`VPN_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post(
          "/api/v3/vpn",
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

        console.error(
          `Error con código ${statusCode}:`,
          errorData.message,
          errorData.campo,
        );

        // Construct an object to update the errors state
        const newErrors = {
          [errorData.campo]: errorData.message, // Use the field name as the key and the message as the value
        };
        setErrors(newErrors);
        console.log("Errores API: ", newErrors); // Log the newErrors object

        console.log("Objeto Errors: ", errors);

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

  // Llamada API Actualizar Memorando
  const handleSubmit2 = async (event) => {
    event.preventDefault();

    setAlert({
      message: "Información enviada",
      severity: "success",
    });
    setOpenAlert(true);

    setBotonEstado2("Cargando...");

    try {
      // Aqui llamamos a la primera api que valida campos
      const formResponse = await axios.post(
        "/api2/v3/vpnActualizar",
        formData2,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Respuesta: ", formResponse.data);
      const {
        message: formMessage,
        id: formId,
        epoch: epoch,
      } = formResponse.data;
      console.log("Petición exitosa: ", formMessage);
      console.log("ID recibido: ", formId);
      console.log("Epoch recibido: ", epoch);
      setNombreArchivo(`VPN_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post(
          "/api/v3/vpn",
          { id: formId },
          {
            responseType: "blob",
          },
        );

        if (pdfResponse.status === 200) {
          setPdfUrl(URL.createObjectURL(pdfResponse.data));
          setBotonEstado2("Descargar PDF");
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
        setBotonEstado2("Enviar"); // Vuelve a "Enviar" en caso de error
        setAlert({
          message: "Ocurrio un error al generar el PDF",
          severity: "error",
        });
        setOpenAlert(true);
      }
    } catch (error) {
      setBotonEstado2("Enviar"); // Vuelve a "Enviar" en caso de error

      if (error.response) {
        // Si hay respuesta, podemos acceder al código de estado y a los datos.
        const statusCode = error.response.status;
        const errorData = error.response.data;

        console.error(`Error con código ${statusCode}:`, errorData.message);

        // Manejamos el caso específico del error 422.
        if (statusCode === 422) {
          // Usamos el mensaje de error que viene de la API.
          setAlert({
            message: errorData.message || "Hay errores en los datos enviados.",
            severity: "warning", // 'warning' o 'error' son buenas opciones aquí.
          });
        } else if (statusCode === 402) {
          setAlert({
            message: errorData.message || "Ocurrió un error inesperado.",
            severity: "error",
          });
        } else {
          // Manejamos otros errores del servidor (ej. 404, 500).
          setAlert({
            message: `Error ${statusCode}: ${errorData.message || "Ocurrió un error inesperado."}`,
            severity: "error",
          });
        }
      } else {
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

  //PARA BOTÓN DE ACTUALIZAR FORMATO
  // Llamada API
  const handleSubmit3 = async (event) => {
    handleCloseModal2();
    event.preventDefault();
    console.log("Lista formData en submit: ", formData2.numeroFormato);

    setAlert({
      message: "Información Enviada",
      severity: "success",
    });
    setOpenAlert(true);

    try {
      // Aqui llamamos a la primera api
      const formResponse = await axios.post("/api2/v3/folio",  { id: formData3.numeroFormato }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta: ", formResponse.data);
      const {
        message: formMessage,
        datos: Datos
      } = formResponse.data;

      //console.log("Petición exitosa: ", formMessage);
      console.log("Datos recibidos: ", Datos);
      
      //console.log("Tablas recibidas 'remoto: ", Datos.registrosRemoto);
      //console.log("Tablas recibidas 'web: ", Datos.registrosWeb);

      // Metemos la informacion recibida a FormData
      setFormData((prev) => ({
        ...prev,
        ...Datos
      }));

      //setWebTableData(Datos.registrosWeb || []);
      //setRemotoTableData(Datos.registrosRemoto || []);
      
      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

    } catch (error) {

      if (error.response) {
        // Si hay respuesta, podemos acceder al código de estado y a los datos.
        const statusCode = error.response.status;
        const errorData = error.response.data;

        console.error(
          `Error con código ${statusCode}:`,
          errorData.message,
          errorData.campo,
        );

        // Construct an object to update the errors state
        const newErrors = {
          [errorData.campo]: errorData.message, // Use the field name as the key and the message as the value
        };
        setErrors(newErrors);
        console.log("Errores API: ", newErrors); // Log the newErrors object

        console.log("Objeto Errors: ", errors);

        // Manejamos el caso específico del error 422.
        if (statusCode === 422) {
          setAlert({
            // Usamos el mensaje de error que viene de la API.
            message: errorData.message || "Hay errores en los datos enviados.",
            severity: "warning", // 'warning' o 'error' son buenas opciones aquí.
          });
        } else if (statusCode === 402) {
          setAlert({
            message: errorData.message || "Ocurrió un error inesperado.",
            severity: "warning",
          });
        } else if (statusCode === 405) {
          setAlert({
            message: errorData.message || "Ocurrió un error inesperado.",
            severity: "warning",
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

  // CATEGORÍAS
  const saveCategorias = async (event) => {
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

  // Manejo de Autocomplete
  const handleUA = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      unidadAdministrativa: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      areaAdscripcion: "",
      subgerencia: "",
    }));
  };
  const handleUARes = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      unidadAdministrativaResponsable: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };

  // Manejo de Autocomplete de Área de Adscripción
  const handleArea = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      areaAdscripcion: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      subgerencia: "",
    }));
  };

  const handleSubgerencia = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subgerencia: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };

  //Numeros de telefono
  const handleTelefonoEnlaceChange = (event) => {
    // Elimina todo lo que no sea dígito
    let value = event.target.value.replace(/\D/g, "");
    value = value.slice(0, 20); // Limita la longitud

    // Agrupa en bloques de 4 dígitos separados por guion
    value = value.match(/.{1,4}/g)?.join("-") || "";

    setFormData((prevFormData) => ({
      ...prevFormData,
      telefonoEnlace: value,
    }));
  };

  const handleTelefonoInternoChange = (event) => {
    // Elimina todo lo que no sea dígito
    let value = event.target.value.replace(/\D/g, "");
    value = value.slice(0, 20); // Limita la longitud

    // Agrupa en bloques de 4 dígitos separados por guion
    value = value.match(/.{1,4}/g)?.join("-") || "";

    setFormData((prevFormData) => ({
      ...prevFormData,
      telefonoInterno: value,
    }));
  };

  const handleTelefonoResponsableChange = (event) => {
    // Elimina todo lo que no sea dígito
    let value = event.target.value.replace(/\D/g, "");
    value = value.slice(0, 20); // Limita la longitud

    // Agrupa en bloques de 4 dígitos separados por guion
    value = value.match(/.{1,4}/g)?.join("-") || "";

    setFormData((prevFormData) => ({
      ...prevFormData,
      telefonoResponsable: value,
    }));
  };

  ///NÚMERO DE EMPLEADO
  const handleNumeroEmpleado = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 5); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      numeroEmpleadoResponsable: value,
    }));
  };
  //NUMERO DE FORMATO
  const handleNumeroFormato = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 10); // Limita la longitud a 4 caracteres

    setFormData2((prevFormData) => ({
      ...prevFormData,
      numeroFormato: value,
    }));
  };
  //NUMERO DE FORMATO
  const handleNumeroFormato3 = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 10); // Limita la longitud a 4 caracteres

    setFormData3((prevFormData) => ({
      ...prevFormData,
      numeroFormato: value,
    }));
  };

  

  //FILTRADO DE ÁREA DE ADSCRIPCIÓN
  const filteredAreas = areas[formData.unidadAdministrativa] || [];

  //FILTRADO DE SUBGERERNCIAS O SUBDIRECCIONES
  const filteredSubgerencia = subgerencias[formData.areaAdscripcion] || [];

  //const filteredSubgerencia = subgerencias
  //.filter(subgerencia => subgerencia.area === formData.areaAdscripcion)
  //.map(subgerencia => subgerencia.nombre);

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
            Solicitud de acceso remoto a través de una red privada virtual (VPN)
          </Typography>
        </Box>
      </Box>

      {/* Datos del Area */}
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
          Datos de identificación del área solicitante
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
          {/**UNIDAD ADMINISTRARTIVA */}
          <Autocomplete
            disablePortal
            options={unidadesAdmin}
            //freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.unidadAdministrativa}
                placeholder="Seleccione la Unidad Administrativa"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Unidad Administrativa"
              />
            )}
            id="unidadAdministrativa"
            name="unidadAdministrativa"
            onChange={(event, newValue) => {
              handleUA(newValue); // Maneja selección de opciones
            }}
            inputValue={formData.unidadAdministrativa || ""} // Controla el valor mostrado
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
                error={!!errors?.areaAdscripcion}
                placeholder="Seleccione la Área de Adscripción"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Área de Adscripción"
              />
            )}
            id="areaAdscripcion"
            name="areaAdscripcion"
            onChange={(event, newValue) => {
              handleArea(newValue); // Maneja selección de opciones
            }}
            inputValue={formData.areaAdscripcion || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          {/**SUBGERENCIA */}
          <Autocomplete
            disablePortal
            options={filteredSubgerencia}
            freeSolo={filteredSubgerencia.length === 0}
            renderInput={(params) => (
              <TextField
                //required
                error={!!errors?.subgerencia}
                placeholder="Escriba o seleccione la Subgerencia o Subdirección"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Subgerencia o Subdirección"
              />
            )}
            id="subgerencia"
            name="subgerencia"
            onChange={(event, newValue) => {
              handleSubgerencia(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                if (filteredSubgerencia.length === 0) {
                  handleSubgerencia(newInputValue); // Maneja texto escrito directamente
                }
              }
            }}
            onBlur={() => {
              if (
                filteredSubgerencia.length === 0 &&
                (!formData.subgerencia || formData.subgerencia.trim() === "")
              ) {
                handleSubgerencia("~");
              }
            }}
            inputValue={formData.subgerencia || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Box>

        <Button
            //type="submit"
            onClick={handleOpenModal2}
            variant="contained"
            sx={{
              mt: 3,
              mb: 3,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
              background: theme.palette.secondary.main,
              color: "#FFFFFF",
              border: "1px solid gray",
              display:formData.subgerencia === "Subgerencia de Sistemas" ? "block" : "none"
            }}                       
          >
            ¿Desea actualizar el formato?
          </Button>

        <Modal
            open={openModal2}
            onClose={handleCloseModal2}
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
                variant="h6"
                component="h2"
              >
                Actualizar Formato
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
                Ingresa el número de formato <b>base</b> para que puedas actualizar tu formato, este se encuentra en la parte superior derecha.
              </Typography>
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  borderColor: "grey",
                  ml: 0,
                  mr: 0,
                  mt: 2,
                  mb: 2,
                }}
              />
              <TextField
              required
              id="numeroFormato"
              name="numeroFormato"
              label="Número de formato"
              placeholder="AAMMDDXXXX"
              value={formData3.numeroFormato}
              onChange={handleNumeroFormato3}
              sx={{ background: "#FFFFFF" }}
              fullWidth
              inputProps={{ maxLength: 10 }}
            />
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
                onClick={handleCloseModal2}
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
                onClick={handleSubmit3}
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
                ACTUALIZAR
              </Button>
            </Box>
          </Modal>

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

        {/* PARTE 2 */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Enlace informático o contacto responsable del Área de Adscripción
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
            error={!!errors?.nombreEnlace}
            id="nombreEnlace"
            name="nombreEnlace"
            label="Nombre completo"
            placeholder="Escriba el nombre completo del enlace informático o contacto responsable"
            value={formData.nombreEnlace}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.telefonoEnlace}
            id="telefonoEnlace"
            name="telefonoEnlace"
            label="Número de teléfono y/o extensión"
            placeholder="XXXX-YYYY"
            value={formData.telefonoEnlace}
            onChange={handleTelefonoEnlaceChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

      {/* Datos de SOLICITANTE */}
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
          Datos de identificación del usuario solicitante
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
              Tipo de solicitante *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Tipo de Solicitante"
              name="solicitante"
              value={formData.solicitante}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel
                value="CONAGUA"
                control={<Radio />}
                label="CONAGUA"
              />
              <FormControlLabel
                value="EXTERNO"
                control={<Radio />}
                label="Externo"
              />
            </RadioGroup>
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 2,
                justifyContent: "center",
                color: "red",
                display: errors?.solicitante ? "block" : "none",
              }}
            >
              {errors?.solicitante}
            </FormHelperText>
          </Box>
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

        {/* CONAGUA */}
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
          display={formData.solicitante === "CONAGUA" ? "block" : "none"}
        >
          {/* SubTitle */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Datos del usuario solicitante CONAGUA
          </Typography>

          <TextField
            required={formData.solicitante === "CONAGUA"} 
            error={!!errors?.nombreInterno}
            id="nombreInterno"
            name="nombreInterno"
            label="Nombre completo"
            placeholder="Escriba el nombre completo del usuario"
            value={formData.nombreInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256, mt: 2 }}
          />
          <TextField
            required={formData.solicitante === "CONAGUA"} 
            error={!!errors?.puestoInterno}
            id="puestoInterno"
            name="puestoInterno"
            label="Puesto o Cargo"
            placeholder="Escriba el puesto o cargo del usuario"
            value={formData.puestoInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required={formData.solicitante === "CONAGUA"} 
            error={!!errors?.correoInterno}
            id="correoInterno"
            name="correoInterno"
            label="Correo institucional"
            placeholder="usuario@conagua.gob.mx"
            value={formData.correoInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required={formData.solicitante === "CONAGUA"} 
            error={!!errors?.telefonoInterno}
            id="telefonoInterno"
            name="telefonoInterno"
            label="Número de teléfono y/o extensión"
            placeholder="XXXX-YYYY"
            value={formData.telefonoInterno}
            onChange={handleTelefonoInternoChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>

        {/* CONAGUA */}
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
          display={formData.solicitante === "EXTERNO" ? "block" : "none"}
        >
          {/* SubTitle */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Datos del usuario solicitante externo
          </Typography>

          <TextField
            required={formData.solicitante === "EXTERNO"} 
            error={!!errors?.nombreExterno}
            id="nombreExterno"
            name="nombreExterno"
            label="Nombre completo"
            placeholder="Escriba el nombre completo del usuario"
            value={formData.nombreExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256, mt: 2 }}
          />
          <TextField
            required={formData.solicitante === "EXTERNO"} 
            error={!!errors?.correoExterno}
            id="correoExterno"
            name="correoExterno"
            label="Correo electrónico"
            placeholder="Escriba el correo electrónico del usuario"
            value={formData.correoExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required={formData.solicitante === "EXTERNO"} 
            error={!!errors?.empresaExterno}
            id="empresaExterno"
            name="empresaExterno"
            label="Nombre completo de la empresa"
            placeholder="Escriba el nombre completo de la empresa"
            value={formData.empresaExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <Box
            display={
              formData.subgerencia === "Subgerencia de Sistemas"
                ? "block"
                : "none"
            }
          >
            <TextField
              //error={!!errors?.equipoExterno}
              id="equipoExterno"
              name="equipoExterno"
              label="Equipo de desarrollo"
              placeholder="Llenar solo por personal de la subgerencia de sistemas de la GTIC"
              value={formData.equipoExterno}
              onChange={handleChange}
              sx={{ background: "#FFFFFF", mb: 3 }}
              inputProps={{ maxLength: 256 }}
            />
          </Box>
        </Box>

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mb: 3,
            display: formData.solicitante === "EXTERNO" ? "block" : "none",
          }}
        />

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
          display={formData.solicitante === "EXTERNO" ? "block" : "none"}
        >
          {/* SubTitle */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Datos de la persona responsable en la CONAGUA para el solicitante
            externo
          </Typography>

          <TextField
            required
            error={!!errors?.numeroEmpleadoResponsable}
            id="numeroEmpleadoResponsable"
            name="numeroEmpleadoResponsable"
            label="Número de empleado"
            placeholder="Escriba el número de empleado del responsable"
            value={formData.numeroEmpleadoResponsable}
            onChange={handleNumeroEmpleado}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.nombreResponsable}
            id="nombreResponsable"
            name="nombreResponsable"
            label="Nombre completo"
            placeholder="Escriba el nombre completo del responable"
            value={formData.nombreResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puestoResponsable}
            id="puestoResponsable"
            name="puestoResponsable"
            label="Puesto o cargo"
            placeholder="Escriba el puesto o cargo del empleado responsable"
            value={formData.puestoResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <Autocomplete
            disablePortal
            options={filteredAreas}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.unidadAdministrativaResponsable}
                placeholder="Seleccione la área de adscripción del responsable"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Área de Adscripción"
              />
            )}
            id="unidadAdministrativaResponsable"
            name="unidadAdministrativaResponsable"
            onChange={(event, newValue) => {
              handleUARes(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handleUARes(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.unidadAdministrativaResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <TextField
            required
            error={!!errors?.telefonoResponsable}
            id="telefonoResponsable"
            name="telefonoResponsable"
            label="Número de teléfono y/o extension"
            placeholder="XXXX-YYYY"
            value={formData.telefonoResponsable}
            onChange={handleTelefonoResponsableChange}
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
          Servicios solicitados
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
              mb: 3,
            }}
          />
          {/* SubTitle */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Datos del equipo de origen
          </Typography>

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
            label="Número de Serie"
            placeholder="Escriba el No. de serie del equipo"
            value={formData.serie}
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
                mb: 1,
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              Tipo de equipo *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Tipo de Equipo"
              name="tipoEquipo"
              value={formData.tipoEquipo}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel
                value="CONAGUA"
                control={<Radio />}
                label="CONAGUA"
              />
              <FormControlLabel
                value="Personal"
                control={<Radio />}
                label="Personal"
              />
            </RadioGroup>
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 2,
                justifyContent: "center",
                color: "red",
                display: errors?.tipoEquipo ? "block" : "none",
              }}
            >
              {errors?.tipoEquipo}
            </FormHelperText>
          </Box>
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
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
              Sistema operativo *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Sistema Operativo"
              name="sistemaOperativo"
              value={formData.sistemaOperativo}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel
                value="Linux"
                control={<Radio />}
                label="Linux"
              />
              <FormControlLabel
                value="macOS"
                control={<Radio />}
                label="macOS"
              />
              <FormControlLabel
                value="Windows"
                control={<Radio />}
                label="Windows"
              />
            </RadioGroup>
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 0,
                justifyContent: "center",
                color: "red",
                display: errors?.sistemaOperativo ? "block" : "none",
              }}
            >
              {errors?.sistemaOperativo}
            </FormHelperText>
          </Box>
          <TextField
            required
            error={!!errors?.versionSO}
            id="versionSO"
            name="versionSO"
            label="Versión del sistema operativo"
            placeholder="Escriba la versión del sistema operativo"
            value={formData.versionSO}
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
            {/* SubTitle */}
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 2, mt: 2 }}
            >
              Tipo de servicio
            </Typography>
            <FormLabel
              component="legend"
              sx={{
                mt: 0,
                display: "flex",
                justifyContent: "center",
                fontSize: "0.8rem",
              }}
            >
              Seleccione la(s) opción(es) requeridas:
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
            mb: 3,
            mr: 8,
          }}
        >
          {[
            { name: "cuentaUsuario", label: "Cuenta de usuario" },
            { name: "accesoWeb", label: "Acceso a sitios web o equipo" },
            { name: "accesoRemoto", label: "Acceso a escritorio remoto" },
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
                    // Deshabilita accesoWeb y accesoRemoto si cuentaUsuario está activo
                    //Deshabilita cuentaUsuario si accesoWeb o accesoRemoto están activos
                    //Permite eleguir uno o dos Accesos, pero no las tres opciones
                    disabled={
                      (formData.cuentaUsuario &&
                        (item.name === "accesoWeb" ||
                          item.name === "accesoRemoto")) ||
                      ((formData.accesoRemoto || formData.accesoWeb) &&
                        item.name === "cuentaUsuario")
                    }
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
              display: errors?.seleccion ? "block" : "none",
            }}
          >
            {errors?.seleccion}
          </FormHelperText>
        </Box>

        {/* TABLA A) */}
        <Box
          component="form"
          sx={{
            display: formData.cuentaUsuario ? "block" : "none",
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
              mb: 2,
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
                mb: 1,
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              a) Cuenta de usuario
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
                label="Alta usuario"
              />
              <FormControlLabel
                value="BAJA"
                control={<Radio />}
                label="Baja usuario"
              />
            </RadioGroup>
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

      {/*BOX PARA TABLA B*/}
      <Box
        component="section"
        sx={{
          display: formData.accesoWeb ? "block" : "none",
          mx: "auto",
          width: "calc(100% - 32px)",
          border: "2px solid grey",
          mt: 2,
          mb: 3,
          p: 2,
          borderRadius: 2,
          background: "#F4F4F5",
          padding: "0 8px",
          "@media (min-width: 1000px)": {
            maxWidth: "80.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2",
          },
        }}
      >
        {/* TABLA B) */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 20,
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
              mb: 2,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            b) Acceso a sitios web o equipo
          </Typography>

          <EditableTableWeb onDataChange={handleWebTableDataChange} />
        </Box>
      </Box>

      {/**BOX PARA TABLA C */}
      <Box
        component="section"
        sx={{
          display: formData.accesoRemoto ? "block" : "none",
          mx: "auto",
          width: "calc(100% - 32px)",
          border: "2px solid grey",
          mt: 2,
          mb: 3,
          p: 2,
          borderRadius: 2,
          background: "#F4F4F5",
          padding: "0 8px",
          "@media (min-width: 1000px)": {
            maxWidth: "80.00%",
            width: "auto",
            margin: "2rem auto",
            padding: "2",
          },
        }}
      >
        {/* TABLA C) */}
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
              mb: 2,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            c) Acceso a escritorio remoto
          </Typography>

          <EditableTableRemoto onDataChange={handleRemotoTableDataChange} />

          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Nota: Ejemplo de nomeclatura: SGA-001. Ejemplo de nombre:
            CE0010DC01.
          </FormLabel>
        </Box>
      </Box>

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
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Justificación de la necesidad del servicio
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
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificación"
            placeholder="Justifique la necesidad del servicio (Min.50 caracteres)"
            value={formData.justificacion}
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
        display={
          formData.subgerencia !== "Subgerencia de Sistemas" ? "block" : "none"
        }
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Autoriza el servicio
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
            label="Nombre completo"
            placeholder="Gerente(a), Subgerente(a) o equivalente / Director(a) de organismo / Director(a) Local"
            value={formData.nombreAutoriza}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puestoAutoriza}
            id="puestoAutoriza"
            name="puestoAutoriza"
            label="Puesto o cargo"
            placeholder="Escriba el puesto o cargo de quien autoriza los servicios"
            value={formData.puestoAutoriza}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
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
          color="#9f2241"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Términos y condiciones del servicio
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
          <Box sx={{ ml: 3, mr: 0 }}>
            <Typography
              variant="subtitle2"
              align="justify"
              color="#9f2241"
              gutterBottom
              sx={{ mt: 0, width: "calc(100% - 32px)", ml: 0, mr: 0 }}
            >
              1) El usuario solicitante puede tramitar este formato las veces
              que sea necesario, según sus necesidades. Los servicios
              solicitados son acumulados a los existentes. Es responsabilidad
              del solicitante, indicar correctamente el movimiento (A, B, C) de
              los servicios especificados tomando en cuenta su historial de
              solicitudes.
              <br />
              2) El Enlace Informático de la unidad administrativa solicitante,
              será quien gestione y de seguimiento a la solicitud de servicios
              de Red Privada Virtual (VPN) del personal de su unidad. <br />
              3) La Subgerencia de Soporte Técnico, Telecomunicaciones y
              Seguridad única y exclusivamente proveerá el servicio de acceso
              remoto por VPN al usuario solicitante autorizado por el titular de
              su unidad administrativa previa presentación del formato
              debidamente llenado.
              <br />
              4) La Subgerencia de Soporte Técnico, Telecomunicaciones y
              Seguridad, le proveerá al usuario autorizado la credencial de
              acceso, manual de instalación y configuración del software de
              cliente de VPN de usuario mediante correo electrónico
              personalizado.
              <br />
              5) El acceso a los servicios de red interna mediante el servicio
              de VPN, será con el uso de una contraseña que cumpla con la
              política correspondiente y el envío por correo electrónico al
              usuario de una clave de 6 dígitos como doble factor de
              autenticación. Es responsabilidad única y exclusiva del usuario
              autorizado a conservar en secreto, no proporcionar a terceros su
              contraseña y no permitir el acceso a su cuenta de correo
              electrónico para la obtención de la clave de 6 dígitos a terceros.
              <br />
              6) Posterior al proceso de autorización de acceso al usuario y ya
              establecido el túnel de VPN, solo el tráfico que se identifique
              que tiene como destino la red interna de la CONAGUA cursará por el
              túnel de VPN, el resto del tráfico del equipo origen del usuario
              seguirá las rutas que tenga definidas en su configuración para
              acceder a otros recursos de red.
              <br />
              7) El servicio de VPN, solo permitirá por cada usuario, una
              conexión desde un dispositivo remoto, por lo que no será posible
              tener 2 o más conexiones simultáneas para una misma cuenta.
              <br />
              8) La sesión establecida será automáticamente cerrada
              transcurridos 10 minutos de inactividad. El usuario deberá repetir
              el proceso de inicio de sesión para conectarse a la red de la
              CONAGUA. Está prohibido usar cualquier proceso o software para
              mantener la sesión activa.
              <br />
              9) El usuario autorizado de VPN acepta que al hacer uso del
              servicio de VPN mediante cualquier tipo de conexión, es de su
              exclusiva responsabilidad el costo que ello genere.
              <br />
              10) El equipo proporcionado por la CONAGUA ya cuenta con los
              elementos de seguridad necesarios para operar dentro de la red
              interna (actualizaciones del sistema operativo, actualizaciones de
              aplicaciones, software antimalware), pero es obligación del
              usuario autorizado verificar que estos elementos se encuentren
              actualizados. En el caso de equipo personal, es responsabilidad
              del usuario autorizado ejecutar y mantener actualizado el sistema
              operativo, las aplicaciones instaladas y tener activos los
              elementos de seguridad como: Antivirus/Antimalware, corta fuego o
              firewall, protección de cuentas, seguridad del dispositivo,
              control de aplicaciones y exploradores entre otros que ofrezca el
              sistema operativo o sean instalados de manera independiente.
              <br />
              11) Si el usuario autorizado hace uso de su equipo personal para
              acceder a los servicios de la red interna de la CONAGUA mediante
              el uso de los servicios de VPN, acepta conocer y cumplir con las
              políticas, normas y disposiciones en materia de seguridad de la
              información que aplican para los equipos que proporciona la
              CONAGUA.
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
              mb: 3,
              //mx: "auto"
            }}
          >
            {[
              {
                name: "politicasaceptadas",
                label:
                  "He leído y acepto los términos y condiciones del servicio *",
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{ width: "100%", minWidth: "80px", textAlign: "center" }}
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
                variant="h6"
                component="h2"
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
            Regresar al inicio
          </Button>
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
            disabled={botonEstado !== "Descargar PDF"}
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
      

      {/* BOTON FLOTANTE DE ACTUALIZAR FORMATO*/}
      <Box
        sx={{
          position: "fixed",
          bottom: 100,
          right: 22,
          "& > :not(style)": { m: 1 },
        }}
      >
        <Fab variant="extended" color="success" onClick={handleClickOpen2}>
          <SyncIcon sx={{ mr: 1 }} />
          Actualizar Formato

        </Fab>
      </Box>

      {/* DIALOG */}
      <Dialog
        open={open2}
        onClose={handleClose2}
        onSubmit={handleSubmit2}
        sx={{
          "& .MuiDialog-container": {
            backgroundColor: "f5f5f5", // Or any other color
          },
          "& .MuiDialog-paper": {
            backgroundColor: "#f4f4f5", // Customize dialog content background
          },
        }}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              console.log("Información Enviada");
            },
          },
        }}
      >
        <DialogTitle>Actualizar Formato</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si conoce un número de formato en le cual se pueda guiar, escribalo.
          </DialogContentText>
          
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mb: 1,
              mt: 2,
            }}
          />
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Dato de búsqueda (lo podrá encontrar en su formato).
          </FormLabel>
          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            id="numeroFormato"
            name="numeroFormato"
            label="Número de formato"
            placeholder="Se encuentra en el encabezado, en la parte superior derecha. "
            value={formData3.numeroFormato}
            onChange={handleNumeroFormatoActualizar}
            sx={{ background: "#FFFFFF", mt: 2 }}
            inputProps={{ maxLength: 64 }}
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={handleSubmit3}
            sx={{
              mt: 0,
              mb: 3,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
              background: theme.palette.secondary.main,
              color: "#FFFFFF",
              border: "1px solid gray",              
            }}
          >
            ACTUALIZAR
          </Button>
          <Button
            variant="contained"
            onClick={handleClose2}
            sx={{
              mt: 0,
              mb: 3,
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
        </DialogActions>
      </Dialog>

      {/* BOTON FLOTANTE DE AÑADIR MEMORANDO*/}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          "& > :not(style)": { m: 1 },
        }}
      >
        <Fab variant="extended" color="success" onClick={handleClickOpen}>
          <SyncIcon sx={{ mr: 1 }} />
          Añadir memorando
        </Fab>
      </Box>
      

      {/* DIALOG */}
      <Dialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit2}
        sx={{
          "& .MuiDialog-container": {
            backgroundColor: "f5f5f5", // Or any other color
          },
          "& .MuiDialog-paper": {
            backgroundColor: "#f4f4f5", // Customize dialog content background
          },
        }}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              console.log("Información Enviada");
            },
          },
        }}
      >
        <DialogTitle>Añadir memorando</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puede añadir el número de memorando que se le proporciono para
            completar el llenado de su formato.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            * Es su responsabilidad llenarlo adecuadamente.
          </DialogContentText>
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mb: 1,
              mt: 2,
            }}
          />
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Dato de búsqueda (lo podrá encontrar en su formato).
          </FormLabel>
          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            id="numeroFormato"
            name="numeroFormato"
            label="Número de formato"
            placeholder="Se encuentra en el encabezado, en la parte superior derecha. "
            value={formData2.numeroFormato}
            onChange={handleNumeroFormato2}
            sx={{ background: "#FFFFFF", mt: 3 }}
            inputProps={{ maxLength: 64 }}
            fullWidth
          />
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Dato a actualizar.
          </FormLabel>
          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            id="memorando"
            name="memorando"
            label="Número de memorando"
            placeholder="Ingrese el número de memorando"
            value={formData2.memorando}
            onChange={handleChange2}
            sx={{ background: "#FFFFFF", mt: 3 }}
            inputProps={{ maxLength: 64 }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
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
                botonEstado2 === "Descargar PDF"
                  ? theme.palette.third.main
                  : theme.palette.secondary.main,
              color: "#FFFFFF",
              border: "1px solid gray",
            }}
            disabled={botonEstado2 === "Cargando..."}
            {...(botonEstado2 === "Descargar PDF" && {
              href: pdfUrl,
              download: nombreArchivo,
            })}
          >
            {botonEstado2}
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              mt: 3,
              mb: 3,
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
        </DialogActions>
      </Dialog>
    </Container>
  );
}
