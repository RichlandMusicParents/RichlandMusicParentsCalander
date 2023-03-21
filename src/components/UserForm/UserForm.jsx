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
  const user = useSelector((store) => store.user);
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
  const [email, setEmail] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  // event form
  const [eventFor, setEventFor] = useState("");
  const [numCalendars, setNumCalendars] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [selectCalendarId, setSelectedCalendarID] = useState(0);

  const [eventOption, setEventOption] = useState("0");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState("");
  const [numEvents, setNumEvents] = useState(0);
  console.log(date);

  console.log(firstName);
  useEffect(() => {
    dispatch({ type: "FETCH_ORDER" });

    dispatch({ type: "FETCH_CALENDAR" });
  }, []);

  // Dispatch for the events

  const eventHandleSubmit = () => {
    // dispatch({
    //   type: `USER_ADD_EVENT`,
    //   payload: {
    //     event_type: eventOption,
    //     event_date: date,
    //     event_name: eventFor,
    //     user_id: user.id,
    //     calendar_id: selectCalendarId,
    //   },
    // });
  };

  const handleSubmit = () => {
    //let eventCost = numEvents > 5 ? (numEvents - 5) * 0.5 : 0;
    //let totalCost = total + eventCost + numCalendars * 15;

    dispatch({
      type: "ADD_EVENT",
      payload: {
        event_type: eventOption,
        event_date: date,
        event_name: eventFor,
        user_id: user.id,
        calendar_id: selectCalendarId,
      },
    });

    dispatch({
      type: "ADD_ORDER",
      payload: {
        email,
        first_name: firstName,
        last_name: lastName,
        address,
        city,
        state,
        zip,
        phone,
        payment_type: payment,
        total: totalCost,
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
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ marginTop: "40px", marginBottom: "-10px" }}
      >
        <Grid item xs={12} md={13}>
          <Card
            sx={{ borderRadius: "25px", width: "400px", marginLeft: "175px" }}
          >
            <h1>Richland Music Parents</h1>
            <h2>Listing Form</h2>
            <UserPage />
            <CardContent>
              <TextField
                label="First Name"
                type="text"
                name="firstname"
                value={firstName}
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
                value={lastName}
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
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={date} onChange={(date) => setDate(date)} />
            </LocalizationProvider> */}
            <TextField
              sx={{
                width: 150,
              }}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="event-label"> Payment Options</InputLabel>

              <Select
                labelId="payment-select"
                label="Payment Options"
                value={payment}
                onChange={(event) => setPayment(event.target.value)}
              >
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
                value={selectCalendarId}
              >
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
                sx={{
                  width: 150,
                }}
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
            <Button> Add Event </Button>
            <Button onClick={handleSubmit}> Check Out </Button>

            <h4>Total: {total}!</h4>

           
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserForm;
