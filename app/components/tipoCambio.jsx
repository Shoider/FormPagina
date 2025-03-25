import React, { useState } from 'react';
import {
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';

function TipoDeCambio() {
  const [formData, setFormData] = useState({
    movimiento: '',
    desotro: '',
  });
  const [otroHabilitado, setOtroHabilitado] = useState(false);

  const handleChange = (event) => {
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        onChange={handleChange}
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
        id="desotro"
        name="desotro"
        label="Describa Brevemente"
        value={formData.desotro}
        onChange={handleChange}
        sx={{ background: '#FFFFFF', mb: 3 }}
        inputProps={{ maxLength: 32 }}
      />
    </Box>
  );
}

export default TipoDeCambio;