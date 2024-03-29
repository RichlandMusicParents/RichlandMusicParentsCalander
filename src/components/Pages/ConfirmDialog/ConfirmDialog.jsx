import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function ConfirmDialog() {
  const history = useHistory();

  // Declares state variables to manage the dialog box's open state, confirmation state, and thank you state
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  // Function to set the open state variable to true
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Function to set the open state variable to false
  const handleClose = () => {
    setOpen(false);
  };

  // Function to set the confirmation and thank you state variables and redirect the user to the complete page after three seconds
  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowThankYou(true);
    setTimeout(() => {
      history.push("/Complete");
    }, 3000);
  };
  //Richland theme
  const richlandTheme = createTheme({
    palette: {
      primary: {
        main: "#77afdb",
        contrastText: "#ffcf5f",
      },
      secondary: {
        main: "#ffcf5f",
        contrastText: "#000",
      },
      danger: {
        main: "#b71c1c",
        contrastText: "#fff",
      },
    },

    typography: {
      fontFamily: "Libre Baskerville, serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
    },
  });

  return (
    <>
      <ThemeProvider theme={richlandTheme}>
        <Button
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: "#",
            width: "200px",
            padding: "40px",
            marginLeft: "900px",
            marginBottom: "15px",
            color: "white",
            height: "65px",
            fontSize: "1.2rem",
            fontWeight: "600",
            boxShadow: "none",
            marginTop: "2rem",
            borderRadius: "50px",
            marginBottom: "3rem",
            "&:hover": {
              backgroundColor: richlandTheme.palette.primary.dark,
            },
          }}
          onClick={handleClickOpen}>
          {" "}
          Complete Order
        </Button>

        <Dialog
          sx={{ textAlign: "center" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-title"
          aria-descrivedby="alert-description">
          {showConfirmation && (
            <>
              <DialogTitle id="alert-title"> {"Confirm Order?"}</DialogTitle>
              <DialogContent id="alert-description">
                Are you sure you want to complete the order?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleConfirm} autofocus>
                  Yes
                </Button>
              </DialogActions>
            </>
          )}

          {showThankYou && (
            <DialogContent>
              <DialogTitle
                style={{ color: "green" }}
                id="alert-title"
                alignItems="center"
                justifyContent="center">
                {" "}
                {"Thank you for your order!"}
              </DialogTitle>
              <DialogContentText justifyContent="center" alignItems="center">
                Please wait while your order is being processed!
              </DialogContentText>
            </DialogContent>
          )}
        </Dialog>
      </ThemeProvider>
    </>
  );
}

export default ConfirmDialog;
