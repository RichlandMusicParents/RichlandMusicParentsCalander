import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";

export default function AdminAddEvents() {
  const userId = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: userId.id });
    dispatch({ type: "FETCH_PRODUCTS" });
    dispatch({
      type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
      payload: userId.id,
    });
  }, [dispatch]);

  const events = useSelector((store) => store.adminReducer.specificEvents);
  const user = useSelector((store) => store.adminReducer.specificUser);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );
  const order = useSelector((store) => store.adminReducer.specificOrder);
  const products = useSelector((store) => store.product);

  useEffect(() => {
    order[0] !== undefined && setOrderId(order[0].id);
  }, [order]);

  console.log("User ID:", Number(userId.id));
  console.log("Order items:", orderItems);
  console.log("User:", user);
  console.log("Events:", events);
  console.log("Order:", order);

  /* ==== ORDER ITEMS ===== */

  const [quantity, setQuantity] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [itemEditMode, setItemEditMode] = useState(false);
  const [itemEditId, setItemEditId] = useState(0);
  useEffect(() => {
    order[0] !== undefined && setOrderId(order[0].id);
  }, [order]);

  useEffect(() => {
    total();
  }, [orderItems]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < orderItems.length; i++) {
      totalVal +=
        Number(orderItems[i].price).toFixed(2) * Number(orderItems[i].quantity);
    }
    setCartTotal(totalVal);
  };

  function addItems(product_id, price) {
    const orderItems = {
      quantity: quantity,
      price,
      product_id,
      order_id: Number(orderId),
      user_id: Number(userId.id),
    };

    dispatch({ type: "ADMIN_ADD_ORDER_ITEMS", payload: orderItems });
    // console.log(orderItems);
  }

  function saveUpdate(product_id, price) {
    console.log(product_id, price);
    const orderItems = {
      id: itemEditId,
      quantity: quantity,
      price,
      product_id,
      order_id: Number(orderId),
      user_id: Number(userId.id),
    };

    dispatch({ type: "ADMIN_EDIT_ORDER_ITEMS", payload: orderItems });
    setItemEditMode(false);
  }

  function updateItem(id, itemQuantity) {
    setItemEditMode(true);
    setItemEditId(id);
    setQuantity(itemQuantity);
  }

  function deleteOrderItem(id) {
    dispatch({
      type: "ADMIN_DELETE_ORDER_ITEM",
      payload: { id: id, user_id: userId },
    });
    setQuantity(1);
  }

  /* ==== END ORDER ITEMS ===== */

  /* ==== EVENTS ==== */

  // ALL OF OUR EVENT STATES

  const [eventType, setEventType] = useState("0");
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [calId, setCalId] = useState("0");
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
      type: "ADMIN_DELETE_EVENT",
      payload: { id: id, user_id: userId },
    });
  }

  // FUNCTION TO ADD OUR NEW EVENT

  function addEvent() {
    const eventObj = {
      event_type: eventType,
      event_name: eventName,
      event_date: eventDate,
      user_id: userId.id,
      calendar_id: Number(calId),
    };

    dispatch({ type: "ADMIN_ADD_EVENTS", payload: eventObj });
  }

  // FUNCTION TO SAVE OUR EDITED EVENT

  function saveEditEvent() {
    const editEventObj = {
      id: eventEditId,
      event_type: editEventType,
      event_name: editEventName,
      event_date: editEventDate,
      user_id: userId.id,
      calendar_id: editCalId,
    };

    dispatch({ type: "ADMIN_EDIT_EVENTS", payload: editEventObj });

    setEventEditId(false);
  }

  /* ==== ORDER UPDATE ==== */

  // STATES FOR OUR ORDER OBJECT

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // VARIABLES THAT WON'T CHANGE ON THIS PAGE

  const paymentType = "0";
  const isPayed = false;
  const isDelivered = false;

  // USE EFFECT TO SET ALL OF OUR ORDER INFO FROM OUR STORE WHENEVER WE LOAD OR ORDER CHANGES

  useEffect(() => {
    // IF OUR ORDER[0] IS NOT UNDEFINED WE WILL SET EACH STATE TO THE CORRECT OBJECT KEY AND WE WILL DO THIS ANYTIME OUR ORDER STORE CHANGES
    // IF OUR ORDER[0] IS UNDEFINED WE WILL NOT SET ANY STATE WHICH MEANS WE WONT GET AN ERROR
    order[0] !== undefined && setFirstName(order[0].first_name);
    order[0] !== undefined && setLastName(order[0].last_name);
    order[0] !== undefined && setAddress(order[0].address);
    order[0] !== undefined && setCity(order[0].city);
    order[0] !== undefined && setZip(order[0].zip);
    order[0] !== undefined && setState(order[0].state);
    order[0] !== undefined && setEmail(order[0].email);
    order[0] !== undefined && setPhone(order[0].phone);
  }, [order]);

  // THIS IS OUR FUNCTION TO UPDATE OUR ORDER WITH THE CORRECT TOTAL

  function saveOrderInfo() {
    const orderObj = {
      id: orderId,
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      state: state,
      zip: Number(zip),
      user_id: Number(userId.id),
      email: email,
      phone: phone,
      total: cartTotal,
      payment_type: paymentType,
      is_payed: isPayed,
      is_delivered: isDelivered,
    };

    dispatch({ type: "ADMIN_EDIT_ORDER", payload: orderObj });
  }

  /* ==== END ORDER UPDATE ==== */

  function sendToReview() {
    saveOrderInfo();
    history.push(`/admin-order-review/${Number(userId.id)}`);
  }

  return (
    <>
      <div className="add-items-container">
        <header className="add-items">
          <h2>Add Items</h2>
        </header>
        {products.map((product) => (
          <>
            {!orderItems.some((item) => item.product_id === product.id) && (
              <div key={product.id} className="items-form">
                <h3>
                  {product.name}: {product.price}
                </h3>
                <Button onClick={() => addItems(product.id, product.price)}>
                  Add
                </Button>
              </div>
            )}
          </>
        ))}
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
      <div className="admin-add-event-form">
        <Select
          sx={{
            width: 150,
          }}
          renderInput={(params) => <TextField {...params} label="Event Type" />}
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
          }}
          label="Event Name"
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <TextField
          sx={{
            width: 150,
          }}
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <Select
          sx={{
            width: 150,
          }}
          name="calendar"
          id="eType"
          renderInput={(params) => <TextField {...params} label="Calendar" />}
          value={calId}
          onChange={(e) => setCalId(e.target.value)}
        >
          <MenuItem value="0">Select Calendar</MenuItem>
          <MenuItem value="1">2023</MenuItem>
        </Select>
        <Button
          sx={{
            width: 150,
            height: 50,
          }}
          variant="contained"
          onClick={addEvent}
        >
          Add Event
        </Button>
      </div>
      <div className="admin-events-view">
        <Paper>
          <h2>Created Events</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    width: 100,
                    height: 50,
                    margin: 0,
                  }}
                >
                  <TableCell>Event Type</TableCell>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Event Date</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
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
                            <MenuItem value="anniversary">Anniversary</MenuItem>
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
                        <TableCell></TableCell>
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
                          {event.first_name} {event.last_name}
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
        <h2>
          <NumericFormat
            className="subtotal"
            value={cartTotal}
            decimalScale={4}
            prefix={"$"}
            readOnly
          />
        </h2>
        <Button onClick={sendToReview} variant="contained">
          Review
        </Button>
      </div>
    </>
  );
}
