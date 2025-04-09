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
  Divider,
  FormGroup,
  FormHelperText,
  Checkbox
} from "@mui/material";
import Image from "next/image";

import axios from 'axios';

import Alerts from "../components/alerts.jsx";

export default function Home() {
 
  const theme = useTheme();
    // Tipo de CATEGORIA
  
  const [formData, setFormData] = useState({
    fechasoli: "",
    uaUsuario: "",
    areaUsuario: "",
    nombreUsuario: "",
    puestoUsuario: "",
    ipUsuario: "",
    correoUsuario: "",
    direccion: "",
    teleUsuario: "",
    extUsuario: "",
    nombreJefe: "",
    puestoJefe: "",
    descarga: false,
    comercio: false,
    redes: false,
    foros: false,
    whats: false,
    videos:false,
    dropbox:false,
    skype:false,
    wetransfer:false,
    team:false,
    otra:false,
    onedrive:false

  });
  // CATEGORIAS
  const saveCategorias = async (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    
  }
 
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
  const [botonEstado, setBotonEstado] = useState('Enviar');

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

    for (const key in Data) {
      if (Data.hasOwnProperty(key) && !Data[key]) {
        //var campo = traducirCampos(key);          // Traduce el error a la alerta
        errores[key] = 'Este campo es requerido'; // Texto a mostrar en cada campo faltante
        isValid = false;                          // Al menos un campo está vacío
      }
    }
    return [isValid, errores];                     // Todos los campos están llenos
  };

  // Llamada API

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("datos de formdata:",formData)

    const [isValid, getErrors] = validarCamposRequeridos(formData);
    setErrors(getErrors);

    if (!isValid) {
      setAlert({
        //message: 'Por favor, complete todos los campos requeridos: ' + alertaValidacion[1],
        message: 'Por favor, complete todos los campos requeridos.',
        severity: "error",
      });
      setOpenAlert(true);
      return;
    } else {
      setAlert({
        message: 'Informacion Registrada',
        severity: 'success',
      });
      setOpenAlert(true);
    }

    setBotonEstado('Cargando...');
  
    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v1/inter", formData, {
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
  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extension: value,
    }));
  };

  return (
    <Container disableGutters maxWidth="xxl" sx={{background: "#FFFFFF"}}>
      
      {/* Banner Responsive */}
      <Box
        sx={{
          width: '100vw', // Ocupa todo el ancho de la ventana gráfica
          overflow: 'hidden',
          height: '430px', // Ajusta la altura según sea necesario
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
          Formulario Para Solicitud De Ampliación del Servicio de Internet
        </Typography>
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
            padding: "2"
          },
        }}
      > 
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          SOLICITUD
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 3, mb:1 }} />
          
          <TextField
            required
            error={!!errors?.fechasoli}
            id="fechasoli"
            name="fechasoli"
            label="Fecha de Solicitud"
            value={formData.fechasoli}
            onChange={handleChange}
            sx={{background: "#FFFFFF",mb:3}}
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
          DATOS DEL USUARIO (A)
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
            error={!!errors?.nombreUsuario}
            //helperText={"Escriba su nombre"}
            id="nombreUsuario"
            name="nombreUsuario"
            label="Escriba su nombre"
            value={formData.nombreUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          /> 
          <TextField
            required
            error={!!errors?.puestoUsuario}
            id="puestoUsuario"
            name="puestoUsuario"
            label="Puesto ó Cargo"
            value={formData.puestoUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.areaUsuario}
            id="areaUsuario"
            name="areaUsuario"
            label="Área"
            value={formData.areaUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.uaUsuario}
            id="uaUsuario"
            name="uaUsuario"
            label="Unidad Administrativa"
            value={formData.uaUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.ipUsuario}
            id="ipUsuario"
            name="ipUsuario"
            label="IP del Equipo Asignado"
            value={formData.ipUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.correoUsuario}
            id="correoUsuario"
            name="correoUsuario"
            label="Correo"
            type="email"
            value={formData.correoUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          
          <TextField
            required
            error={!!errors?.direccion}
            id="direccion"
            name="direccion"
            label="Piso y Ala"
            value={formData.direccion}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.teleUsuario}
            id="teleUsuario"
            name="teleUsuario"
            label="Teléfono"
            value={formData.teleUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.extUsuario}
            id="extUsuario"
            name="extUsuario"
            label="Extensión"
            value={formData.extUsuario}
            onChange={handleChange}
            sx={{background: "#FFFFFF",mb:3}}
            inputProps={{ maxLength: 4 }}
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
            padding: "2"
          },
        }}
      > 
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          AUTORIZA
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
            error={!!errors?.nombreJefe}
            id="nombreJefe"
            name="nombreJefe"
            label="Funcionario con Cargo de Subgerente, Homologo ó Superior"
            value={formData.nombreJefe}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puestoJefe}
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

      {/* Categorias de Navegacion */}
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
          CATEGORIAS DE NAVEGACIÓN
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 2, mb:1 }} />
          
          {/* Checkbox */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2, mb: 0 }}>
                      <FormLabel
                        component="legend"
                        sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
                      >
                        Perfiles avanzados de navegación.                        
                      </FormLabel>
                      <FormLabel
                        component="legend"
                        sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '0.8rem' }}
                      >
                        Seleccione las opciones de navegación requeridas:                        
                      </FormLabel>
                      </Box>
                      <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
                               
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', ml: 2, mb: 0 }}>
            {[
                  { name: "descarga", label: "Descarga de software" },
                  { name: "foros", label: "Foros y Blogs"},
                  { name: "comercio", label: "Comercio Electrónico" },
                  { name: "redes", label: "Redes Sociales" },
                  { name: "videos", label: "Videos-YouTube (Streaming)" },
                  { name: "whats", label: "WhatsApp Web" },
                  { name: "dropbox", label: "DropBox" },
                  { name: "onedrive", label: "OneDrive" },
                  { name: "skype", label: "Skype" },
                  { name: "wetransfer", label: "Wetransfer" },
                  { name: "team", label: "TeamViewer" },
                  { name: "otra", label: "Otra" }
                ].map((item, index) => (
            <Box key={index} sx={{ width: '30%', minWidth: '100px' }}>
            <FormControlLabel
                control={
                  <Checkbox
                  checked={formData[item.name]}
                  onChange={saveCategorias}
                  name={item.name}
                  color="primary"
                />        }
                        label={item.label}
                />
            </Box>  ))}
            </Box>
          
          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mb:3 }} />

          <FormLabel
                      component="legend"
                      sx={{ mx: "auto", mt: 2,mb:3, display: 'flex', justifyContent: 'center', fontSize: '0.8rem', width: "calc(100% - 32px)" }}
                    > 
                    Considera estrictamente las necesarias para el desempeño de sus funciones;
                    misma que deberán ser justificadas plenamente y autorizadas por el Director o Gerente del área de adscripción.
           </FormLabel> 
        
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