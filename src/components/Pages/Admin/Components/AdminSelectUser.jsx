import { Autocomplete, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminSelectUserComponent() {
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_ALL_USERS" });
  }, [dispatch]);
  const dispatch = useDispatch();
  const users = useSelector((store) => store.adminReducer.allUsers);
  const [userId, setUserId] = useState(users[0]);
  const [userIdInput, setUserIdInput] = useState("");

  function sendToForm() {
    history.push(`/admin-order-form/${userId.id}`);
  }

  function sendToRegister() {
    history.push("/admin-register");
  }

  function sendToEditUser() {
    history.push(`/admin-edit-user/${userId.id}`);
  }
  return (
    <>
      <h2>Select A User</h2>
      <Autocomplete
        sx={{
          width: 300,
        }}
        value={userId}
        onChange={(event, newValue) => setUserId(newValue)}
        inputValue={userIdInput}
        onInputChange={(event, newInputValue) => setUserIdInput(newInputValue)}
        id="user-list-lookup"
        getOptionLabel={(users) => `${users.first_name} ${users.last_name}`}
        options={users}
        isOptionEqualToValue={(option, value) =>
          option.first_name === value.first_name
        }
        noOptionsText={"No valid User"}
        renderOption={(props, users) => (
          <Box component="li" {...props} key={users.id}>
            {users.first_name} {users.last_name}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Linked User" />}
      />
      <Button
        onClick={sendToForm}
        sx={{ height: 50, margin: 1 }}
        variant="contained"
      >
        Create New Order
      </Button>
      <Button
        onClick={sendToEditUser}
        sx={{ height: 50, margin: 1 }}
        variant="contained"
      >
        Edit User
      </Button>
      <Button
        onClick={sendToRegister}
        sx={{ height: 50, margin: 1 }}
        variant="contained"
      >
        Create New User
      </Button>
    </>
  );
}
