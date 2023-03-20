import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* adminGetAllEvents() {
  try {
    // clear any existing error on the registration page

    // passes the username and password from the payload to the server
    const response = yield axios.get("/api/events/all-events");
    yield put({ type: "ADMIN_SET_ALL_EVENTS", payload: response.data });
  } catch (err) {
    console.log("Error in getting all events", err);
  }
}

function* getAllUsers() {
  try {
    const response = yield axios.get("/api/user/all-users");
    yield put({ type: "ADMIN_SET_ALL_USERS", payload: response.data });
  } catch (err) {
    console.log("Error in admin GET all users", err);
  }
}

function* adminGetSpecificEvents(action) {
  try {
    // passes the username and password from the payload to the server
    const response = yield axios.get(
      `/api/events/specific-user-events/${action.payload}`
    );
    yield put({ type: "ADMIN_SET_SPECIFIC_EVENTS", payload: response.data });
  } catch (err) {
    console.log("Error with getting specific user events", err);
  }
}

function* adminAddEvent(action) {
  const eventObj = {
    id: action.payload.id,
    event_type: action.payload.event_type,
    event_date: action.payload.event_date,
    event_name: action.payload.event_name,
    user_id: action.payload.user_id,
    calendar_id: action.payload,
    calendar_id,
  };
  try {
    yield axios.post("/api/events/admin-add-event", eventObj);
  } catch (err) {
    console.log("Error in POSTing event by admin");
  }
}

function* adminEditEvent(action) {
  const eventObj = {
    event_type: action.payload.event_type,
    event_date: action.payload.event_date,
    event_name: action.payload.event_name,
    user_id: Number(action.payload.user_id),
    calendar_id: Number(action.payload.calendar_id),
  };
  try {
    yield axios.put(
      `/api/events/admin-edit-event/${Number(action.payload.id)}`,
      eventObj
    );
    yield put({ type: "GET_ALL_EVENTS" });
  } catch (err) {
    console.log("Error in PUTing event by admin", err);
  }
}
function* adminGetAllOrders() {
  try {
    // passes the username and password from the payload to the server
    const response = yield axios.get(`/api/orders/all-orders`);
    yield put({ type: "ADMIN_SET_ALL_ORDERS", payload: response.data });
  } catch (err) {
    console.log("Error with getting specific user events", err);
  }
}

function* adminSagas() {
  yield takeLatest("GET_ALL_EVENTS", adminGetAllEvents);
  yield takeLatest("GET_SPECIFIC_EVENTS", adminGetSpecificEvents);
  yield takeLatest("ADMIN_ADD_EVENTS", adminAddEvent);
  yield takeLatest("ADMIN_EDIT_EVENTS", adminEditEvent);
  yield takeLatest("ADMIN_GET_ALL_ORDERS", adminGetAllOrders);
  yield takeLatest("ADMIN_GET_ALL_USERS", getAllUsers);
}

export default adminSagas;
