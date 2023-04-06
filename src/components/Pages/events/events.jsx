import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Event.css";
import { Card } from "@mui/material";
import { GoPlus } from "react-icons/go";
import { BsCartCheckFill } from "react-icons/bs";
import { format } from "date-fns";

import UserCartComponent from "./userCart";

import {
  CardContent,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";


import "../Admin/AdminAddEvents.css";


function Events() {
  const history = useHistory();
  const dispatch = useDispatch();

  //connects to the redux store
  const event = useSelector((store) => store.eventReducer);

  const events = useSelector((store) => store.eventReducer);

  const calendars = useSelector((store) => store.calendar);
  const products = useSelector((store) => store.product.productReducer);
  const user = useSelector((store) => store.user);
  const orders = useSelector((store) => store.order.newOrder);
  const orderItems = useSelector((store) => store.orderItemsReducer);


  //UseState for event form
  const [eventFor, setEventFor] = useState("");
  const [numCalendars, setNumCalendars] = useState(0);
  const [selectCalendarId, setSelectedCalendarID] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [price, setPrice] = useState(0);
  const [eventOption, setEventOption] = useState("0");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState("");
  const [numEvents, setNumEvents] = useState(0);
  // const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState(null);

  // ORDER ITEMS
  // const [quantity, setQuantity] = useState(1);
  // const [cartTotal, setCartTotal] = useState(0);
  const [orderId, setOrderId] = useState(0);
  // const [itemEditMode, setItemEditMode] = useState(false);
  // const [itemEditId, setItemEditId] = useState(0);

  console.log("Calendars", calendars);

  // event form
  const [editMode, setEditMode] = useState(false);
  const [eventEditId, setEventEditId] = useState(0);
  const [editEventType, setEditEventType] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editCalId, setEditCalId] = useState(0);

  // FUNCTION THAT WILL ALLOW US TO EDIT OUR EVENTS BY SETTING OUR EDIT MODE TO TRUE
  // TO CONDITIONALLY RENDER OUR EDIT VIEW

  function editEvents(id, type, name, date, editCalId) {
    setEventEditId(id);
    setEditMode(true);
    setEditEventType(type);
    setEditEventDate(date);
    setEditEventName(name);
    setEditCalId(editCalId);
  }

  // FUNCTION TO DELETE OUR SPECIFIC EVENT

  function deleteEvent(id) {
    console.log(id);
    dispatch({
      type: "USER_DELETE_EVENT",
      payload: id,
    });
  }

  // FUNCTION TO ADD OUR NEW EVENT

  function addEvent() {
    const eventObj = {
      event_type: eventType,
      event_name: eventName,
      event_date: eventDate,
      user_id: user.id,
      calendar_id: Number(calId),
    };

    // console.log(eventObj);

    dispatch({ type: "USER_ADD_EVENT", payload: eventObj });
  }

  // FUNCTION TO SAVE OUR EDITED EVENT

  function saveEditEvent() {
    const editEventObj = {
      id: eventEditId,
      event_type: editEventType,
      event_name: editEventName,
      event_date: editEventDate,
      user_id: user.id,
      calendar_id: editCalId,
    };

    dispatch({ type: "ADMIN_EDIT_EVENTS", payload: editEventObj });

    setEventEditId(false);
  }



  // TESTING TOTAL
  useEffect(() => {
    orders[0] !== undefined && orders[0].id;
  }, [orders]);

  // END ORDER ITEMS

  useEffect(() => {
    dispatch({ type: "GET_USER_EVENT" });
    dispatch({ type: "FETCH_USER_PRODUCTS" });
    dispatch({ type: "FETCH_CALENDAR" });
    dispatch({ type: "GET_NEW_ORDER" });
    dispatch({ type: "FETCH_ORDER_ITEMS" });
  }, []);

  //Function to delete a event row.

  // Dispatch for the events

  // DELETE CAL AND EXTRA EVENTS (orderItems)
  // function deleteOrderItem(id) {
  //   dispatch({
  //     type: "DELETE_ORDER_ITEMS",
  //     payload: id,
  //   });
  //   setQuantity(1);
  // }
  // add cal and extra events (orderItems)
  function addItems(product_id, price) {
    const orderItems = {
      quantity: 1,
      price,
      product_id,
      order_id: orders[0].id,
      user_id: Number(user.id),
    };

    dispatch({ type: "ADD_ORDER_ITEMS", payload: orderItems });
  }

  const checkEventLimit = () => {
    if (events.length === 4) {
      alert(
        "You have reached the limit of 5 free events. You will need to purchase additional events beyond this limit."
      );
    }
  };

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
        <h1 className="form-title">Richland Music Parents</h1>
        <Card
          className="form-card"
          sx={{
            marginBottom: "50px",
            borderRadius: "4px",
          }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <u>
                <h1
                  style={{
                    fontSize: "40px",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}>
                  Event Form
                </h1>
              </u>
              <h3 style={{ textAlign: "center" }}>2/3 Completed</h3>
              <hr />
              <br />
              <br />
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <FormControl fullWidth sx={{ width: "100%" }}>
                  <InputLabel htmlFor="selectCalendarId">
                    {" "}
                    Calendar Year{" "}
                  </InputLabel>
                  <Select
                    fullWidth
                    className="calendar-dropdown"
                    name="selectedCaledarId"
                    onChange={(event) =>
                      setSelectedCalendarID(event.target.value)
                    }
                    id="calendar"
                    value={selectCalendarId}>
                    {calendars.map((calendar) => (
                      <MenuItem value={calendar.id} key={calendar.id}>
                        {calendar.calendar_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              <CardContent>
                <TextField
                  sx={{ width: "100%" }}
                  fullWidth
                  label="Event for"
                  type="text"
                  name="Event for"
                  value={eventFor}
                  required
                  onChange={(event) => setEventFor(event.target.value)}
                />
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              <CardContent>
                <TextField
                  sx={{ width: "100%" }}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              <CardContent>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="event-label"> Event Options</InputLabel>
                  <Select
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Event Type" />
                    )}
                    name="event_type"
                    id="eType"
                    value={eventOption}
                    onChange={(e) => setEventOption(e.target.value)}>
                    <MenuItem value="0">Select Event Type</MenuItem>
                    <MenuItem value="birthday">Birthday</MenuItem>
                    <MenuItem value="anniversary">Anniversary</MenuItem>
                    <MenuItem value="memorial">Memorial</MenuItem>
                  </Select>
                </FormControl>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#4caf50",
                      padding: "7px",
                      color: "white",
                      fontSize: "1.2rem",
                      height: "100%",
                      fontWeight: "600",
                      boxShadow: "none",
                      marginTop: "2rem",
                      borderRadius: "50px",
                      "&:hover": {
                        backgroundColor: "#4caf50",
                      },
                    }}
                    onClick={eventHandleSubmit}>
                    {" "}
                    Add Event{" "}
                  </Button>
                </Grid>
              </CardContent>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={8}>
                <UserCartComponent />
              </Grid>
              <Grid>
                <article
                  className="cart-icon-container"
                  style={{
                    padding: "1rem",
                    borderRadius: "4px",

                    marginLeft: "0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}>
                  {products.map((product) => (
                    <>
                      {!orderItems.some(
                        (item) => item.product_id === product.id
                      ) ? (
                        <>
                          <div
                            key={product.id}
                            className="product-item"
                            style={{ marginBottom: "1rem" }}>
                            <h3
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                              }}>
                              {product.name}: ${product.price}
                            </h3>
                            <GoPlus
                              className="product-cart-icon cart-plus"
                              onClick={() =>
                                addItems(product.id, product.price)
                              }
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            key={product.id}
                            className="product-cart-item "
                            style={{ marginBottom: "1rem" }}>
                            <h3
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                              }}>
                              {product.name}: ${product.price}
                            </h3>
                            <BsCartCheckFill className="product-cart-icon" />
                          </div>
                        </>
                      )}
                    </>
                  ))}
                </article>
              </Grid>
            </Grid>
            <div
              className="event-details"
              style={{
                width: "100%",
                marginLeft: "1rem",
                marginRight: "-1rem",
                marginTop: "-500px",
              }}>
              <u>
                <h1
                  style={{
                    fontSize: "40px",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}>
                  Event Details
                </h1>
              </u>
              <Paper
                elevation={12}
                className="event-table"
                style={{ padding: "1rem" }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                          Date
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                          Event Type
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                          Name
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                          Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {event.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell style={{ fontSize: "1.2rem" }}>
                            {formatDate(event.event_date)}
                          </TableCell>
                          <TableCell style={{ fontSize: "1.2rem" }}>
                            {event.event_type}
                          </TableCell>
                          <TableCell style={{ fontSize: "1.2rem" }}>
                            {event.event_name}
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              variant="contained"
                              sx={{
                                backgroundColor: "#b80000",
                                color: "white",
                                fontSize: "1.2rem",
                                fontWeight: "600",
                                padding: "1rem 2rem",
                                boxShadow: "none",
                                marginTop: "2rem",
                                borderRadius: "50px",
                                "&:hover": {
                                  backgroundColor: "#bf4040",
                                },
                              }}
                              onClick={() => deleteUserEvent(event.id)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  height: "65px",
                  fontSize: "1.2rem",
                  marginLeft: "900px",
                  fontWeight: "600",
                  boxShadow: "none",
                  marginTop: "2rem",
                  marginBottom: "3rem",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: "#4caf50",
                  },
                }}
                onClick={handleCheckout}>
                {" "}
                Check Out{" "}
              </Button>
            </div>
          </Grid>
        </Card>
=======
  const [eventType, setEventType] = useState("0");
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [calId, setCalId] = useState("0");

  return (
    <>
      <h1 className="form-title">Richland Music Parents</h1>
      <ThemeProvider theme={richlandTheme}>
        <div className="admin-add-products-top">
          <section className="add-items-container">
            <header className="add-items">
              <h2>Products</h2>
            </header>
            <article className="items">
              {products.map((product) => (
                <>
                  {!orderItems.some(
                    (item) => item.product_id === product.id
                  ) ? (
                    <>
                      <div key={product.id} className="product-item">
                        <h3>
                          {product.name}: ${product.price}
                        </h3>
                        <GoPlus
                          className="product-cart-icon cart-plus"
                          onClick={() => addItems(product.id, product.price)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div key={product.id} className="product-item">
                        <h3>
                          {product.name}: ${product.price}
                        </h3>
                        <BsCartCheckFill className="product-cart-icon" />
                      </div>
                    </>
                  )}
                </>
              ))}
            </article>
          </section>

          <div className="admin-add-event-form-container">
            <header className="event-form-header">
              <h2>Add Events</h2>
            </header>
            <div className="admin-add-event-form">
              <Select
                sx={{
                  width: 150,
                  margin: 1,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Event Type" />
                )}
                name="event_type"
                id="eType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <MenuItem value="0">Select Event Type</MenuItem>
                <MenuItem value="birthday">Birthday</MenuItem>
                <MenuItem value="anniversary">Anniversary</MenuItem>
                <MenuItem value="memorial">Memorial</MenuItem>
              </Select>
              <TextField
                sx={{
                  width: 150,
                  margin: 1,
                }}
                label="Event Name"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <TextField
                sx={{
                  width: 150,
                  margin: 1,
                }}
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <Select
                sx={{
                  width: 150,
                  margin: 1,
                }}
                name="calendar"
                id="eType"
                renderInput={(params) => (
                  <TextField {...params} label="Calendar" />
                )}
                value={calId}
                onChange={(e) => setCalId(e.target.value)}
              >
                <MenuItem value={calId}>Select Calendar</MenuItem>
                {calendars.map((cal) => {
                  return (
                    <MenuItem value={cal.id}>{cal.calendar_name}</MenuItem>
                  );
                })}
              </Select>
            </div>
            <Button
              sx={{
                width: 150,
                margin: 1,
                height: 50,
              }}
              variant="contained"
              onClick={addEvent}
            >
              Add Event
            </Button>
          </div>
          <UserCartComponent />
        </div>
        <section className="events-section">
          <Paper>
            <h2>Created Events</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: 150,
                        height: 50,
                        margin: 0,
                      }}
                    >
                      Event Type
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 150,
                        height: 50,
                        margin: 0,
                      }}
                    >
                      Event Name
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 150,
                        height: 50,
                        margin: 0,
                      }}
                    >
                      Event Date
                    </TableCell>

                    <TableCell
                      sx={{
                        width: 25,
                        height: 50,
                        margin: 0,
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        width: 25,
                        height: 50,
                        margin: 0,
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <TableRow
                      sx={{
                        width: 100,
                        height: 50,
                        margin: 0,
                      }}
                      key={event.id}
                    >
                      {editMode && eventEditId === event.id ? (
                        <>
                          <TableCell>
                            <Select
                              variant="outlined"
                              sx={{
                                width: 150,
                                height: 50,
                                margin: 0,
                              }}
                              renderInput={(params) => (
                                <TextField {...params} label="Event Type" />
                              )}
                              name="event_type"
                              id="eType"
                              value={editEventType}
                              onChange={(e) => setEditEventType(e.target.value)}
                            >
                              <MenuItem value="0">Select Event Type</MenuItem>
                              <MenuItem value="birthday">Birthday</MenuItem>
                              <MenuItem value="anniversary">
                                Anniversary
                              </MenuItem>
                              <MenuItem value="memorial">Memorial</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <TextField
                              sx={{
                                width: 150,
                              }}
                              label="Event Name"
                              type="text"
                              value={editEventName}
                              onChange={(e) => setEditEventName(e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              sx={{
                                width: 150,
                              }}
                              label="Event Date"
                              type="date"
                              value={editEventDate}
                              onChange={(e) => setEditEventDate(e.target.value)}
                            />
                          </TableCell>

                          <TableCell>
                            <Button onClick={saveEditEvent}>Save</Button>
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => setEditMode(false)}>
                              Cancel
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{event.event_type}</TableCell>
                          <TableCell>{event.event_name}</TableCell>
                          <TableCell>
                            {format(new Date(event.event_date), "MM/dd/yy")}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() =>
                                editEvents(
                                  event.id,
                                  event.event_type,
                                  event.event_name,
                                  event.event_date,
                                  event.calendar_id
                                )
                              }
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => deleteEvent(event.id)}
                              variant="contained"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </section>

      </ThemeProvider>
    </>
  );
}

export default Events;
