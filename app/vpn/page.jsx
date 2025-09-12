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
  LinearProgress,
  Tooltip,
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Alerts from "../components/alerts.jsx";
import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";
import areas from "../constants/AREAS/areas.jsx";
import DownloadIcon from "@mui/icons-material/Download";
import puestos from "../constants/PUESTOS/puestos.jsx";


// ICONOS
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import NoteAltIcon from '@mui/icons-material/NoteAlt';

// TABLAS
import EditableTableWeb from "../components/EditableTableWeb.jsx";
import EditableTableRemoto from "../components/EditableTableRemoto.jsx";
import subgerencias from "../constants/SUBGERENCIAS/subgerencias.jsx";
import EditableTablePersonal from "../components/EditableTablePersonal.jsx";
import EditableTableWebCE from "../components/EditableTableWebCE.jsx";

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
    casoespecial:"",

    nombreEnlace: "",
    telefonoEnlace: "",
    puestoEnlace:"",

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
//   "nombreInterno",
//   "puestoInterno",
//   "nombreExterno",
//   "empresaExterno",
//   "nombreResponsable",
//   "puestoResponsable",
//   "nombreAutoriza",
//   "puestoAutoriza",
//   "nombreEnlace",
//   "puestoEnlace",
//];

  // TABLAS INFORMACION
  const [webTableData, setWebTableData] = useState([]);
  const [remotoTableData, setRemotoTableData] = useState([]);
  const [personalTableData, setPersonalTableData] = useState([]);
  const [webCETableData, setwebCETableData] = useState([]);

  const [TableResetKey, setTableResetKey] = useState(0);

  // Nombre PDF
  const [nombreArchivo, setNombreArchivo] = useState("");

  // Generar PDF
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      registrosWeb: webTableData,
      registrosRemoto: remotoTableData,
      registrosPersonal : personalTableData,
      registrosWebCE : webCETableData,
    }));
  }, [webTableData, remotoTableData, webCETableData, personalTableData]);

  // Manejadores de cambios
  const handleWebTableDataChange = (data) => {
    setWebTableData(data);
  };
  const handleRemotoTableDataChange = (data) => {
    setRemotoTableData(data);
  };
  const handlePersonalTableDataChange = (data) => {
    setPersonalTableData(data);
  };
  const handleWebCETableDataChange = (data) => {
    setwebCETableData(data);
  };

  // HandleChange FormData
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //Prueba de capitalizar
  // const handleChange = (event) => {
  //   const { name, value, type, checked } = event.target;
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
  const handlePuestosInterno = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoInterno: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  const handlePuestosCONAGUA = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      puestoResponsable: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
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
    setFormData3({
      numeroFormato: "",
    });
  };

  //Descarga de formatos
  const [open3, setOpen3] = useState(false);
  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  }

  //Descarga de guía
  const [open4, setOpen4] = useState(false);
  const handleClickOpen4 = () => {
    setOpen4(true);
  };
  const handleClose4 = () => {
    setOpen4(false);
  }

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const handleOpenModal2 = () => {
    setOpenModal2(true);
    return;
  }; 

  //PARA LINEA DE PROGRESO
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

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };

  const handleDownloadDocx = () => {
  const link = document.createElement("a");
  link.href = "/archivos/Formato_VPN.docx"; // Ruta de archivo "General"
  link.download = "Formato_de_servicio_de_VPN_v1.1.docx";
  document.body.appendChild(link);
  link.click()
  document.body.removeChild(link);
};

 const handleDownloadDocx2 = () => {
  const link = document.createElement("a");
  link.href = "/archivos/Formato_VPN_SS.docx"; // Ruta de archivo caso especial 
  link.download = "Formato_de__servicio_de_VPN_SS_v1.1.docx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const handleOpenModal = () => {
    //No abrir el modal si ya está en modo descarga
    if (botonEstado === "Descargar PDF") return;
    const [isValid, isValidTabla, getErrors] =
      validarCamposRequeridos(formData);
    setErrors(getErrors);

    //console.log("Lista errores en submit: ", getErrors);

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
  useEffect(() => {
    if (formData.subgerencia === "Subgerencia de Sistemas") {
      setFormData((prev) => ({
        ...prev,
        nombreResponsable: formData.nombreEnlace,
        telefonoResponsable: formData.telefonoEnlace,
        unidadAdministrativaResponsable: formData.areaAdscripcion,
      }));
    }
  }, [
    formData.subgerencia,
    formData.nombreEnlace,
    formData.telefonoEnlace,
    formData.areaAdscripcion,
  ]);

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
      "justificacion",
    ];
    if (Data.casoespecial === "Grupal") {
      camposRequeridos = [      
      "nombreEnlace",
      "telefonoEnlace",  
      "puestoEnlace",    
      "justificacion",
      ];
    }
     if (Data.casoespecial !== "Grupal" || Data.subgerencia !== "Subgerencia de Sistemas") {
      camposRequeridos = [      
      "nombreEnlace",
      "telefonoEnlace",  
      "puestoEnlace",    
      "justificacion",
      "marca",
      "modelo",
      "serie",
      "tipoEquipo",
      "versionSO",
      "sistemaOperativo",
      "solicitante"
      ];
    }
   
    // Determina los campos requeridos según el tipo de solicitante
    if (Data.subgerencia !== "Subgerencia de Sistemas") {
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
        "justificacion",
      ];
    }

    if (Data.solicitante === "CONAGUA") {
      const nuevosCampos = [
        "nombreInterno",
        "puestoInterno",
        "correoInterno",
        "telefonoInterno",
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
        "telefonoResponsable",
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
    if(Data.casoespecial === "Individual" || Data.subgerencia !== "Subgerencia de Sistemas"){
    if (
      ![Data.cuentaUsuario, Data.accesoWeb, Data.accesoRemoto].some(Boolean)
    ) {
      errores.seleccion =
        "Al menos una selección debe de tener";
      isValid = false;
    }
  }

    // Valida movimiento solo si cuentaUsuario es true
    if (Data.cuentaUsuario) {
      if (!Data.movimiento || Data.movimiento.trim() === "") {
        errores.movimiento = "Este campo es requerido";
        isValid = false;
      }
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
            errores[`registrosWeb_${idx}`] =
              "Todos los campos del registro web son requeridos";
            isValidTabla = false;
          }
        });
      }
    }

    // Validación de registros Remoto
    if (Data.accesoRemoto) {
      if (
        !Array.isArray(Data.registrosRemoto) ||
        Data.registrosRemoto.length === 0
      ) {
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
            errores[`registrosRemoto_${idx}`] =
              "Todos los campos del registro remoto son requeridos";
            isValidTabla = false;
          }
        });
      }
    }

    ///CHECAR ESTAS VALIDACIONES SON PARA PERSONAL
    if(Data.casoespecial === "Grupal"){
      if (!Array.isArray(Data.registrosPersonal) || Data.registrosPersonal.length === 0) {
        errores.registrosPersonal = "Debe agregar al menos un registro web";
        isValidTabla = false;
      } else {
        Data.registrosPersonal.forEach((row, idx) => {
          if (
            !row.NOMBRE ||
            !row.CORREO ||
            !row.EMPRESA ||
            !row.EQUIPO ||
            !row.SERVICIOS
          ) {
            errores[`registrosPersonal_${idx}`] =
              "Todos los campos del registro PERSONAL son requeridos";
            isValidTabla = false;
          }
        });
      }

      if (!Array.isArray(Data.registrosWebCE) || Data.registrosWebCE.length === 0) {
        errores.registrosWebCE = "Debe agregar al menos un registro web";
        isValidTabla = false;
      } else {
        Data.registrosWebCE.forEach((row, idx) => {
          if (
            !row.NOMBRE ||
            !row.SIGLAS ||
            !row.URL ||
            !row.PUERTOS 
          ) {
            errores[`registrosWebCE_${idx}`] =
              "Todos los campos del registro web CE son requeridos";
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

    //console.log("Lista formData en submit: ", formData);

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

      //console.log("Respuesta: ", formResponse.data);
      const {
        message: formMessage,
        id: formId,
        epoch: epoch,
      } = formResponse.data;
      //console.log("Petición exitosa: ", formMessage);
      //console.log("ID recibido: ", formId);
      //console.log("Epoch recibido: ", epoch);
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
        //console.log("Errores API: ", newErrors); // Log the newErrors object

        //console.log("Objeto Errors: ", errors);

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

    //console.log("Lista formData2 en submit: ", formData2);

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

      //console.log("Respuesta: ", formResponse.data);
      const {
        message: formMessage,
        id: formId,
        epoch: epoch,
      } = formResponse.data;
      //console.log("Petición exitosa: ", formMessage);
      //console.log("ID recibido: ", formId);
      //console.log("Epoch recibido: ", epoch);
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
          console.error("Ocurrió un error al generar el PDF");
          console.error(pdfResponse.status);
        }
      } catch (error) {
        console.error("Error:", error);
        setBotonEstado2("Enviar"); // Vuelve a "Enviar" en caso de error
        setAlert({
          message: "Ocurrió un error al generar el PDF",
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
    handleClose2();
    event.preventDefault();
    setBotonEstado("Enviar");

    // Arma el objeto a enviar con los datos más recientes
    const dataToSend = {
      ...formData3,
      registrosWeb: webTableData,
      registrosRemoto: remotoTableData,
      registrosPersonal :personalTableData,
      registrosWebCE: webCETableData
    };
    //console.log("Lista formData en submit: ", formData2.numeroFormato);

    setAlert({
      message: "Información Enviada",
      severity: "success",
    });
    setOpenAlert(true);

    try {
      // Aqui llamamos a la primera api
      const formResponse = await axios.post(
        "/api2/v3/folio",
        { id: dataToSend.numeroFormato },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      //console.log("Respuesta: ", formResponse.data);
      const { message: formMessage, datos: Datos } = formResponse.data;

      ////console.log("Petición exitosa: ", formMessage);
      //console.log("Datos recibidos: ", Datos);

      //console.log("Tablas recibidas 'remoto: ", Datos.registrosRemoto);
      //console.log("Tablas recibidas 'web: ", Datos.registrosWeb);

      // Metemos la informacion recibida a FormData
      setFormData((prev) => ({
        ...prev,
        ...Datos,
      }));

      // Meter los datos en las tablas
      setWebTableData(Datos.registrosWeb || []);
      setRemotoTableData(Datos.registrosRemoto || []);
      setPersonalTableData(Datos.registrosPersonal||[]);
      setwebCETableData (Datos.registrosWebCE||[]);

      // Desmontar y montar las tablas con los nuevos datos
      setTableResetKey((prev) => prev + 1);

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
        //console.log("Errores API: ", newErrors); // Log the newErrors object

        //console.log("Objeto Errors: ", errors);

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
    const subgerenciasDisponibles = subgerencias[newValue] || [];
    setFormData((prevFormData) => ({
      ...prevFormData,
      areaAdscripcion: newValue || "",
      subgerencia: subgerenciasDisponibles.length === 0 ? "~" : "",
    }));
  };

  const handleSubgerencia = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subgerencia: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      casoespecial : ""
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
  //Para botón que aparece y desaparece
  const botones =[
    { icon: <DownloadIcon htmlColor="#FFFFFF" />, name: 'Descargar formatos',onClick: handleClickOpen3, color: "secondary" },
    //{ icon: <NoteAltIcon htmlColor="#FFFFFF"/>, name: 'Descargar guía',onClick: handleClickOpen4 },
    { icon: <AddIcon htmlColor="#FFFFFF" />, name: 'Añadir memorando',onClick: handleClickOpen },
    { icon: <EditIcon htmlColor="#FFFFFF"/>, name: 'Modificar formato',onClick: handleClickOpen2 },
  ];
  
  const [openBotton, setOpenBotton] = React.useState(false);
  const handleOpenBotton = () => setOpenBotton(true);
  const handleCloseBotton = () => setOpenBotton(false);

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
            inputValue={formData.subgerencia || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Box>

        <Box
              display={formData.subgerencia === "Subgerencia de Sistemas" ? "block" : "none"}        
        >
        <Divider
                sx={{
                  borderBottomWidth: "1px",
                  borderColor: "grey",
                  ml: 2,
                  mr: 2,
                  mt: 2,
                  mb: 2,
                }}
        />
        <FormLabel
              component="legend"
              sx={{
                mt: 0,
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              ¿Qué caso es? *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Que caso es"
              name="casoespecial"
              value={formData.casoespecial}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel
                value="Individual"
                control={<Radio />}
                label="Individual"
              />
              <FormControlLabel
                value="Grupal"
                control={<Radio />}
                label="Grupal"
              />
            </RadioGroup>
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 2,
                justifyContent: "center",
                color: "red",
                display: errors?.casoespecial ? "block" : "none",
              }}
            >
              {errors?.casoespecial}
            </FormHelperText>
        </Box>
        {/*<Button
            //type="submit"
            // onClick={handleOpenModal2}
            // variant="contained"
            // sx={{
            //   mt: 3,
            //   mb: 3,
            //   width: "calc(100% - 32px)",
            //   ml: 2,
            //   mr: 4,
            //   background: theme.palette.secondary.main,
            //   color: "#FFFFFF",
            //   border: "1px solid gray",
            //   display:formData.subgerencia === "Subgerencia de Sistemas" ? "block" : "none"
            // }}                       
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
          </Modal>*/}

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mt: 2,
            mb: 3,
          }}
        />
        {/*Para quien es de sistemas*/}
        <Box
          display={formData.casoespecial === "Grupal"  ? "block" : "none"}
        >
          {/* PARTE 2 */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Datos de la persona responsable en la CONAGUA de la relación de personal externo
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
            placeholder="Escriba el nombre completo de la persona responsable en la CONAGUA"
            value={formData.nombreEnlace}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          {/**Puesto o cargo de la persona responsable en la CONAGUA */}
          <TextField
            required
            error={!!errors?.puestoEnlace}
            id="puestoEnlace"
            name="puestoEnlace"
            label="Puesto o cargo"
            placeholder="Escriba el puesto o cargo de la persona responsable en la CONAGUA"
            value={formData.puestoEnlace}
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
        {/*Para quien no es de sistemas*/}
        <Box
        display={formData.casoespecial === "Individual" || formData.subgerencia !== "Subgerencia de Sistemas" ? "block" : "none"}
        >
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
      </Box>

      {/* Datos de SOLICITANTE */}
      {/* Form Box Responsive */}
      <Box
      display={formData.casoespecial === "Individual" || formData.subgerencia !== "Subgerencia de Sistemas" ? "block" : "none"}
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
          {/**Puesto interno, aquí poner autocomplete */}
          <Autocomplete
            required={formData.solicitante === "CONAGUA"}
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
                label="Puesto de usuario"
              />
            )}
            id="puestoInterno"
            name="puestoInterno"
            onChange={(event, newValue) => {
              handlePuestosInterno(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handlePuestosInterno(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.puestoInterno || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          {/* <TextField
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
          /> */}
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
          {/**Puesto o cargo del empleado responsable, aquí poner autocomplete */}
          <Autocomplete
            disablePortal
            options={puestos}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.puestoResponsable}
                placeholder="Escriba o seleccione el puesto del empleado responsable"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Puesto del empleado responsable"
              />
            )}
            id="puestoResponsable"
            name="puestoResponsable"
            onChange={(event, newValue) => {
              handlePuestosCONAGUA(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === "change") {
                handlePuestosCONAGUA(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.puestoResponsable || ""} // Controla el valor mostrado
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
          {/* <TextField
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
          /> */}
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

      {/* SI es de sistemas */}
      <Box
      component="section"
        sx={{
          
          mx: "auto",
          width: "calc(100% - 32px)",
          border: "2px solid grey",
          borderColor: !!errors?.registrosPersonal ? theme.palette.secondary.secondary : "grey",
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
      display={formData.casoespecial === "Grupal" ? "block": "none"}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Relación de personal externo
        </Typography>
        <EditableTablePersonal
            //key={JSON.stringify(webTableData)} // Fuerza el remount cuando cambian los datos
            key={TableResetKey}
            initialData={personalTableData}
            onDataChange={handlePersonalTableDataChange}
          />
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
            Nota: Para cada persona especificar el equipo de desarrollo al que pertenece 
            o en su defecto el rol dentro del proyecto <br/>
            Para cada persona especificar el número de servicios que se detallarán en la 
            tabla de Accesos a sitios Web o Equipo
          </FormLabel>
      </Box>
      <Box
      component="section"
        sx={{
          
          mx: "auto",
          width: "calc(100% - 32px)",
          border: "2px solid grey",
          borderColor: !!errors?.registrosWebCE ? theme.palette.secondary.secondary : "grey",
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
      display={formData.casoespecial === "Grupal" ? "block": "none"}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Servicios Solicitados
        </Typography>
        <EditableTableWebCE
            //key={JSON.stringify(webTableData)} // Fuerza el remount cuando cambian los datos
            key={TableResetKey}
            initialData={webCETableData}
            onDataChange={handleWebCETableDataChange}
          />
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
            Nota: Detallar todos los accesos que requiere cada persona externa usando el 
            IDU que le corresponda de la tabla de relación de personal externo. <br/>
            No puede haber más de un URL/IP Equipo detallado por renglón.
          </FormLabel>
      </Box>

      {/* Datos del Equipo si NO es de sistemas */}
      {/* Form Box Responsive */}
      <Box
      display={formData.casoespecial === "Individual" || formData.subgerencia !== "Subgerencia de Sistemas" ? "block" : "none"}
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
            mb: 1,
            mr: 10,
            alignItems: "center", 
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
          borderColor: !!errors?.registrosWeb ? theme.palette.secondary.secondary : "grey",
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

          <EditableTableWeb
            //key={JSON.stringify(webTableData)} // Fuerza el remount cuando cambian los datos
            key={TableResetKey}
            initialData={webTableData}
            onDataChange={handleWebTableDataChange}
          />
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
          borderColor: !!errors?.registrosRemoto ? theme.palette.secondary.secondary : "grey",
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

          <EditableTableRemoto
            //key={JSON.stringify(remotoTableData)} // Fuerza el remount cuando cambian los datos
            key={TableResetKey}
            initialData={remotoTableData}
            onDataChange={handleRemotoTableDataChange}
          />

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
            label="Justificación de la solicitud"
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
          Autorización de la solicitud
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
          Políticas y Lineamientos 
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
              1)	La persona responsable en la CONAGUA es responsable de hacer del 
              conocimiento al personal externo las políticas y lineamientos de uso del 
              servicio que se detallan a continuación:
              <br />
              2)	El usuario solicitante puede tramitar este formato las veces que sea 
              necesario, según sus necesidades. Los servicios solicitados son <b>acumulados 
              a los existentes</b>. Es responsabilidad del solicitante, indicar correctamente 
              el movimiento (A, B, C) de los servicios especificados tomando en cuenta su 
              historial de solicitudes.
              <br />
              3)	El Enlace Informático de la unidad administrativa solicitante, será quien 
              gestione y de seguimiento a la solicitud de servicios de Red Privada Virtual 
              (VPN) del personal de su unidad. 
              <br />
              4)	La Subgerencia de Soporte Técnico, Telecomunicaciones y Seguridad única y 
              exclusivamente proveerá el servicio de acceso remoto por VPN al usuario solicitante 
              autorizado por el titular de su unidad administrativa previa presentación del formato 
              debidamente llenado.
              <br />
              5)	La Subgerencia de Soporte Técnico, Telecomunicaciones y Seguridad, le proveerá al 
              usuario autorizado la credencial de acceso, manual de instalación y configuración del 
              software de cliente de VPN de usuario mediante correo electrónico personalizado.
              <br />
              6)	El acceso a los servicios de red interna mediante el servicio de VPN, será con el 
              uso de una contraseña que cumpla con la política correspondiente y el envío por correo 
              electrónico al usuario de una clave de 6 dígitos como doble factor de autenticación. 
              Es responsabilidad única y exclusiva del usuario autorizado a conservar en secreto, no 
              proporcionar a terceros su contraseña y no permitir el acceso a su cuenta de correo electrónico 
              para la obtención de la clave de 6 dígitos a terceros.
              <br />
              7)	Posterior al proceso de autorización de acceso al usuario y ya establecido el túnel de VPN, 
              solo el tráfico que se identifique que tiene como destino la red interna de la CONAGUA cursará 
              por el túnel de VPN, el resto del tráfico del equipo origen del usuario seguirá las rutas que tenga 
              definidas en su configuración para acceder a otros recursos de red.
              <br />
              8)	El servicio de VPN, solo permitirá por cada usuario, una conexión desde un dispositivo remoto,
               por lo que no será posible tener 2 o más conexiones simultáneas para una misma cuenta.
              <br />
              9)	La sesión establecida será automáticamente cerrada transcurridos 10 minutos de inactividad. 
              El usuario deberá repetir el proceso de inicio de sesión para conectarse a la red de la CONAGUA. 
              Está prohibido usar cualquier proceso o software para mantener la sesión activa.
              <br />
              10)	El usuario autorizado de VPN acepta que al hacer uso del servicio de VPN mediante cualquier 
              tipo de conexión, es de su exclusiva responsabilidad el costo que ello genere.
              <br />
              11)	El equipo proporcionado por la CONAGUA ya cuenta con los elementos de seguridad necesarios para 
              operar dentro de la red interna (actualizaciones del sistema operativo, actualizaciones de aplicaciones, 
              software antimalware), pero es obligación del usuario autorizado verificar que estos elementos se encuentren 
              actualizados. En el caso de equipo personal, es responsabilidad del usuario autorizado ejecutar y mantener 
              actualizado el sistema operativo, las aplicaciones instaladas y tener activos los elementos de seguridad como: 
              Antivirus/Antimalware, corta fuego o firewall, protección de cuentas, seguridad del dispositivo, control de 
              aplicaciones y exploradores entre otros que ofrezca el sistema ope-rativo o sean instalados de manera independiente.
              <br />
              12)	Si el usuario autorizado hace uso de su equipo personal para acceder a los servicios de la red interna de 
              la CONAGUA mediante el uso de los servicios de VPN, acepta conocer y cumplir con las políticas, normas y disposiciones 
              en materia de seguridad de la información que aplican para los equipos que proporciona la CONAGUA.
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
                  "He leído y acepto los políticas y lineamientos *",
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
        {
          !formData.politicasaceptadas ? (
            <Tooltip title="Debes aceptar las políticas y lineamientos">
              <span>
                <Button
                  //onClick={handleOpenModal}
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

      {/* BOTON FLOTANTE DE ACTUALIZAR FORMATO*/}
      {/* <Box
        sx={{
          position: "fixed",
          bottom: 10,
          right: 10,
          "& > :not(style)": { m: 1 },
        }}
      >
        <Fab
          size="small"
          variant="extended"
          color="success"
          onClick={handleClickOpen2}
        >
          <EditIcon sx={{ mr: 1 }} />
          Modificar Formato
        </Fab>
      </Box> */}

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
              //console.log("Información Enviada");
            },
          },
        }}
      >
        <DialogTitle align="center">
          Modificar Formato
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si conoce un número de formato en el cual se pueda guiar, ingréselo.
            <br />
            *Es responsabilidad del usuario el uso adecuado de esta función.
          </DialogContentText>

          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 0,
              mr: 0,
              mb: 1,
              mt: 2,
            }}
          />
{/*           <FormLabel
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
            Dato de búsqueda (se encuentra en la parte superior derecha de su
            formato).
          </FormLabel> */}
          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            id="numeroFormato"
            name="numeroFormato"
            label="Número de formato"
            placeholder="AAMMDDXXXX. "
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
            MODIFICAR
          </Button>
          <Button
            variant="contained"
            onClick={handleClose2}
            sx={{
              mt: 0,
              mb: 3,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 2,
              background: "#98989A",
              color: "#FFFFFF",
              border: "1px solid gray",
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

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

      {/* <Box
        sx={{
          position: "fixed",
          bottom: 110, // Ajusta para que no se encime con otros botones
          right: 10,
          "& > :not(style)": { m: 1 },
        }}
      >
        <Fab
          size="small"
          variant="extended"
          color="success"
          onClick={handleClickOpen3}          
        >
          <DownloadIcon sx={{ mr: 1 }} />
          Descargar formatos
        </Fab>
      </Box> */}
      {/* DIALOG DESCARGAR FORMATOS*/}
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
            ¿Qué documento base desea descargar?</DialogTitle>
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
              textTransform: 'none',
              //color: theme.palette.third.main,
              background:
                 theme.palette.secondary.main                 
            }}
          >
            Formato de acceso remoto a través de una Red Privada Virtual (VPN)
          </Button>
          <Button
            variant="contained"
            onClick={handleDownloadDocx2}
            sx={{
              mt: 2,
              mb: 0,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
              textTransform: 'none',
              //color: theme.palette.third.main,
              background:
                 theme.palette.secondary.main                 
            }}
          >
            Formato de acceso remoto a través de una Red Privada Virtual (VPN) Subgerencia de Sistemas
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

      {/* DIALOG GUÍA DE LLENADO*/}
      <Dialog
        open={open4}
        onClose={handleClose4}
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
            Descarga de guía de llenado</DialogTitle>
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
            //onClick={handleDownloadDocx}
            sx={{
              mt: 2,
              mb: 0,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 4,
              textTransform: 'none',
              //color: theme.palette.third.main,
              background:
                 theme.palette.secondary.main                 
            }}
          >
            Guía de llenado de solicitudes de acceso remoto a través de una Red Privada Virtual (VPN)
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
            onClick={handleClose4}
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

      {/* BOTON FLOTANTE DE AÑADIR MEMORANDO
      <Box
        sx={{
          position: "fixed",
          bottom: 60,
          right: 10,
          "& > :not(style)": { m: 1 },
        }}
      >
        <Fab
          size="small"
          variant="extended"
          color="success"
          onClick={handleClickOpen}
        >
          <AddIcon sx={{ mr: 1 }} />
          Añadir memorando
        </Fab>
      </Box> */}

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
              //console.log("Información Enviada");
            },
          },
        }}
      >
        <DialogTitle align="center">
          Añadir memorando
        </DialogTitle>
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
              ml: 0,
              mr: 0,
              mb: 0,
              mt: 2,
            }}
          />
{/*           <FormLabel
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
          </FormLabel> */}
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
{/*           <FormLabel
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
          </FormLabel> */}
          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            id="memorando"
            name="memorando"
            label="Nuevo número de memorando"
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
              mt: 0,
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
              mt: 0,
              mb: 3,
              width: "calc(100% - 32px)",
              ml: 2,
              mr: 2,
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
