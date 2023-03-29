import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Event.css"
import {Card} from "@mui/material";

import {
  CardContent,
  CardActions,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Input,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";

import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { NumericFormat } from "react-number-format";

function Events() {
  const history = useHistory();
  const dispatch = useDispatch();
  const event = useSelector((store) => store.eventReducer);
  const calendars = useSelector((store) => store.calendar);
  const products = useSelector((store) => store.product);
  console.log("in products", products);
  const user = useSelector((store) => store.user);
  const orders = useSelector((store) => store.order.newOrder);
  //store for order items
  const orderItems = useSelector((store) => store.orderItemsReducer);
  // event form
  //  const { order_id } = useParams();
  // console.log("IN PARAMS", order_id)
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
  const [quantity, setQuantity] = useState(1);
  // const [cartTotal, setCartTotal] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [itemEditMode, setItemEditMode] = useState(false);
  const [itemEditId, setItemEditId] = useState(0);

  // state fo

  // TESTING TOTAL
  useEffect(() => {
    orders[0] !== undefined && orders[0].id;
  }, [orders]);

  useEffect(() => {
    addTotal();
  }, [orderItems]);

  const addTotal = () => {
    let totalVal = 0;
    for (let i = 0; i < orderItems.length; i++) {
      totalVal +=
        Number(orderItems[i].price).toFixed(2) * Number(orderItems[i].quantity);
    }
    setTotal(totalVal);
  };

  // END ORDER ITEMS

  useEffect(() => {
    dispatch({ type: "GET_USER_EVENT" });
    dispatch({ type: "FETCH_USER_PRODUCTS" });
    dispatch({ type: "FETCH_CALENDAR" });
    dispatch({ type: "GET_NEW_ORDER" });
    dispatch({ type: "FETCH_ORDER_ITEMS" });
  }, []);

  //Function to delete a event row.
  function deleteUserEvent(id) {
    dispatch({ type: "USER_DELETE_EVENT", payload: id });
  }

  // Dispatch for the events
  const eventHandleSubmit = () => {
    checkEventLimit();
    setNumEvents(numEvents + 1);
    console.log("this is ID", orders.id);

    dispatch({
      type: `USER_ADD_EVENT`,
      payload: {
        event_type: eventOption,
        event_date: date,
        event_name: eventFor,
        user_id: user.id,
        calendar_id: selectCalendarId,
      },
    });

    setEventFor("");
    setDate("");
    setEventOption("0");

  };
  const handleAddEvent = () => {
    setNumEvents(numEvents + 1);
    setQuantity(quantity + 1);
    setTotal(total + (numEvents > 4 ? 0.5 : 0));
    setQuantity(1);
  };

  const handleAddCalendar = () => {
    setNumCalendars(numCalendars + 1);
    setQuantity(quantity + 1);
    setTotal(total + 15);
    setQuantity(1);
  };

  // This will update the total and push the user to the next page.
  const handleCheckout = () => {
    const editOrderObj = {
      first_name: orders[0].first_name,
      last_name: orders[0].last_name,
      address: orders[0].address,
      city: orders[0].city,
      state: orders[0].state,
      zip: orders[0].zip,
      phone: orders[0].phone,
      email: orders[0].email,
      total: total,
      payment_type: orders[0].payment_type,
      is_payed: false,
      is_delivered: false,
      user_id: user.id,
      id: orders[0].id,
    };

    dispatch({ type: "EDIT_ORDER", payload: editOrderObj });
    history.push("/customerInvoice");
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    return formatter.format(date);
  }

  // DELETE CAL AND EXTRA EVENTS (orderItems)
  function deleteOrderItem(id) {
    dispatch({
      type: "DELETE_ORDER_ITEMS",
      payload: id,
    });
    setQuantity(1);
  }
  // add cal and extra events (orderItems)
  function addItems(product_id, price) {
    const orderItems = {
      quantity: quantity,
      price,
      product_id,
      order_id: orders[0].id,
      user_id: Number(user.id),
    };

    dispatch({ type: "ADD_ORDER_ITEMS", payload: orderItems });
  }
  // UPDATE CAL AND EXTRA EVENTS (orderItems)
  function updateItem(id, itemQuantity) {
    setItemEditMode(true);
    setItemEditId(id);
    setQuantity(itemQuantity);
  }
  function saveUpdate(product_id, price) {
    console.log(product_id, price);
    const orderItems = {
      id: itemEditId,
      quantity: quantity,
      price,
      product_id,
      order_id: Number(orders[0].id),
      user_id: Number(user.id),
    };

    dispatch({ type: "EDIT_ORDER_ITEMS", payload: orderItems });
    setItemEditMode(false);
    setQuantity(1);
  }

  // Function to alert user they ran out of free events.
  const checkEventLimit = () => {
    if (numEvents === 4 ) {
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
    <form
    noValidate autoComplete="off"
    className="form-container"
    
    >
    <ThemeProvider theme={richlandTheme}>
            <h1 className="form-title">Richland Music Parents</h1>
      <Card
      className="form-card"
      sx={{
       marginBottom:"50px",
       borderRadius:"25px" }}
      >

    
  
      <div className="extra-calendar-container">

       
        {orderItems.map((item) => (
          <div className="items-cart">
            {itemEditMode && item.id === itemEditId ? (
              <div key={item.id} className="item">
                <h3>
                  {item.name} {item.price}
                </h3>
                <TextField
                  sx={{
                    width: 50,
                  }}
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button onClick={() => saveUpdate(item.product_id, item.price)}>
                  Update
                </Button>
              </div>
            ) : (
              <div key={item.id} className="item">
                <h3>
                  {item.name} {item.price}
                </h3>
                <TextField
                  sx={{
                    width: 50,
                  }}
                  label="Quantity"
                  type="text"
                  value={item.quantity}
                  onClick={() => updateItem(item.id, item.quantity)}
                />
                <Button onClick={() => deleteOrderItem(item.id)}>Remove</Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Grid item xs={12} sm={6} md={2}>
            <FormControl 
            fullWidth
            sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="selectCalendarId">
                {" "}
                Calendar Year{" "}
              </InputLabel>
              <Select
              fullWidth
                className="calendar-dropdown"
                name="selectedCaledarId"
                onChange={(event) => setSelectedCalendarID(event.target.value)}
                id="calendar"
                value={selectCalendarId}
              >
                {calendars.map((calendar) => (
                  <MenuItem value={calendar.id} key={calendar.id}>
                    {calendar.calendar_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Event for"
              type="text"
              name="Event for"
              value={eventFor}
              required
              onChange={(event) => setEventFor(event.target.value)}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              sx={{ width: "100%" }}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
         
          <Grid item xs={12} sm={6} md={2}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="event-label"> Event Options</InputLabel>
              <Select
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Event Type" />
                )}
                name="event_type"
                id="eType"
                value={eventOption}
                onChange={(e) => setEventOption(e.target.value)}
              >
                <MenuItem value="0">Select Event Type</MenuItem>
                <MenuItem value="birthday">Birthday</MenuItem>
                <MenuItem value="anniversary">Anniversary</MenuItem>
                <MenuItem value="memorial">Memorial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
        {products.map((product) => (
          <>
            {!orderItems.some((item) => item.product_id === product.id) && (
              <div key={product.id} className="items-form">
                <h3>
                  {product.name}: {product.price}
                </h3>
                <Button onClick={() => addItems(product.id, product.price)}>
                  ADD
                </Button>
              </div>
            )}
          </>
        ))}
          <Grid item xs={12} sm={6} md={2}>
            <Button onClick={eventHandleSubmit}> Submit Event </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Button onClick={handleCheckout}> Check Out </Button>
      <h2>
        <NumericFormat
          className="subtotal"
          value={total}
          decimalScale={4}
          prefix={"$"}
          readOnly
        />
      </h2>

      {products.map((product) => (
        <div key={product.id}>
          {product.name === "Extra Event" && (
            <Button onClick={handleAddEvent}></Button>
          )}
          {product.name === "Calendar" && (
            <Button
              onClick={() => handleAddCalendar(product.id, product.price)}
            ></Button>
          )}
        </div>
      ))}

      <div></div>
      <div className="orderDetails">
        <h1>Event Details</h1>
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
              {event.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{formatDate(event.event_date)}</TableCell>
                  <TableCell>{event.event_type}</TableCell>
                  <TableCell>{event.event_name}</TableCell>
                  <TableCell>
                    <Button onClick={() => deleteUserEvent(event.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      </Card>
      </ThemeProvider>
      </form>
  );
}

export default Events;
