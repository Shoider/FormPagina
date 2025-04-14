import React, { useState, useEffect } from "react";
import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import pisos from "../constants/pisos";
import segmentos from "../constants/segmentos.jsx";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

// Estilo Overlay
const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .no-rows-primary": {
    fill: "#3D4751",
    ...theme.applyStyles("light", {
      fill: "#AEB8C2",
    }),
  },
  "& .no-rows-secondary": {
    fill: "#1D2126",
    ...theme.applyStyles("light", {
      fill: "#E8EAED",
    }),
  },
}));
function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 452 257"
        aria-hidden
        focusable="false"
      >
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>Sin Registros</Box>
    </StyledGridOverlay>
  );
}

function EditToolbar(props) {
  const { setRows, setRowModesModel, nextId, setNextId } = props;

  const handleClick = () => {
    const id = nextId;
    setRows((oldRows) => [
      ...oldRows,
      { 
        id,
        No: nextId, // Asegúrate de que No e id coincidan
        SO: "",
        IPO: "",
        SD: "",
        FRD: "",
        IPD: "",
        PRO: "",
        PUER: "",
        isNew: true 
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "SO" },
    }));
    setNextId(nextId + 1);
  };

  return (
    <GridToolbarContainer>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
        Añadir Registro
      </Button>
    </GridToolbarContainer>
  );
}

function EditableTableUsua({ initialData, onDataChange }) {
  const [rows, setRows] = useState(() => {
    // Asegura que los datos iniciales tengan IDs consistentes
    if (initialData && initialData.length > 0) {
      return initialData.map((item, index) => ({
        ...item,
        No: index + 1,
        id: item.id || index + 1
      }));
    }
    return [];
  });

  const [rowModesModel, setRowModesModel] = useState({});
  const [nextId, setNextId] = useState(() => {
    const maxId = initialData?.reduce((max, item) => Math.max(max, item.id || 0), 0);
    return maxId ? maxId + 1 : 1;
  });

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Columnas optimizadas
  const columns = [
    {
      field: "No",
      headerName: "N°",
      type: "number",
      width: 40,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "SO",
      headerName: "Nombre(s) de Usuario(s) Zona(s) Origen",
      width: 300,
      editable: true,
      renderEditCell: (params) => {
        const handleBlur = () => {
          // Método universal para finalizar la edición
          if (params.api.stopCellEditMode) {
            // Para DataGrid v6+
            params.api.stopCellEditMode({ id: params.id, field: params.field });
          } else if (params.api.commitCellChange) {
            // Para algunas versiones anteriores
            params.api.commitCellChange({ id: params.id, field: params.field });
            params.api.setCellMode(params.id, params.field, 'view');
          } else {
            // Fallback seguro
            params.api.setCellMode(params.id, params.field, 'view');
          }
        };
    
        return (
          <Autocomplete
            disablePortal
            options={pisos}
            sx={{ width: '100%', py: 1 }}
            freeSolo
            renderInput={(inputParams) => (
              <TextField 
                {...inputParams} 
                label="Seleccionar"
                variant="standard"
                fullWidth
              />
            )}
            value={params.value || null}
            onChange={(event, newValue) => {
              if (params.api.setEditCellValue) {
                params.api.setEditCellValue({
                  id: params.id,
                  field: params.field,
                  value: newValue || '',
                });
              } else {
                params.api.setCellValue(params.id, params.field, newValue || '');
              }
            }}
            onBlur={handleBlur}
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) => option === value}
          />
        );
      },
      renderCell: (params) => <span>{params.value || ''}</span>,
    },
    //{ field: 'FRO', headerName: 'Funcion ó Rol de Dispositivo(s) Origen', type: 'string', width: 200, align: 'center', headerAlign: 'center', editable: false },
    {
      field: "IPO",
      headerName: "Segmento(s)/IP(s) Origen",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      renderEditCell: (params) => {
        const handleBlur = () => {
          // Método universal para finalizar la edición
          if (params.api.stopCellEditMode) {
            // Para DataGrid v6+
            params.api.stopCellEditMode({ id: params.id, field: params.field });
          } else if (params.api.commitCellChange) {
            // Para algunas versiones anteriores
            params.api.commitCellChange({ id: params.id, field: params.field });
            params.api.setCellMode(params.id, params.field, 'view');
          } else {
            // Fallback seguro
            params.api.setCellMode(params.id, params.field, 'view');
          }
        };
    
        return (
          <Autocomplete
            disablePortal
            options={segmentos}
            sx={{ width: '100%', py: 1 }}
            freeSolo
            renderInput={(inputParams) => (
              <TextField 
                {...inputParams} 
                label="Seleccionar"
                variant="standard"
                fullWidth
              />
            )}
            value={params.value || null}
            onChange={(event, newValue) => {
              if (params.api.setEditCellValue) {
                params.api.setEditCellValue({
                  id: params.id,
                  field: params.field,
                  value: newValue || '',
                });
              } else {
                params.api.setCellValue(params.id, params.field, newValue || '');
              }
            }}
            onBlur={handleBlur}
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) => option === value}
          />
        );
      },
      renderCell: (params) => <span>{params.value || ''}</span>,
    },
    {
      field: "SD",
      headerName: "Sistema Asociado a Anfitrion(es) Destino",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "FRD",
      headerName: "Rol de Anfitrión(es) Destino",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "IPD",
      headerName: "IP/NAT Anfitrión(es) Destino/NAT",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "PRO",
      headerName: "Protocolo TCP ó UDP",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      type: "singleSelect",
      valueOptions: ["TCP", "UDP"],
    },
    {
      field: "PUER",
      headerName: "Puertos",
      type: "string",
      width: 100,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save-${id}`}
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`cancel-${id}`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    onDataChange(rows);
  }, [rows, onDataChange]);

  // Manejo de eventos optimizado
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    // Recalcula los números de fila después de eliminar
    setRows(prevRows => prevRows.map((row, index) => ({
      ...row,
      No: index + 1
    })));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  // Actualización de números de fila cuando cambian los datos
  useEffect(() => {
    setRows(prevRows => prevRows.map((row, index) => ({
      ...row,
      No: index + 1
    })));
  }, [rows.length]);

  useEffect(() => {
    onDataChange(rows);
  }, [rows, onDataChange]);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "calc(100% - 32px)",
      height: "500px",
      ml: 2,
      mr: 4,
      mt: 3,
      mb: 3,
      "& .actions": { color: "text.secondary" },
      "& .textPrimary": { color: "text.primary" },
      background: "white",
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar, noRowsOverlay: CustomNoRowsOverlay }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, nextId, setNextId },
        }}
        getRowId={(row) => row.id} // Asegura que siempre use el id correcto
        sx={{
          "--DataGrid-overlayHeight": "200px",
          "& .MuiDataGrid-virtualScroller": {
            marginBottom: "16px", // Espaciado adicional para evitar superposición
          },
        }}
      />
    </Box>
  );
}

export default EditableTableUsua;