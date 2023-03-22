import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

function Events(){
    const history = useHistory();
    const dispatch= useDispatch();
    const event = useSelector((store) => store.eventReducer);
    const calendars = useSelector((store) => store.calendar);
    const products = useSelector((store) => store.product);
    console.log("in products", products)
    const user = useSelector((store) => store.user);
    
    useEffect(() => {
        dispatch({ type: "GET_USER_EVENT" });
         dispatch({ type: "FETCH_USER_PRODUCTS" });
            dispatch({ type: "FETCH_CALENDAR" });
      }, []);
  
  
    //Function to delete a event row.
    function deleteUserEvent(id){
      dispatch({type: "USER_DELETE_EVENT", payload: id})
    }  

  // Dispatch for the events
  const eventHandleSubmit = () => {
    history.push("/customerInvoice")
       //let eventCost = numEvents > 5 ? (numEvents - 5) * 0.5 : 0;
    //let totalCost = total + eventCost + numCalendars * 15;

    dispatch({
      type: "ADD_PRODUCT",
          payload: {
            name: numCalendars,
            calendar_id: selectCalendarId,
          }
    })
    dispatch({
      type: `USER_ADD_EVENT`,
      payload: {
        event_type: eventOption,
        event_date: date,
        event_name: eventFor,
        user_id: user.id,
        calendar_id: selectCalendarId,
      },
    });
  };
  const handleAddEvent = () => {
    setNumEvents(numEvents + 1);
    setTotal(total + (numEvents > 4 ? 0.5 : 0));
  };
  

  const handleAddCalendar = () => {
    setNumCalendars(numCalendars + 1);
    setTotal(total + 15);
  };

   // event form
    const [eventFor, setEventFor] = useState("");
    const [numEventsQuan, setNumEventsQuan] = useState(0);
    const [numCalendars, setNumCalendars] = useState(0);
    const [selectCalendarId, setSelectedCalendarID] = useState(0);
    const [payment, setPayment] = useState("");
    const [eventOption, setEventOption] = useState("0");
    const [date, setDate] = useState("");
    const [events, setEvents] = useState("");
    const [numEvents, setNumEvents] = useState(0);
    const [total, setTotal] = useState(0);
    return (
        <>
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
            
            <Button onClick={eventHandleSubmit}> Check Out </Button>
           
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel htmlFor="numCalendars">
                Number of Events
              </InputLabel>
              <Input
                id="numEvents"
                type="number"
                value={numEventsQuan}
                onChange={(event) =>
                  setNumEventsQuan(Number(event.target.value))
                }
              />
              <Button onClick={handleAddEvent}> Add Event</Button>
              </FormControl>

            <h4>Total: {total}</h4>
            <p>Events left: {5 - numEvents}</p>
            <div>
            {products.map((product) => (
            <>
              <h3>
                {product.name}: {product.price}
              </h3>
              <Button onClick={() => handleAddCalendar(product.id, product.price)}>
                Add Calender
              </Button>
            </>
          ))}
            </div>
          

            <div></div>
            <div className="orderDetails">
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
              {event.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.event_date}</TableCell>
                  <TableCell>{event.event_type}</TableCell>
                  <TableCell>{event.event_name}</TableCell>
                  <TableCell><Button onClick={() => deleteUserEvent(event.id)}
                  >Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

        </>
    )
    
} export default Events