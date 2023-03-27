import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaTrash, FaPen } from "react-icons/fa";
import { format } from "date-fns";
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

export default function AdminEventsListComponent() {
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
    dispatch({ type: "ADMIN_GET_ALL_EVENTS" });
  }, [dispatch]);

  /* =====  Our Functions to handle the TablePagination ===== */
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

  return (
    <>
      <h2>Created Events</h2>
      <ThemeProvider theme={richlandTheme}>
        <Paper sx={{ width: 800, height: 500 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ height: 40 }}>
                  <TableCell width={100}>Event Type</TableCell>
                  <TableCell width={100}>Event Name</TableCell>
                  <TableCell width={100}>Event Date</TableCell>
                  <TableCell width={100}>Created By</TableCell>
                  <TableCell width={50}></TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((event) => (
                    <TableRow key={event.id} sx={{ height: 75 }}>
                      {editMode && editId === event.id ? (
                        <>
                          <TableCell width={100}>
                            <Select
                              variant="outlined"
                              name="event_type"
                              id="eType"
                              value={editEventType}
                              onChange={(e) => setEditEventType(e.target.value)}
                            >
                              <MenuItem value="0">Select Event Type</MenuItem>
                              <MenuItem value="birthday">Birthday</MenuItem>
                              <MenuItem value="anniversary">
                                Anniversary
                              </MenuItem>
                              <MenuItem value="memorial">Memorial</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell width={100}>
                            <TextField
                              label="Event Name"
                              type="text"
                              value={editEventName}
                              onChange={(e) => setEditEventName(e.target.value)}
                            />
                          </TableCell>
                          <TableCell width={100}>
                            <TextField
                              label="Event Date"
                              type="date"
                              value={editEventDate}
                              onChange={(e) => setEditEventDate(e.target.value)}
                            />
                          </TableCell>
                          <TableCell width={100}>
                            <Autocomplete
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
                                <TextField
                                  {...params}
                                  label="Search for User"
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell width={100}>
                            <Button
                              onClick={saveEditEvent}
                              sx={{ width: 100, height: 30 }}
                            >
                              Save
                            </Button>
                          </TableCell>
                          <TableCell width={100}>
                            <Button
                              sx={{ width: 100, height: 30 }}
                              variant="contained"
                              color="danger"
                              onClick={() => setEditMode(false)}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell width={100}>{event.event_type}</TableCell>
                          <TableCell width={100}>{event.event_name}</TableCell>
                          <TableCell width={100}>
                            {format(new Date(event.event_date), "MM/dd/yy")}
                          </TableCell>
                          <TableCell width={100}>
                            {event.first_name} {event.last_name}
                          </TableCell>
                          <TableCell width={30}>
                            <Button
                              sx={{
                                width: 30,
                                height: 30,
                                fontSize: 15,
                              }}
                              color="primary"
                              variant="contained"
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
                              <FaPen />
                            </Button>
                          </TableCell>
                          <TableCell sx={{ height: 50 }}>
                            <Button
                              sx={{
                                width: 30,
                                height: 30,
                                fontSize: 15,
                              }}
                              onClick={() => deleteEvent(event.id)}
                              variant="contained"
                              color="danger"
                            >
                              <FaTrash />
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
      </ThemeProvider>
    </>
  );
}
