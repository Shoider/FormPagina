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
  DialogTitle

} from "@mui/material";

import Image from "next/image";
import axios from "axios";
import Alerts from "../components/alerts.jsx";
import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";

// ICONOS
import SyncIcon from '@mui/icons-material/Sync';

// TABLAS
import EditableTableWeb from "../components/EditableTableWeb.jsx";
import EditableTableRemoto from "../components/EditableTableRemoto.jsx";

export default function Home() {
  const theme = useTheme();
  const [formData2, setFormData2] = useState({
    numeroFormato: "",
    memorando: ""
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
      registrosRemoto: remotoTableData
    }));
  }, 
  [
    webTableData,
    remotoTableData
  ]);

  useEffect(() => {
    if (formData.solicitante === "CONAGUA") {
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

        numeroEmpleadoResponsable: "null",
        nombreResponsable: "null",
        puestoResponsable: "null",
        unidadAdministrativaResponsable: "null",
        telefonoResponsable: "null",
      }));
    } if (formData.solicitante === "EXTERNO") {
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
  }, [formData.solicitante]);

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

    for (const key in Data) {
      if (Data.hasOwnProperty(key) && !Data[key]) {
        // Excluir movimiento si cuentaUsuario es false
        if (key === "movimiento" && !formData.cuentaUsuario) {
          continue;
        }
        if (key !== "cuentaUsuario" && key !== "accesoWeb" && key !== "accesoRemoto" && key !== "equipoExterno") {
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
    console.log(errores)
    return [isValid, errores];
  };

  // Llamada API
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Lista formData en submit: ", formData);

    const [isValid, getErrors] = validarCamposRequeridos(formData);
    setErrors(getErrors);

    console.log("Lista getErrors en submit: ", getErrors)

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
        message: "Informacion Registrada",
        severity: "success",
      });
      setOpenAlert(true);
    }

    setBotonEstado("Cargando...");

    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v2/vpn", formData, {
        responseType: "blob",
      });

      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado("Descargar PDF");
      } else {
        console.error("Error generando PDF");
      }
    } catch (error) {
      console.error("Error:", error);
      setBotonEstado("Enviar"); // Vuelve a "Enviar" en caso de error
      setAlert({
        message: "Ocurrio un error",
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

    // Llamada API Actualizar Memorando
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    console.log("Lista formData2 en submit: ", formData2);

    //const [isValid, getErrors] = validarCamposRequeridos(formData2);
    //setErrors(getErrors);

    //console.log("Lista getErrors en submit: ", getErrors)

    setAlert({
      message: "Informacion Enviada",
      severity: "success",
    });
    setOpenAlert(true);

    setBotonEstado2("Cargando...");

    try {
      // PDF api
      const pdfResponse = await axios.post("/api/v2/vpnActualizar", formData2, {
        responseType: "blob",
      });

      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
        setBotonEstado2("Descargar PDF");
      } else if (pdfResponse.status === 203) {
        setAlert({
          message: "No se encontro el número de formato",
          severity: "warning",
        });
        setOpenAlert(true);
        setBotonEstado2("Enviar");
      } else {
        console.error("Error generando PDF");
        console.error(pdfResponse.status)
      }
    } catch (error) {
      console.error("Error:", error);
      setBotonEstado2("Enviar"); // Vuelve a "Enviar" en caso de error
      setAlert({
        message: "Ocurrio un error",
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
    setFormData(prevFormData => ({
      ...prevFormData,
      unidadAdministrativa: newValue || '' // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };
  const handleUARes = (newValue) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      unidadAdministrativaResponsable: newValue || '' // Asegura que siempre haya un valor (incluso si es string vacío)
    }));
  };

  //Numeros de telefono
  const handleTelefonoEnlaceChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 10); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      telefonoEnlace: value,
    }));
  };

  const handleTelefonoInternoChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 10); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      telefonoInterno: value,
    }));
  };

  const handleTelefonoResponsableChange = (event) => {
    let value = event.target.value.replace(/[^0-9-\s /]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 20); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      telefonoResponsable: value,
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
          DATOS DE IDENTIFICACIÓN DEL ÁREA SOLICITANTE
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
          {/*<TextField
            required
            error={!!errors?.memorando}
            id="memorando"
            name="memorando"
            label="Número de Memorando"
            placeholder="Escriba el número de memorando"
            value={formData.memorando}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />*/}
          <Autocomplete
            disablePortal
            options={unidadesAdmin}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.unidadAdministrativa}
                placeholder="Escriba ó seleccione la unidad administrativa"
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
            onInputChange={(event, newInputValue) => {
              if (event?.type === 'change') {
                handleUA(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.unidadAdministrativa || ''} // Controla el valor mostrado
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <TextField
            required
            error={!!errors?.areaAdscripcion}
            id="areaAdscripcion"
            name="areaAdscripcion"
            label="Área de Adscripción"
            placeholder="Escriba el nombre del área de adscripción"
            value={formData.areaAdscripcion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.subgerencia}
            id="subgerencia"
            name="subgerencia"
            label="Subgerencia o Subdirección"
            placeholder="Escriba el nombre de la Subgerencia o Subdirección"
            value={formData.subgerencia}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>

        <FormLabel
            component="legend"
            sx={{
              mt: 2,
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              fontSize: "0.8rem",
            }}
          >
            Si en Subgerencia es SS, indicar como: Subgerencia de Sistemas
          </FormLabel>

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
          ENLACE INFORMÁTICO O CONTACTO RESPONSABLE DEL ÁREA DE ADSCRIPCIÓN
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
            placeholder="Escriba el nombre completo del enlace informático ó contacto responsable"
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
            placeholder="Escriba el número de teléfono y/o extensión del enlace informático o responsable"
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
          DATOS DE IDENTIFICACIÓN DEL USUARIO SOLICITANTE
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
              <FormControlLabel value="CONAGUA" control={ <Radio /> } label="CONAGUA" />
              <FormControlLabel value="EXTERNO" control={ <Radio />} label="EXTERNO" />
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
            required
            error={!!errors?.nombreInterno}
            id="nombreInterno"
            name="nombreInterno"
            label="Nombre Completo"
            placeholder="Escriba el nombre completo del usuario"
            value={formData.nombreInterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256, mt:2 }}
          />
          <TextField
            required
            error={!!errors?.puestoInterno}
            id="puestoInterno"
            name="puestoInterno"
            label="Puesto ó Cargo"
            placeholder="Escriba el puesto o cargo del usuario"
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
            label="Correo Electrónico"
            placeholder="Escriba el correo electrónico del usuario"
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
            placeholder="Escriba el número de teléfono y/o extensión del usuario"
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
            Datos del usuario solicitante EXTERNO
          </Typography>
        
          <TextField
            required
            error={!!errors?.nombreExterno}
            id="nombreExterno"
            name="nombreExterno"
            label="Nombre Completo"
            placeholder="Escriba el nombre completo del usuario"
            value={formData.nombreExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256, mt:2 }}
          />
          <TextField
            required
            error={!!errors?.correoExterno}
            id="correoExterno"
            name="correoExterno"
            label="Correo Electrónico"
            placeholder="Escriba el correo electrónico del usuario"
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
            placeholder="Escriba el nombre completo de la empresa"
            value={formData.empresaExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            //error={!!errors?.equipoExterno}
            id="equipoExterno"
            name="equipoExterno"
            label="Equipo de Desarrollo"
            placeholder="Llenar solo por personal de la Subgerencia de Sistemas de la GTIC"
            value={formData.equipoExterno}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>

        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "grey",
            ml: 2,
            mr: 2,
            mb: 3,
            display: formData.solicitante === "EXTERNO" ? "block" : "none"
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
            Datos del la persona responsable en la CONAGUA para el solicitante externo
          </Typography>

          <TextField
            required
            error={!!errors?.numeroEmpleadoResponsable}
            id="numeroEmpleadoResponsable"
            name="numeroEmpleadoResponsable"
            label="Número de Empleado"
            placeholder="Escriba el número de empleado del responsable"
            value={formData.numeroEmpleadoResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.nombreResponsable}
            id="nombreResponsable"
            name="nombreResponsable"
            label="Nombre Completo"
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
            label="Puesto o Cargo"
            placeholder="Escriba el puesto o cargo del responsable"
            value={formData.puestoResponsable}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <Autocomplete
            disablePortal
            options={unidadesAdmin}
            freeSolo
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.unidadAdministrativaResponsable}
                placeholder="Escriba o seleccione la unidad administrativa del responsable"
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Unidad Administrativa"
              />
            )}
            id="unidadAdministrativaResponsable"
            name="unidadAdministrativaResponsable"
            onChange={(event, newValue) => {
              handleUARes(newValue); // Maneja selección de opciones
            }}
            onInputChange={(event, newInputValue) => {
              if (event?.type === 'change') {
                handleUARes(newInputValue); // Maneja texto escrito directamente
              }
            }}
            inputValue={formData.unidadAdministrativaResponsable || ''} // Controla el valor mostrado
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <TextField
            required
            error={!!errors?.telefonoResponsable}
            id="telefonoResponsable"
            name="telefonoResponsable"
            label="Número de Teléfono y/o Extension"
            placeholder="Escriba el número de teléfono y/o extensión del responsable"
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
          SERVICIOS SOLICITADOS
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
            sx={{ width: "calc(100% - 32px)", ml: 2, mr: 4}}
          >
            Datos del Equipo de Origen
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
            label="Serie"
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
              <FormControlLabel value="CONAGUA" control={ <Radio /> } label="CONAGUA" />
              <FormControlLabel value="Personal" control={ <Radio />} label="Personal" />
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
              <FormControlLabel value="Linux" control={ <Radio /> } label="Linux" />
              <FormControlLabel value="macOS" control={ <Radio />} label="macOS" />
              <FormControlLabel value="Windows" control={ <Radio />} label="Windows" />
            </RadioGroup>
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
          </Box>
        <Box/>

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
              sx={{ width: "calc(100% - 32px)", ml: 2, mr: 4, mb: 2, mt: 2}}
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
              Seleccione la opción(es) requeridas:
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
            mr:8,
          }}
        >
          {[
            { name: "cuentaUsuario", label: "Cuenta de usuario" },
            { name: "accesoWeb", label: "Acceso a sitios Web o Equipo" },
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
                  />
                }
                label={item.label}
              />
              
            </Box>
          ))}
            {/*   <FormHelperText PENDIENTE
              sx={{
                ml: 2,
                mr: 2,
                mb: 1,
                justifyContent: "center",
                color: "red",
                display: errors?.cuentaUsuario ? "block" : "none",
              }}
            >
              {errors?.cuentaUsuario}
            </FormHelperText> */}
          
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
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel value="ALTA" control={ <Radio /> } label="Alta Usuario" />
              <FormControlLabel value="BAJA" control={ <Radio />} label="Baja Usuario" />
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
        
        {/* TABLA B) */}
        <Box
          component="form"
          sx={{
            display: formData.accesoWeb ? "block" : "none",
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
            b) Acceso a sitios Web o Equipo
          </FormLabel>
          
          <EditableTableWeb onDataChange={handleWebTableDataChange} />

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



        {/* TABLA C) */}
        <Box
          component="form"
          sx={{
            display: formData.accesoRemoto ? "block" : "none",
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
            c) Acceso a escritorio remoto
          </FormLabel>

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
            Nota: Ejemplo de nomeclatura: SGA-001. Ejemplo de nombre: CE0010DC01. Para el sistema operativo especificar nombre y versión.
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
            placeholder="Escriba la justificacion de la necesidad del servicio"
            value={formData.justificacion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" , mb: 3}}
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
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          AUTORIZA SERVICIO
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
            placeholder="Gerente(a), Subgerente(a) o equivalente / Director(a) de Organismo / Director(a) Local"
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
            placeholder="Escriba el peusto o cargo de quien autoriza los servicios"
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
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          Términos y condiciones del uso del servicio
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
          <Box sx={{ml: 3, mr: 3}}>
            <Typography
              variant="caption"
              align= "justify"
              gutterBottom
              sx={{ mt: 3, width: "calc(100% - 32px)", ml: 0, mr: 4 }}
            >
            1)	El usuario solicitante puede tramitar este formato las veces que sea necesario, según sus necesidades. Los servicios solicitados son acumulados a los existentes. Es responsabilidad del solicitante, indicar correctamente el movimiento (A, B, C) de los servicios especificados tomando en cuenta su historial de solicitudes.<br />
            2)	El Enlace Informático de la unidad administrativa solicitante, será quien gestione y de seguimiento a la solicitud de servicios de Red Privada Virtual (VPN) del personal de su unidad. <br />
            3)	La Subgerencia de Soporte Técnico, Telecomunicaciones y Seguridad única y exclusivamente proveerá el servicio de acceso remoto por VPN al usuario solicitante autorizado por el titular de su unidad administrativa previa presentación del formato debidamente llenado.<br />
            4)	La Subgerencia de Soporte Técnico, Telecomunicaciones y Seguridad, le proveerá al usuario autorizado la credencial de acceso, manual de instalación y configuración del software de cliente de VPN de usuario mediante correo electrónico personalizado.<br />
            5)	El acceso a los servicios de red interna mediante el servicio de VPN, será con el uso de una contraseña que cumpla con la política correspondiente y el envío por correo electrónico al usuario de una clave de 6 dígitos como doble factor de autenticación. Es responsabilidad única y exclusiva del usuario autorizado a conservar en secreto, no proporcionar a terceros su contraseña y no permitir el acceso a su cuenta de correo electrónico para la obtención de la clave de 6 dígitos a terceros.<br />
            6)	Posterior al proceso de autorización de acceso al usuario y ya establecido el túnel de VPN, solo el tráfico que se iden-tifique que tiene como destino la red interna de la CONAGUA cursará por el túnel de VPN, el resto del tráfico del equi-po origen del usuario seguirá las rutas que tenga definidas en su configuración para acceder a otros recursos de red.<br />
            7)	El servicio de VPN, solo permitirá por cada usuario, una conexión desde un dispositivo remoto, por lo que no será posible tener 2 o más conexiones simultáneas para una misma cuenta.<br />
            8)	La sesión establecida será automáticamente cerrada transcurridos 10 minutos de inactividad. El usuario deberá repetir el proceso de inicio de sesión para conectarse a la red de la CONAGUA. Está prohibido usar cualquier proceso o software para mantener la sesión activa.<br />
            9)	El usuario autorizado de VPN acepta que al hacer uso del servicio de VPN mediante cualquier tipo de conexión, es de su exclusiva responsabilidad el costo que ello genere.<br />
            10)	El equipo proporcionado por la CONAGUA ya cuenta con los elementos de seguridad necesarios para operar dentro de la red interna (actualizaciones del sistema operativo, actualizaciones de aplicaciones, software antimalware), pero es obligación del usuario autorizado verificar que estos elementos se encuentren actualizados. En el caso de equipo per-sonal, es responsabilidad del usuario autorizado ejecutar y mantener actualizado el sistema operativo, las aplicaciones instaladas y tener activos los elementos de seguridad como: Antivirus/Antimalware, corta fuego o firewall, protección de cuentas, seguridad del dispositivo, control de aplicaciones y exploradores entre otros que ofrezca el sistema ope-rativo o sean instalados de manera independiente.
            11)	Si el usuario autorizado hace uso de su equipo personal para acceder a los servicios de la red interna de la CONAGUA mediante el uso de los servicios de VPN, acepta conocer y cumplir con las políticas, normas y disposiciones en mate-ria de seguridad de la información que aplican para los equipos que proporciona la CONAGUA.
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
              mb: 3
              //mx: "auto"
            }}
          >
            {[
              { name: "politicasaceptadas", label: "Acepto términos y condiciones" },
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
                  ? theme.palette.secondary.main
                  : "#98989A",
              color: "#FFFFFF",
              border: "1px solid gray",
            }}
            disabled={botonEstado === "Cargando..."}
            {...(botonEstado === "Descargar PDF" && {
              href: pdfUrl,
              download: "RegistroVPNMayo.pdf",
            })}
          >
            {botonEstado}
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
          '& > :not(style)': { m: 1 } 
          }}>
        <Fab variant="extended" color = "success" onClick={handleClickOpen}>
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
           '& .MuiDialog-container': {
             backgroundColor: 'f5f5f5', // Or any other color
           },
           '& .MuiDialog-paper': {
             backgroundColor: '#f4f4f5', // Customize dialog content background
           },
         }}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              console.log("Informacion Enviada")
            },
          },
        }}
      >
        <DialogTitle>Añadir Memorando</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puede añadir el número de memorando que se le proporciono para completar el llenado de su formato.
          </DialogContentText>
          <DialogContentText sx={{mt: 2}}>
            * Es su responsabilidad llenarlo adecuadamente.
          </DialogContentText>
          <Divider
                    sx={{
                      borderBottomWidth: "1px",
                      borderColor: "grey",
                      ml: 2,
                      mr: 2,
                      mb: 1,
                      mt:2
                    }}
                  />
                    <FormLabel
                      component="legend"
                      sx={{
                        mx: "auto",
                        mt:2,
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
                        mt:2,
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
                  ? theme.palette.secondary.main
                  : "#98989A",
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
              background: "#611232",
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
