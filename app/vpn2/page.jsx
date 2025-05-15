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
} from "@mui/material";
import Image from "next/image";
import axios from "axios";
import Alerts from "../components/alerts.jsx";
import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";

// TABLAS
import EditableTableWeb from "../components/EditableTableWeb.jsx";
import EditableTableRemoto from "../components/EditableTableRemoto.jsx";

export default function Home() {
  const theme = useTheme();
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
    marca: "",
    modelo: "",
    serie: "",

    nombreAutoriza: "",
    puestoAutoriza: "",
    
    // Checkbox
    cuentaUsuario: false,
    accesoWeb: false,
    accesoRemoto: false,

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

  const validarCamposRequeridos = (Data) => {
    const errores = {};
    let isValid = true;

    for (const key in Data) {
      if (Data.hasOwnProperty(key) && !Data[key]) {
        // Excluir movimiento si cuentaUsuario es false
        if (key === "movimiento" && !formData.cuentaUsuario) {
          continue;
        }
        if (key !== "cuentaUsuario" && key !== "accesoWeb" && key !== "accesoRemoto") {
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

    //console.log("Lista getErrors en submit: ", getErrors)

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
        console.error("Error generating PDF");
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
            Solicitud de Acceso Remoto a Través de una Red Privada Virtual (VPN)
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
            placeholder="Escriba el nombre de la subgerencia o Subdirección"
            value={formData.subgerencia}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb:3 }}
            inputProps={{ maxLength: 256 }}
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
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          ENLACE INFORMATICO O CONTACTO RESPONSABLE DEL ÁREA DE ADSCRIPCIÓN
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
            placeholder="Escriba el nombre completo del enlace informatico ó contacto responsable"
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
            placeholder="Escriba el numero de telefono y/o extensión del enlace informatico ó responsable"
            value={formData.telefonoEnlace}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

      {/* Datos de Enlace */}
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
                mb: 0,
                justifyContent: "center",
                color: "red",
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
            label="Correo Electronico"
            placeholder="Escriba el correo electronico del usuario"
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
            label="Número de teléfono y/o extensión"
            placeholder="Escriba el numero de telefono y/o extensión del usuario"
            value={formData.telefonoInterno}
            onChange={handleChange}
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
            label="Correo Electronico"
            placeholder="Escriba el correo electronico del usuario"
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
            required
            error={!!errors?.equipoExterno}
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
            label="Numero de Empleado"
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
            label="Puesto ó Cargo"
            placeholder="Escriba el puesto ó cargo del responsable"
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
                placeholder="Escriba ó seleccione la unidad administrativa del responsable"
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
            label="Número de Telefono y/o Extension"
            placeholder="Escriba el numero de telefono y/o extension del responsable"
            value={formData.telefonoResponsable}
            onChange={handleChange}
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
                mb: 0,
                justifyContent: "center",
                color: "red",
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
                mb: 0,
                justifyContent: "center",
                color: "red",
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
              PENDIENTE SUBTITULO
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
            Si marca CUENTA DE USUARIO, no debe marcar las otras opciones
          </FormLabel>
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
            label="Puesto ó Cargo"
            placeholder="Escriba el peusto o cargo de quien autoriza los servicios"
            value={formData.puestoAutoriza}
            onChange={handleChange}
            sx={{ background: "#FFFFFF", mb: 3 }}
            inputProps={{ maxLength: 256 }}
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
              download: "RegistroVPN.pdf",
            })}
          >
            {botonEstado}
          </Button>
        </Box>
      </Box>

      {/* ALERT */}
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Container>
  );
}
