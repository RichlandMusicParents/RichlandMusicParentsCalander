import React from 'react'
import { Snackbar,  Alert, AlertTitle} from '@mui/material'

function Notification(props) {

    const {notify, setNotify} = props;
    return (
        <Snackbar>
            <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Thank you for your <strong>order!</strong>
           </Alert>

        </Snackbar>
    )
}

export default Notification;