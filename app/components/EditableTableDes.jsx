import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import funcionrol from "../constants/funcionrol";
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

// Funcionamiento General

function EditToolbar(props) {
  const { setRows, setRowModesModel, nextId, setNextId } = props; // Recibimos nextId y setNextId

  const handleClick = () => {
    const id = nextId; // Usamos el nextId como id
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        SO: "",
        IPO: "",
        SD: "",
        FRD: "",
        IPD: "",
        PRO: "",
        PUER: "",
        TEMPO: "",
        FECHA: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "SO" },
    }));
    setNextId(nextId + 1); // Incrementamos el nextId
  };

  return (
    <GridToolbarContainer>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
        Añadir Registro
      </Button>
    </GridToolbarContainer>
  );
}

function EditableTableDes({ initialData, onDataChange }) {
  const [rows, setRows] = useState(initialData || []);
  const [rowModesModel, setRowModesModel] = useState({});

  const calculateNextId = useCallback((currentData) => {
      return currentData && currentData.length > 0
        ? Math.max(...currentData.map((item) => item.id)) + 1
        : 1;
    }, []);
  
  const [nextId, setNextId] = useState(() => calculateNextId(initialData));
  
    useEffect(() => {
      setNextId(calculateNextId(initialData));
    }, [initialData, calculateNextId]);
  
    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        //event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      const newRows = rows.filter((row) => row.id !== id);
  
      // Actualiza los id iterando
      const updatedRows = newRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
  
      setRows(updatedRows);
      setNextId(calculateNextId(updatedRows));
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
      const newRows = rows.filter((row) => row.id !== id);
      setRows(newRows);
      setNextId(calculateNextId(newRows));
    };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "id",
      headerName: "N°",
      type: "number",
      width: 40,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable:false,
    },
    {
      field: "SO",
      headerName: "Nombre(s) de desarrollador(es)",
      type: "string",
      width: 150,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable:false,
    },
    //{ field: 'FRO', headerName: 'Funcion o Rol de Dispositivo(s) Origen', type: 'string', width: 200, align: 'center', headerAlign: 'center', editable: false },
    {
      field: "IPO",
      headerName: "IP anfitrión(es) origen",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable:false,
    },
    {
      field: "SD",
      headerName: "Sistema asociado a anfitrion(es) destino",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable:false,
    },
    {
      field: "FRD",
      headerName: "Funcion o rol de anfitrión(es) destino",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable:false,
      renderEditCell: (params) => {
        const handleBlur = async (event) => {
          if (params.api.setEditCellValue) {
            await params.api.setEditCellValue(
              {
                id: params.id,
                field: params.field,
                value: event?.target?.value ?? params.value ?? "",
              },
              event,
            );
          }
          if (params.api.stopCellEditMode) {
            params.api.stopCellEditMode({ id: params.id, field: params.field });
          } else if (params.api.commitCellChange) {
            params.api.commitCellChange({ id: params.id, field: params.field });
            params.api.setCellMode(params.id, params.field, "view");
          } else {
            params.api.setCellMode(params.id, params.field, "view");
          }
        };

        return (
          <Autocomplete
            disablePortal
            options={funcionrol}
            sx={{ width: "100%" }}
            freeSolo
            renderInput={(inputParams) => (
              <TextField
                {...inputParams}
                //label="Seleccionar"
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
                  value: newValue || "",
                });
              } else {
                params.api.setCellValue(
                  params.id,
                  params.field,
                  newValue || "",
                );
              }
            }}
            onBlur={handleBlur}
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) => option === value}
          />
        );
      },
      renderCell: (params) => <span>{params.value || ""}</span>,
    },
    {
      field: "IPD",
      headerName: "IP/NAT anfitrión(es) destino",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable:false,
    },
    {
      field: "PRO",
      headerName: "Protocolo TCP o UDP",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable:false,
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
      sortable:false,
    },
    {
      field: "TEMPO",
      headerName: "Temporalidad",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      type: "singleSelect",
      valueOptions: ["TEMPORAL", "PERMANENTE"],
      sortable:false,
    },
    {
      field: "FECHA",
      headerName: "Fechas del plazo",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable:false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 150,
      align: "center",
      headerAlign: "center",
      cellClassName: "actions",
      sortable:false,
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

  return (
    <Box
      sx={{
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
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar, noRowsOverlay: CustomNoRowsOverlay }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, nextId, setNextId }, // Pasamos nextId y setNextId
        }}
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

export default EditableTableDes;
