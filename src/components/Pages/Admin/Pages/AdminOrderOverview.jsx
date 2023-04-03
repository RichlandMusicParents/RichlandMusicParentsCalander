import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  createTheme,
  ThemeProvider,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { format } from "date-fns";

import { FaTrash, FaPen, FaSave } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import ReviewOrderInfo from "../Components/OrderReviewCard/OrderOverviewCard";
import CartComponent from "../Components/Cart/Cart";
import { fontSize } from "@mui/system";

export default function AdminOrderOverview() {
  const userId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS", payload: userId.id });
    dispatch({ type: "GET_SPECIFIC_EVENTS", payload: userId.id });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId.id });
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [eventEditId, setEventEditId] = useState(0);
  const [editEventType, setEditEventType] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editCalId, setEditCalId] = useState(0);

  const orderUser = useSelector((store) => store.adminReducer.specificUser);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );

  const events = useSelector((store) => store.adminReducer.specificEvents);
  const specificOrder = useSelector(
    (store) => store.adminReducer.specificOrder
  );

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

  // console.log(orderTotal);

  function saveEditEvent() {
    const editEventObj = {
      id: eventEditId,
      event_type: editEventType,
      event_name: editEventName,
      event_date: editEventDate,
      user_id: userId.id,
      calendar_id: editCalId,
    };

    dispatch({ type: "ADMIN_EDIT_EVENTS", payload: editEventObj });

    setEventEditId(false);
  }

  function editEvents(id, type, name, date, editCalId) {
    setEventEditId(id);
    setEditMode(true);
    setEditEventType(type);
    setEditEventDate(date);
    setEditEventName(name);
    setEditCalId(editCalId);
  }

  function deleteEvent(id) {
    console.log(id);
    dispatch({
      type: "ADMIN_DELETE_EVENT",
      payload: { id: id, user_id: userId },
    });
  }

  function saveUpdate(product_id, price) {
    console.log(product_id, price);
    const orderItems = {
      id: itemEditId,
      quantity: quantity,
      price,
      product_id,
      order_id: Number(orderId),
      user_id: Number(userId.id),
    };

    dispatch({ type: "ADMIN_EDIT_ORDER_ITEMS", payload: orderItems });
    setItemEditMode(false);
  }

  useEffect(() => {
    specificOrder[0] !== undefined && setOrderId(specificOrder[0].id);
    specificOrder[0] !== undefined && setOrderTotal(specificOrder[0].total);
  }, [specificOrder]);

  const [orderTotal, setOrderTotal] = useState(0);
  const [orderId, setOrderId] = useState(0);

  function sendToAdmin() {
    history.push("/admin-home");
  }
  return (
    <>
      <ThemeProvider theme={richlandTheme}>
        <header className="order-review-header">
          <h1>Review Order</h1>
        </header>
        <div className="admin-review-top">
          <ReviewOrderInfo />
          <CartComponent />
        </div>

        <div className="admin-events-view">
          <div className="events-table-container">
            <header className="events-table-header">
              <h2>Created Events</h2>
            </header>
            <Paper>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: 15,
                          width: 200,
                          height: 50,
                          margin: 0,
                          fontWeight: "bold",
                        }}
                      >
                        Event Type
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          width: 200,
                          height: 50,
                          margin: 0,
                          fontSize: 15,
                        }}
                      >
                        Event Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          width: 200,
                          height: 50,
                          margin: 0,
                          fontSize: 15,
                        }}
                      >
                        Event Date
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          width: 200,
                          height: 50,
                          fontSize: 15,
                          margin: 0,
                        }}
                      >
                        Calendar Year
                      </TableCell>
                      <TableCell
                        sx={{
                          width: 75,
                          height: 50,

                          margin: 0,
                        }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          width: 75,
                          height: 50,
                          margin: 0,
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow
                        sx={{
                          height: 50,
                          margin: 0,
                        }}
                        key={event.id}
                      >
                        {editMode && eventEditId === event.id ? (
                          <>
                            <TableCell
                              sx={{
                                width: 200,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              <Select
                                variant="outlined"
                                sx={{ width: 200, fontSize: 15, height: 50 }}
                                renderInput={(params) => (
                                  <TextField {...params} label="Event Type" />
                                )}
                                name="event_type"
                                id="eType"
                                value={editEventType}
                                onChange={(e) =>
                                  setEditEventType(e.target.value)
                                }
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
                              sx={{
                                width: 200,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              <TextField
                                sx={{ width: 200, fontSize: 15, height: 40 }}
                                label="Event Name"
                                type="text"
                                value={editEventName}
                                onChange={(e) =>
                                  setEditEventName(e.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 200,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              <TextField
                                sx={{ width: 200, fontSize: 15, height: 40 }}
                                label="Event Date"
                                type="date"
                                value={editEventDate}
                                onChange={(e) =>
                                  setEditEventDate(e.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 200,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              {event.calendar_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 75,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              <Button onClick={saveEditEvent}>Save</Button>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 75,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              <Button onClick={() => setEditMode(false)}>
                                Cancel
                              </Button>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell
                              sx={{
                                width: 200,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              {event.event_type}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 200,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              {event.event_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 200,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              {format(new Date(event.event_date), "MM/dd/yy")}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 200,
                                height: 50,
                                fontSize: 15,
                                margin: 0,
                              }}
                            >
                              {event.calendar_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 75,
                                height: 50,

                                margin: 0,
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ height: 40, fontSize: 15 }}
                                onClick={() =>
                                  editEvents(
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
                              sx={{
                                width: 75,
                                height: 50,

                                margin: 0,
                              }}
                            >
                              <Button
                                sx={{ height: 40, fontSize: 15 }}
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
            </Paper>
          </div>
        </div>
        <div className="complete-order-button">
          <Button
            sx={{ width: 300, fontSize: 20 }}
            variant="contained"
            onClick={sendToAdmin}
          >
            Complete Order
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
}
