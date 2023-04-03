import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./orderComplete.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Toolbar,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./orderComplete.css"
import "./invoice.css"
// import "./OrderCompleted.css";

export default function OrderCompleted() {
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.eventReducer);
  const orders = useSelector((store) => store.order.newOrder);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_USER_EVENT" });
    dispatch({ type: "GET_NEW_ORDER" });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    return formatter.format(date);
  }
  //Back to the homepage function
  function homePageClick() {
    history.push("/splashPage");
  }

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
  <div className="invoice-container">
    <ThemeProvider theme={richlandTheme}>
    <u><h1 style={{fontSize: "40px", marginBottom: "1rem"}}>Invoice</h1></u>

      <div style={{ display: "flex", flexWrap: "wrap", padding: "2rem" }}>

        <Paper
          elevation={6}
          style={{
            width: "calc(50% - 20px)",
            margin: "10px",
            padding: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          className="contact-info"
        >
 <Typography className="orderComplete" variant="h5"  style={{ color: "green" }}>
  Your order is confirmed!
</Typography>          
<h2 className=".h2-container">Contact information</h2>
          <div className="contactInfo">
            {orders.map((order) => (
              <section key={order.id}>
                <h2>Name: {order.first_name} {order.last_name}</h2>
                <h2>Address: {order.address}</h2>
                <h2>Phone: {order.phone}</h2>
                <h2>Email: {order.email}</h2>
              </section>
            ))}
          </div>
        </Paper>
        
        <Paper
          className="order-info"
          elevation={6}
          style={{
            width: "calc(50% - 20px)",
            margin: "10px",
            padding: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            overflowX: "auto",
          }}
        >
          <section className="contact_order">
                <div className="orderDetails">
            <h1>Order Information</h1>
            <TableBody>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zipcode</TableCell>
                <TableCell>Payment type</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
              {orders.map((orderInfo) => (
                <TableRow key={orderInfo.id}>
                  <TableCell style={{ fontSize: "18px" }}>{orderInfo.address}</TableCell>
                  <TableCell style={{ fontSize: "18px" }}>{orderInfo.city}</TableCell>
                  <TableCell style={{ fontSize: "18px" }}>{orderInfo.state}</TableCell>
                  <TableCell style={{ fontSize: "18px" }}>{orderInfo.zip}</TableCell>
                  <TableCell style={{ fontSize: "18px" }}>{orderInfo.payment_type}</TableCell>
                  <TableCell style={{ fontSize: "18px" }}>${orderInfo.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </div>
          </section>
        </Paper>
      </div>
      <div className="event-details">
  <u><h1>All Your Added Events</h1></u>
  <Paper elevation={5} className="event-table" style={{ padding: '1rem' }}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Event Type</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => {
            const formattedDate = formatDate(event.event_date);
            return (
              <TableRow key={event.id}>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{event.event_type}</TableCell>
                <TableCell>{event.event_name}</TableCell>
              </TableRow>
            );
          })}
      
        </TableBody>
      </Table>
    </TableContainer>    
  </Paper>

  </div>
  <Button 
   color="primary"
   variant="contained"
   sx={{
    backgroundColor: "#",
    width:"200px",
     padding: "40px",
     marginLeft: "900px",
     color: "white",
     height: "65px",
     fontSize: "1.2rem",
     fontWeight: "600",
     boxShadow: "none",
     marginTop: "2rem",
     borderRadius: "50px",
     "&:hover": {
       backgroundColor: richlandTheme.palette.primary.dark,
     },
   }}
  onClick={() => homePageClick()} className="back-button">Back to HomePage</Button>

    
  </ThemeProvider>
</div>

    
  );
}
