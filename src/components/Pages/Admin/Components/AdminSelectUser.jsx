import { Autocomplete, Button, createTheme, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../Admin.css";

export default function AdminSelectUserComponent() {
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_ALL_USERS" });
  }, [dispatch]);
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((store) => store.adminReducer.allUsers);
  const [userId, setUserId] = useState(users[0]);
  const [userIdInput, setUserIdInput] = useState("");

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
  });

  function sendToForm() {
    history.push(`/admin-order-form/${userId.id}`);
  }

  function sendToEditUser() {
    history.push(`/admin-edit-user/${userId.id}`);
  }

  function sendToRegister() {
    history.push("/admin-register");
  }

  return (
    <>
      <ThemeProvider theme={richlandTheme}>
        <article className="search-user-container">
          <header>
            <h2>Select A User</h2>
          </header>
          <div className="search-user-inputs">
            <Autocomplete
              sx={{
                width: 390,
                margin: 1,
              }}
              value={userId}
              onChange={(event, newValue) => setUserId(newValue)}
              inputValue={userIdInput}
              onInputChange={(event, newInputValue) =>
                setUserIdInput(newInputValue)
              }
              id="user-list-lookup"
              getOptionLabel={(users) =>
                `${users.first_name} ${users.last_name}`
              }
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
              renderInput={(params) => (
                <TextField {...params} label="Linked User" />
              )}
            />
          </div>
          <div className="search-buttons">
            <Button
              onClick={sendToForm}
              sx={{
                height: 50,
                width: 120,
                margin: 1,
                fontSize: 12,
                fontWeight: "bold",
              }}
              variant="contained"
              color="primary"
            >
              New Order
            </Button>
            <Button
              onClick={sendToEditUser}
              sx={{
                height: 50,
                width: 120,
                margin: 1,
                fontSize: 12,
                fontWeight: "bold",
              }}
              variant="contained"
              color="primary"
            >
              View User
            </Button>
            <Button
              onClick={sendToRegister}
              sx={{
                height: 50,
                width: 120,
                margin: 1,
                fontSize: 12,
                fontWeight: "bold",
              }}
              variant="contained"
              color="primary"
            >
              New User
            </Button>
          </div>
        </article>
      </ThemeProvider>
    </>
  );
}
