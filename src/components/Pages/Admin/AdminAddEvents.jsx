import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AdminAddEvents() {
  const events = useSelector((store) => store.adminReducer.allEvents);
  const users = useSelector((store) => store.adminReducer.allUsers);
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [calId, setCalId] = useState(0);
  const [userId, setUserId] = useState(users[0]);
  const [userIdInput, setUserIdInput] = useState("");
  return (
    <>
      <div className="admin-add-events">
        <header>
          <h2>Add New Event</h2>
        </header>
        <div className="form">
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType((e) => e.target.value)}
          />
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName((e) => e.target.value)}
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate((e) => e.target.value)}
          />
          <Autocomplete
            sx={{
              width: 100,
              marginBottom: 1,
            }}
            value={userId}
            onChange={(event, newValue) => setUserId(newValue)}
            inputValue={userIdInput}
            onInputChange={(event, newInputValue) =>
              setUserIdInput(newInputValue)
            }
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
            renderInput={(params) => (
              <TextField {...params} label="Search for User" />
            )}
          />
        </div>
      </div>
    </>
  );
}
