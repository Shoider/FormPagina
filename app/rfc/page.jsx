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
  FormLabel,
  Divider,
  FormGroup,
  Checkbox
} from "@mui/material";
import Image from "next/image"; 
import EditableTableInter from "../components/EditableTableInter.jsx";
import EditableTableAdmin from "../components/EditableTableAdmin.jsx";
import EditableTableDes from "../components/EditableTableDes.jsx";
import EditableTableUsua from "../components/EditableTableUsua.jsx";
import EditableTableOtro from "../components/EditableTableOtro.jsx";
import Alerts from "../components/alerts.jsx";
import axios from 'axios';
import { useEffect } from "react";

export default function Home() {
  const theme = useTheme();

  // Checkbox
  // Tipo de Movimiento
  const [adminIsTrue, setAdminIsTrue] = useState(false)
  const [desIsTrue, setDesIsTrue] = useState(false)
  const [interIsTrue, setInterIsTrue] = useState(false)
  const [usuaIsTrue, setUsuaIsTrue] = useState(false)
  const [otroIsTrue, setOtroIsTrue] = useState(false)     //Para opcion OTRO

  // Intersistemas
  const [altaInterIsTrue, setAltaInterIsTrue] = useState(false)
  const [cambioInterIsTrue, setCambioInterIsTrue] = useState(false)
  const [bajaInterIsTrue, setBajaInterIsTrue] = useState(false)

  // Administrador
  const [altaAdminIsTrue, setAltaAdminIsTrue] = useState(false)
  const [cambioAdminIsTrue, setCambioAdminIsTrue] = useState(false)
  const [bajaAdminIsTrue, setBajaAdminIsTrue] = useState(false)

  // Desarrollador
  const [altaDesIsTrue, setAltaDesIsTrue] = useState(false)
  const [cambioDesIsTrue, setCambioDesIsTrue] = useState(false)
  const [bajaDesIsTrue, setBajaDesIsTrue] = useState(false)

  // Usuario
  const [altaUsuaIsTrue, setAltaUsuaIsTrue] = useState(false)
  const [cambioUsuaIsTrue, setCambioUsuaIsTrue] = useState(false)
  const [bajaUsuaIsTrue, setBajaUsuaIsTrue] = useState(false)

  // Otro
  const [altaOtroIsTrue, setAltaOtroIsTrue] = useState(false)
  const [cambioOtroIsTrue, setCambioOtroIsTrue] = useState(false)
  const [bajaOtroIsTrue, setBajaOtroIsTrue] = useState(false)

  // Tablas
  //const [tableData, setTableData] = useState([]);

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

  // Estados para el formulario
  const [formData, setFormData] = useState({
    desotro: "",
    tempo: "",
    memo: "",
    descbreve: "",
    nomei: "",
    extei: "",
    noms: "",
    exts: "",
    puestos: "",
    areas: "",
    desdet: "",
    puestoei: "",
    nombreJefe: "",
    puestoJefe: "",
    justifica: "",
    justifica2: "",
    justifica3: "",

    // Estados para tipo de movimientos
    intersistemas: interIsTrue,
    administrador: adminIsTrue,
    desarrollador: desIsTrue,
    usuario: usuaIsTrue,
    otro: otroIsTrue,       //ESTE TAL VEZ PARA OTRO, Seria Otra Tabla

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
  });
  
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
      altaInterTableData, bajaInterTableData, cambioAltaInterTableData, cambioBajaInterTableData,
      altaAdminTableData, bajaAdminTableData, cambioAltaAdminTableData, cambioBajaAdminTableData,
      altaDesTableData, bajaDesTableData, cambioAltaDesTableData, cambioBajaDesTableData,
      altaUsuaTableData, bajaUsuaTableData, cambioAltaUsuaTableData, cambioBajaUsuaTableData,
      altaOtroTableData, bajaOtroTableData, cambioAltaOtroTableData, cambioBajaOtroTableData
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
  }

  // Boton
  const [botonEstado, setBotonEstado] = useState('Enviar');

  // Alertas
  const [openAlert, setOpenAlert] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    severity: "",
  });

  const validarCamposRequeridos = (Data) => {
    for (const key in Data) {
      if (Data.hasOwnProperty(key) && !Data[key]) {
        // console.log("Dato faltante en:", key);
        if (key !== "desotro" && key !== "registrosAltas" && key !== "registrosCambios" && key !== "registrosBajas"  && key !== "justifica" && key !== "justifica2" && key !== "justifica3" ) {
          console.log("Campo OBLIGATORIO no llenado:  ", key);
          return false; // Retorna false solo si el campo vacío no es opcional
        } else {
          console.log("Campo OPCIONAL no llenado: ", key);
        }
      }
    }
    console.log("Datos obligatorios completos");
    return true; // Todos los campos están llenos o los vacíos son opcionales
  };
  
  // Llamada API
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Datos de formData:", formData);      // DEBUG para ver que llego antes de enviar

    {/* DEBUG
    if (!validarCamposRequeridos(formData)) {
      setAlert({
        message: 'Por favor, complete todos los campos requeridos.',
        severity: "error",
      });
      setOpenAlert(true);
      return;
    }
    else
      setAlert({
        message: 'Informacion Registrada',
        severity: "success",
      });
      setOpenAlert(true);

    */}
    // Debug
    setAlert({
      message: 'Informacion Registrada',
      severity: "success",
    });
    setOpenAlert(true);
    // End Debug

    setBotonEstado('Cargando...');
  
    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v1/rfc", formData, {
        responseType: "blob",
    });
  
      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado('Descargar PDF');
      } else {
        console.error("Error generating PDF");
      }
    } catch (error) {
      console.error("Error:", error);
      setBotonEstado('Enviar'); // Vuelve a "Enviar" en caso de error
    }
  };

  //  VALIDADORES

  const handleExtensionChangeE = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extei: value,
    }));
  };
  const handleExtensionChangeS = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      exts: value,
    }));
  };

  // Inicio de la pagina

  return (
    <Container disableGutters maxWidth="xxl" sx={{background: "#FFFFFF"}}>
      
      {/* Banner Responsive */}
      <Box
        sx={{
          width: '100', // Ocupa todo el ancho de la ventana gráfica
          overflow: 'hidden',
          height: '350px', // Ajusta la altura según sea necesario
          [theme.breakpoints.down('md')]: {
            height: 'auto', // Ajusta la altura automáticamente en pantallas pequeñas
          },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Image
        src="/background_Conagua_header_150.jpg" // Ruta de la imagen recortable
        alt="Imagen recortable"
        width={6000}
        height={1200}
        style={{
          maxWidth: '100vw',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        sizes="(max-width: 900px) 100vw, 1920px" 
        />
      </Box>
      
      {/* Imagen fija para pantallas pequeñas */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' }, // Mostrar solo en pantallas pequeñas
        }}
      >
        <Image
          src="/mobile_background_Icono_150.jpg" // Ruta de la imagen fija
          alt="Imagen fija"
          width={1690}
          height={1312} 
          style={{
            width: '100%',
            height: 'auto',
          }}
          sizes="100vw"
        />
      </Box>

      {/* Banner Responsive Title*/}
      <Box sx={{ justifyContent: "center", mt: 0, background: "#FFFFFF", width: "100%"}}>
        <Box sx={{ justifyContent: "center", display: "flex", ml: 3}}>
        {/* Title */}
        <Typography variant="h3" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Formulario Para Solicitud De Alta, Baja ó Cambio En La Infraestructura De Seguridad De La CONAGUA
        </Typography>
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
            padding: "2"
          },
        }}
      > 
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Información Para Registro
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 3, mb:1 }} /> 

          {/* Checkbox */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2, mb: 0 }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              Tipo de Cambio *
            </FormLabel>
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
            <TextField
              disabled={!formData.otro}
              required={formData.otro}
              id="desotro"
              name="desotro"
              label="Otro"
              placeholder="Describa Brevemente"
              value={formData.desotro}
              onChange={handleChange}
              sx={{ background: '#FFFFFF', mb: 3}}
              inputProps={{ maxLength: 32 }}
            />
            
          </Box>

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mb:1 }} />

          <TextField
            required
            id="tempo"
            name="tempo"
            label="Temporalidad"
            value={formData.tempo}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="memo"
            name="memo"
            label="Memorando / Atenta Nota"
            value={formData.memo}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="descbreve"
            name="descbreve"
            label="Solicitud"
            placeholder="Descripción Breve de la Solicitud"
            value={formData.descbreve}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

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
            padding: "2"
          },
        }}
      > 
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Información del Enlace Informatico
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id="nomei"
            name="nomei"
            label="Nombre completo"
            value={formData.nomei}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="extei"
            name="extei"
            label="Teléfono / Extensión"
            value={formData.extei}
            onChange={handleExtensionChangeE}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            required
            id="puestoei"
            name="puestoei"
            label="Puesto ó Cargo"
            value={formData.puestoei}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
        
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
            padding: "2"
          },
        }}
      >

        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Información del Solicitante
        </Typography>

        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          <TextField
            required
            id="noms"
            name="noms"
            label="Nombre"
            value={formData.noms}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="exts"
            name="exts"
            label="Teléfono / Extensión"
            value={formData.exts}
            onChange={handleExtensionChangeS}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            required
            id="puestos"
            name="puestos"
            label="Puesto"
            value={formData.puestos}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="areas"
            name="areas"
            label="Área"
            value={formData.areas}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
          
        </Box>
      </Box>

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
            padding: "2"
          },
        }}
      > 
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Autoriza
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id="nombreJefe"
            name="nombreJefe"
            label="Nombre de Gerente ó Director Local"
            value={formData.nombreJefe}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="puestoJefe"
            name="puestoJefe"
            label="Puesto ó Cargo del que Autoriza"
            value={formData.puestoJefe}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb: 3}}
            inputProps={{ maxLength: 256 }}
          />
        
        </Box>
      </Box>

      {/* DESCRIPCION */}
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
            padding: "2"
          },
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Descripción
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 3, mb:1 }} />

          {/* Checkbox Intersistemas */}
          <Box sx={{ display: formData.intersistemas ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', ml: 0, mb: 1 }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              Tipo de Movimiento Intersistemas *
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
                    checked={formData.CambioInter}
                    onChange={saveComboBox}
                    name="CambioInter"
                    color="primary"
                  />
                }
                label="Cambio"
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
            </FormGroup>
          </Box>
          <Divider sx={{ display: formData.intersistemas ? 'flex' : 'none', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          {/* Checkbox Administrador */}
          <Box sx={{ display: formData.administrador ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', ml: 0, mb: 1 }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              Tipo de Movimiento Administrador *
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
                    checked={formData.CambioAdmin}
                    onChange={saveComboBox}
                    name="CambioAdmin"
                    color="primary"
                  />
                }
                label="Cambio"
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
            </FormGroup>
          </Box>
          <Divider sx={{ display: formData.administrador ? 'flex' : 'none', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          {/* Checkbox Desarrollador */}
          <Box sx={{ display: formData.desarrollador ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', ml: 0, mb: 1 }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              Tipo de Movimiento Desarrollador *
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
                    checked={formData.CambioDes}
                    onChange={saveComboBox}
                    name="CambioDes"
                    color="primary"
                  />
                }
                label="Cambio"
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
            </FormGroup>
          </Box>
          <Divider sx={{ display: formData.desarrollador ? 'flex' : 'none', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          {/* Checkbox Usuario */}
          <Box sx={{ display: formData.usuario ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', ml: 0, mb: 1 }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              Tipo de Movimiento Usuario *
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
                    checked={formData.CambioUsua}
                    onChange={saveComboBox}
                    name="CambioUsua"
                    color="primary"
                  />
                }
                label="Cambio"
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
            </FormGroup>
          </Box>
          <Divider sx={{ display: formData.usuario ? 'flex' : 'none', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          {/* Checkbox Otro */}
          <Box sx={{ display: formData.otro ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', ml: 0, mb: 1 }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              Tipo de Movimiento Otro *
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
          <Divider sx={{ display: formData.otro ? 'flex' : 'none', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />

          {/* Descripcion Detallada */}
          <TextField
            required
            id="desdet"
            name="desdet"
            label="Descripcion Detallada"
            placeholder="Descripción a detalle de las configuraciones solicitadas"
            value={formData.desc}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb:3}}
            inputProps={{ maxLength: 256 }}
          />
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
            padding: "2"
          },
          display: formData.intersistemas ? 'block' : 'none',
          minHeight: '100px',
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4, mb: 3}}>
          Registros Intersistemas
        </Typography>

        {/* Altas Tabla */}
        <Box sx={{ display: formData.AltaInter ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Altas Intersistemas
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableInter onDataChange={handleInterAltaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box sx={{ display: formData.BajaInter ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Bajas Intersistemas
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableInter onDataChange={handleInterBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box sx={{ display: formData.CambioInter ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Cambios Intersistemas
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 0, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Altas
            </Typography>
            <EditableTableInter onDataChange={handleInterCambioAltaTableDataChange} />
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Bajas
            </Typography>
            <EditableTableInter onDataChange={handleInterCambioBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
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
            padding: "2"
          },
          display: formData.administrador ? 'block' : 'none',
          minHeight: '100px',
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4, mb: 3}}>
          Registros Administrador
        </Typography>

        {/* Altas Tabla */}
        <Box sx={{ display: formData.AltaAdmin ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Altas Administrador
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableAdmin onDataChange={handleAdminAltaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box sx={{ display: formData.BajaAdmin ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Bajas Administrador
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableAdmin onDataChange={handleAdminBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box sx={{ display: formData.CambioAdmin ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Cambios Administrador
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 0, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Altas
            </Typography>
            <EditableTableAdmin onDataChange={handleAdminCambioAltaTableDataChange} />
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Bajas
            </Typography>
            <EditableTableAdmin onDataChange={handleAdminCambioBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
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
            padding: "2"
          },
          display: formData.desarrollador ? 'block' : 'none',
          minHeight: '100px',
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4, mb: 3}}>
          Registros Desarrollador
        </Typography>

        {/* Altas Tabla */}
        <Box sx={{ display: formData.AltaDes ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Altas Desarrollador
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableDes onDataChange={handleDesAltaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box sx={{ display: formData.BajaDes ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Bajas Desarrollador
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableDes onDataChange={handleDesBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box sx={{ display: formData.CambioDes ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Cambios Desarrollador
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 0, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Altas
            </Typography>
            <EditableTableDes onDataChange={handleDesCambioAltaTableDataChange} />
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Bajas
            </Typography>
            <EditableTableDes onDataChange={handleDesCambioBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
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
            padding: "2"
          },
          display: formData.usuario ? 'block' : 'none',
          minHeight: '100px',
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4, mb: 3}}>
          Registros Usuario
        </Typography>

        {/* Altas Tabla */}
        <Box sx={{ display: formData.AltaUsua ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Altas Usuario
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableUsua onDataChange={handleUsuaAltaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box sx={{ display: formData.BajaDes ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Bajas Usuario
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableUsua onDataChange={handleUsuaBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box sx={{ display: formData.CambioDes ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Cambios Usuario
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 0, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Altas
            </Typography>
            <EditableTableUsua onDataChange={handleUsuaCambioAltaTableDataChange} />
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Bajas
            </Typography>
            <EditableTableUsua onDataChange={handleUsuaCambioBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
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
            padding: "2"
          },
          display: formData.otro ? 'block' : 'none',
          minHeight: '100px',
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4, mb: 3}}>
          Registros Otros
        </Typography>

        {/* Altas Tabla */}
        <Box sx={{ display: formData.AltaOtro ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Altas Otros
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableOtro onDataChange={handleOtroAltaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Bajas Tabla */}
        <Box sx={{ display: formData.BajaOtro ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Bajas Otros
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <EditableTableOtro onDataChange={handleOtroBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Separar las IP con una coma (,). Ej: 192.168.1.1, 192.168.2.2, ...
          </FormLabel>
        </Box>
        {/* Cambios Tabla */}
        <Box sx={{ display: formData.CambioOtro ? 'block' : 'none', flexDirection: 'column', alignItems: 'center'}}>
          <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            Cambios Otros
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 0, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Altas
            </Typography>
            <EditableTableOtro onDataChange={handleOtroCambioAltaTableDataChange} />
            <Divider sx={{ display:'flex', borderBottomWidth: "1px", borderColor: "grey", ml: 50, mr: 50, mt: 3, mb: 1}} />
            <Typography variant="h6" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
              Bajas
            </Typography>
            <EditableTableOtro onDataChange={handleOtroCambioBajaTableDataChange} />
          </Box>
          <FormLabel
            component="legend"
            sx={{ mx: "auto", display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            Guardar registros antes de enviar.
          </FormLabel> 
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
          > 
            En caso de proporcionar dirección NAT verificar que sea la correcta.
          </FormLabel>  
          <FormLabel
            component="legend"
            sx={{ mx: "auto", mb: 3, mt: 2, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
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
            padding: "2"
          },
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          Justificación
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            //required
            id="justifica"
            name="justifica"
            label="Referencias"
            placeholder="Documentacion de los sistemas y/o plataformas que soportan y/o justifican los cambios solicitados"
            value={formData.justifica}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            //required
            id="justifica2"
            name="justifica2"
            label="Objetivo"
            placeholder="Del proyecto y/o servicio que requieren las modificaciones solicitadas"
            value={formData.justifica2}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            //required
            id="justifica3"
            name="justifica3"
            label="Razon / Motivo"
            placeholder="Razon ó Motivo de los accesos"
            value={formData.justifica3}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb:3}}
            inputProps={{ maxLength: 256 }}
          />
          <FormLabel
          component="legend"
          sx={{ mx: "auto", mb: 3, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
        > 
          Llenar al menos un campo
        </FormLabel> 

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
            padding: "2"
          },
        }}
      > 
        {/* SubTitle */}
        <Typography variant="h5" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          GENERAR SOLICITUD
        </Typography>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { mt: 2, width: 'calc(100% - 32px)', ml: 2, mr: 4 } }}
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
              width: 'calc(100% - 32px)',
              ml: 2,
              mr: 4,
              background: '#98989A',
              border: '1px solid gray',
            }}
            disabled={botonEstado === 'Cargando...'}
          >
            {botonEstado}
          </Button>
          {botonEstado === 'Descargar PDF' && (
            <Button
              variant="contained"
              sx={{
                mb: 3,
                ml: 2,
                mr: 4,
                width: 'calc(100% - 32px)',
                backgroundColor: theme.palette.secondary.main,
                color: '#FFFFFF',
                border: '1px solid gray',
              }}
              href={pdfUrl}
              download="registro.pdf"
            >
              Descargar PDF
            </Button>
          )}
        </Box>
      </Box>

      {/* ALERT */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Container>
  );
}