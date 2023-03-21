import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead,
  TableContainer,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminAddEvents from "./AdminAddEvents";

export default function AdminAddOrder() {
  const userId = useParams();
  const user = useSelector((store) => store.adminReducer.specificUser);
  const events = useSelector((store) => store.adminReducer.specificEvents);
  console.log(user);
  console.log(events);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [uId, setUId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [paymentType, setPaymentType] = useState("0");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPayed, setIsPayed] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [total, setTotal] = useState(0);
  const [calendars, setCalendars] = useState();
  const [eventType, setEventType] = useState("0");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [calId, setCalId] = useState("0");
  const [userFirst, setUserFirst] = useState("");
  const [userLast, setUserLast] = useState("");
  const dispatch = useDispatch();
  console.log("our user:", userId);
  const order = [];

  useEffect(() => {
    dispatch({ type: "ADMIN_GET_ALL_USERS" });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
  }, []);

  useEffect(() => {
    user[0] !== undefined && setUserFirst(user[0].first_name);
    user[0] !== undefined && setUserLast(user[0].last_name);
    user[0] !== undefined && setUId(user[0].id);
  }, [user]);

  function createEvent() {
    const eventObj = {
      event_type: eventType,
      event_name: eventName,
      event_date: eventDate,
      user_id: uId,
      calendar_id: Number(calId),
    };

    console.log(eventObj);
    dispatch({ type: "ADMIN_ADD_EVENT", payload: eventObj });
  }

  function addInfo() {
    const orderObj = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      state: state,
      zip: zip,
      user_id: uId,
      email: email,
      phone: phone,
      total:
        events.length > 5
          ? (events.length - 5) * 0.5 + 15 * Number(calendars)
          : 15 * Number(calendars),
      payment_type: paymentType,
      is_payed: isPayed,
      is_delivered: isDelivered,
    };

    dispatch({ type: "ADD_ORDER", payload: orderObj });
  }

  console.log(order);

  return (
    <>
      <div className="admin-add-order">
        <header className="admin-add-order-header">
          <h2>
            Add Info for {userFirst} {userLast}'s Order
          </h2>
        </header>
        <div className="admin-add-order-form">
          <TextField
            sx={{
              width: 150,
            }}
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Street Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Zip Code"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            label="Calendars"
            type="number"
            value={calendars}
            onChange={(e) => setCalendars(e.target.value)}
          />
          <Select
            sx={{
              width: 150,
            }}
            name="payment_method"
            id="payment_method"
            renderInput={(params) => (
              <TextField {...params} label="Payment Method" />
            )}
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <MenuItem value="0">Select Payment Method</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="check">Check</MenuItem>
            <MenuItem value="card">Card</MenuItem>
          </Select>
        </div>
        <div className="admin-add-events">
          <header>
            <h2>Add New Event</h2>
          </header>
          <div className="admin-add-event-form">
            <Select
              sx={{
                width: 150,
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
              renderInput={(params) => (
                <TextField {...params} label="Calendar" />
              )}
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
              onClick={createEvent}
            >
              Add Event
            </Button>
          </div>
        </div>
        <h2>{total}</h2>
      </div>
      <div className="admin-events-view">
        <Button onClick={addInfo}>Add Order</Button>
      </div>
      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Type</TableCell>
                <TableCell>Event Name</TableCell>
                <TableCell>Event Date</TableCell>
                <TableCell>Linked to</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow>
                  <TableCell>{event.event_type}</TableCell>
                  <TableCell>{event.event_name}</TableCell>
                  <TableCell>{event.event_date}</TableCell>
                  <TableCell>{`${userFirst} ${userLast}`}</TableCell>
                  <TableCell>
                    <Button>Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained">Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
