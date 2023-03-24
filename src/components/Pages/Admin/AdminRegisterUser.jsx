import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { set } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export function AdminRegisterUser() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);

  function registerUser() {
    const userObj = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      is_admin: isAdmin,
    };

    dispatch({ type: "ADMIN_REGISTER_USER", payload: userObj });
    history.push("/admin");
  }

  return (
    <>
      <form className="admin-register-form">
        <TextField
          sx={{
            width: 150,
          }}
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          sx={{
            width: 150,
          }}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
        <Select
          sx={{
            width: 150,
          }}
          name="event_type"
          id="eType"
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value)}
        >
          <MenuItem value={0}>Select User Type</MenuItem>
          <MenuItem value={true}>Admin</MenuItem>
          <MenuItem value={false}>Not Admin</MenuItem>
        </Select>
        <Button variant="contained" onClick={registerUser}>
          Create Account
        </Button>
      </form>
    </>
  );
}
