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
  TablePagination,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminAddEvents from "./AdminAddEvents";

export default function AdminAddOrder() {
  useEffect(() => {
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: userId });
  }, []);
  const users = useSelector((store) => store.adminReducer.allUsers);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [paymentType, setPaymentType] = useState("0");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState();
  const [isPayed, setIsPayed] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [userIdInput, setUserIdInput] = useState("");
  const [total, setTotal] = useState(0);
  const [calendars, setCalendars] = useState(0);
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [calId, setCalId] = useState("");
  const dispatch = useDispatch();
  const events = [];

  function createEvent() {
    const eventObj = {
      event_type: eventType,
      event_name: eventName,
      event_date: eventDate,
      user_id: Number(userId),
      calendar_id: Number(calId),
    };
  }

  function addInfo() {
    updateTotal();
    const orderObj = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      state: state,
      zip: zip,
      user_id: Number(userId),
      email: email,
      phone: phone,
      total: total,
      payment_type: paymentType,
      is_payed: isPayed,
      is_delivered: isDelivered,
    };

    console.log("Order Object", orderObj);
  }

  function updateTotal() {
    setTotal(total + 15 * Number(calendars));
    setTotal(events.length > 5 ? (events.length - 5) * 0.5 : total);
  }

  return (
    <>
      <div className="admin-add-order">
        <header className="admin-add-order-header">
          <h2>Add Customer Info</h2>
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
          <Autocomplete
            sx={{
              width: 150,
            }}
            value={userId}
            onChange={(event, newValue) => setUserId(newValue)}
            inputValue={userIdInput}
            onInputChange={(event, newInputValue) =>
              setUserIdInput(newInputValue)
            }
            id="user-list-lookup"
            getOptionLabel={(users) => `${users.first_name} ${users.last_name}`}
            options={users}
            isOptionEqualToValue={(option, value) =>
              option.first_name === value.first_name
            }
            noOptionsText={"No valid User"}
            renderOption={(props, users) => (
              <Box component="li" {...props} key={users.id}>
                {users.first_name} {users.last_name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Linked User" />
            )}
          />
          <Button onClick={addInfo}>Add Info</Button>
        </div>
        <AdminAddEvents />
        <h2>{total}</h2>
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
                  <TableCell>Created By</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}
