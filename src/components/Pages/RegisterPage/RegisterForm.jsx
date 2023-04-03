import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createTheme, Button,
ThemeProvider} from "@mui/material";

function RegisterForm() {
  const [first_name, setfirstName] = useState('');
  const [last_name, setlastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  
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



  return (
    <>
    <ThemeProvider theme={richlandTheme}>
   
    <form className="formPanel" onSubmit={registerUser}>
    <header>
            <h2>Register New User</h2>
          </header>      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
      <label htmlFor="firsname">
          First Name:
          <input
            type="text"
            name="firstname"
            value={first_name}
            required
            onChange={(event) => setfirstName(event.target.value)}
          />
        </label>
        <br />
        <label htmlFor="lastname">
          Last Name:
          <input
            type="text"
            name="lastname"
            value={last_name}
            required
            onChange={(event) => setlastName(event.target.value)}
          />
        </label>
        <br />
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
      <Button
            sx={{
              width: 300,
              margin: 1,
              marginBottom: 5,
              height: 50,
              fontSize: 15,
            }}
            variant="contained"
            onClick={registerUser}
          >
            Create Account
          </Button>      </div>
    </form>
    </ThemeProvider>
    </>
  );
}

export default RegisterForm;
