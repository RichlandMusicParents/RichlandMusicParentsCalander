import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

function ConfirmDialog() {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(true);
    const [showThankYou, setShowThankYou] = useState(false);

const handleClickOpen = () => {
    setOpen(true)
};

const handleClose = () => {
setOpen(false)
};

const handleConfirm = () => {
    setShowConfirmation(false);
    setTimeout(() => {
        history.push("/Complete")
    }, 5000);

};

    return (
        <>
    <Button onClick={handleClickOpen}> Complete Order</Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-title"
            aria-descrivedby="alert-description"
        >
            {showConfirmation && ( 
                <>
     <DialogTitle id="alert-title"> {"Confirm Order?"}</DialogTitle>
     <DialogContent id="alert-description"> 
     Are you sure you want to complete the order? 
     </DialogContent>
     <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleConfirm} autofocus>Yes</Button>

     </DialogActions>
            </>
            )}
            <DialogContent>
                
            </DialogContent>
        </Dialog>
        </>
    );
};

export default ConfirmDialog;