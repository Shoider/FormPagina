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
} from "@mui/material";
import Image from "next/image";
import EditableTableInter from "../components/EditableTableInter.jsx";
import EditableTableAdmin from "../components/EditableTableAdmin.jsx";
import EditableTableDes from "../components/EditableTableDes.jsx";
import EditableTableUsua from "../components/EditableTableUsua.jsx";
import EditableTableOtro from "../components/EditableTableOtro.jsx";
import Alerts from "../components/alerts.jsx";
import Link from 'next/link';
import axios from "axios";
import { useEffect } from "react";

// ICONOS
import SyncIcon from "@mui/icons-material/Sync";
import { NodeNextRequest } from "next/dist/server/base-http/node.js";

export default function Home() {
  const theme = useTheme();
  const [formData2, setFormData2] = useState({
    numeroFormato: "",
    funcionrol: "",
    movimientoID: "ALTAS",
    numeroRegistro: "",
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

  // HandleChange FormData2
  const handleChange2 = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO/* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO/* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
          if (!row.id || !row.IPO || !row.IPD || !row.PUER || !row.TEMPO || !row.PRO /* agrega aquí los campos requeridos */) {
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
    event.preventDefault();
    //console.log("Datos del formulario:", formData);

    const [isValid, isValidTabla, getErrors] =
    validarCamposRequeridos(formData);
    setErrors(getErrors);
    //console.log("Errores: ", errors)

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
        message: "Información Registrada",
        severity: "success",
      });
      setOpenAlert(true);
    }
    if (!isValidTabla) {
      setAlert({
        //message: 'Por favor, complete todos los campos requeridos: ' + alertaValidacion[1],
        message:
          "Por favor, complete los registros de las tablas REGLAS/COMUNICACIONES.",
        severity: "error",
      });
      setOpenAlert(true);
      return;
    } else {
      setAlert({
        message: "Información Registrada",
        severity: "success",
      });
      setOpenAlert(true);
    }

    setBotonEstado("Cargando...");

    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v1/rfc", formData, {
        responseType: "blob",
      });

      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado("Descargar PDF");
      } else {
        //console.error("Error generating PDF");
      }
    } catch (error) {
      //console.error("Error:", error);
      setBotonEstado("Enviar"); // Vuelve a "Enviar" en caso de error
      setAlert({
        message: "Ocurrio un error interno",
        severity: "error",
      });
      console.error(error);
      setOpenAlert(true);
    }
  };
  // Llamada API Actualizar Memorando
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    //console.log("Lista formData2 en submit: ", formData2);
    setAlert({
      message: "Informacion Enviada",
      severity: "success",
    });
    setOpenAlert(true);

    setBotonEstado2("Cargando...");

    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v2/rfcActualizar", formData2, {
        responseType: "blob",
      });

      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado2("Descargar PDF");
      } else if (pdfResponse.status === 202) {
        setAlert({
          message: "No se encontro el ID de la tabla",
          severity: "warning",
        });
        setOpenAlert(true);
        setBotonEstado2("Enviar");
      } else if (pdfResponse.status === 203) {
        setAlert({
          message: "No se encontro el número de formato",
          severity: "warning",
        });
        setOpenAlert(true);
        setBotonEstado2("Enviar");
      } else {
        //console.error("Error generando PDF");
        //console.error(pdfResponse.status)
      }
    } catch (error) {
      //console.error("Error:", error);
      setBotonEstado2("Enviar"); // Vuelve a "Enviar" en caso de error
      setAlert({
        message: "Ocurrio un error interno",
        severity: "error",
      });
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

  const handleExtensionChangeE = (event) => {
    //let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Permite números, guiones y espacios

    value = value.slice(0, 20); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extei: value,
    }));
  };
  const handleExtensionChangeS = (event) => {
    //let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Permite números, guiones y espacios
    value = value.slice(0, 20); // Limita la longitud a 10 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      exts: value,
    }));
  };

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
          REGIÓN DE ORIGEN DE LA SOLICITUD
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
          Seleccione el Origen *
        </FormLabel>
        
          <Box
          sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
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
                  sx={{ ml: 2, mr: 2, justifyContent: "center" ,  width: "calc(50% - 32px)"}}
                  //labelPlacement = "bottom"
                />
                <FormControlLabel
                  value="regional"
                  control={<Radio />}
                  label="Oficinas regionales u organismos de cuenca"
                  sx={{ ml: 2, mr: 2, justifyContent: "center" ,  width: "calc(50% - 32px)"}}
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
          INFORMACIÓN DEL SOLICITANTE
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
            label="Nombre Completo"
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
            onChange={handleExtensionChangeS}
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
          INFORMACIÓN DEL ENLACE INFORMÁTICO
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
            label="Nombre Completo"
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
            onChange={handleExtensionChangeE}
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

          <TextField
            required
            error={!!errors?.memo}
            id="memo"
            name="memo"
            label="Memorando / Atenta Nota"
            placeholder="Ingrese su memorando / atenta nota"
            value={formData.memo}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.descbreve}
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
            label="Solicitud"
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
            Tipo de Cambio *
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
            <TextField
              disabled={!formData.otro}
              required={formData.otro}
              id="desotro"
              name="desotro"
              label="Otro"
              placeholder="Describa Brevemente"
              value={formData.desotro}
              onChange={handleChange}
              sx={{ background: "#FFFFFF", mb: 3 }}
              inputProps={{ maxLength: 32 }}
            />
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
              label="Descripción Detallada"
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
          REGLAS / COMUNICACIONES
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          INTERSISTEMAS
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
            Tipo de Movimiento
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>

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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
          REGLAS / COMUNICACIONES
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          ADMINISTRADOR
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
          REGLAS / COMUNICACIONES
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          DESARROLLADOR
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
          REGLAS / COMUNICACIONES
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mt: 0, width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 3 }}
        >
          USUARIO
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
          REGLAS / COMUNICACIONES
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            GUARDE LOS REGISTROS ANTES DE CONTINUAR.
          </FormLabel>
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
            En caso de proporcionar dirección NAT verificar que sea la correcta.
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
          JUSTIFICACIÓN
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
          * Proporcionar al menos una opción de justificación.
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
            label="Razón ó Motivo"
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
            mx: "auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormHelperText
            sx={{
              color: "red",
              textAlign: "center", // Opcional, mejora el centrado del texto
              //display: errors?.justifica ? "block" : "none",
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
            label="Nombre de Gerente ó Director Local"
            placeholder="Escribe el nombre completo del gerente o director local"
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
            label="Puesto ó Cargo de Quien Autoriza"
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
              
              •	El formato deberá estar debidamente llenado y contener toda la información requerida 
              facilitando la aplicación expedita de las configuraciones solicitadas. Es responsabilidad del 
              solicitante recabar la información con los Administradores de los sistemas o Áreas involucradas.<br />
              
              •	El solicitante deberá presentar este formato adjuntando el Memorando o Atenta nota y número de
               ticket de Mesa de ayuda asociado, sin los cuales no se podrá atender su solicitud. <br />
              
              •	El solicitante deberá proporcionar la dirección IP física y si utiliza, la dirección IP NAT, 
              por cada servidor involucrado. De no proporcionarse la dirección IP NAT correcta, las reglas de 
              cortafuegos se configurarán por defecto con la dirección IP del adaptador de red de los servidores 
              y corresponderá al Administrador del sistema aplicar los cambios en el sistema o servidores para lograr 
              establecer la comunicación.<br />
              
              •	Para el traslado de permisos de una dirección IP a otra, se deberá llenar la sección BAJAS 
              con los permisos de la dirección IP anterior además de llenar la sección de ALTAS con los permisos que
               se requieren trasladar. Si el solicitante NO indica que se trata de un traslado de permisos, éste será 
               responsable de cualquier acceso no autorizado que se derive de los permisos de la dirección IP anterior 
               al no tramitar la baja correspondiente. <br />

              •	La solicitud para cambios en la infraestructura de seguridad (RFCs) será solicitada únicamente 
              por los Administradores de cada sistema una vez que se apliquen los permisos de acceso en el propio 
              sistema y se aperturen los accesos en los cortafuegos locales de los servidores involucrados. <br />
              
              •	Es responsabilidad de los administradores de cada servidor y/o Sistema llevar un control de las 
              direcciones IP’s con acceso al servidor y/o sistema que administra. <br />
             
              •	Al firmar el solicitante se da por enterado de las políticas del servicio y acepta la responsabilidad
               de cualquier materialización de los riesgos derivados de las aperturas de comunicaciones asociadas 
               al presente control de cambios. <br />
               
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
              download: "RegistroRFC.pdf",
            })}
          >
            {botonEstado}
          </Button>
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
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />{" "}

      {/* BOTON FLOTANTE */}
      <Box
        sx={{
          display: "none",
          position: "fixed",
          bottom: 24,
          right: 24,
          "& > :not(style)": { m: 1 },
        }}
      >
        <Fab variant="extended" color="success" onClick={handleClickOpen}>
          <SyncIcon sx={{ mr: 1 }} />
          Actualizar Función o Rol
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
        <DialogTitle>Actualizar Función o Rol de Origen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puede actualizar la función o rol de origen de su
            Regla/Comunicación para completar el llenado de su formato.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            * Únicamente es para tipo de Movimiento Intersistemas.
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
            Datos de búsqueda (estos los podrá encontrar en su formato).
          </FormLabel>

          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            id="numeroFormato"
            name="numeroFormato"
            label="Número de Formato"
            placeholder="Se encuentra en el encabezado, en la parte superior derecha. "
            value={formData2.numeroFormato}
            onChange={handleChange2}
            sx={{ background: "#FFFFFF", mt: 3 }}
            inputProps={{ maxLength: 64 }}
            fullWidth
          />
          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            select
            id="movimientoID"
            name="movimientoID"
            label="Nombre de la Tabla"
            placeholder="Ingrese el"
            defaultValue="ALTAS"
            onChange={handleChangeMovimiento}
            sx={{ background: "#FFFFFF", mt: 3 }}
            inputProps={{ maxLength: 64 }}
            fullWidth
          >
            {Movimientoid.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            //error={!!errors?.nombreAutoriza}
            id="numeroRegistro"
            name="numeroRegistro"
            label="N° de Registro"
            placeholder="Ingrese número de fila (no tome en cuenta encabezado)"
            value={formData2.numeroRegistro}
            onChange={handleChange2}
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
            id="funcionrol"
            name="funcionrol"
            label="Función o Rol"
            placeholder="Ingrese la función o rol de origen"
            value={formData2.funcionrol}
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
              download: "RegistroRFC.pdf",
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
