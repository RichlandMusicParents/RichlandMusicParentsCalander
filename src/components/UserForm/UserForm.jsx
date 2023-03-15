import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function UserForm() {
  const order = useSelector((store) => store.order);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [eventFor, setEventFor] = useState("");
  const [paymentOption, setPaymentOption] = useState(null);
  const [eventOption, setEventOption] = useState(null);
  const [date, setDate] = useState(null);

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
              <TextField label="First Name" />
            </CardContent>

            <CardContent>
              <TextField label="Last Name" />
            </CardContent>

            <CardContent>
              <TextField label="Address" />
            </CardContent>

            <CardContent>
              <TextField label="City" />
            </CardContent>
            <CardContent>
              <TextField label="State" />
            </CardContent>
            <CardContent>
              <TextField label="ZipCode" />
            </CardContent>
            <CardContent>
              <TextField label="Phone Number" />
            </CardContent>
            <CardContent>
              <TextField label="Event for" />
            </CardContent>

            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="event-label"> Payment Options</InputLabel>

              <Select labelId="payment-select" label="Event Options">
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

            <Button> Check Out </Button>

            <h4>Total: </h4>
            <Button> Add Event </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserForm;
