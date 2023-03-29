import {
  Button,
  createTheme,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import format from "date-fns/format";
import { ThemeProvider } from "@mui/material";
import { FaTrash, FaPen, FaSave } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";

export function AdminEditUser() {
  const userId = useParams();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: userId.id });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId });
  }, [dispatch]);

  const richlandTheme = createTheme({
    palette: {
      primary: {
        main: "#77afdb",
        contrastText: "#fff",
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const user = useSelector((store) => store.adminReducer.specificUser);
  const events = useSelector((store) => store.adminReducer.specificEvents);
  const order = useSelector((store) => store.adminReducer.specificOrder);
  console.log(userId.id);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    user[0] !== undefined && setUsername(user[0].username);
    user[0] !== undefined && setFirstName(user[0].first_name);
    user[0] !== undefined && setLastName(user[0].last_name);
    user[0] !== undefined && setIsAdmin(user[0].is_admin);
  }, [user]);

  useEffect(() => {
    order[0] !== undefined && setOrderId(order[0]);
  }, [order]);

  const [orderId, setOrderId] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [userEditMode, setUserEditMode] = useState(false);

  console.log(order);

  function registerUser() {
    const userObj = {
      id: Number(userId.id),
      username: username,
      first_name: firstName,
      last_name: lastName,
      is_admin: isAdmin,
    };

    dispatch({ type: "ADMIN_EDIT_USER", payload: userObj });
    // console.log(userObj);
    // history.push("/admin");
  }

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editEventType, setEditEventType] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editCalId, setEditCalId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <>
      <ThemeProvider theme={richlandTheme}>
        <header className="admin-user-header">
          <h1>
            Overview for: {firstName} {lastName}
          </h1>
        </header>
        <section className="admin-user-card-form">
          <form className="admin-update-user-permission">
            <header className="admin-update-permissions-header">
              {userEditMode ? (
                <>
                  <h3>Edit User Info</h3>
                </>
              ) : (
                <>
                  <h3>User Info</h3>
                </>
              )}
            </header>
            <div className="update-user-inputs">
              {userEditMode ? (
                <>
                  <Select
                    sx={{
                      height: 50,
                      width: 240,
                      fontSize: 15,
                      padding: 0,
                      margin: 1,
                    }}
                    name="event_type"
                    id="eType"
                    value={isAdmin}
                    onChange={(e) => setEditEventType(e.target.value)}
                  >
                    <MenuItem value={true}>Admin</MenuItem>
                    <MenuItem value={false}>Not Admin</MenuItem>
                  </Select>
                  <TextField
                    sx={{
                      height: 40,
                      width: 240,
                      fontSize: 15,
                      padding: 0,
                      margin: 1,
                    }}
                    color="primary"
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    sx={{
                      height: 40,
                      width: 240,
                      fontSize: 15,
                      padding: 0,
                      margin: 1,
                    }}
                    color="primary"
                    label="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    sx={{
                      height: 40,
                      width: 240,
                      fontSize: 15,
                      padding: 0,
                      margin: 1,
                    }}
                    color="primary"
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Button
                    sx={{ height: 40, width: 100, margin: 2, fontSize: 15 }}
                    variant="contained"
                    color="primary"
                    onClick={registerUser}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{ height: 40, width: 100, margin: 2, fontSize: 15 }}
                    variant="contained"
                    color="secondary"
                    onClick={() => setUserEditMode(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <div className="user-card-text">
                    <p className="user-card-title">Permissions</p>
                    <p className="user-card-info">
                      {isAdmin ? <>Admin</> : <>Not Admin</>}
                    </p>
                  </div>
                  <div className="user-card-text">
                    <p className="user-card-title">Username</p>
                    <p className="user-card-info">{username}</p>
                  </div>
                  <div className="user-card-text">
                    <p className="user-card-title">First Name</p>
                    <p className="user-card-info">{firstName}</p>
                  </div>
                  <div className="user-card-text">
                    <p className="user-card-title">Last Name</p>
                    <p className="user-card-info">{lastName}</p>
                  </div>
                  <Button
                    sx={{
                      height: 40,
                      width: 100,
                      marginBottom: 1,
                      fontSize: 15,
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => setUserEditMode(true)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </form>
        </section>
        <section className="admin-user-orders">
          <header className="order-list-section">Orders</header>
          {order.length > 0 ? (
            <>
              <article className="user-order-card">
                <header className="user-order-card-header">
                  <h3>Order</h3>
                </header>
                <div className="order-info-container">
                  {order.map((item) => {
                    return (
                      <>
                        <div className="order-info-section">
                          <header className="order-info-section-header">
                            <h3>Shipping Info</h3>
                          </header>
                          <p>{item.address}</p>
                          <p>
                            {item.city}, {item.state} {item.zip}
                          </p>
                        </div>
                        <div className="order-info-section">
                          <header className="order-info-section-header">
                            <h3>Contact Info</h3>
                          </header>
                          <p>
                            {item.first_name} {item.last_name}
                          </p>
                          <p>{item.email}</p>
                          <p>{item.phone}</p>
                        </div>
                        <div className="order-info-section">
                          <header className="order-info-section-header">
                            <h3>Order Info</h3>
                          </header>
                          <p>Order Total: ${item.total}</p>
                          <p>Payment Type: {item.payment_type}</p>
                          <p>
                            {item.is_delivered ? (
                              <>Delivered</>
                            ) : (
                              <>Not Delivered</>
                            )}
                          </p>
                          <p> {item.is_payed ? <>Payed</> : <>Unpaid</>}</p>
                          <p>Events: {item.order_events.length}</p>
                          <p>
                            Calendars:{" "}
                            {item.order_items.map((cal) => {
                              return (
                                <>
                                  {cal.product_id === 1 && <>{cal.quantity}</>}
                                </>
                              );
                            })}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </article>
            </>
          ) : (
            <>
              <article className="user-order-card-no-orders">
                <h2>No Orders to Show</h2>
              </article>
            </>
          )}
        </section>

        <Paper sx={{ width: 700, marginInline: "auto" }}>
          <TableContainer component={Paper} sx={{ height: 448 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ height: 40 }}>
                  <TableCell
                    sx={{
                      height: 40,
                      width: 125,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Event Type
                  </TableCell>
                  <TableCell
                    sx={{
                      height: 40,
                      width: 125,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Event Name
                  </TableCell>
                  <TableCell
                    sx={{
                      height: 40,
                      width: 125,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Event Date
                  </TableCell>
                  <TableCell
                    sx={{
                      height: 40,
                      width: 125,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Calendar
                  </TableCell>
                  <TableCell
                    sx={{ height: 40, width: 30, fontSize: 10 }}
                  ></TableCell>
                  <TableCell
                    sx={{ height: 40, width: 30, fontSize: 10 }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((event) => (
                    <TableRow key={event.id} sx={{ height: 75 }}>
                      {editMode && editId === event.id ? (
                        <>
                          <TableCell
                            sx={{ height: 40, width: 100, fontSize: 15 }}
                          >
                            <Select
                              sx={{
                                height: 40,
                                width: 100,
                                fontSize: 15,
                                padding: 0,
                                margin: 0,
                              }}
                              variant="outlined"
                              name="event_type"
                              id="eType"
                              value={editEventType}
                              onChange={(e) => setEditEventType(e.target.value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Search for User"
                                />
                              )}
                            >
                              <MenuItem value="0">Select Event Type</MenuItem>
                              <MenuItem value="birthday">Birthday</MenuItem>
                              <MenuItem value="anniversary">
                                Anniversary
                              </MenuItem>
                              <MenuItem value="memorial">Memorial</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell
                            sx={{ height: 40, width: 100, fontSize: 15 }}
                          >
                            <TextField
                              sx={{
                                height: 40,
                                width: 125,
                                fontSize: 15,
                                padding: 0,
                                margin: 0,
                              }}
                              color="primary"
                              label="Event Name"
                              type="text"
                              value={editEventName}
                              onChange={(e) => setEditEventName(e.target.value)}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ height: 40, width: 100, fontSize: 15 }}
                          >
                            <TextField
                              sx={{
                                height: 40,
                                width: 125,
                                fontSize: 15,
                                padding: 0,
                                margin: 0,
                              }}
                              label="Event Date"
                              type="date"
                              value={editEventDate}
                              onChange={(e) => setEditEventDate(e.target.value)}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ height: 40, width: 100, fontSize: 15 }}
                          >
                            {event.calendar_name}
                          </TableCell>
                          <TableCell
                            sx={{ height: 40, width: 30, fontSize: 15 }}
                          >
                            <Button
                              onClick={saveEditEvent}
                              color="primary"
                              sx={{
                                width: 20,
                                height: 20,
                                fontSize: 10,
                              }}
                            >
                              <FaSave />
                            </Button>
                          </TableCell>
                          <TableCell
                            sx={{ height: 40, width: 20, fontSize: 10 }}
                          >
                            <Button
                              sx={{
                                width: 30,
                                height: 30,
                                fontSize: 20,
                              }}
                              color="danger"
                              onClick={() => setEditMode(false)}
                            >
                              <MdOutlineCancelPresentation />
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell
                            sx={{ height: 40, width: 125, fontSize: 15 }}
                          >
                            {event.event_type}
                          </TableCell>
                          <TableCell sx={{ width: 125, fontSize: 15 }}>
                            {event.event_name}
                          </TableCell>
                          <TableCell
                            sx={{ height: 40, width: 125, fontSize: 15 }}
                          >
                            {format(new Date(event.event_date), "MM/dd/yy")}
                          </TableCell>
                          <TableCell
                            sx={{ height: 40, width: 125, fontSize: 15 }}
                          >
                            {event.calendar_name}
                          </TableCell>
                          <TableCell
                            sx={{ height: 40, width: 50, fontSize: 20 }}
                          >
                            <Button
                              sx={{
                                width: 30,
                                height: 30,
                                fontSize: 20,
                              }}
                              color="primary"
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
                          <TableCell
                            sx={{ height: 40, width: 50, fontSize: 20 }}
                          >
                            <Button
                              sx={{
                                width: 30,
                                height: 30,
                                fontSize: 20,
                              }}
                              onClick={() => deleteEvent(event.id)}
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
