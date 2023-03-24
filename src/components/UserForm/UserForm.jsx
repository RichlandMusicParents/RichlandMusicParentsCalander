import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Input
} from "@mui/material";
import { useHistory } from "react-router-dom";
import UserPage from "../Pages/UserPage/UserPage";

function UserForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
 
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // useEffect(() => {
  //   dispatch({ type: "FETCH_ORDER" });
  // }, []);

  // Dispatch for the events

  // const eventHandleSubmit = () => {
  //   dispatch({
  //     type: `USER_ADD_EVENT`,
  //     payload: {
  //       event_type: eventOption,
  //       event_date: date,
  //       event_name: eventFor,
  //       user_id: user.id,
  //       calendar_id: selectCalendarId,
  //     },
  //   });
  // };

  const handleSubmit = () => {
    dispatch({
      type: "ADD_ORDERS",
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
        user_id: user.id,

      },
    });
    history.push("/events");
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setPhone("");
    setPayment("");
  
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
            
           
            <Button onClick={handleSubmit}> Continue </Button>


          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserForm;
