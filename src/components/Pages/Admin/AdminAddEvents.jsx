import {
  Autocomplete,
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
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

export default function AdminAddEvents() {
  const id = useParams();
  const events = useSelector((store) => store.adminReducer.specificEvents);
  const user = useSelector((store) => store.adminReducer.specificUser);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );
  const order = useSelector((store) => store.order.newOrder);
  const products = useSelector((store) => store.product);
  console.log("our order items", orderItems);
  const [userId, setUserId] = useState(0);
  const [eventType, setEventType] = useState("0");
  const [eventDate, setEventDate] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [eventName, setEventName] = useState("");
  const [calId, setCalId] = useState("0");
  const [quantity, setQuantity] = useState(0);
  const [itemEditMode, setItemEditMode] = useState(false);
  const [itemEditId, setItemEditId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editEventType, setEditEventType] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editCalId, setEditCalId] = useState(0);
  const dispatch = useDispatch();
  console.log(order);

  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: id });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: id });
    dispatch({ type: "GET_NEW_ORDER", payload: id });
    dispatch({
      type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
      payload: Number(id.id),
    });
    //
    dispatch({ type: "FETCH_PRODUCTS" });
  }, [dispatch]);

  useEffect(() => {
    order[0] !== undefined && setOrderId(order[0].id);
  }, [order]);

  useEffect(() => {
    user[0] !== undefined && setUserId(user[0].id);
  }, [user]);

  console.log("Order ID:", orderId);
  console.log(products);

  console.log("user id:", userId);

  function addItems(product_id, price) {
    console.log(product_id, price);
    const orderItems = {
      quantity: 1,
      price,
      product_id,
      order_id: Number(orderId),
      user_id: Number(id.id),
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
      user_id: Number(id.id),
    };

    dispatch({ type: "ADMIN_EDIT_ORDER_ITEMS", payload: orderItems });
    // console.log(orderItems);
  }

  function editEvents(id, type, name, date, editCalId) {
    setEditId(id);
    setEditMode(true);
    setEditEventType(type);
    setEditEventDate(date);
    setEditEventName(name);
    setEditCalId(editCalId);
  }

  function deleteEvent(id) {
    console.log(id);
    dispatch({ type: "ADMIN_DELETE_EVENT", payload: id });
  }

  function updateItem(id, itemQuantity) {
    setItemEditMode(true);
    setItemEditId(id);
    setQuantity(itemQuantity);
  }

  function addEvent() {
    const eventObj = {
      event_type: eventType,
      event_name: eventName,
      event_date: eventDate,
      user_id: id.id,
      calendar_id: Number(calId),
    };

    console.log("Event being created:", eventObj);

    dispatch({ type: "ADMIN_ADD_EVENTS", payload: eventObj });
  }

  function saveEditEvent() {
    const editEventObj = {
      id: editId,
      event_type: editEventType,
      event_name: editEventName,
      event_date: editEventDate,
      user_id: id.id,
      calendar_id: editCalId,
    };

    console.log(editEventObj);

    dispatch({ type: "ADMIN_EDIT_EVENTS", payload: editEventObj });

    setEditMode(false);
  }

  return (
    <>
      <div className="add-items-container">
        <header className="add-items">
          <h2>Add Items</h2>
        </header>
        <div className="items-form">
          {products.map((product) => (
            <>
              <h3>
                {product.name}: {product.price}
              </h3>
              <Button onClick={() => addItems(product.id, product.price)}>
                Add
              </Button>
            </>
          ))}
        </div>
        {orderItems.map((item) => (
          <div className="items-cart">
            {itemEditMode && item.id === itemEditId ? (
              <>
                <h3>{item.name}</h3>
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
              </>
            ) : (
              <>
                {" "}
                <h3>{item.name}</h3>
                <TextField
                  sx={{
                    width: 50,
                  }}
                  label="Quantity"
                  type="text"
                  value={item.quantity}
                  onClick={() => updateItem(item.id, item.quantity)}
                />
              </>
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
                    {editMode && editId === event.id ? (
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
      </div>
    </>
  );
}
