import React, { useState } from 'react';
import {
  Box,
  Button
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Date.now(); // Genera un ID único basado en la marca de tiempo
    setRows((oldRows) => [
      ...oldRows,
      { id, SO: '', FRO: '', IPO:'', SD: '', FRD:'', IPD: '', PRO: '', PUER: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
        Añadir Registro
      </Button>
    </GridToolbarContainer>
  );
}

function EditableTable({ initialData, onDataChange }) {
  const [rows, setRows] = useState(initialData || []);
  const [rowModesModel, setRowModesModel] = useState({});

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
    { field: 'id', 
      headerName: 'N°',
      type: 'number', 
      width: 40, 
      align: 'center',
      headerAlign: 'center',
      editable: true
    },
    {  field: 'SO', 
      headerName: 'Sistema\nOrigen',
      type: 'string', 
      width: 150,
      align: 'center',
      headerAlign: 'center', 
      editable: true 
    },
    {
      field: 'FRO',
      headerName: 'Funcion ó Rol de Anfitrión(es) Origen',
      type: 'string',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'IPO',
      headerName: 'IP/NAT Anfitrión(es) Origen',
      type: 'string',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'SD',
      headerName: 'Sistema Destino',
      type: 'string',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true
    },
    {
      field: 'FRD',
      headerName: 'Funcion ó Rol de Anfitrión(es) Destino',
      type: 'string',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'IPD',
      headerName: 'IP/NAT Anfitrión(es) Destino/NAT',
      type: 'string',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'PRO',
      headerName: 'Protocolo TCP y/o UDP',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['TCP', 'UDP'],
    },
    {
      field: 'PUER',
      headerName: 'Puertos',
      type: 'string',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
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
    onDataChange(rows); // Notify parent component of changes
  }, [rows, onDataChange]);

  return (
    <Box
      sx={{
        height: 400,
        width: "calc(100% - 32px)",
        ml: 2, mr: 4, mt: 3, mb: 3,
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        background: "white"
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

export default EditableTable;