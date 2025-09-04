import { Alert, Snackbar,Slide } from "@mui/material";

export default function Alerts({ open, setOpen, alert, pos }) {
  const handleClose = () => {
    setOpen(false);
  };
  var vertical;
  pos ? (vertical = pos) : (vertical = "bottom");

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      slots={{transition: Slide}}
      anchorOrigin={{ vertical: vertical, horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        variant="filled"
        sx={{
          padding: "16px 24px", // Aumenta el padding
          fontSize: "1rem", // Aumenta el tamaño de la fuente
          minWidth: "100px", // Establece un ancho mínimo
        }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
