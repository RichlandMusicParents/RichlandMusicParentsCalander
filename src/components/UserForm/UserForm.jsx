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
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

function UserForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const orders = useSelector((store) => store.order);
  console.log("in order", orders);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [eventFor, setEventFor] = useState("");
  const [total, setTotal] = useState(15);
  const [payment, setPayment] = useState({ method: "" });
  const [numCalendars, setNumCalendars] = useState(1);
  
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [eventOption, setEventOption] = useState(null);
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [numEvents, setNumEvents] = useState(0);

  useEffect(() => {
    dispatch({ type: "FETCH_ORDER"});

  }, []);

  // const eventHandleSubmit = () => {
  //   dispatch({
  //       type:`USER_ADD_EVENT`,
  //       payload: {
  //           eventOption,
  //           date,
  //           eventFor

  //       },
  //   });

  const handleSubmit = () => {
    let eventCost = numEvents > 5 ? (numEvents - 5) * 0.5 : 0;

    dispatch({
        type:"ADD_ORDER",
        payload: {
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            phone,
            payment, 
            total
        },
    });
history.push("/registration")
setFirstName(""),
setLastName(""),
setAddress(""),
setCity(""),
setState(""),
setZip(""),
setPhone(""),
setPayment({ method: null, details: null }),
setTotal("")
  };

    const handleAddEvent = () => {
    setNumEvents(numEvents + 1);
    setTotal(total + (numEvents > 4 ? 0.5 : 0));
  }

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

            <CardContent>
              <TextField label="First Name"
               type="text"
               name="firstname"
               value={firstName}
               required
               onChange={(event) => setFirstName(event.target.value)}
               sx={{ marginBottom: "10px", width: "50%" }} />
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
               type="text"
               name="zip"
               value={zip}
               required
               onChange={(event) => setZip(event.target.value)}
               sx={{ marginBottom: "10px", width: "50%" }}/>
            </CardContent>
            <CardContent>
              <TextField 
              label="Phone Number" 
              type="text"
              name="phone"
              value={phone}
              required
              onChange={(event) => setPhone(event.target.value)}
              sx={{ marginBottom: "10px", width: "50%" }}/>
            </CardContent>
            <CardContent>
              <TextField 
              label="Event for" 
              type="text"
              name="Event for"
              value={eventFor}
              required
              onChange={(event) => setEventFor(event.target.value)}
              sx={{ marginBottom: "10px", width: "50%" }}/>
            </CardContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="event-label"> Payment Options</InputLabel>

              <Select labelId="payment-select" 
              label="Event Options"
              value={payment.method}
              onChange={(event) =>
                setPayment({ ...payment, method: event.target.value })
              }
              >
                <MenuItem value={"Debit"}> Debit </MenuItem>
                <MenuItem value={"Cash"}> Cash </MenuItem>
                <MenuItem value={"Check"}> Check </MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="event-label"> Event Options</InputLabel>

              <Select labelId="payment-select" label="Event Options">
                <MenuItem value={"Birthday"}> Birthday </MenuItem>
                <MenuItem value={"Aniversary"}> Anniversary </MenuItem>
                <MenuItem value={"In Memory Of"}> In Memory Of </MenuItem>
              </Select>
            </FormControl>

            <Button onClick={handleSubmit}> Check Out </Button>

          
            <Button > Add Event </Button>

            <br />
            <br/>
           
                {orders.map((order) => ( 
                <div key={order.id}>
                    <p>
                        {order.address}
                        {order.city}
                        {order.state}
                        {order.zip}
                        {order.phone}
                        {order.payment}
                        <h4>Total:{order.total}</h4>
                    
                    </p>
                    </div>
                ))}
        
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserForm;
