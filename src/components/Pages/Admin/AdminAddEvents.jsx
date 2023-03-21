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

export default function AdminAddEvents() {
  const id = useParams();
  const events = useSelector((store) => store.adminReducer.specificEvents);
  const user = useSelector((store) => store.adminReducer.specificUser);
  const order = useSelector((store) => store.order);
  const products = useSelector((store) => store.product);
  const [eventType, setEventType] = useState("0");
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [calId, setCalId] = useState("0");
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  console.log(order);
  console.log(calId);

  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: id });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: id });
    dispatch({ type: "GET_SPECIFIC_ORDER", payload: id });
    dispatch({ type: "FETCH_PRODUCTS" });
  }, [dispatch]);

  console.log(products);

  function addOrderItems() {
    const orderItems = {
      quantity,
      price,
      product_id,
      order_id,
    };
  }

  function addEvent() {
    const eventObj = {
      event_type: eventType,
      event_name: eventName,
      event_date: eventDate,
      user_id: userId.id,
      calendar_id: Number(calId),
    };

    console.log("Event being created:", eventObj);

    dispatch({ type: "ADMIN_ADD_EVENTS", payload: eventObj });
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
              <TextField
                sx={{
                  width: 50,
                }}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </>
          ))}
        </div>
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
                    <TableCell></TableCell>
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
      </div>
    </>
  );
}
