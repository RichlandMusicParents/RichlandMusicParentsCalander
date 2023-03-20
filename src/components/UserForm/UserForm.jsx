import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Input,
  Radio,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useHistory } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import UserPage from "../Pages/UserPage/UserPage";

function UserForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const orders = useSelector((store) => store.order);
  //console.log("in order", orders);
  const calendars = useSelector((store) => store.calendar);
  //console.log("in calendar", calendars);
  // order details form
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  // event form
  const [eventFor, setEventFor] = useState("");
  const [numCalendars, setNumCalendars] = useState(1);
  const [selectCalendarId, setSelectedCalendarID] = useState(null);
  const [eventOption, setEventOption] = useState(null);
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState("");
  const [numEvents, setNumEvents] = useState(0);

  useEffect(() => {
    dispatch({ type: "FETCH_CALENDAR" });
  }, []);

  // Dispatch for the events
 
  const eventHandleSubmit = () => {
    dispatch({
      type: "ADD_EVENTS",
      payload: {
        event_type: eventOption,
       event_date: date.$d,
       event_name: eventFor
      },
    })};


  const handleSubmit = () => {
    dispatch({
      type: "ADD_ORDER",
      payload: {
        first_name,
        last_name,
        email,
        address,
        city,
        state,
        zip,
        phone,
        payment,
        total,
        isDelivered,
        isPayed,
        calendar_id: selectCalendarId,
      },
    });
    history.push("/customerInvoice");
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setPhone("");
    setPayment("");
    setTotal("");
  };

  const handleAddEvent = () => {
    setNumEvents(numEvents + 1);
    setTotal(total + (numEvents > 4 ? 0.5 : 0));
  };

  const handleAddCalendar = () => {
    setNumCalendars(numCalendars + 1);
    setTotal(total + 15);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ marginTop: "40px", marginBottom: "-10px" }}>
        <Grid item xs={12} md={13}>
          <Card
            sx={{ borderRadius: "25px", width: "400px", marginLeft: "175px" }}>
            <h1>Richland Music Parents</h1>
            <h2>Listing Form</h2>
            <UserPage />
            <CardContent>
              <TextField
                label="First Name"
                type="text"
                name="firstname"
                value={first_name}
                required
                onChange={(event) => setFirstName(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>

            <CardContent>
              <TextField
                label="Last Name"
                type="text"
                name="lastname"
                value={last_name}
                required
                onChange={(event) => setLastName(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                label="Email"
                type="text"
                name="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>

            <CardContent>
              <TextField
                label="Address"
                type="text"
                name="address"
                value={address}
                required
                onChange={(event) => setAddress(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>

            <CardContent>
              <TextField
                label="City"
                type="text"
                name="city"
                value={city}
                required
                onChange={(event) => setCity(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                label="State"
                type="text"
                name="state"
                value={state}
                required
                onChange={(event) => setState(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                label="Zip Code"
                type="number"
                name="zip"
                value={zip}
                required
                onChange={(event) => setZip(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                label="Phone Number"
                type="text"
                name="phone"
                value={phone}
                required
                onChange={(event) => setPhone(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                label="Event for"
                type="text"
                name="Event for"
                value={eventFor}
                required
                onChange={(event) => setEventFor(event.target.value)}
                sx={{ marginBottom: "10px", width: "50%" }}
              />
            </CardContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={date} onChange={(date) => setDate(date)} />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="event-label"> Payment Options</InputLabel>

              <Select
                labelId="payment-select"
                label="Payment Options"
                value={payment}
                onChange={(event) => setPayment(event.target.value)}>
                <MenuItem value={"Debit"}> Debit </MenuItem>
                <MenuItem value={"Cash"}> Cash </MenuItem>
                <MenuItem value={"Check"}> Check </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel htmlFor="selectCalendarId">
                {" "}
                Calendar Year{" "}
              </InputLabel>
              <Select
                className="calendar-dropdown"
                name="selectedCaledarId"
                onChange={(event) => setSelectedCalendarID(event.target.value)}
                id="calendar"
                value={selectCalendarId}>
                {calendars.map((calendar) => (
                  <MenuItem value={calendar.id} key={calendar.id}>
                    {calendar.calendar_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel htmlFor="numCalendars">
                Number of Calendars
              </InputLabel>
              <Input
                id="numCalendars"
                type="number"
                value={numCalendars}
                onChange={(event) =>
                  setNumCalendars(Number(event.target.value))
                }
              />

              <Button onClick={handleAddCalendar}> Add Calendar</Button>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="event-label"> Event Options</InputLabel>

              <Select
                labelId="event-select"
                label="Event Options"
                value={events}
                onChange={(event) => setEvents(event.target.value)}>
                <MenuItem value={"Birthday"}> Birthday </MenuItem>
                <MenuItem value={"Aniversary"}> Anniversary </MenuItem>
                <MenuItem value={"In Memory Of"}> In Memory Of </MenuItem>
              </Select>
            </FormControl>
            <Button onClick={eventHandleSubmit} > Add Event </Button>
            <Button onClick={handleSubmit}> Check Out </Button>

            <h4>Total: {total}</h4>

            <FormControl>
                <FormLabel for="isPayed">Paid?</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group">
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                    checked={true}
                    onChange={() => {}}
                  />
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    checked={isPayed}
                    onChange={() => {}}
                  />
                </RadioGroup>
              </FormControl>
            <div>
         


              <FormControl>
              <FormLabel for="isDelivered">Delivered?</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group">
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No"
                  checked={true}
                  onChange={() => {}}
                />
                <FormControlLabel
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                  checked={isDelivered}
                  onChange={() => {}}
                />
              </RadioGroup>
            </FormControl>
            </div>


          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserForm;