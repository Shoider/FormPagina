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
import Link from 'next/link';
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
  const [formData2, setFormData2] = useState({
    numeroFormato: "",
    memorando: "",
  });

  const [formData, setFormData] = useState({
    unidadAdministrativa: "",
    areaAdscripcion: "",
    subgerencia: "",
    //memorando: "",

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
    versionSO:"",
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

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      registrosWeb: webTableData,
      registrosRemoto: remotoTableData,
    }));
  }, [webTableData, remotoTableData]);

  useEffect(() => {
    if (formData.solicitante === "CONAGUA" && formData.subgerencia==="Subgerencia de Sistemas") {
      setFormData((prev) => ({
        ...prev,
        nombreInterno: "",
        puestoInterno: "",
        correoInterno: "",
        telefonoInterno: "",

        nombreExterno: "null",
        correoExterno: "null",
        empresaExterno: "null",
        equipoExterno: "null",

        numeroEmpleadoResponsable: "123456",
        puestoResponsable: "null",
      }));
    } else if (formData.solicitante === "CONAGUA" && formData.subgerencia!=="Subgerencia de Sistemas") {
      setFormData((prev) => ({
        ...prev,
        nombreInterno: "",
        puestoInterno: "",
        correoInterno: "",
        telefonoInterno: "",

        nombreExterno: "null",
        correoExterno: "null",
        empresaExterno: "null",
        equipoExterno: "null",

        numeroEmpleadoResponsable: "123456",
        nombreResponsable: "null",
        puestoResponsable: "null",
        unidadAdministrativaResponsable: "null",
        telefonoResponsable: "null",
      }));
    } else if (formData.solicitante === "EXTERNO" && formData.subgerencia==="Subgerencia de Sistemas") {
      setFormData((prev) => ({
        ...prev,
        nombreInterno: "null",
        puestoInterno: "null",
        correoInterno: "null",
        telefonoInterno: "null",

        nombreExterno: "",
        correoExterno: "",
        empresaExterno: "",
        equipoExterno: "",

        numeroEmpleadoResponsable: "",
        puestoResponsable: "",

      })); } else if (formData.solicitante === "EXTERNO" && formData.subgerencia!=="Subgerencia de Sistemas") {
      setFormData((prev) => ({
        ...prev,
        nombreInterno: "null",
        puestoInterno: "null",
        correoInterno: "null",
        telefonoInterno: "null",

        nombreExterno: "",
        correoExterno: "",
        empresaExterno: "",
        equipoExterno: "",

        numeroEmpleadoResponsable: "",
        nombreResponsable: "",
        puestoResponsable: "",
        unidadAdministrativaResponsable: "",
        telefonoResponsable: "",
        
    }));
    } else {
      setFormData((prev) => ({
        ...prev,
      }));
    }
  } ,[formData.solicitante, formData.subgerencia]);
  useEffect(()=>  {
    if (formData.subgerencia === "Subgerencia de Sistemas"){
      setFormData((prev) =>({
        ...prev,
        nombreAutoriza:"null",
        puestoAutoriza:"null",
        nombreResponsable:formData.nombreEnlace,
        telefonoResponsable:formData.telefonoEnlace,
        unidadAdministrativaResponsable:formData.areaAdscripcion
      }));
    }
    if (formData.subgerencia !== "Subgerencia de Sistemas"){
      setFormData((prev) =>({
        ...prev,
        nombreAutoriza:"",
        puestoAutoriza:""
      }));
    }    
  }, [formData.subgerencia, formData.nombreEnlace, formData.telefonoEnlace, formData.areaAdscripcion]);

 

  // Manejadores de cambios
  const handleWebTableDataChange = (data) => {
    setWebTableData(data);
  };
  const handleRemotoTableDataChange = (data) => {
    setRemotoTableData(data);
  };

  // Generar PDF
  const [pdfUrl, setPdfUrl] = useState(null);

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
  };

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    //No abrir el modal si ya está en modo descarga
    if (botonEstado === "Descargar PDF") return;
    const [isValid, isValidTabla, isValidTelefono, isValidJustificacion, getErrors] =
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
        message: "Por favor, completa o elimina el registro de la(s) tabla(s).",
        severity: "warning",
      });
    } else if (!isValidTelefono) {
      setAlert({
        message: "Teléfono de enlace informático inválido.",
        severity: "warning",
      });
    } else if (!isValidJustificacion) {
      setAlert({
        message: "Justificación de al menos 50 caracteres.",
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
    let isValidTabla = true;
    let isValidTelefono = true;
    let isValidJustificacion =true;

    const usua = Data.cuentaUsuario;
    const web = Data.accesoWeb;
    const remoto = Data.accesoRemoto;

    // Verifica si al menos uno de los campos este lleno
    if (!usua && !web && !remoto) {
      // Si ninguno está lleno, marca los tres como errores y el formulario como inválido
      errores.seleccion =
        "Al menos uno de los campos de justificación es requerido";
      isValid = false;
    }

    if (Data.telefonoEnlace.length < 7){
      isValidTelefono =false;
    }

    if (Data.justificacion.length < 49){
      isValidJustificacion =false;
    }

    if(Data.subgerencia == ""){
      Data.subgerencia = "~"
    }
    
 
    for (const key in Data) {
      if (Data.hasOwnProperty(key) && !Data[key]) {
        // Excluir movimiento si cuentaUsuario es false
        if (key === "movimiento" && !formData.cuentaUsuario) {
          continue;
        }
        if (
          key !== "cuentaUsuario" &&
          key !== "accesoWeb" &&
          key !== "accesoRemoto" &&
          key !== "equipoExterno"
        ) {
          errores[key] = "Este campo es requerido";
          isValid = false;
        } else if (key === "cuentaUsuario") {
          if (formData.cuentaUsuario === true && formData.movimiento === "") {
            errores[key] = "Este campo es requerido";
            isValid = false;
          }
        }
      }
    }

    ///VALIDADOR DE QUE GUARDA RESGITROS EN WEB
    if (Data.accesoWeb) {
      if (!Array.isArray(Data.registrosWeb) || Data.registrosWeb.length === 0) {
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosWeb.forEach((row) => {
          if (!row.movimiento || !row.nombreSistema || !row.url || !row.puertosServicios) {
            isValidTabla = false;
          }
        });
      }
    }

    ///VALIDADOR DE QUE GUARDA RESGITROS EN  REMOTO
    if (Data.accesoRemoto) {
      if (
        !Array.isArray(Data.registrosRemoto) ||
        Data.registrosRemoto.length === 0
      ) {
        isValidTabla = false;
      } else {
        // Validar campos requeridos de cada registro
        Data.registrosRemoto.forEach((row) => {
          if (!row.movimiento || !row.nomenclatura || !row.nombreSistema ||!row.direccion ||!row.sistemaOperativo) {
            isValidTabla = false;
          }
        });
      }
    }
    console.log(errores);
    return [isValid, isValidTabla,isValidTelefono, isValidJustificacion, errores];
  };

  // Llamada API
  const handleSubmit = async (event) => {
    handleCloseModal();
    event.preventDefault();
    console.log("Lista formData en submit: ", formData);

    setBotonEstado("Cargando...");
    setAlert({
      message: "Informacion registrada",
      severity: "success",
    });
    setOpenAlert(true);

    try {
      const pdfResponse = await axios.post("/api/v2/vpn", formData, {
        responseType: "blob",
      });

      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado("Descargar PDF");
        setAlert({
          message: "Ya puede descargar su PDF",
          severity: "success",
        });
      } else if (pdfResponse.status === 206) {
        setAlert({
          message: "Teléfono de enlace/contacto inválido",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      }else if (pdfResponse.status === 205) {
        setAlert({
          message: "Correo institucional inválido",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 207) {
        setAlert({
          message: "Correo electrónico inválido",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 208) {
        setAlert({
          message: "Teléfono de usuario inválido",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 209) {
        setAlert({
          message: "Teléfono de usuario responsable inválido",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 210) {
        setAlert({
          message: "b) Verifica 'URL/IP del Equipo'",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 211) {
        setAlert({
          message: "b) Verifica 'Nombre Sistema/Servicio'",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 220) {
        setAlert({
          message: "c) Verifica 'Nomenclatura'. Min: 8 Caracteres",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 221) {
        setAlert({
          message: "c) Verifica 'Nombre'. Min: 11 Caracteres",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 222) {
        setAlert({
          message: "c) Verifica 'Dirección IP'",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else if (pdfResponse.status === 230) {
        setAlert({
          message: "Número de empleado inválido",
          severity: "warning"
        });
        setBotonEstado("Enviar");
      } else {
        setAlert({
          message: "Error desconocido",
          severity: "error",
        });
        setBotonEstado("Enviar");
        //console.error("Error interno");
        //console.error(pdfResponse.status);
      }
      setOpenAlert(true);
    } catch (error) {
      console.error("Error:", error);
      setBotonEstado("Enviar"); // Vuelve a "Enviar" en caso de error
      setAlert({
        message: "Ocurrio un error interno",
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

  // Llamada API Actualizar Memorando
  const handleSubmit2 = async (event) => {
    event.preventDefault();

    setAlert({
      message: "Informacion enviada",
      severity: "success",
    });
    setOpenAlert(true);

    setBotonEstado2("Cargando...");

    try {
      const pdfResponse = await axios.post("/api/v2/vpnActualizar", formData2, {
        responseType: "blob",
      });

      if (pdfResponse.status === 200) {
        setAlert({
          message: "Ya puede descargar su PDF",
          severity: "success",
        });
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado2("Descargar PDF");
      } else if (pdfResponse.status === 203) {
        setAlert({
          message: "No se encontro el número de formato",
          severity: "warning",
        });
        setBotonEstado2("Enviar");
      } else {
        setAlert({
          message: "Error desconocido",
          severity: "error",
        });
        setBotonEstado2("Enviar");
        //console.error("Error generando PDF");
        //console.error(pdfResponse.status);
      }
      setOpenAlert(true);
    } catch (error) {
      //console.error("Error:", error);
      setBotonEstado2("Enviar");
      setAlert({
        message: "Ocurrio un error interno",
        severity: "error",
      });
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
      areaAdscripcion:"",
      subgerencia:"",
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
      subgerencia:"",
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
          Datos de Identificación del Área Solicitante
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
                //error={!!errors?.unidadAdministrativa}
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
                placeholder="Escriba o Seleccione la Subgerencia o Subdirección"
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
                if(filteredSubgerencia.length === 0){
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
          Enlace Informático o Contacto Responsable del Área de Adscripción
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
            label="Nombre Completo"
            placeholder="Escriba el Nombre Completo del Enlace Informático o Contacto Responsable"
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
            label="Número de Teléfono y/o Extensión"
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
          Datos de Identificación del Usuario Solicitante
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
              Tipo de Solicitante *
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
            Datos del Usuario Solicitante CONAGUA
          </Typography>

          <TextField
            required
            error={!!errors?.nombreInterno}
            id="nombreInterno"
            name="nombreInterno"
            label="Nombre Completo"
            placeholder="Escriba el Nombre Completo del Usuario"
            value={formData.nombreInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256, mt: 2 }}
          />
          <TextField
            required
            error={!!errors?.puestoInterno}
            id="puestoInterno"
            name="puestoInterno"
            label="Puesto o Cargo"
            placeholder="Escriba el Puesto o Cargo del Usuario"
            value={formData.puestoInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
            
          />
          <TextField
            required
            error={!!errors?.correoInterno}
            id="correoInterno"
            name="correoInterno"
            label="Correo Institucional"
            placeholder="usuario@conagua.gob.mx"
            value={formData.correoInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
            
          />
          <TextField
            required
            error={!!errors?.telefonoInterno}
            id="telefonoInterno"
            name="telefonoInterno"
            label="Número de Teléfono y/o Extensión"
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
            Datos del Usuario Solicitante Externo
          </Typography>

          <TextField
            required
            error={!!errors?.nombreExterno}
            id="nombreExterno"
            name="nombreExterno"
            label="Nombre Completo"
            placeholder="Escriba el Nombre Completo del Usuario"
            value={formData.nombreExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256, mt: 2 }}
          />
          <TextField
            required
            error={!!errors?.correoExterno}
            id="correoExterno"
            name="correoExterno"
            label="Correo Electrónico"
            placeholder="Escriba el Correo Electrónico del Usuario"
            value={formData.correoExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.empresaExterno}
            id="empresaExterno"
            name="empresaExterno"
            label="Nombre Completo de la Empresa"
            placeholder="Escriba el Nombre Completo de la Empresa"
            value={formData.empresaExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <Box
           display={formData.subgerencia === "Subgerencia de Sistemas" ? "block" : "none"}
          >
          <TextField
            //error={!!errors?.equipoExterno}
            id="equipoExterno"
            name="equipoExterno"
            label="Equipo de Desarrollo"
            placeholder="Llenar Solo por Personal de la Subgerencia de Sistemas de la GTIC"
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
            Datos de la Persona Responsable en la CONAGUA para el Solicitante
            Externo
          </Typography>

          <TextField
            required
            error={!!errors?.numeroEmpleadoResponsable}
            id="numeroEmpleadoResponsable"
            name="numeroEmpleadoResponsable"
            label="Número de Empleado"
            placeholder="Escriba el Número de Empleado del Responsable"
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
            label="Nombre Completo"
            placeholder="Escriba el Nombre Completo del Responable"
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
            label="Puesto o Cargo"
            placeholder="Escriba el Puesto o Cargo del Responsable"
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
                placeholder="Seleccione la área de Adscripción del Responsable"
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
            label="Número de Teléfono y/o Extension"
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
          Servicios Solicitados
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
            Datos del Equipo de Origen
          </Typography>

          <TextField
            required
            error={!!errors?.marca}
            id="marca"
            name="marca"
            label="Marca"
            placeholder="Escriba la Marca del Equipo"
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
            placeholder="Escriba el Modelo del Equipo"
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
            placeholder="Escriba el No. de Serie del Equipo"
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
              Tipo de Equipo *
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
              Sistema Operativo *
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
            </Box>
            <TextField
            required
            error={!!errors?.versionSO}
            id="versionSO"
            name="versionSO"
            label="Versión del Sistema Operativo"
            placeholder="Escriba la Versión del Sistema Operativo"
            value={formData.versionSO}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
            />
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 2,
                justifyContent: "center",
                color: "red",
                display: errors?.sistemaOperativo ? "block" : "none",
              }}
            >
              {errors?.sistemaOperativo}
            </FormHelperText>
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
              Tipo de Servicio
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
            { name: "cuentaUsuario", label: "Cuenta de Usuario" },
            { name: "accesoWeb", label: "Acceso a Sitios Web o Equipo" },
            { name: "accesoRemoto", label: "Acceso a Escritorio Remoto" },
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
                      formData.cuentaUsuario &&
                      (item.name === "accesoWeb" || item.name === "accesoRemoto") ||
                      (formData.accesoRemoto || formData.accesoWeb) &&
                      (item.name === "cuentaUsuario")
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
              a) Cuenta de Usuario
            </FormLabel>
            <RadioGroup
              row
              aria-label="Movimiento"
              name="movimiento"
              value={formData.movimiento}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, mb:2, justifyContent: "center" }}
            >
              <FormControlLabel
                value="ALTA"
                control={<Radio />}
                label="Alta Usuario"
              />
              <FormControlLabel
                value="BAJA"
                control={<Radio />}
                label="Baja Usuario"
              />
            </RadioGroup>
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 0,
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
          b) Acceso a Sitios Web o Equipo
        </Typography>

          <EditableTableWeb onDataChange={handleWebTableDataChange}/>

          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            * Guardar registros antes de enviar.
          </FormLabel>
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
          c) Acceso a Escritorio Remoto
        </Typography>

          <EditableTableRemoto onDataChange={handleRemotoTableDataChange} />

          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 1,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            Nota: Ejemplo de nomeclatura: SGA-001. Ejemplo de nombre:
            CE0010DC01.
          </FormLabel>
          <FormLabel
            component="legend"
            sx={{
              mx: "auto",
              mb: 3,
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
              width: "calc(100% - 32px)",
            }}
          >
            * Guardar registros antes de enviar.
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
          Justificación de la Necesidad del Servicio
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
            placeholder="Justifique la Necesidad del Servicio (Min.50 caracteres)"
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
        display={formData.subgerencia !== "Subgerencia de Sistemas" ? "block" : "none"}

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
            error={!!errors?.nombreAutoriza}
            id="nombreAutoriza"
            name="nombreAutoriza"
            label="Nombre Completo"
            placeholder="Gerente(a), Subgerente(a) o Equivalente / Director(a) de organismo / Director(a) Local"
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
            label="Puesto o Cargo"
            placeholder="Escriba el Puesto o Cargo de Quien Autoriza los Servicios"
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
          Términos y Condiciones del Uso del Servicio
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
          <Box sx={{ ml: 3, mr: 3 }}>
            <Typography
              variant="subtitle2"
              align="justify"
              color="#9f2241"
              gutterBottom
              sx={{ mt: 0, width: "calc(100% - 32px)", ml: 0, mr: 4 }}
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
              ml: 10,
              mb: 3,
              //mx: "auto"
            }}
          >
            {[
              {
                name: "politicasaceptadas",
                label: "Acepto términos y condiciones",
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
              download: "RegistroVPNMayo.pdf",
            })}
          >
            {botonEstado}
          </Button>
          {/**REVISAR QUE EL MODAL NO SE VUELVA A ABRIR CUANDO EL BOTÓN YA ESTÁ EN DESCARGANDO */}
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

      {/* BOTON FLOTANTE */}
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
          Añadir Memorando
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
              console.log("Informacion Enviada");
            },
          },
        }}
      >
        <DialogTitle>Añadir Memorando</DialogTitle>
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
            label="Número de Formato"
            placeholder="Se encuentra en el encabezado, en la parte superior derecha. "
            value={formData2.numeroFormato}
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
            id="memorando"
            name="memorando"
            label="Número de Memorando"
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
              download: "RegistroVPNMayo.pdf",
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
