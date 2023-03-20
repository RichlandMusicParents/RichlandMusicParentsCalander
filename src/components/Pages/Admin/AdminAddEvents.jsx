import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminAddEvents() {
  const events = useSelector((store) => store.adminReducer.allEvents);
  const users = useSelector((store) => store.adminReducer.allUsers);
  const [eventType, setEventType] = useState("0");
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [calId, setCalId] = useState("0");
  const [userId, setUserId] = useState(users[0]);
  const [userIdInput, setUserIdInput] = useState("");
  const dispatch = useDispatch();

  console.log(calId);

  useEffect(() => {
    dispatch({ type: "GET_ALL_EVENTS" });
    dispatch({ type: "ADMIN_GET_ALL_USERS" });
  }, [dispatch]);

  function addEvent() {
    const eventObj = {
      event_type: eventType,
      event_name: eventName,
      event_date: eventDate,
      user_id: userId.id,
      calendar_id: Number(calId),
    };

    console.log("Event being created:", eventObj);

    dispatch({ type: "ADMIN_ADD_EVENTS", payload: eventObj });
  }
  return (
    <>
      <div className="admin-add-events">
        <header>
          <h2>Add New Event</h2>
        </header>
        <div className="admin-add-event-form">
          <Select
            sx={{
              width: 150,
            }}
            renderInput={(params) => (
              <TextField {...params} label="Event Type" />
            )}
            name="event_type"
            id="eType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <MenuItem value="0">Select Event Type</MenuItem>
            <MenuItem value="birthday">Birthday</MenuItem>
            <MenuItem value="anniversary">Anniversary</MenuItem>
            <MenuItem value="memorial">Memorial</MenuItem>
          </Select>
          <TextField
            sx={{
              width: 150,
            }}
            label="Event Name"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <TextField
            sx={{
              width: 150,
            }}
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <Autocomplete
            sx={{
              width: 150,
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
            renderInput={(params) => <TextField {...params} label="User" />}
          />
          <Select
            sx={{
              width: 150,
            }}
            name="calendar"
            id="eType"
            renderInput={(params) => <TextField {...params} label="Calendar" />}
            value={calId}
            onChange={(e) => setCalId(e.target.value)}
          >
            <MenuItem value="0">Select Calendar</MenuItem>
            <MenuItem value="1">2023</MenuItem>
          </Select>
          <Button
            sx={{
              width: 150,
              height: 50,
            }}
            variant="contained"
            onClick={addEvent}
          >
            Add Event
          </Button>
        </div>
      </div>
    </>
  );
}
