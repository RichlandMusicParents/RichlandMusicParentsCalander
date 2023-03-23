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

export default function AdminAddEvents() {
  const userId = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "GET_NEW_ORDER", payload: userId });
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
  const order = useSelector((store) => store.order.newOrder);
  const products = useSelector((store) => store.product);

  useEffect(() => {
    order[0] !== undefined && setOrderId(order[0].id);
  }, [order]);

  console.log("User ID:", Number(userId.id));
  console.log("Order items:", orderItems);
  console.log("User:", user);
  console.log("Events:", events);
  console.log("Order:", order);

  const [orderId, setOrderId] = useState(0);
  const [eventType, setEventType] = useState("0");
  const [eventDate, setEventDate] = useState("");
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

  useEffect(() => {
    order[0] !== undefined && setOrderId(order[0].id);
  }, [order]);

  function addItems(product_id, price) {
    console.log(product_id, price);
    const orderItems = {
      quantity: 1,
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
    dispatch({ type: "ADMIN_DELETE_EVENT", payload: userId });
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
      user_id: userId.id,
      calendar_id: Number(calId),
    };

    dispatch({ type: "ADMIN_ADD_EVENTS", payload: eventObj });
  }

  function saveEditEvent() {
    const editEventObj = {
      id: editId,
      event_type: editEventType,
      event_name: editEventName,
      event_date: editEventDate,
      user_id: userId.id,
      calendar_id: editCalId,
    };

    dispatch({ type: "ADMIN_EDIT_EVENTS", payload: editEventObj });

    setEditMode(false);
  }

  function sendToReview() {
    history.push(`/admin-order-review/${Number(userId.id)}`);
  }

  return (
    <>
      <div className="add-items-container">
        <header className="add-items">
          <h2>Add Items</h2>
        </header>
        {products.map((product) => (
          <div key={product.id} className="items-form">
            <h3>
              {product.name}: {product.price}
            </h3>
            <Button onClick={() => addItems(product.id, product.price)}>
              Add
            </Button>
          </div>
        ))}
        {orderItems.map((item) => (
          <div className="items-cart">
            {itemEditMode && item.id === itemEditId ? (
              <div key={item.id} className="item">
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
              </div>
            ) : (
              <div key={item.id} className="item">
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
                    {editMode && edituserId === event.userId ? (
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
        <Button onClick={sendToReview}>Review</Button>
      </div>
    </>
  );
}
