import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import "../Admin/Admin.css";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

export default function AdminEvents() {
  const events = useSelector((store) => store.adminReducer.allEvents);
  const users = useSelector((store) => store.adminReducer.allUsers);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editEventType, setEditEventType] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editCalId, setEditCalId] = useState(0);
  const [editCreatedBy, setEditCreatedBy] = useState(users[0]);
  const [editCreatedByInput, setEditCreatedByInput] = useState("");

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_ALL_EVENTS" });
    dispatch({ type: "ADMIN_GET_ALL_ORDERS" });
    dispatch({ type: "ADMIN_GET_ALL_USERS" });
  }, [dispatch]);
  console.log(events);
  console.log(users);

  function saveEditEvent() {
    const editEventObj = {
      id: editId,
      event_type: editEventType,
      event_name: editEventName,
      event_date: editEventDate,
      user_id: editCreatedBy.id,
      calendar_id: editCalId,
    };

    console.log(editEventObj);

    dispatch({ type: "ADMIN_EDIT_EVENTS", payload: editEventObj });

    setEditMode(false);
  }

  function editEvent(id, type, name, date, editCalId) {
    setEditId(id);
    setEditMode(true);
    setEditEventType(type);
    setEditEventDate(date);
    setEditEventName(name);
    setEditCalId(editCalId);
  }

  function addEvent() {}

  return (
    <>
      <div className="events-container">
        <div className="events-header">
          <h2>Created Events</h2>
        </div>
        <div className="events-body">
          <header className="events-body-header">
            <ul className="events-list-header">
              <li className="events-list-title">Event Type</li>
              <li className="events-list-title">Event Name</li>
              <li className="events-list-title">Event Date</li>
              <li className="events-list-title">Created By</li>
              <li className="events-list-title"></li>
              <li className="events-list-title"></li>
            </ul>
          </header>
          <div className="events-body-list">
            {events.map((event) => (
              <>
                <ul className="events-list-body">
                  {editMode && editId === event.id ? (
                    <>
                      <li className="events-list-item">
                        <select
                          name="event_type"
                          id="eType"
                          onChange={(e) => setEditEventType(e.target.value)}
                        >
                          <option value="birthday">Birthday</option>
                          <option value="anniversary">Anniversary</option>
                          <option value="memorial">Memorial</option>
                        </select>
                      </li>
                      <li className="events-list-item">
                        <input
                          type="text"
                          value={editEventName}
                          onChange={(e) => setEditEventName(e.target.value)}
                        />
                      </li>
                      <li className="events-list-item">
                        <input
                          type="date"
                          value={format(new Date(editEventDate), "MM/dd/yy")}
                          onChange={(e) => setEditEventDate(e.target.value)}
                        />
                      </li>
                      <li className="events-list-item">
                        <Autocomplete
                          sx={{
                            width: 100,
                            marginBottom: 1,
                          }}
                          value={editCreatedBy}
                          onChange={(event, newValue) =>
                            setEditCreatedBy(newValue)
                          }
                          inputValue={editCreatedByInput}
                          onInputChange={(event, newInputValue) =>
                            setEditCreatedByInput(newInputValue)
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
                            <TextField {...params} label="Search for User" />
                          )}
                        />
                      </li>
                      <li className="events-list-item">
                        <button onClick={saveEditEvent}>Save</button>
                      </li>
                      <li className="events-list-item">
                        <button onClick={() => setEditMode(false)}>
                          Cancel
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="events-list-item">{event.event_type}</li>
                      <li className="events-list-item">{event.event_name}</li>
                      <li className="events-list-item">
                        {format(new Date(event.event_date), "MM/dd/yy")}
                      </li>
                      <li className="events-list-item">
                        {event.first_name} {event.last_name}
                      </li>
                      <li className="events-list-item">
                        <button
                          onClick={() =>
                            editEvent(
                              event.id,
                              event.event_type,
                              event.event_name,
                              event.event_date,
                              event.calendar_id
                            )
                          }
                        >
                          Edit
                        </button>
                      </li>
                      <li className="events-list-item">
                        <button>Delete</button>
                      </li>
                    </>
                  )}
                </ul>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
