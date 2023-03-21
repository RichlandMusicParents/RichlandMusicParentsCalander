import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import "../Admin/Admin.css";
import {
  Autocomplete,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function AdminEvents() {
  const events = useSelector((store) => store.adminReducer.allEvents);
  const users = useSelector((store) => store.adminReducer.allUsers);
  const id = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editEventType, setEditEventType] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editCalId, setEditCalId] = useState(0);
  const [editCreatedBy, setEditCreatedBy] = useState(users[0]);
  const [editCreatedByInput, setEditCreatedByInput] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: id });
  }, [dispatch]);
  // console.log(events);
  // console.log(users);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function deleteEvent(id) {
    console.log(id);
    dispatch({ type: "ADMIN_DELETE_EVENT", payload: id });
  }

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

  return (
    <>
      <Paper>
        <h2>Created Events</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  width: 100,
                  height: 50,
                  margin: 0,
                }}
              >
                <TableCell>Event Type</TableCell>
                <TableCell>Event Name</TableCell>
                <TableCell>Event Date</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event) => (
                  <TableRow
                    sx={{
                      width: 100,
                      height: 50,
                      margin: 0,
                    }}
                    key={event.id}
                  >
                    {editMode && editId === event.id ? (
                      <>
                        <TableCell>
                          <Select
                            variant="outlined"
                            sx={{
                              width: 150,
                              height: 50,
                              margin: 0,
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label="Event Type" />
                            )}
                            name="event_type"
                            id="eType"
                            value={editEventType}
                            onChange={(e) => setEditEventType(e.target.value)}
                          >
                            <MenuItem value="0">Select Event Type</MenuItem>
                            <MenuItem value="birthday">Birthday</MenuItem>
                            <MenuItem value="anniversary">Anniversary</MenuItem>
                            <MenuItem value="memorial">Memorial</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <TextField
                            sx={{
                              width: 150,
                            }}
                            label="Event Name"
                            type="text"
                            value={editEventName}
                            onChange={(e) => setEditEventName(e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            sx={{
                              width: 150,
                            }}
                            label="Event Date"
                            type="date"
                            value={editEventDate}
                            onChange={(e) => setEditEventDate(e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Autocomplete
                            sx={{
                              width: 150,
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
                        </TableCell>
                        <TableCell>
                          <Button onClick={saveEditEvent}>Save</Button>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => setEditMode(false)}>
                            Cancel
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{event.event_type}</TableCell>
                        <TableCell>{event.event_name}</TableCell>
                        <TableCell>
                          {format(new Date(event.event_date), "MM/dd/yy")}
                        </TableCell>
                        <TableCell>
                          {event.first_name} {event.last_name}
                        </TableCell>
                        <TableCell>
                          <Button
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
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => deleteEvent(event.id)}
                            variant="contained"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={events.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
