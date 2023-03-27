import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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

import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
import ReviewOrderInfo from "../Components/ReviewOrderInfo";

export default function AdminOrderOverview() {
  const userId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS", payload: userId.id });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: userId.id });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId.id });
  }, []);

  const [itemEditId, setItemEditId] = useState(0);
  const [itemEditMode, setItemEditMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderId, setOrderId] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);

  const [editMode, setEditMode] = useState(false);
  const [eventEditId, setEventEditId] = useState(0);
  const [editEventType, setEditEventType] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editCalId, setEditCalId] = useState(0);

  const orderUser = useSelector((store) => store.adminReducer.specificUser);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );

  const events = useSelector((store) => store.adminReducer.specificEvents);
  const specificOrder = useSelector(
    (store) => store.adminReducer.specificOrder
  );

  console.log("Order ID", orderId);
  console.log(orderTotal);

  useEffect(() => {
    specificOrder[0] !== undefined && setOrderId(specificOrder[0].id);
  }, [specificOrder]);

  useEffect(() => {
    specificOrder[0] !== undefined && setOrderTotal(specificOrder[0].total);
  }, [specificOrder]);

  function deleteOrderItem(id) {
    dispatch({
      type: "ADMIN_DELETE_ORDER_ITEM",
      payload: { id: id, user_id: userId },
    });
    setQuantity(1);
  }

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

  function editEvents(id, type, name, date, editCalId) {
    setEventEditId(id);
    setEditMode(true);
    setEditEventType(type);
    setEditEventDate(date);
    setEditEventName(name);
    setEditCalId(editCalId);
  }

  function deleteEvent(id) {
    console.log(id);
    dispatch({
      type: "ADMIN_DELETE_EVENT",
      payload: { id: id, user_id: userId },
    });
  }

  function updateItem(id, itemQuantity) {
    setItemEditMode(true);
    setItemEditId(id);
    setQuantity(itemQuantity);
  }

  useEffect(() => {
    total();
  }, [orderItems]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < orderItems.length; i++) {
      totalVal += Number(orderItems[i].price) * orderItems[i].quantity;
    }
    setOrderTotal(totalVal);
  };

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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentType, setPaymentType] = useState("0");
  const [isPayed, setIsPayed] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    specificOrder[0] !== undefined && setFirstName(specificOrder[0].first_name);
    specificOrder[0] !== undefined && setLastName(specificOrder[0].last_name);
    specificOrder[0] !== undefined && setAddress(specificOrder[0].address);
    specificOrder[0] !== undefined && setCity(specificOrder[0].city);
    specificOrder[0] !== undefined && setZip(specificOrder[0].zip);
    specificOrder[0] !== undefined && setState(specificOrder[0].state);
    specificOrder[0] !== undefined && setEmail(specificOrder[0].email);
    specificOrder[0] !== undefined && setPhone(specificOrder[0].phone);
  }, [specificOrder]);

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
      total: orderTotal,
      payment_type: paymentType,
      is_payed: isPayed,
      is_delivered: isDelivered,
    };

    // console.log(orderObj);

    dispatch({ type: "ADMIN_EDIT_ORDER", payload: orderObj });
  }

  function sendToAdmin() {
    saveOrderInfo();
    history.push("/admin");
  }
  return (
    <>
      <ReviewOrderInfo />
      <section className="order-methods">
        <Select
          sx={{
            width: 150,
            marginBlock: 1,
          }}
          renderInput={(params) => (
            <TextField {...params} label="Payment Method" />
          )}
          name="payment_type"
          id="pType"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <MenuItem value="0">Select Payment Type</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Check">Check</MenuItem>
          <MenuItem value="Card">Card</MenuItem>
        </Select>
      </section>
      <div className="order-items-area">
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
      </div>
      <h1>
        SubTotal
        <NumericFormat
          className="subtotal"
          value={orderTotal}
          decimalScale={4}
          prefix={"$"}
          readOnly
        />
      </h1>
      <Button variant="contained" onClick={sendToAdmin}>
        Complete Order
      </Button>
    </>
  );
}
