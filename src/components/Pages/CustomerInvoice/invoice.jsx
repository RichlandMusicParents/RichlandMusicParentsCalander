import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch } from "react-redux";
import eventReducer from "../../../redux/reducers/event.reducer";
import orderReducer from "../../../redux/reducers/order.reducer";
import { useHistory } from "react-router-dom";

export default function Invoice() {
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.eventReducer);
  const orders = useSelector((store) => store.order.newOrder);

  const history = useHistory();

  const calendars = useSelector((store) => store.calendar);
  const dispatch = useDispatch();
  //State
  const [editEventType, setEditEventType] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editCreatedBy, setEditCreatedBy] = useState(null);
  const [editCalId, setEditCalId] = useState(null);

  // State to track which event is being edited
  const [editingEventId, setEditingEventId] = useState(null);
  // State to track which order is being edited
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editOrderInfo, setEditOrderInfo] = useState({});

  useEffect(() => {
    dispatch({ type: "GET_USER_EVENT" });
  }, [dispatch]);

  //Function to delete a event row.
  function deleteUserEvent(id) {
    dispatch({ type: "USER_DELETE_EVENT", payload: id });
  }
  //Function that pushes user to to the order complete page.
  function nextPage() {
    history.push(`/Complete`);
  }

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

  //Edit Order details:
  function saveEditOrder() {}

  return (
    <>
      <h1>Contact information</h1>
      <div className="contactInfo">
        {orders.map((order) => (
          <section key={order.id}>
            <h2>
              Name: {order.first_name} {order.last_name}
            </h2>
            <h2>Address: {order.address}</h2>
            <h2>Phone: {order.phone}</h2>
            <h2>Email: {order.email}</h2>
            <h2>Email: {order.id}</h2>
          </section>
        ))}
      </div>

      <div className="eventDetails">
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
                      event.event_date
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
                        <Button onClick={() => saveEditEvent(event.id)}>
                          Save
                        </Button>
                        <Button onClick={() => setEditingEventId(null)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
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

      <div className="orderDetails">
        <TableBody>
          {orders.map((orderInfo) => (
            <TableRow key={orderInfo.id}>
              {["address", "city", "state", "zip"].map((field) => (
                <TableCell key={field}>
                  {editingOrderId === orderInfo.id ? (
                    <TextField
                      defaultValue={orderInfo[field]}
                      onChange={(e) =>
                        setEditOrderInfo({
                          ...editOrderInfo,
                          [field]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    orderInfo[field]
                  )}
                </TableCell>
              ))}
              <TableCell>{orderInfo.payment_type}</TableCell>
              <TableCell>{orderInfo.total}</TableCell>
              <TableCell>
                {editingOrderId === orderInfo.id ? (
                  <>
                    <Button onClick={() => saveEditOrder(orderInfo.id)}>
                      Save
                    </Button>
                    <Button onClick={() => setEditingOrderId(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setEditingOrderId(orderInfo.id)}>
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Button onClick={() => nextPage()}>Complete Order</Button>
      </div>
    </>
  );
}
