import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";

import "./invoice.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
  TextField,
  MenuItem,
  Select,
  Alert,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import eventReducer from "../../../redux/reducers/event.reducer";
import orderReducer from "../../../redux/reducers/order.reducer";
import { useHistory } from "react-router-dom";
import Notification from "../Notification/Notification";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

export default function Invoice() {
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.eventReducer);
  const orders = useSelector((store) => store.order.newOrder);

  const history = useHistory();

  const calendars = useSelector((store) => store.calendar);
  const dispatch = useDispatch();
  //State for events
  const [editEventType, setEditEventType] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editEventDate, setEditEventDate] = useState("");

  //State for order
  const [editFirstName, setEditFirstName] = useState(orders.first_name);
  const [editLastName, setEditLastName] = useState(orders.last_name);
  const [editAddress, setEditAddress] = useState(orders.address);
  const [editCity, setEditCity] = useState(orders.city);
  const [editState, setEditState] = useState(orders.state);
  const [editZip, setEditZip] = useState(orders.zip);
  const [editPhone, setEditPhone] = useState(orders.phone);
  const [editEmail, setEditEmail] = useState(orders.email);

  //contact info
  const [editingContactInfo, setEditingContactInfo] = useState(false);

  // State to track which event is being edited
  const [editingEventId, setEditingEventId] = useState(null);
  // State to track which order is being edited
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editOrderInfo, setEditOrderInfo] = useState({});

  // alert state
  const [openSnackbar, setOpenSnackbar] = useState(true);

  useEffect(() => {
    dispatch({ type: "GET_USER_EVENT" });
    dispatch({ type: "GET_NEW_ORDER" });
  }, [dispatch]);

  //Function to delete a event row.
  function deleteUserEvent(id) {
    dispatch({ type: "USER_DELETE_EVENT", payload: id });
  }
  //Function that pushes user to to the order complete page.
  // function nextPage() {
  //   history.push(`/Complete`);
  // }

  //Edit events.
  function saveEditEvent(id) {
    const editEventObj = {
      event_type: editEventType,
      event_name: editEventName,
      event_date: editEventDate,
      user_id: user.id,
      calendar_id: 1,
      id: id,
    };
    dispatch({ type: "EDIT_USER_EVENT", payload: editEventObj });
    setEditingEventId(null);
  }

  // Edit Order details:
  function saveEditOrder(id) {
    const editOrderObj = {
      first_name: editFirstName,
      last_name: editLastName,
      address: editAddress,
      city: editCity,
      state: editState,
      zip: editZip,
      phone: editPhone,
      email: editEmail,
      total: Number(orders[0].total),
      payment_type: editOrderInfo.payment_type,
      is_payed: false,
      is_delivered: false,
      user_id: user.id,
      id: id,
    };
    dispatch({ type: "EDIT_ORDER", payload: editOrderObj });
    setEditingOrderId(null);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    return formatter.format(date);
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
    <div className="invoice-container" >
      <Card
            className="form-card"
            sx={{
              marginBottom: "50px",
              borderRadius: "25px",
            }}
          >
      <ThemeProvider theme={richlandTheme}>
      <u><h1 style={{fontSize: "40px", marginBottom: "1rem", textAlign: "center"}}>Review Order</h1></u>
      <h3 style={{ textAlign: "center"}}>3/3 Completed</h3>
      <div style={{ display: "flex", flexWrap: "wrap", padding: "2rem", }}>
         <hr/>
   

      <Paper elevation={6} 
    style={{
      width: "calc(50% - 20px)",
      margin: "10px",
      padding: "20px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    }}

    className="contact-info"
      >
        <h2 className=".h2-container">Contact information</h2>
        <div className="contactInfo">
          {orders.map((order) => (
            <section key={order.id}>
              <h2 className=".h2-container" >
                Name:{" "}
                {editingContactInfo ? (
                  <TextField
                    defaultValue={`${order.first_name} ${order.last_name}`}
                    onChange={(e) => {
                      setEditFirstName(e.target.value.split(" ")[0]);
                      setEditLastName(e.target.value.split(" ")[1]);
                    }}
                  />
                ) : (
                  `${order.first_name} ${order.last_name}`
                )}
              </h2>
              <h2>
                Address:{" "}
                {editingContactInfo ? (
                  <TextField
                    defaultValue={order.address}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                ) : (
                  order.address
                )}
              </h2>
              <h2>
                Phone:{" "}
                {editingContactInfo ? (
                  <TextField
                    defaultValue={order.phone}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                ) : (
                  order.phone
                )}
              </h2>
              <h2>
                Email:{" "}
                {editingContactInfo ? (
                  <TextField
                    defaultValue={order.email}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  order.email
                )}
              </h2>
              {editingContactInfo ? (
                <>
                  <IconButton
                    onClick={() => {
                      saveEditOrder(order.id);
                      setEditingContactInfo(false);
                    }}
                  >
                    <CheckIcon color="success" fontSize="large" />
                  </IconButton>
                  <Button
                    onClick={() => setEditingContactInfo(false)}
                    color="error"
                    fontSize="large"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
               sx={{marginLeft:"150px"}}
                  fontSize="large"
                  color="success"
                  variant="contained"
                  onClick={() => {
                    setEditingContactInfo(true);
                    setEditFirstName(order.first_name);
                    setEditLastName(order.last_name);
                    setEditAddress(order.address);
                    setEditCity(order.city);
                    setEditState(order.state);
                    setEditZip(order.zip);
                    setEditPhone(order.phone);
                    setEditEmail(order.email);
                  }}
                >
                  Edit
                </Button>
              )}
            </section>
          ))}
        </div>
        </Paper>
       
       
        <Paper className="order-info" elevation={6} 
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
            <TableBody>
              <h1>Order Information</h1>
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
                  {["address", "city", "state", "zip"].map((field) => (
                    <TableCell key={field}>
                      {editingOrderId === orderInfo.id ? (
                        <TextField
                          defaultValue={orderInfo[field]}
                          onChange={(e) => {
                            if (field === "address") {
                              setEditAddress(e.target.value);
                            } else if (field === "city") {
                              setEditCity(e.target.value);
                            } else if (field === "state") {
                              setEditState(e.target.value);
                            } else if (field === "zip") {
                              setEditZip(e.target.value);
                            }
                          }}
                        />
                      ) : (
                        orderInfo[field]
                      )}
                    </TableCell>
                  ))}

                  <TableCell>
                    {editingOrderId === orderInfo.id ? (
                      <Select
                        value={
                          editOrderInfo.payment_type || orderInfo.payment_type
                        }
                        onChange={(e) =>
                          setEditOrderInfo({
                            ...editOrderInfo,
                            payment_type: e.target.value,
                          })
                        }
                        displayEmpty
                      >
                        <MenuItem value={orderInfo.payment_type}>
                          <em>{orderInfo.payment_type}</em>
                        </MenuItem>
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Check">Check</MenuItem>
                      </Select>
                    ) : (
                      orderInfo.payment_type
                    )}
                  </TableCell>
                  <TableCell>${orderInfo.total}</TableCell>
                  <TableCell>
                    {editingOrderId === orderInfo.id ? (
                      <>
                        <IconButton
                          color="success"
                          fontSize="large"
                          onClick={() => saveEditOrder(orderInfo.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                        <Button
                          color="error"
                          fontSize="large"
                          variant="contained"
                          onClick={() => setEditingOrderId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        fontSize="large"
                        color="success"
                        variant="contained"
                        onClick={() => {
                          setEditingOrderId(orderInfo.id);
                          setEditFirstName(orderInfo.first_name);
                          setEditLastName(orderInfo.last_name);
                          setEditAddress(orderInfo.address);
                          setEditCity(orderInfo.city);
                          setEditState(orderInfo.state);
                          setEditZip(orderInfo.zip);
                          setEditPhone(orderInfo.phone);
                          setEditEmail(orderInfo.email);
                          setEditOrderInfo({
                            payment_type: orderInfo.payment_type,
                          });
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </div>
        </section>
        </Paper>
        </div>
        </ThemeProvider>

        <div className="event-details">
        <u><h1 style={{fontSize: "40px", marginBottom: "1rem", textAlign: "center"}}>Event Details</h1></u>
        
          <Paper elevation={5}>
          <TableContainer  className="event-details" component={Paper}>
      
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Event Type</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      {editingEventId === event.id ? (
                        <TextField
                          type="date"
                          defaultValue={event.event_date}
                          onChange={(e) => setEditEventDate(e.target.value)}
                        />
                      ) : (
                        formatDate(event.event_date)
                      )}
                    </TableCell>
                    <TableCell>
                      {editingEventId === event.id ? (
                        <Select
                          value={editEventType}
                          onChange={(e) => setEditEventType(e.target.value)}
                          displayEmpty
                        >
                          <MenuItem value={event.event_type}>
                            <em>{event.event_type}</em>
                          </MenuItem>
                          <MenuItem value="Birthday">Birthday</MenuItem>
                          <MenuItem value="Anniversary">Anniversary</MenuItem>
                          <MenuItem value="Memorial">Memorial</MenuItem>
                        </Select>
                      ) : (
                        event.event_type
                      )}
                    </TableCell>

                    <TableCell>
                      {editingEventId === event.id ? (
                        <TextField
                          defaultValue={event.event_name}
                          onChange={(e) => setEditEventName(e.target.value)}
                        />
                      ) : (
                        event.event_name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingEventId === event.id ? (
                        <>
                          <IconButton onClick={() => saveEditEvent(event.id)}>
                            <CheckIcon color="success" fontSize="large" />
                          </IconButton>
                          <Button

                        sx={{marginRight:" 50px"}}
                            color="error"
                            fontSize="large"
                            variant="contained"
                            onClick={() => setEditingEventId(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                        className="edit-button"
                        sx={{fontFamily:" Libre Baskerville, serif;"}}
                          fontSize="large"
                          color="success"
                          variant="contained"
                          onClick={() => {
                            setEditingEventId(event.id);
                            setEditEventType(event.event_type);
                            setEditEventName(event.event_name);
                            setEditEventDate(event.event_date);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => deleteUserEvent(event.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          
          </TableContainer>
          </Paper>
        </div>

        <Notification />
        <ConfirmDialog />

        <Snackbar
          open={openSnackbar}
          autoHideDuration={9000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="info"
            sx={{
              fontWeight: "bold",
            }}
          >
            Please review and verify the information provided below.
          </Alert>
        </Snackbar>
      
        </Card>
    </div>
  );
}
