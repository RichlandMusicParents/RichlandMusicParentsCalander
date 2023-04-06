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
  const events = useSelector((store) => store.eventReducer);
  const calendars = useSelector((store) => store.calendar);
  const products = useSelector((store) => store.product.productReducer);
  console.log("in products", products);
  const user = useSelector((store) => store.user);
  const orders = useSelector((store) => store.order.newOrder);
  const orderItems = useSelector((store) => store.orderItemsReducer);

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

  // state fo

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
