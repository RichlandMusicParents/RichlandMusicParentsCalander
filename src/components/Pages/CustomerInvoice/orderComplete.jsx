import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <h2 style={{ color: "red" }}>Your order is confirmed!</h2>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Information
        </Typography>
        <div className="contactInfo">
          {orders.map((order) => (
            <section key={order.id}>
              <Typography variant="h6">
                Name: {order.first_name} {order.last_name}
              </Typography>
              <Typography variant="h6">Address: {order.address}</Typography>
              <Typography variant="h6">Phone: {order.phone}</Typography>
              <Typography variant="h6">Email: {order.email}</Typography>
            </section>
          ))}
        </div>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
      >
        <Box
          className="eventTable"
          sx={{
            width: "100%",
            overflowX: "auto",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          <Toolbar>
            <Typography variant="h4" component="div">
              Order Information
            </Typography>
          </Toolbar>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>ZipCode</TableCell>
                  <TableCell>Payment Type</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((orderInfo) => (
                  <TableRow key={orderInfo.id}>
                    <TableCell>{orderInfo.address}</TableCell>
                    <TableCell>{orderInfo.city}</TableCell>
                    <TableCell>{orderInfo.state}</TableCell>
                    <TableCell>{orderInfo.zip}</TableCell>
                    <TableCell>{orderInfo.payment_type}</TableCell>
                    <TableCell>${orderInfo.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          All Your Added Events
        </Typography>
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
      </Box>
      <Button onClick={() => homePageClick()}> Back to HomePage</Button>
    </>
  );
}
