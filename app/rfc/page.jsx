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
  Autocomplete,
  FormHelperText,
  FormLabel,
  Divider,
  FormGroup,
  Checkbox,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Tooltip,
  Modal,
  LinearProgress,
} from "@mui/material";
import Image from "next/image";
import EditableTableInter from "../components/EditableTableInter.jsx";
import EditableTableAdmin from "../components/EditableTableAdmin.jsx";
import EditableTableDes from "../components/EditableTableDes.jsx";
import EditableTableUsua from "../components/EditableTableUsua.jsx";
import EditableTableOtro from "../components/EditableTableOtro.jsx";
import Alerts from "../components/alerts.jsx";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
//import areas from "../constants/AREAS/areas.jsx";
//import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";

// ICONOS
import SyncIcon from "@mui/icons-material/Sync";
import { NodeNextRequest } from "next/dist/server/base-http/node.js";

export default function Home() {
  const theme = useTheme();
  const [formData2, setFormData2] = useState({
    numeroFormato: "",
    noticket: "",
    //movimientoID: "ALTAS",
    //numeroRegistro: "",
  });

  // Checkbox
  // Tipo de Movimiento
  const [adminIsTrue, setAdminIsTrue] = useState(false);
  const [desIsTrue, setDesIsTrue] = useState(false);
  const [interIsTrue, setInterIsTrue] = useState(false);
  const [usuaIsTrue, setUsuaIsTrue] = useState(false);
  const [otroIsTrue, setOtroIsTrue] = useState(false); //Para opcion OTRO

  // Intersistemas
  const [altaInterIsTrue, setAltaInterIsTrue] = useState(false);
  const [cambioInterIsTrue, setCambioInterIsTrue] = useState(false);
  const [bajaInterIsTrue, setBajaInterIsTrue] = useState(false);

  // Administrador
  const [altaAdminIsTrue, setAltaAdminIsTrue] = useState(false);
  const [cambioAdminIsTrue, setCambioAdminIsTrue] = useState(false);
  const [bajaAdminIsTrue, setBajaAdminIsTrue] = useState(false);

  // Desarrollador
  const [altaDesIsTrue, setAltaDesIsTrue] = useState(false);
  const [cambioDesIsTrue, setCambioDesIsTrue] = useState(false);
  const [bajaDesIsTrue, setBajaDesIsTrue] = useState(false);

  // Usuario
  const [altaUsuaIsTrue, setAltaUsuaIsTrue] = useState(false);
  const [cambioUsuaIsTrue, setCambioUsuaIsTrue] = useState(false);
  const [bajaUsuaIsTrue, setBajaUsuaIsTrue] = useState(false);

  // Otro
  const [altaOtroIsTrue, setAltaOtroIsTrue] = useState(false);
  const [cambioOtroIsTrue, setCambioOtroIsTrue] = useState(false);
  const [bajaOtroIsTrue, setBajaOtroIsTrue] = useState(false);

  // Intersistemas
  const [altaInterTableData, setAltaInterTableData] = useState([]);
  const [bajaInterTableData, setBajaInterTableData] = useState([]);
  const [cambioAltaInterTableData, setCambioAltaInterTableData] = useState([]);
  const [cambioBajaInterTableData, setCambiBajaInterTableData] = useState([]);

  // Administrador
  const [altaAdminTableData, setAltaAdminTableData] = useState([]);
  const [bajaAdminTableData, setBajaAdminTableData] = useState([]);
  const [cambioAltaAdminTableData, setCambioAltaAdminTableData] = useState([]);
  const [cambioBajaAdminTableData, setCambioBajaAdminTableData] = useState([]);

  // Desarrollador
  const [altaDesTableData, setAltaDesTableData] = useState([]);
  const [bajaDesTableData, setBajaDesTableData] = useState([]);
  const [cambioAltaDesTableData, setCambioAltaDesTableData] = useState([]);
  const [cambioBajaDesTableData, setCambioBajaDesTableData] = useState([]);

  // Usuario
  const [altaUsuaTableData, setAltaUsuaTableData] = useState([]);
  const [bajaUsuaTableData, setBajaUsuaTableData] = useState([]);
  const [cambioAltaUsuaTableData, setCambioAltaUsuaTableData] = useState([]);
  const [cambioBajaUsuaTableData, setCambioBajaUsuaTableData] = useState([]);

  // Otro
  const [altaOtroTableData, setAltaOtroTableData] = useState([]);
  const [bajaOtroTableData, setBajaOtroTableData] = useState([]);
  const [cambioAltaOtroTableData, setCambioAltaOtroTableData] = useState([]);
  const [cambioBajaOtroTableData, setCambioBajaOtroTableData] = useState([]);

  // Generar PDF
  const [pdfUrl, setPdfUrl] = useState(null);

  // Nombre PDF
  const [nombreArchivo, setNombreArchivo] = useState("");

  // Estados para el formulario
  const [formData, setFormData] = useState({
    desotro: "",
    memo: "",
    descbreve: "",
    nomei: "",
    extei: "",
    noms: "",
    exts: "",
    puestos: "",
    areas: "",
    desdet: "",
    nombreJefe: "",
    puestoJefe: "",
    justifica: "",
    justifica2: "",
    justifica3: "",
    noticket: "",
    region: "",
    //unidadAdministrativa:"",

    // Estados para tipo de movimientos
    intersistemas: interIsTrue,
    administrador: adminIsTrue,
    desarrollador: desIsTrue,
    usuario: usuaIsTrue,
    otro: otroIsTrue, //ESTE TAL VEZ PARA OTRO, Seria Otra Tabla

    // Estados para checkbox
    // Intersistemas
    AltaInter: altaInterIsTrue,
    BajaInter: bajaInterIsTrue,
    CambioInter: cambioInterIsTrue,
    // Administrador
    AltaAdmin: altaAdminIsTrue,
    BajaAdmin: bajaAdminIsTrue,
    CambioAdmin: cambioAdminIsTrue,
    // Desarrollador
    AltaDes: altaDesIsTrue,
    BajaDes: bajaDesIsTrue,
    CambioDes: cambioDesIsTrue,
    // Usuario
    AltaUsua: altaUsuaIsTrue,
    BajaUsua: bajaUsuaIsTrue,
    CambioUsua: cambioUsuaIsTrue,
    // Otro
    AltaOtro: altaOtroIsTrue,
    BajaOtro: bajaOtroIsTrue,
    CambioOtro: cambioOtroIsTrue,

    //POLITICAS
    politicasaceptadas: false,
  });

//     //Capitalizar
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
//   "nomei",
//   "puestos",
//   "noms",
//   "nombreJefe",
//   "puestoJefe",
//   "areas"
// ];

  const Movimientoid = [
    {
      value: "ALTAS",
      label: "ALTAS",
    },
    {
      value: "BAJAS",
      label: "BAJAS",
    },
  ];

  // Gaurdar cambios
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //Prueba de capitalizar
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

  // HandleChange FormData2
  const handleChange2 = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //SOLO EN CASO DE QUE QUIERA UN LISTADO EN ÁREAS
  /*
    // Manejo de Autocomplete de UA
  const handleUA = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      unidadAdministrativa: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      areas:"",
      //subgerencia:"",
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
      areas: newValue || "", // Asegura que siempre haya un valor (incluso si es string vacío)
      subgerencia:"",
    }));
  };
  //FILTRADO DE ÁREA DE ADSCRIPCIÓN
    const filteredAreas = areas[formData.unidadAdministrativa] || [];
  */
  //TIPO MOVIMIENTO
  const handleChangeMovimiento = (event) => {
    const selectedValue = event.target.value;
    setFormData2((prevData) => ({
      ...prevData,
      movimientoID: selectedValue, // Guarda EL MOVIMIENTO seleccionado
    }));
  };

  // Tablas
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      // Intersistemas
      registrosInterAltas: altaInterTableData,
      registrosInterBajas: bajaInterTableData,
      registrosInterCambiosAltas: cambioAltaInterTableData,
      registrosInterCambiosBajas: cambioBajaInterTableData,
      // Administrador
      registrosAdminAltas: altaAdminTableData,
      registrosAdminBajas: bajaAdminTableData,
      registrosAdminCambiosAltas: cambioAltaAdminTableData,
      registrosAdminCambiosBajas: cambioBajaAdminTableData,
      // Desarrollador
      registrosDesAltas: altaDesTableData,
      registrosDesBajas: bajaDesTableData,
      registrosDesCambiosAltas: cambioAltaDesTableData,
      registrosDesCambiosBajas: cambioBajaDesTableData,
      // Usuario
      registrosUsuaAltas: altaUsuaTableData,
      registrosUsuaBajas: bajaUsuaTableData,
      registrosUsuaCambiosAltas: cambioAltaUsuaTableData,
      registrosUsuaCambiosBajas: cambioBajaUsuaTableData,
      // Otro
      registrosOtroAltas: altaOtroTableData,
      registrosOtroBajas: bajaOtroTableData,
      registrosOtroCambiosAltas: cambioAltaOtroTableData,
      registrosOtroCambiosBajas: cambioBajaOtroTableData,
    }));
  }, [
    altaInterTableData,
    bajaInterTableData,
    cambioAltaInterTableData,
    cambioBajaInterTableData,
    altaAdminTableData,
    bajaAdminTableData,
    cambioAltaAdminTableData,
    cambioBajaAdminTableData,
    altaDesTableData,
    bajaDesTableData,
    cambioAltaDesTableData,
    cambioBajaDesTableData,
    altaUsuaTableData,
    bajaUsuaTableData,
    cambioAltaUsuaTableData,
    cambioBajaUsuaTableData,
    altaOtroTableData,
    bajaOtroTableData,
    cambioAltaOtroTableData,
    cambioBajaOtroTableData,
  ]);

  // Intersistemas
  const handleInterAltaTableDataChange = (data) => {
    setAltaInterTableData(data);
  };
  const handleInterBajaTableDataChange = (data) => {
    setBajaInterTableData(data);
  };
  const handleInterCambioAltaTableDataChange = (data) => {
    setCambioAltaInterTableData(data);
  };
  const handleInterCambioBajaTableDataChange = (data) => {
    setCambiBajaInterTableData(data);
  };
  // Administrador
  const handleAdminAltaTableDataChange = (data) => {
    setAltaAdminTableData(data);
  };
  const handleAdminBajaTableDataChange = (data) => {
    setBajaAdminTableData(data);
  };
  const handleAdminCambioAltaTableDataChange = (data) => {
    setCambioAltaAdminTableData(data);
  };
  const handleAdminCambioBajaTableDataChange = (data) => {
    setCambioBajaAdminTableData(data);
  };
  // Desarrollador
  const handleDesAltaTableDataChange = (data) => {
    setAltaDesTableData(data);
  };
  const handleDesBajaTableDataChange = (data) => {
    setBajaDesTableData(data);
  };
  const handleDesCambioAltaTableDataChange = (data) => {
    setCambioAltaDesTableData(data);
  };
  const handleDesCambioBajaTableDataChange = (data) => {
    setCambioBajaDesTableData(data);
  };
  // Usuario
  const handleUsuaAltaTableDataChange = (data) => {
    setAltaUsuaTableData(data);
  };
  const handleUsuaBajaTableDataChange = (data) => {
    setBajaUsuaTableData(data);
  };
  const handleUsuaCambioAltaTableDataChange = (data) => {
    setCambioAltaUsuaTableData(data);
  };
  const handleUsuaCambioBajaTableDataChange = (data) => {
    setCambioBajaUsuaTableData(data);
  };
  // Otro
  const handleOtroAltaTableDataChange = (data) => {
    setAltaOtroTableData(data);
  };
  const handleOtroBajaTableDataChange = (data) => {
    setBajaOtroTableData(data);
  };
  const handleOtroCambioAltaTableDataChange = (data) => {
    setCambioAltaOtroTableData(data);
  };
  const handleOtroCambioBajaTableDataChange = (data) => {
    setCambioBajaOtroTableData(data);
  };

  // Checkbox Funcionalidad
  // Tipo de cambio
  const saveComboBox = async (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
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
      noticket: "",
    });
    setBotonEstado2("Enviar");
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

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    //No abrir el modal si ya está en modo descarga
    if (botonEstado === "Descargar PDF") return;
    const [isValid, isValidTabla, getErrors] =
      validarCamposRequeridos(formData);
    setErrors(getErrors);

    //console.log("Lista getErrors en submit: ", getErrors);

    if (!isValid) {
      setAlert({
        message: "Por favor, complete todos los campos requeridos.",
        severity: "warning",
      });
    } else if (!isValidTabla) {
      setAlert({
        message:
          "Por favor, complete los registros de las tablas REGLAS/COMUNICACIONES.",
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

  useEffect(() => {
    if (formData.region === "centrales") {
      setFormData((prev) => ({
        ...prev,
        nomei: "null",
        extei: "null",
      }));
      if (formData.region === "regional") {
        setFormData((prev) => ({
          ...prev,
          nomei: "",
          extei: "",
        }));
      }
    }
  }, [formData.region]);

  const validarCamposRequeridos = (Data) => {
    const errores = {};
    let isValid = true; // Asumimos que es válido al principio
    let isValidTabla = true;

    // Lógica para los campos de justificación
    const justifica = Data.justifica; // Asumiendo que el campo se llama justifica1 ahora
    const justifica2 = Data.justifica2; // Asumiendo que el campo se llama justifica2
    const justifica3 = Data.justifica3; // Asumiendo que el campo se llama justifica3

    // Quien Solicita
    const region = Data.region;

    // Tipo de movimiento
    const inter = Data.intersistemas;
    const admin = Data.administrador;
    const desa = Data.desarrollador;
    const usua = Data.usuario;

    // Tipo de Cambio para cada moviminento
    const altaInter = Data.AltaInter;
    const bajaInter = Data.BajaInter;
    const cambioInter = Data.CambioInter;
    const altaAdmin = Data.AltaAdmin;
    const bajaAdmin = Data.BajaAdmin;
    const cambioAdmin = Data.CambioAdmin;
    const altaDes = Data.AltaDes;
    const bajaDes = Data.BajaDes;
    const cambioDes = Data.CambioDes;
    const altaUsua = Data.AltaUsua;
    const bajaUsua = Data.BajaUsua;
    const cambioUsua = Data.CambioUsua;

    // Verifica si al menos uno de los campos de justificación está lleno
    if (!justifica && !justifica2 && !justifica3) {
      // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
      errores.justifica =
        "Al menos uno de los campos de justificación es requerido";
      errores.justifica2 =
        "Al menos uno de los campos de justificación es requerido";
      errores.justifica3 =
        "Al menos uno de los campos de justificación es requerido";
      isValid = false;
    }
    // Verifica si al menos uno de los campos de justificación está lleno
    if (region === "regional") {
      // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
      if (!Data.extei) {
        errores.extei = "Este campo es requerido";
        isValid = false;
      }
      if (!Data.nomei) {
        errores.nomei = "Este campo es requerido";
        isValid = false;
      }
    }
    if (!inter && !admin && !desa && !usua) {
      // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
      errores.validaCambio = "Al menos uno de los campos es requerido";
      isValid = false;
    }
    // Validadores para el tipo de movimiento
    if (inter) {
      if (!altaInter && !bajaInter && !cambioInter) {
        // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
        errores.movimientoInter = "Al menos uno de los campos es requerido";
        isValid = false;
      }
    }
    if (admin) {
      if (!altaAdmin && !bajaAdmin && !cambioAdmin) {
        // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
        errores.movimientoAdmin = "Al menos uno de los campos es requerido";
        isValid = false;
      }
    }
    if (desa) {
      if (!altaDes && !bajaDes && !cambioDes) {
        // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
        errores.movimientoDesa = "Al menos uno de los campos es requerido";
        isValid = false;
      }
    }
    if (usua) {
      if (!altaUsua && !bajaUsua && !cambioUsua) {
        // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
        errores.movimientoUsua = "Al menos uno de los campos es requerido";
        isValid = false;
      }
    }

    ///VALIDADOR DE QUE GUARDA RESGITRSO EN INTERSISTEMAS
    //ALTA INTERSISTEMAS
    if (Data.intersistemas && Data.AltaInter) {
      if (
        !Array.isArray(Data.registrosInterAltas) ||
        Data.registrosInterAltas.length === 0
      ) {
        //errores.registrosInterAltas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosInterAltas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosInterAltas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //BAJA INTERISTEMAS
    if (Data.intersistemas && Data.BajaInter) {
      if (
        !Array.isArray(Data.registrosInterBajas) ||
        Data.registrosInterBajas.length === 0
      ) {
        //errores.registrosInterBajas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosInterBajas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosInterBajas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Bajas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //CAMBIO ALTA INTERSISTEMAS
    if (Data.intersistemas && Data.CambioInter) {
      if (
        !Array.isArray(Data.registrosInterCambiosAltas) ||
        Data.registrosInterCambiosAltas.length === 0
      ) {
        //errores.registrosInterAltas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosInterCambiosAltas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosInterCambiosAltas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //CAMBIO BAJA INTERSISTEMAS
    if (Data.intersistemas && Data.CambioInter) {
      if (
        !Array.isArray(Data.registrosInterCambiosBajas) ||
        Data.registrosInterCambiosBajas.length === 0
      ) {
        //errores.registrosInterCambiosBajas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosInterCambiosBajas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosInterCambiosBajas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }

    ////validador de guardado de registros administrador
    //altas ADMINISTRADOR
    if (Data.administrador && Data.AltaAdmin) {
      if (
        !Array.isArray(Data.registrosAdminAltas) ||
        Data.registrosAdminAltas.length === 0
      ) {
        //errores.registrosAdminAltas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosAdminAltas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosAdminAltas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    ///bajas ADMINISTRADOR
    if (Data.administrador && Data.BajaAdmin) {
      if (
        !Array.isArray(Data.registrosAdminBajas) ||
        Data.registrosAdminBajas.length === 0
      ) {
        //errores.registrosAdminBajas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosAdminBajas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosAdminBajas${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Bajas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //cambiosaltas ADMINISTRADOR
    if (Data.administrador && Data.CambioAdmin) {
      if (
        !Array.isArray(Data.registrosAdminCambiosAltas) ||
        Data.registrosAdminCambiosAltas.length === 0
      ) {
        //errores.registrosAdminCambiosAltas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosAdminCambiosAltas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosAdminCambiosAltas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //CAMBIO BAJA ADMINISTRADOR
    if (Data.administrador && Data.CambioAdmin) {
      if (
        !Array.isArray(Data.registrosAdminCambiosBajas) ||
        Data.registrosAdminCambiosBajas.length === 0
      ) {
        //errores.registrosAdminCambiosBajas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosAdminCambiosBajas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosAdminCambiosBajas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }

    ///validador de guardado de registros DESARROLADOR
    //ALTA DESARROLLADOR
    if (Data.desarrollador && Data.AltaDes) {
      if (
        !Array.isArray(Data.registrosDesAltas) ||
        Data.registrosDesAltas.length === 0
      ) {
        //errores.registrosDesAltas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosDesAltas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosDesAltas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    ///BAJA DESARROLLADOR
    if (Data.desarrollador && Data.BajaDes) {
      if (
        !Array.isArray(Data.registrosDesBajas) ||
        Data.registrosDesBajas.length === 0
      ) {
        //errores.registrosInterBajas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosDesBajas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosInterBajas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Bajas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //CAMBIOALTA DESARROLLADOR
    if (Data.desarrollador && Data.CambioDes) {
      if (
        !Array.isArray(Data.registrosDesCambiosAltas) ||
        Data.registrosDesCambiosAltas.length === 0
      ) {
        //errores.registrosInterAltas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosDesCambiosAltas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosDesCambiosAltas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //CAMBIObaja
    if (Data.desarrollador && Data.CambioDes) {
      if (
        !Array.isArray(Data.registrosInterCambiosBajas) ||
        Data.registrosInterCambiosBajas.length === 0
      ) {
        //errores.registrosInterCambiosBajas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosInterCambiosBajas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosInterCambiosBajas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }

    //validador de guardado de registros USUARIO

    //ALTA USUARIO
    if (Data.usuario && Data.AltaUsua) {
      if (
        !Array.isArray(Data.registrosUsuaAltas) ||
        Data.registrosUsuaAltas.length === 0
      ) {
        //errores.registrosUsuaAltas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosUsuaAltas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosUsuaAltas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    ///BAJA
    if (Data.usuario && Data.BajaUsua) {
      if (
        !Array.isArray(Data.registrosUsuaBajas) ||
        Data.registrosUsuaBajas.length === 0
      ) {
        //errores.registrosInterBajas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosUsuaBajas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosInterBajas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Bajas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //CAMBIOALTA
    if (Data.usuario && Data.CambioUsua) {
      if (
        !Array.isArray(Data.registrosUsuaCambiosAltas) ||
        Data.registrosUsuaCambiosAltas.length === 0
      ) {
        //errores.registrosInterAltas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosUsuaCambiosAltas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosDesCambiosAltas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }
    //CAMBIObaja
    if (Data.usuario && Data.CambioUsua) {
      if (
        !Array.isArray(Data.registrosUsuaCambiosBajas) ||
        Data.registrosUsuaCambiosBajas.length === 0
      ) {
        //errores.registrosInterCambiosBajas = "Debe agregar al menos un registro en Altas Intersistemas";
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosUsuaCambiosBajas.forEach((row, idx) => {
          if (
            !row.id ||
            !row.IPO ||
            !row.IPD ||
            !row.PUER ||
            !row.TEMPO ||
            !row.PRO /* agrega aquí los campos requeridos */
          ) {
            //errores[`registrosInterCambiosBajas_${idx}`] = `Faltan campos requeridos en el registro #${idx + 1} de Altas Intersistemas`;
            isValidTabla = false;
          }
        });
      }
    }

    // Lógica para los demás campos requeridos
    for (const key in Data) {
      // Excluir campos que ya tienen su lógica de validación especial (como las justificaciones)
      // y los que no son requeridos o se validan de otra forma.
      if (
        key !== "desotro" &&
        key !== "justifica" && // Excluir justifica1 aquí
        key !== "justifica2" && // Excluir justifica2 aquí
        key !== "justifica3" && // Excluir justifica3 aquí
        key !== "intersistemas" &&
        key !== "administrador" &&
        key !== "desarrollador" &&
        key !== "usuario" &&
        key !== "otro" &&
        key !== "AltaInter" &&
        key !== "BajaInter" &&
        key !== "CambioInter" &&
        key !== "AltaAdmin" &&
        key !== "BajaAdmin" &&
        key !== "CambioAdmin" &&
        key !== "AltaDes" &&
        key !== "BajaDes" &&
        key !== "CambioDes" &&
        key !== "AltaUsua" &&
        key !== "BajaUsua" &&
        key !== "CambioUsua" &&
        key !== "AltaOtro" &&
        key !== "BajaOtro" &&
        key !== "CambioOtro" &&
        key !== "extei" &&
        key !== "nomei" &&
        key !== "noticket" &&
        Data.hasOwnProperty(key) // Asegúrate de que la propiedad pertenece al objeto
      ) {
        // Si el campo es requerido y está vacío
        if (!Data[key]) {
          errores[key] = "Este campo es requerido";
          isValid = false;
        }
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
      const formResponse = await axios.post("/api2/v3/rfc", formData, {
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
      setNombreArchivo(`RFC_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post(
          "/api/v3/rfc",
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

    try {
      // Aqui llamamos a la primera api que valida campos
      const formResponse = await axios.post(
        "/api2/v3/rfcActualizar",
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
      setNombreArchivo(`RFC_${epoch}.pdf`);

      setAlert({
        message: formMessage,
        severity: "success",
      });
      setOpenAlert(true);

      try {
        // Aqui llamamos a la otra api para el pdf
        const pdfResponse = await axios.post(
          "/api/v3/rfc",
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

  ///HANDLE TELÉFONO SOLICITANTE
  const handleTelefonoSoliChange = (event) => {
    // Elimina todo lo que no sea dígito
    let value = event.target.value.replace(/\D/g, "");
    value = value.slice(0, 20); // Limita la longitud

    // Agrupa en bloques de 4 dígitos separados por guion
    value = value.match(/.{1,4}/g)?.join("-") || "";

    setFormData((prevFormData) => ({
      ...prevFormData,
      exts: value,
    }));
  };
  //HANDLE TELÉFONO ENLACE
  const handleTelefonoEnlaceChange = (event) => {
    // Elimina todo lo que no sea dígito
    let value = event.target.value.replace(/\D/g, "");
    value = value.slice(0, 20); // Limita la longitud

    // Agrupa en bloques de 4 dígitos separados por guion
    value = value.match(/.{1,4}/g)?.join("-") || "";

    setFormData((prevFormData) => ({
      ...prevFormData,
      extei: value,
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

  // Inicio de la pagina

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
            Formulario para solicitud de alta, baja o cambio en la
            infraestructura de seguridad de la CONAGUA
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
          Región de origen de la solicitud
        </Typography>
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
            mb: 1,
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            fontSize: "1.2rem",
          }}
        >
          Seleccione el origen *
        </FormLabel>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RadioGroup
            row
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel
              value="central"
              control={<Radio />}
              label="Oficinas Centrales"
              sx={{
                ml: 2,
                mr: 2,
                justifyContent: "center",
                width: "calc(50% - 32px)",
              }}
              //labelPlacement = "bottom"
            />
            <FormControlLabel
              value="regional"
              control={<Radio />}
              label="Oficinas Regionales u Organismos de Cuenca"
              sx={{
                ml: 2,
                mr: 2,
                justifyContent: "center",
                width: "calc(50% - 32px)",
              }}
            />
          </RadioGroup>

          <FormHelperText
            sx={{
              ml: 2,
              mr: 2,
              mb: 0,
              justifyContent: "center",
              color: "red",
              display: errors?.region ? "block" : "none",
            }}
          >
            {errors?.region}
          </FormHelperText>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            mt: 2,
            ml: 2,
            mr: 2,
            mb: 3,
          }}
        />
      </Box>
      {/* Datos del Solicitante Usuario */}
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
        display={formData.region ? "block" : "none"}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Información del solicitante
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
            error={!!errors?.noms}
            id="noms"
            name="noms"
            label="Nombre completo"
            placeholder="Nombre completo del solicitante"
            value={formData.noms}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.exts}
            id="exts"
            name="exts"
            label="Teléfono / Extensión"
            placeholder="Teléfono o extensión del solicitante"
            value={formData.exts}
            onChange={handleTelefonoSoliChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 20 }}
          />
          <TextField
            required
            error={!!errors?.puestos}
            id="puestos"
            name="puestos"
            label="Puesto"
            placeholder="Puesto del solicitante"
            value={formData.puestos}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.areas}
            id="areas"
            name="areas"
            label="Área"
            placeholder="Área del solicitante"
            value={formData.areas}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
          {/**SOLO EN CASO DE QUE DIGA QUE SI QUIERE UN LISTADO DE ÁREAS */}
          {/**UNIDAD ADMINISTRARTIVA */}
          {/*<Autocomplete
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
          />*/}

          {/**ÁREA DE ADSCRIPCIÓN */}
          {/*  <Autocomplete
              disablePortal
              options={filteredAreas}            
              //freeSolo
              renderInput={(params) => (
                <TextField
                  required
                  //error={!!errors?.unidadAdministrativa}
                  placeholder="Seleccione la Área de Adscripción"
                  sx={{ background: "#FFFFFF" }}
                  {...params}
                  label="Área de Adscripción"
                />
              )}
              id="areas"
              name="areas"
              onChange={(event, newValue) => {
                handleArea(newValue); // Maneja selección de opciones
              }}            
              inputValue={formData.areas || ""} // Controla el valor mostrado
              getOptionLabel={(option) => option || ""}
              isOptionEqualToValue={(option, value) => option === value}
            />    */}
        </Box>
      </Box>
      {/* Datos del enlace informatico */}
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
        display={formData.region === "regional" ? "block" : "none"}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Información del enlace informático
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
            error={!!errors?.nomei}
            id="nomei"
            name="nomei"
            label="Nombre completo"
            placeholder="Nombre completo del enlace informático"
            value={formData.nomei}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.extei}
            id="extei"
            name="extei"
            label="Teléfono / Extensión"
            placeholder="Teléfono o extensión del enlace informático"
            value={formData.extei}
            onChange={handleTelefonoEnlaceChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 20 }}
          />
        </Box>
      </Box>
      {/* Datos del Registro */}
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
          <TextField
            required
            error={!!errors?.memo}
            id="memo"
            name="memo"
            label="Memorando"
            placeholder="Ingrese su memorando"
            value={formData.memo}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            //required
            //error={!!errors?.descbreve}
            id="noticket"
            name="noticket"
            label="No. Ticket"
            placeholder="Ingrese el número de ticket"
            value={formData.noticket}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 0 }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.descbreve}
            id="descbreve"
            name="descbreve"
            label="Descripcion breve"
            placeholder="Descripción breve de la solicitud"
            value={formData.descbreve}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
          {/* Descripcion Detallada */}
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

        {/* Checkbox */}
        <Box>
          <FormLabel
            component="legend"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.2rem",
              mt: 2,
              mx: "auto",
            }}
          >
            Tipo de cambio *
          </FormLabel>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 2,
              ml: 10,
              mb: 1,
              mr: 8,
            }}
          >
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.intersistemas}
                    onChange={saveComboBox}
                    name="intersistemas"
                    color="primary"
                  />
                }
                label="Intersistemas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.administrador}
                    onChange={saveComboBox}
                    name="administrador"
                    color="primary"
                  />
                }
                label="Administrador"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.desarrollador}
                    onChange={saveComboBox}
                    name="desarrollador"
                    color="primary"
                  />
                }
                label="Desarrollador"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.usuario}
                    onChange={saveComboBox}
                    name="usuario"
                    color="primary"
                  />
                }
                label="Usuario"
              />
              <Tooltip title="No está disponible">
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled
                      checked={formData.otro}
                      onChange={saveComboBox}
                      name="otro"
                      color="primary"
                    />
                  }
                  label="Otro"
                />
              </Tooltip>
            </FormGroup>
            <FormHelperText
              sx={{
                mx: "auto",
                justifyContent: "center",
                color: "red",
                display: errors?.validaCambio ? "block" : "none",
              }}
            >
              {errors?.validaCambio}
            </FormHelperText>
          </Box>

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
          >
            <Tooltip title="No está disponible">
              <TextField
                disabled={!formData.otro}
                required={formData.otro}
                id="desotro"
                name="desotro"
                label="Otro"
                placeholder="Describa brevemente"
                value={formData.desotro}
                onChange={handleChange}
                sx={{ background: "#FFFFFF", mb: 3 }}
                inputProps={{ maxLength: 32 }}
              />
            </Tooltip>
            <Divider
              sx={{
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 2,
                mr: 2,
                mb: 1,
              }}
            />
            <TextField
              required
              error={!!errors?.desdet}
              id="desdet"
              name="desdet"
              label="Descripción detallada"
              placeholder="Descripción a detalle de las configuraciones solicitadas"
              value={formData.desdet}
              onChange={handleChange}
              sx={{ background: "#FFFFFF", mb: 3 }}
              inputProps={{ maxLength: 256 }}
            />
          </Box>
        </Box>
      </Box>
      {/* INTERSISTEMAS*/}
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
          display: formData.intersistemas ? "block" : "none",
          minHeight: "100px",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Reglas / Comunicaciones
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Intersistemas
        </Typography>

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mt: 3,
            mb: 2,
          }}
        />

        {/* Checkbox Intersistemas */}
        <Box
          sx={{
            display: formData.intersistemas ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            ml: 0,
            mb: 1,
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
            Tipo de movimiento
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.AltaInter}
                  onChange={saveComboBox}
                  name="AltaInter"
                  color="primary"
                />
              }
              label="Alta"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.BajaInter}
                  onChange={saveComboBox}
                  name="BajaInter"
                  color="primary"
                />
              }
              label="Baja"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.CambioInter}
                  onChange={saveComboBox}
                  name="CambioInter"
                  color="primary"
                />
              }
              label="Cambio"
            />
          </FormGroup>
          <FormHelperText
            sx={{
              mx: "auto",
              mb: 1,
              justifyContent: "center",
              color: "red",
              display: errors?.movimientoInter ? "block" : "none",
            }}
          >
            {errors?.movimientoInter}
          </FormHelperText>
        </Box>

        {/* Altas Tabla */}
        <Box
          sx={{
            display: formData.AltaInter ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Altas Intersistemas
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
            <EditableTableInter onDataChange={handleInterAltaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box
          sx={{
            display: formData.BajaInter ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Bajas Intersistemas
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
            <EditableTableInter onDataChange={handleInterBajaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box
          sx={{
            display: formData.CambioInter ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Cambios Intersistemas
          </Typography>

          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 0,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Favor de llenar ambas tablas en caso de traslado(cambios)*
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
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Altas
            </Typography>
            <EditableTableInter
              onDataChange={handleInterCambioAltaTableDataChange}
            />
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 4,
                mb: 1,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 2, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Bajas
            </Typography>
            <EditableTableInter
              onDataChange={handleInterCambioBajaTableDataChange}
            />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
      </Box>
      {/* ADMINISTRADOR */}
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
          display: formData.administrador ? "block" : "none",
          minHeight: "100px",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Reglas / Comunicaciones
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Administrador
        </Typography>

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mt: 3,
            mb: 2,
          }}
        />

        {/* Checkbox Administrador */}
        <Box
          sx={{
            display: formData.administrador ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            ml: 0,
            mb: 1,
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
            Tipo de Movimiento
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.AltaAdmin}
                  onChange={saveComboBox}
                  name="AltaAdmin"
                  color="primary"
                />
              }
              label="Alta"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.BajaAdmin}
                  onChange={saveComboBox}
                  name="BajaAdmin"
                  color="primary"
                />
              }
              label="Baja"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.CambioAdmin}
                  onChange={saveComboBox}
                  name="CambioAdmin"
                  color="primary"
                />
              }
              label="Cambio"
            />
          </FormGroup>
          <FormHelperText
            sx={{
              mx: "auto",
              mb: 1,
              justifyContent: "center",
              color: "red",
              display: errors?.movimientoAdmin ? "block" : "none",
            }}
          >
            {errors?.movimientoAdmin}
          </FormHelperText>
        </Box>

        {/* Altas Tabla */}
        <Box
          sx={{
            display: formData.AltaAdmin ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Altas Administrador
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
            <EditableTableAdmin onDataChange={handleAdminAltaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box
          sx={{
            display: formData.BajaAdmin ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Bajas Administrador
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
            <EditableTableAdmin onDataChange={handleAdminBajaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box
          sx={{
            display: formData.CambioAdmin ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Cambios Administrador
          </Typography>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 0,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Favor de llenar ambas tablas en caso de traslado(cambios)*
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
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Altas
            </Typography>
            <EditableTableAdmin
              onDataChange={handleAdminCambioAltaTableDataChange}
            />
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 1,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 2, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Bajas
            </Typography>
            <EditableTableAdmin
              onDataChange={handleAdminCambioBajaTableDataChange}
            />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
      </Box>
      {/* DESARROLLADOR */}
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
          display: formData.desarrollador ? "block" : "none",
          minHeight: "100px",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Reglas / Comunicaciones
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Desarrollador
        </Typography>

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mt: 3,
            mb: 2,
          }}
        />

        {/* Checkbox Desarrollador */}
        <Box
          sx={{
            display: formData.desarrollador ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            ml: 0,
            mb: 1,
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
            Tipo de Movimiento
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.AltaDes}
                  onChange={saveComboBox}
                  name="AltaDes"
                  color="primary"
                />
              }
              label="Alta"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.BajaDes}
                  onChange={saveComboBox}
                  name="BajaDes"
                  color="primary"
                />
              }
              label="Baja"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.CambioDes}
                  onChange={saveComboBox}
                  name="CambioDes"
                  color="primary"
                />
              }
              label="Cambio"
            />
          </FormGroup>
          <FormHelperText
            sx={{
              mx: "auto",
              mb: 1,
              justifyContent: "center",
              color: "red",
              display: errors?.movimientoDesa ? "block" : "none",
            }}
          >
            {errors?.movimientoDesa}
          </FormHelperText>
        </Box>

        {/* Altas Tabla */}
        <Box
          sx={{
            display: formData.AltaDes ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Altas Desarrollador
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
            <EditableTableDes onDataChange={handleDesAltaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box
          sx={{
            display: formData.BajaDes ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Bajas Desarrollador
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
            <EditableTableDes onDataChange={handleDesBajaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box
          sx={{
            display: formData.CambioDes ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Cambios Desarrollador
          </Typography>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 0,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Favor de llenar ambas tablas en caso de traslado(cambios)*
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
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Altas
            </Typography>
            <EditableTableDes
              onDataChange={handleDesCambioAltaTableDataChange}
            />
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 1,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 2, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Bajas
            </Typography>
            <EditableTableDes
              onDataChange={handleDesCambioBajaTableDataChange}
            />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
      </Box>
      {/* USUARIO */}
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
          display: formData.usuario ? "block" : "none",
          minHeight: "100px",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Reglas / Comunicaciones
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Usuario
        </Typography>

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mt: 3,
            mb: 2,
          }}
        />
        {/* Checkbox Usuario */}
        <Box
          sx={{
            display: formData.usuario ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            ml: 0,
            mb: 1,
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
            Tipo de Movimiento
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.AltaUsua}
                  onChange={saveComboBox}
                  name="AltaUsua"
                  color="primary"
                />
              }
              label="Alta"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.BajaUsua}
                  onChange={saveComboBox}
                  name="BajaUsua"
                  color="primary"
                />
              }
              label="Baja"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.CambioUsua}
                  onChange={saveComboBox}
                  name="CambioUsua"
                  color="primary"
                />
              }
              label="Cambio"
            />
          </FormGroup>
          <FormHelperText
            sx={{
              mx: "auto",
              mb: 1,
              justifyContent: "center",
              color: "red",
              display: errors?.movimientoUsua ? "block" : "none",
            }}
          >
            {errors?.movimientoUsua}
          </FormHelperText>
        </Box>

        {/* Altas Tabla */}
        <Box
          sx={{
            display: formData.AltaUsua ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Altas Usuario
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
            <EditableTableUsua onDataChange={handleUsuaAltaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box
          sx={{
            display: formData.BajaUsua ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Bajas Usuario
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
            <EditableTableUsua onDataChange={handleUsuaBajaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box
          sx={{
            display: formData.CambioUsua ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Cambios Usuario
          </Typography>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 0,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Favor de llenar ambas tablas en caso de traslado(cambios)*
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
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Altas
            </Typography>
            <EditableTableUsua
              onDataChange={handleUsuaCambioAltaTableDataChange}
            />
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 1,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 2, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Bajas
            </Typography>
            <EditableTableUsua
              onDataChange={handleUsuaCambioBajaTableDataChange}
            />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
      </Box>
      {/* OTRO */}
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
          display: formData.otro ? "block" : "none",
          minHeight: "100px",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          Reglas / Comunicaciones
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          OTROS
        </Typography>

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mt: 3,
            mb: 2,
          }}
        />

        {/* Checkbox Otro */}
        <Box
          sx={{
            display: formData.otro ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            ml: 0,
            mb: 1,
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
            Tipo de Movimiento
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.AltaOtro}
                  onChange={saveComboBox}
                  name="AltaOtro"
                  color="primary"
                />
              }
              label="Alta"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.CambioOtro}
                  onChange={saveComboBox}
                  name="CambioOtro"
                  color="primary"
                />
              }
              label="Cambio"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.BajaOtro}
                  onChange={saveComboBox}
                  name="BajaOtro"
                  color="primary"
                />
              }
              label="Baja"
            />
          </FormGroup>
        </Box>

        {/* Altas Tabla */}
        <Box
          sx={{
            display: formData.AltaOtro ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Altas Otros
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
            <EditableTableOtro onDataChange={handleOtroAltaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box
          sx={{
            display: formData.BajaOtro ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Bajas Otros
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
            <EditableTableOtro onDataChange={handleOtroBajaTableDataChange} />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box
          sx={{
            display: formData.CambioOtro ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              display: "flex",
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mt: 0,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
          >
            Cambios Otros
          </Typography>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 0,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Favor de llenar ambas tablas en caso de traslado(cambios)*
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
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Altas
            </Typography>
            <EditableTableOtro
              onDataChange={handleOtroCambioAltaTableDataChange}
            />
            <Divider
              sx={{
                display: "flex",
                borderBottomWidth: "1px",
                borderColor: "grey",
                ml: 40,
                mr: 40,
                mt: 1,
                mb: 1,
              }}
            />
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mt: 2, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
            >
              Bajas
            </Typography>
            <EditableTableOtro
              onDataChange={handleOtroCambioBajaTableDataChange}
            />
          </Box>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
      </Box>
      {/* JUSTIFICACION */}
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
          Justificación
        </Typography>
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mb: 1,
          }}
        />
        <FormLabel
          component="legend"
          sx={{
            mx: "auto",
            mb: 0,
            mt: 1,
            display: "flex",
            justifyContent: "center",
            fontSize: "0.9rem",
            width: "calc(100% - 32px)",
          }}
        >
          Proporcionar al menos una opción de justificación *
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
          <TextField
            //required
            error={!!errors?.justifica}
            id="justifica"
            name="justifica"
            label="Referencias a la documentación"
            placeholder="De los sistemas y/o plataformas que soportan y/o justifican los cambios solicitados."
            value={formData.justifica}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            //required
            error={!!errors?.justifica3}
            id="justifica3"
            name="justifica3"
            label="Razón o motivo"
            placeholder="Por ejemplo: Cambio de lugar del Administrador/Desarrollador/Usuario."
            value={formData.justifica3}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            //required
            error={!!errors?.justifica2}
            id="justifica2"
            name="justifica2"
            label="Objetivo"
            placeholder="Del proyecto y/o servicio que requieren las modificaciones solicitadas."
            value={formData.justifica2}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
        <Box
          sx={{
            ml: 3,
            mb: 3,
            mt: 0,
            mx: "auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            display: errors.justifica ? "block" : "none",
          }}
        >
          <FormHelperText
            sx={{
              color: "red",
              textAlign: "center", // Opcional, mejora el centrado del texto
              //display: errors?.justifica ? "block" : "none",
              mb: 0,
            }}
          >
            {errors?.justifica}
          </FormHelperText>
        </Box>
      </Box>
      {/**BOX DE AUTORIZA */}
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
            error={!!errors?.nombreJefe}
            id="nombreJefe"
            name="nombreJefe"
            label="Nombre completo"
            placeholder="Gerente(a), Subgerente(a) o equivalente / Director(a) de organismo / Director(a) Local"
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
            placeholder="Escribe el puesto o cargo de quien autoriza"
            value={formData.puestoJefe}
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
          gutterBottom
          color="#9F2241"
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 0 }}
        >
          Términos y condiciones del servicio
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 2,
              width: "calc(100% - 32px)",
              ml: 20,
              mr: 0,
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
              gutterBottom
              color="#9F2241"
              sx={{ mt: 2, width: "calc(100% - 32px)", ml: 0, mr: 0 }}
            >
              1) El formato deberá estar debidamente llenado y contener toda la
              información requerida facilitando la aplicación expedita de las
              configuraciones solicitadas. Es responsabilidad del solicitante
              recabar la información con los Administradores de los sistemas o
              Áreas involucradas.
              <br />
              2) El solicitante deberá presentar este formato adjuntando el
              Memorando o Atenta nota y número de ticket de Mesa de ayuda
              asociado, sin los cuales no se podrá atender su solicitud. <br />
              3) El solicitante deberá proporcionar la dirección IP física y si
              utiliza, la dirección IP NAT, por cada servidor involucrado. De no
              proporcionarse la dirección IP NAT correcta, las reglas de
              cortafuegos se configurarán por defecto con la dirección IP del
              adaptador de red de los servidores y corresponderá al
              Administrador del sistema aplicar los cambios en el sistema o
              servidores para lograr establecer la comunicación.
              <br />
              4) Para el traslado de permisos de una dirección IP a otra, se
              deberá llenar la sección BAJAS con los permisos de la dirección IP
              anterior además de llenar la sección de ALTAS con los permisos que
              se requieren trasladar. Si el solicitante NO indica que se trata
              de un traslado de permisos, éste será responsable de cualquier
              acceso no autorizado que se derive de los permisos de la dirección
              IP anterior al no tramitar la baja correspondiente. <br />
              5) La solicitud para cambios en la infraestructura de seguridad
              (RFCs) será solicitada únicamente por los Administradores de cada
              sistema una vez que se apliquen los permisos de acceso en el
              propio sistema y se aperturen los accesos en los cortafuegos
              locales de los servidores involucrados. <br />
              6) Es responsabilidad de los administradores de cada servidor y/o
              Sistema llevar un control de las direcciones IP’s con acceso al
              servidor y/o sistema que administra. <br />
              7) Al firmar el solicitante se da por enterado de las políticas
              del servicio y acepta la responsabilidad de cualquier
              materialización de los riesgos derivados de las aperturas de
              comunicaciones asociadas al presente control de cambios. <br />
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
                  "He leído y acepto los términos y condiciones del servicio *",
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
            <Tooltip title="Debes aceptar los términos y condiciones">
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
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />{" "}
      {/* BOTON FLOTANTE */}
      <Box
        sx={{
          //display: "none",
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
          onClick={handleClickOpen}
        >
          <SyncIcon sx={{ mr: 1 }} />
          Actualizar Número de Ticket
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
              //console.log("Informacion Enviada")
            },
          },
        }}
      >
        <DialogTitle align="center">Actualizar número de ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puede actualizar el número de ticket para completar el llenado
            de su formato.
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
            Datos de búsqueda (se encuentra en la parte superior derecha de su
            formato).
          </FormLabel> */}

          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            id="numeroFormato"
            name="numeroFormato"
            label="Número de Formato"
            placeholder="Se encuentra en el encabezado, en la parte superior derecha."
            value={formData2.numeroFormato}
            onChange={handleNumeroFormato2}
            sx={{ background: "#FFFFFF", mt: 2 }}
            inputProps={{ maxLength: 10 }}
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
            id="noticket"
            name="noticket"
            label="Nuevo número de ticket"
            placeholder="Ingrese el número de ticket asignado"
            value={formData2.noticket}
            onChange={handleChange2}
            sx={{ background: "#FFFFFF", mt: 2 }}
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
