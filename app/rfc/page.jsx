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
  Checkbox
} from "@mui/material";
import Image from "next/image"; 
import EditableTable from "../components/EditableTable.jsx";
import axios from 'axios';

export default function Home() {
  const theme = useTheme();

  // Checkbox
  const [altaIsTrue, setAltaIsTrue] = useState(false)
  const [cambioIsTrue, setCambioIsTrue] = useState(false)
  const [bajaIsTrue, setBajaIsTrue] = useState(false)

  const [formData, setFormData] = useState({
    movimiento: "", 
    desotro: "",
    tempo: "",
    memo: "",
    descbreve: "",
    nomei: "",
    extei: "",
    noms: "",
    exts: "",
    puestos: "",
    area: "",
    desc: "",
    puestoei: "",
    nombreJefe: "",
    puestoJefe: "",
    justifica1: "",
    justifica2: "",
    justifica3: "",
    // Estados para checkbox
    ALTA: altaIsTrue,
    BAJA: bajaIsTrue,
    CAMBIO: cambioIsTrue
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

  // Checkbox Funcionalidad

  const saveAltaComboBox = async (event) => {
    console.log(event)
    console.log(!altaIsTrue)
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setAltaIsTrue(!altaIsTrue)
  }

  const saveCambioComboBox = async (event) => {
    console.log(event)
    console.log(!cambioIsTrue)
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setCambioIsTrue(!cambioIsTrue)
  }

  const saveBajaComboBox = async (event) => {
    console.log(event)
    console.log(!bajaIsTrue)
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setBajaIsTrue(!bajaIsTrue)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // PDF api
      const pdfResponse = await axios.post("http://localhost/api/v1/rfc", formData, {
        responseType: "blob",
    });
  
      if (pdfResponse.status === 200) {
        setPdfUrl(URL.createObjectURL(pdfResponse.data));
      } else {
        console.error("Error generating PDF");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //  VALIDADORES

  // Validador de numeros generico
  function NumberTextField({ name, label, maxLength, value, onChange }) {
    const handleNumberChange = (event) => {
      let inputValue = event.target.value.replace(/[^0-9]/g, "");
      inputValue = inputValue.slice(0, maxLength);
      onChange({ target: { name, value: inputValue } });
    };
  
    return (
      <TextField
        required
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={handleNumberChange}
        inputProps={{ maxLength }}
      />
    );
  }

  const handleExtensionChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
    value = value.slice(0, 4); // Limita la longitud a 4 caracteres

    setFormData((prevFormData) => ({
      ...prevFormData,
      extei: value,
    }));
  };

  // Tablas

  const [tableData, setTableData] = useState([]);

  const handleTableDataChange = (data) => {
    setTableData(data);
  };

  // Seleccion Tipo de Cambio

  const [otroHabilitado, setOtroHabilitado] = useState(false);

  const handleChangeTipo = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (value === 'OTRO') {
      setOtroHabilitado(true);
    } else {
      setOtroHabilitado(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        desotro: '', // Limpiar el campo si no es "OTRO"
      }));
    }
  };

  // Inicio de la pagina

  return (
    <Container disableGutters maxWidth="xxl" sx={{background: "#FFFFFF"}}>
      
      {/* Banner Responsive */}
      <Box sx={{ justifyContent: "center", mt: 0, background: "#F4F4F5", width: "100%"}}>
        <Box sx={{ justifyContent: "center", display: "flex", ml: 3}}>
        <Image
          src="/Conagua.png"
          alt="Logo CONAGUA"
          width={750}
          height={200}
          style={{ maxWidth: "100%", height: "auto" }}
          priority
        />
        </Box>
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
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              Tipo de Cambio *
            </FormLabel>
            <RadioGroup
              row
              aria-label="Tipo de Movimiento"
              name="movimiento"
              value={formData.movimiento}
              onChange={handleChangeTipo}
              required
              sx={{ ml: 2, mr: 2, justifyContent: 'center' }}
            >
              <FormControlLabel value="INTER" control={<Radio />} label="INTERSISTEMAS" />
              <FormControlLabel value="ADMIN" control={<Radio />} label="ADMINISTRATIVO" />
              <FormControlLabel value="DES" control={<Radio />} label="DESARROLLADOR" />
              <FormControlLabel value="USUA" control={<Radio />} label="USUARIO" />
              <FormControlLabel value="OTRO" control={<Radio />} label="OTRO" />
            </RadioGroup>
            <TextField
              disabled={!otroHabilitado}
              required={otroHabilitado}
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

          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mb:0 }} />

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
            onChange={handleExtensionChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            required
            id="puestojefe"
            name="puestojefe"
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
            id="extie"
            name="extei"
            label="Teléfono / Extensión"
            value={formData.exts}
            onChange={handleExtensionChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            required
            id="puesto"
            name="puesto"
            label="Puesto"
            value={formData.puestos}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="area"
            name="area"
            label="Área"
            value={formData.area}
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
            id="jefe"
            name="jefe"
            label="Nombre de Gerente ó Director Local"
            value={formData.nombreJefe}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
            id="puestojefe"
            name="puestojefe"
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
          DESCRIPCION
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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2, mb: 1 }}>
            <FormLabel
              component="legend"
              sx={{ mt: 0, display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
            >
              Tipo de Movimiento *
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.ALTA}
                    onChange={saveAltaComboBox}
                    name="ALTA"
                    color="primary"
                  />
                }
                label="ALTA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.CAMBIO}
                    onChange={saveCambioComboBox}
                    name="CAMBIO"
                    color="primary"
                  />
                }
                label="CAMBIO"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.BAJA}
                    onChange={saveBajaComboBox}
                    name="BAJA"
                    color="primary"
                  />
                }
                label="BAJA"
              />
            </FormGroup>
          </Box>
          
          <Divider sx={{ borderBottomWidth: "1px", borderColor: "grey", ml: 2, mr: 2, mt: 0, mb:1 }} />
          <TextField
            required
            id="desc"
            name="desc"
            label="Descripcion Detallada"
            placeholder="Descripción a detalle de las configuraciones solicitadas"
            value={formData.desc}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb:3}}
            inputProps={{ maxLength: 256 }}
          />
        </Box>
      </Box>

      {/* ALTAS */}
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
          display: formData.ALTA ? 'block' : 'none'
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          ALTAS
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          
          <EditableTable onDataChange={handleTableDataChange}/>

        </Box>        
          <Typography variant="h6" align="center" gutterBottom sx={{mt: 0, mb:3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            * En caso de proporcionar dirección NAT verificar que sea la correcta
          </Typography>
      </Box>

      {/* CAMBIOS*/}
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
          display: formData.CAMBIO ? 'block' : 'none'
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          CAMBIOS
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          
          <EditableTable onDataChange={handleTableDataChange}/>

        </Box>
        <Typography variant="h6" align="center" gutterBottom sx={{mt: 0, mb:3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            * En caso de proporcionar dirección NAT verificar que sea la correcta
          </Typography>
      </Box>

      {/* BAJAS */}
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
          display: formData.BAJA ? 'block' : 'none'
        }}
      >
        {/* SubTitle */}
        <Typography variant="h4" align="center" gutterBottom sx={{mt: 3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
          BAJAS
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          
          <EditableTable onDataChange={handleTableDataChange}/>

        </Box>
        <Typography variant="h6" align="center" gutterBottom sx={{mt: 0, mb:3, width: "calc(100% - 32px)", ml: 2, mr:4}}>
            * En caso de proporcionar dirección NAT verificar que sea la correcta
          </Typography>
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
          JUSTIFICACIÓN
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
            id="justifica1"
            name="justifica1"
            label="Referencias"
            placeholder="Documentacion de los sistemas y/o plataformas que soportan y/o justifican los cambios solicitados"
            value={formData.justifica1}
            onChange={handleChange}
            sx={{background: "#FFFFFF"}}
            inputProps={{ maxLength: 256 }}
          />
          <TextField
            required
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
            required
            id="justifica3"
            name="justifica3"
            label="Razon / Motivo"
            placeholder="Razon ó Motivo de los accesos"
            value={formData.justifica3}
            onChange={handleChange}
            sx={{background: "#FFFFFF", mb:3}}
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
          sx={{ "& .MuiTextField-root": { mt: 2, width: "calc(100% - 32px)", ml: 2, mr:4 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          {/* Buttons */}
          <Button
            type="submit"
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 3, 
              width: "calc(100% - 32px)",
              ml: 2, 
              mr:4, 
              background: "#98989A",
              border: "1px solid gray",
            }}
          >
            Enviar
          </Button>
          {pdfUrl && (
            <Button
              variant="contained" // Cambia a "contained" para que tenga fondo
              sx={{
                mb: 3,
                ml: 2,
                mr:4,
                width: "calc(100% - 32px)",
                backgroundColor: theme.palette.secondary.main, // Establece el color de fondo
                color: "#FFFFFF", // Establece el color del texto a blanco
                border: "1px solid gray",
              }}
              href={pdfUrl}
              download="registro.pdf"
            >
              Descargar PDF
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}