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
        <Typography>Contact Information</Typography>
        <div className="contactInfo">
          {orders.map((order) => (
            <section key={order.id}>
              <Typography>
                Name: {order.first_name} {order.last_name}
              </Typography>
              <Typography>Address: {order.address}</Typography>
              <Typography>Phone: {order.phone}</Typography>
              <Typography>Email: {order.email}</Typography>
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
            backgroundColor: "#FFFF00",
          }}
        >
          <Toolbar style={{ backgroundColor: "white", color: "black" }}>
            <Typography  variant="h4" component="h1" gutterBottom>
              Order Information
            </Typography>
          </Toolbar>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ backgroundColor: "#1E90FF", color: "#FFFF00",fontSize: "25px",fontFamily: "bold"  }}
                  >
                    Address
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#1E90FF", color: "#FFFF00",fontSize: "25px",fontFamily: "bold"  }}
                  >
                    City
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#1E90FF", color: "#FFFF00",fontSize: "25px", fontFamily: "bold"  }}
                  >
                    State
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#1E90FF", color: "#FFFF00",fontSize: "25px",fontFamily: "bold"  }}
                  >
                    ZipCode
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#1E90FF", color: "#FFFF00",fontSize: "25px",fontFamily: "bold"  }}
                  >
                    Payment Type
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#1E90FF", color: "#FFFF00",fontSize: "25px",fontFamily: "bold"  }}
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((orderInfo) => (
                  <TableRow key={orderInfo.id}>
                    <TableCell  style={{  fontSize: "18px" }} >{orderInfo.address}</TableCell>
                    <TableCell  style={{  fontSize: "18px" }} >{orderInfo.city}</TableCell>
                    <TableCell  style={{  fontSize: "18px" }} >{orderInfo.state}</TableCell>
                    <TableCell  style={{  fontSize: "18px" }} >{orderInfo.zip}</TableCell>
                    <TableCell  style={{  fontSize: "18px" }} >{orderInfo.payment_type}</TableCell>
                    <TableCell  style={{  fontSize: "18px" }} >${orderInfo.total}</TableCell>
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
              <TableRow
                style={{ backgroundColor: "#1E90FF", color: "#FFFF00" }}
              >
                <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                  Date
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                  Event Type
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "large" }}>
                  Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => {
                const formattedDate = formatDate(event.event_date);

                return (
                  <TableRow
                    style={{ backgroundColor: "#FFFF00", color: "#FFFF00" }}
                  >
                    <TableCell style={{  fontSize: "18px" }} >{formattedDate}</TableCell>
                    <TableCell style={{  fontSize: "18px" }} >{event.event_type}</TableCell>
                    <TableCell style={{  fontSize: "18px" }} >{event.event_name}</TableCell>
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
