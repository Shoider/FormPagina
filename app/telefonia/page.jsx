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
  MenuItem,
  FormHelperText,
  Autocomplete
} from "@mui/material";
import Image from "next/image";

import axios from "axios";

import Alerts from "../components/alerts.jsx";

import unidadesAdmin from "../constants/unidadesAdministrativas.jsx";

export default function Home() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    activacion: "",
    expiracion: "",
    justificacion: "",
    nombreUsuario: "",
    correoUsuario: "",
    direccion: "",
    uaUsuario: "",
    puestoUsuario: "",

    // USUARIO EXTERNO
    extEmpleado: "0000",
    correoEmpleado: "null@null.null",
    puestoEmpleado: "null",
    nombreEmpleado: "null",
    idEmpleado: "null",

    // AREA QUE AUTORIZA
    nombreJefe: "",
    puestoJefe: "",

    marca: "HUAWEI", //Default
    modelo: "",
    serie: "",
    version: "",

    // Radios
    movimiento: "", //ALTA, BAJA, CAMBIO
    mundo: "",
    local: "",
    cLocal: "",
    nacional: "",
    cNacional: "",
    eua: "",
    tipoUsuario: "Interno", // Default

    usuaExterno: false, // Estado inicial como false
  });

  const Tipos = [
    {
      value: "Interno",
      label: "Interno",
    },
    {
      value: "Externo",
      label: "Externo",
    },
  ];
  const Marcas = [
    {
      value: "AVAYA",
      label: "AVAYA",
    },
    {
      value: "HUAWEI",
      label: "HUAWEI",
    },
  ];

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
        if (key !== "usuaExterno") {
          console.log("Campo requerido: ", key);
          errores[key] = "Este campo es requerido"; // Texto a mostrar en cada campo faltante
          isValid = false; // Al menos un campo está vacío
        }
      }
    }
    return [isValid, errores]; // Todos los campos están llenos
  };

  // Llamada API

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Datos del formulario:", formData);

    const [isValid, getErrors] = validarCamposRequeridos(formData);
    setErrors(getErrors);

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
      const pdfResponse = await axios.post("/api/v1/tel", formData, {
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
    }
  };

  //  VALIDADORES

  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extEmpleado: value,
    }));
  };

  const handleDateChangeActiva = (event) => {
    const rawDate = new Date(event.target.value + "T00:00:00");
    console.log("Fecha de activacion: ", rawDate);

    const formattedDate = [
      rawDate.getDate().toString().padStart(2, "0"),
      (rawDate.getMonth() + 1).toString().padStart(2, "0"),
      rawDate.getFullYear(),
    ].join("-");

    setFormData((prevFormData) => ({
      ...prevFormData,
      activacion: formattedDate, ///ya da bien formato DD-MM-YYYY
      fecha: formattedDate, // Guarda la fecha formateada en el estado
    }));
  };
  const fechaActivacion = new Date(formData.activacion); //cambiar de objeto a fecha
  const handleDateChangeExpira = (event) => {
    //const rawDate = event.target.value;
    const rawDate = new Date(event.target.value + "T00:00:00");
    console.log("Fecha de activacion: ", rawDate);

    const formattedDate = [
      rawDate.getDate().toString().padStart(2, "0"),
      (rawDate.getMonth() + 1).toString().padStart(2, "0"),
      rawDate.getFullYear(),
    ].join("-");
    console.log("Fecha de expiracion: ", rawDate);

    setFormData((prevFormData) => ({
      ...prevFormData,
      expiracion: formattedDate, //FECHA FORMATEADA DD-MM-YYYY PRUEBA 1
      fecha: formattedDate, // Guarda la fecha formateada en el estado
    }));
  };
  const fechaExpiracion = new Date(formData.expiracion); //cambiar de objeto a fecha

  const handleChangeExterno = (event) => {
    const selectedValue = event.target.value;
    const isExterno = selectedValue === "Externo";

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        tipoUsuario: selectedValue,
        usuaExterno: isExterno,
      };

      if (isExterno) {
        //console.log("Campo Externo desactivado");
        updatedData.extEmpleado = "";
        updatedData.correoEmpleado = "";
        updatedData.puestoEmpleado = "";
        updatedData.nombreEmpleado = "";
        updatedData.idEmpleado = "";
      } else {
        //console.log("Campo Externo activado");
        updatedData.extEmpleado = "0000";
        updatedData.correoEmpleado = "null@null.null";
        updatedData.puestoEmpleado = "null";
        updatedData.nombreEmpleado = "null";
        updatedData.idEmpleado = "null";
      }
      return updatedData;
    });
  };

  const handleChangeMarca = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      marca: selectedValue, // Guarda la marca seleccionado
      //usuaExterno: event.target.value === 'Externo' ? true : false, // Guarda true si es 'Externo', false si no.
    }));
  };

  return (
    <Container disableGutters maxWidth="xxl" sx={{ background: "#FFFFFF" }}>
      {/* Banner Responsive */}
      <Box
        sx={{
          width: "100", // Ocupa todo el ancho de la ventana gráfica
          overflow: "hidden",
          height: "350px", // Ajusta la altura según sea necesario
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
            Solicitud De Servicios de Telefonía
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
          SOLICITUD
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
              Tipo de Movimiento *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Tipo de Movimiento"
              name="movimiento"
              value={formData.movimiento}
              onChange={handleChange}
              required
              sx={{ ml: 2, mr: 2, justifyContent: "center" }}
            >
              <FormControlLabel value="ALTA" control={<Radio />} label="ALTA" />
              <FormControlLabel value="BAJA" control={<Radio />} label="BAJA" />
              <FormControlLabel
                value="CAMBIO"
                control={<Radio />}
                label="CAMBIO"
              />
            </RadioGroup>
            <FormHelperText
              sx={{
                ml: 2,
                mr: 2,
                mb: 1,
                justifyContent: "center",
                color: "red",
              }}
            >
              {errors?.movimiento}
            </FormHelperText>
          </Box>
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mb: 0,
            }}
          />
          <TextField
            required
            error={!!errors?.justificacion}
            id="justificacion"
            name="justificacion"
            label="Justificación"
            value={formData.justificacion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.activacion}
            id="activacion"
            name="activacion"
            label="Fecha de activación"
            type="date"
            //value={formData.activacion}
            onChange={handleDateChangeActiva}
            sx={{ background: "#FFFFFF" }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.expiracion}
            id="expiracion"
            name="expiracion"
            label="Fecha de expiración"
            type="date"
            //value={formData.expiracion}
            onChange={handleDateChangeExpira}
            sx={{ background: "#FFFFFF" }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 256 }}
          />
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mb: 3,
            }}
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
          DATOS DEL USUARIO (A) QUE UTILIZARA EL SERVICIO
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
            //error={!!errors?.tipoUsuario}
            select
            id="tipoUsuario"
            name="tipoUsuario"
            label="Tipo de Usuario"
            defaultValue="Interno"
            sx={{ background: "#FFFFFF" }}
            onChange={handleChangeExterno}
            //helperText="Porfavor selecciona el tipo de usuario"
          >
            {Tipos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            error={!!errors?.nombreUsuario}
            id="nombreUsuario"
            name="nombreUsuario"
            label="Nombre"
            value={formData.nombreUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.correoUsuario}
            id="correoUsuario"
            name="correoUsuario"
            label="Correo"
            value={formData.correoUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />

          <TextField
            required
            error={!!errors?.direccion}
            id="direccion"
            name="direccion"
            label="Piso y Ala"
            //helperText="Piso y Ala a la que pertenece"
            value={formData.direccion}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />

          <TextField
            required
            error={!!errors?.puestoUsuario}
            id="puestoUsuario"
            name="puestoUsuario"
            label="Puesto"
            value={formData.puestoUsuario}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
            <Autocomplete
            disablePortal
            options={unidadesAdmin}
            renderInput={(params) => (
              <TextField
                required
                error={!!errors?.uaUsuario}
                sx={{ background: "#FFFFFF" }}
                {...params}
                label="Unidad Administrativa"
              />
            )}
            id="uaUsuario"
            name="uaUsuario"
            onChange={(event, newValue) =>
              handleChange({ target: { name: "uaUsuario", value: newValue } })
            }
            value={formData.uaUsuario} // Asigna a FormData el valor seleecionado
          />
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
      </Box>

      {/* Datos del Externo */}
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
          display: formData.usuaExterno ? "block" : "none",
        }}
      >
        {/* SubTitle */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 3, width: "calc(100% - 32px)", ml: 2, mr: 4 }}
        >
          DATOS DEL EMPLEADO DE CONAGUA RESPONSABLE
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
            error={!!errors?.nombreEmpleado}
            id="nombreEmpleado"
            name="nombreEmpleado"
            label="Nombre"
            value={formData.nombreEmpleado}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 32 }}
          />
          <TextField
            required
            error={!!errors?.idEmpleado}
            id="idEmpleado"
            name="idEmpleado"
            label="Número De Empleado"
            value={formData.idEmpleado}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 8 }}
          />

          <TextField
            required
            error={!!errors?.extEmpleado}
            id="extEmpleado"
            name="extEmpleado"
            label="Teléfono / Extensión"
            value={formData.extEmpleado}
            onChange={handleExtensionChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            required
            error={!!errors?.correoEmpleado}
            id="correoEmpleado"
            name="correoEmpleado"
            label="Email" //PENDIENTE
            value={formData.correoEmpleado}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            error={!!errors?.puestoEmpleado}
            id="puestoEmpleado"
            name="puestoEmpleado"
            label="Puesto"
            value={formData.puestoEmpleado}
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
              mb: 3,
            }}
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
          ÁREA QUE AUTORIZA
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
            label="Funcionario con Cargo de Subgerente, Homologo ó Superior"
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
            label="Puesto ó Cargo"
            value={formData.puestoJefe}
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
          CARACTERISTICAS DEL EQUIPO
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
            //error={!!errors?.tipoUsuario}
            select
            id="marca"
            name="marca"
            label="Marca"
            defaultValue="HUAWEI"
            sx={{ background: "#FFFFFF" }}
            onChange={handleChangeMarca}
            //helperText="Porfavor selecciona el tipo de usuario"
          >
            {Marcas.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            error={!!errors?.modelo}
            id="modelo"
            name="modelo"
            label="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            sx={{ background: "#FFFFFF" }}
            inputProps={{ maxLength: 16 }}
          />
          <TextField
            required
            error={!!errors?.serie}
            id="serie"
            name="serie"
            label="Serie"
            value={formData.serie}
            onChange={handleChange}
            inputProps={{ maxLength: 16 }}
            sx={{ background: "#FFFFFF" }}
          />
          <TextField
            required
            error={!!errors?.version}
            id="version"
            name="version"
            label="Versión de Sistema Operativo"
            value={formData.version}
            onChange={handleChange}
            inputProps={{ maxLength: 16 }}
            sx={{ background: "#FFFFFF" }}
          />
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "grey",
              ml: 2,
              mr: 2,
              mb: 3,
            }}
          />
        </Box>
      </Box>
      {/* Datos del Servicio */}
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
          CARACTERISTICAS DEL SERVICIO SOLICITADO
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
        ></Box>
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
            Servicio de Larga Distancia Resto del Mundo*
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio de Larga Distancia Resto del Mundo"
            name="mundo"
            value={formData.mundo}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.mundo}
          </FormHelperText>
        </Box>

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
            Servicio Local *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Local"
            name="local"
            value={formData.local}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.local}
          </FormHelperText>
        </Box>

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
            Servicio Celular Local *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Celular Local"
            name="cLocal"
            value={formData.cLocal}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.cLocal}
          </FormHelperText>
        </Box>

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
            Servicio Larga Distancia Nacional *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Larga Distancia Nacional"
            name="nacional"
            value={formData.nacional}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.nacional}
          </FormHelperText>
        </Box>

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
            Servicio Celular Larga Distancia *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Celular Larga Distancia"
            name="cNacional"
            value={formData.cNacional}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.cNacional}
          </FormHelperText>
        </Box>

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
            Servicio Larga Distancia Estados Unidos y Canadá: *
          </FormLabel>
          <RadioGroup
            row
            aria-label="Servicio Larga Distancia Estados Unidos y Canadá:"
            name="eua"
            value={formData.eua}
            onChange={handleChange}
            required
            sx={{ ml: 2, mr: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
          <FormHelperText
            sx={{ ml: 2, mr: 2, mb: 1, justifyContent: "center", color: "red" }}
          >
            {errors?.eua}
          </FormHelperText>
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
              download: "RegistroTelefonia.pdf",
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
