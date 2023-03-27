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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export function AdminEditUser() {
  const userId = useParams();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
  }, []);
  const user = useSelector((store) => store.adminReducer.specificUser);
  console.log(userId.id);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    user[0] !== undefined && setUsername(user[0].username);
    user[0] !== undefined && setFirstName(user[0].first_name);
    user[0] !== undefined && setLastName(user[0].last_name);
    user[0] !== undefined && setIsAdmin(user[0].is_admin);
  }, [user]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);

  console.log(username);

  function registerUser() {
    const userObj = {
      id: Number(userId.id),
      is_admin: isAdmin,
    };

    dispatch({ type: "ADMIN_EDIT_USER", payload: userObj });
    // console.log(userObj);
    history.push("/admin");
  }

  return (
    <>
      <form className="admin-register-form">
        <h2>
          Update Privileges for: {firstName} {lastName}
        </h2>

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
          Save
        </Button>
      </form>
    </>
  );
}
