import React from "react";
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
  CardHeader,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import "./UserForm.css";

function UserForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  //Connects to the user store
  const user = useSelector((store) => store.user);

  // useState for order details form
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [email, setEmail] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  const richlandTheme = createTheme({
    palette: {
      primary: {
        main: "#77afdb",
        contrastText: "#ffcf5f",
      },
      secondary: {
        main: "#ffcf5f",
        contrastText: "#000",
      },
      danger: {
        main: "#b71c1c",
        contrastText: "#fff",
      },
    },

    typography: {
      fontFamily: "Libre Baskerville, serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
    },
  });
// This function is called when the user submits the form
// this action does a post request to the server in the order form, it also updates the orders reducer with this info,
// isPayed and isDelivered is set to false by default.
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
  // Below is a form input that takes the users first name,last name, address,city, state, zip, phone number, and payment type.

  return (
    <form noValidate autoComplete="off" className="form-container">
      <ThemeProvider theme={richlandTheme}>
        <Card className="form-card">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1 className="form-title">Richland Music Parents</h1>

              <CardHeader
                title={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}>
                    <h2 style={{ fontWeight: "bold", marginBottom: 0 }}>
                      Welcome, {user.first_name}!
                    </h2>
                    <h3 style={{ fontWeight: "bold", marginTop: 0 }}>
                      Order Form
                    </h3>
                  </div>
                }
                sx={{
                  backgroundColor: richlandTheme.palette.primary.main,
                  color: "white",
                  padding: "20px",
                  borderBottom: "1px solid #eee",
                }}
              />

              <h2>Personal Information</h2>
              <h3>1/3 Completed</h3>
              <hr />
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <TextField
                  className="form-input"
                  label="First Name"
                  type="text"
                  name="firstname"
                  variant="outlined"
                  value={firstName}
                  required
                  fullWidth
                  onChange={(event) => setFirstName(event.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              <CardContent>
                <TextField
                  className="form-input"
                  label="Last Name"
                  type="text"
                  name="lastname"
                  variant="outlined"
                  value={lastName}
                  required
                  fullWidth
                  onChange={(event) => setLastName(event.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
            </Grid>

            <Grid item xs={12}>
              <CardContent>
                <h2>Order Information</h2>
                <hr />
                <br />
                <br />
                <TextField
                  className="form-input"
                  label="Address"
                  type="text"
                  name="address"
                  value={address}
                  required
                  fullWidth
                  onChange={(event) => setAddress(event.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <TextField
                  className="form-input"
                  label="City"
                  type="text"
                  name="city"
                  value={city}
                  required
                  fullWidth
                  onChange={(event) => setCity(event.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <TextField
                  className="form-input"
                  label="State"
                  type="text"
                  name="state"
                  value={state}
                  required
                  fullWidth
                  onChange={(event) => setState(event.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <TextField
                  className="form-input"
                  label="Zip Code"
                  type="number"
                  name="zip"
                  value={zip}
                  required
                  fullWidth
                  onChange={(event) => setZip(event.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <TextField
                  className="form-input"
                  label="Phone Number"
                  type="text"
                  name="phone"
                  value={phone}
                  required
                  onChange={(event) => setPhone(event.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              <CardContent>
                <TextField
                  className="form-input"
                  label="Email"
                  type="text"
                  name="email"
                  variant="outlined"
                  value={email}
                  required
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)}
                  sx={{ width: "100%" }}
                />
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <FormControl className="form-input" sx={{ width: "100%" }}>
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
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  marginBottom: "50px",
                  width: "200px",
                  backgroundColor: richlandTheme.palette.primary.main,
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  padding: "1rem 2rem",
                  boxShadow: "none",
                  marginTop: "2rem",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: richlandTheme.palette.primary.dark,
                  },
                }}
                onClick={handleSubmit}>
                {" "}
                Continue{" "}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </ThemeProvider>
    </form>
  );
}

export default UserForm;
