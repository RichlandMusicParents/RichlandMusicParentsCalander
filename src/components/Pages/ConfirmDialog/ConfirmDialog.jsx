import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { textAlign } from "@mui/system";

function ConfirmDialog() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowThankYou(true);
    setTimeout(() => {
      history.push("/Complete");
    }, 3000);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}> Complete Order</Button>
      <Dialog
      sx={{textAlign:"center"}}
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
             <DialogTitle style={{ color: "green"}} id="alert-title"  
             alignItems="center"
             justifyContent="center"
             > {"Thank you for your order!"}</DialogTitle>
            <DialogContentText   
            justifyContent="center"
            alignItems="center" >
            Please wait while your order is being processed!
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

export default ConfirmDialog;
