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

function* getSpecificUser(action) {
  console.log("specific user payload", Number(action.payload.id));
  try {
    const response = yield axios.get(
      `/api/user/specific/${Number(action.payload.id)}`
    );
    yield put({ type: "ADMIN_SET_SPECIFIC_USERS", payload: response.data });
  } catch (err) {
    console.log("Error in admin GET all users", err);
  }
}

function* adminGetSpecificEvents(action) {
  try {
    // passes the username and password from the payload to the server
    const response = yield axios.get(
      `/api/events/specific-user-events/${Number(action.payload.id)}`
    );
    yield put({ type: "ADMIN_SET_SPECIFIC_EVENTS", payload: response.data });
  } catch (err) {
    console.log("Error with getting specific user events", err);
  }
}

function* adminAddEvent(action) {
  const eventObj = {
    event_type: action.payload.event_type,
    event_date: action.payload.event_date,
    event_name: action.payload.event_name,
    user_id: action.payload.user_id,
    calendar_id: action.payload.calendar_id,
  };
  try {
    yield axios.post("/api/events/admin-add-event", eventObj);
    console.log("user id for add event", Number(eventObj.user_id));
    yield put({
      type: "GET_SPECIFIC_EVENTS",
      payload: Number(eventObj.user_id),
    });
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
    yield put({
      type: "GET_SPECIFIC_EVENTS",
      payload: Number(action.payload.user_id),
    });
  } catch (err) {
    console.log("Error in PUTing event by admin", err);
  }
}

function* adminAddOrderItems(action) {
  const eventObj = {
    quantity: action.payload.quantity,
    price: action.payload.price,
    product_id: action.payload.product_id,
    order_id: action.payload.order_id,
    user_id: Number(action.payload.user_id),
  };
  try {
    yield axios.post(`/api/orders/add-order-items`, eventObj);
    yield put({
      type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
      payload: Number(action.payload.user_id),
    });
  } catch (err) {
    console.log("Error in PUTing event by admin", err);
  }
}

function* adminGetSpecificOrderItems(action) {
  try {
    const response = yield axios.get(
      `/api/orders/specific-order-items/${Number(action.payload)}`
    );
    yield put({ type: "ADMIN_SET_ORDER_ITEMS", payload: response.data });
  } catch (err) {
    console.log(
      "error in GETting the specific order items for this order",
      err
    );
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

function* deleteEvent(action) {
  try {
    yield axios.delete(
      `/api/events/admin-delete-event/${Number(action.payload)}`
    );
    yield put({ type: "GET_ALL_EVENTS" });
  } catch (error) {
    console.log("deleting venue request failed", error);
  }
}

function* editOrderItem(action) {
  const orderObj = {
    quantity: action.payload.quantity,
    price: action.payload.price,
    product_id: action.payload.product_id,
    order_id: action.payload.order_id,
    user_id: action.payload.user_id,
  };
  console.log("order item:", orderObj);
  try {
    yield axios.put(
      `/api/orders/edit-order-items/${Number(action.payload.id)}`,
      orderObj
    );
    yield put({
      type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
      payload: Number(action.payload.user_id),
    });
  } catch (error) {
    console.log("deleting venue request failed", error);
  }
}

function* adminSagas() {
  yield takeLatest("GET_ALL_EVENTS", adminGetAllEvents);
  yield takeLatest("GET_SPECIFIC_EVENTS", adminGetSpecificEvents);
  yield takeLatest("ADMIN_ADD_EVENTS", adminAddEvent);
  yield takeLatest("ADMIN_EDIT_EVENTS", adminEditEvent);
  yield takeLatest("ADMIN_GET_ALL_ORDERS", adminGetAllOrders);
  yield takeLatest("ADMIN_GET_ALL_USERS", getAllUsers);
  yield takeLatest("ADMIN_DELETE_EVENT", deleteEvent);
  yield takeLatest("ADMIN_GET_SPECIFIC_USER", getSpecificUser);
  yield takeLatest("ADMIN_ADD_ORDER_ITEMS", adminAddOrderItems);
  yield takeLatest(
    "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
    adminGetSpecificOrderItems
  );
  yield takeLatest("ADMIN_EDIT_ORDER_ITEMS", editOrderItem);
}

export default adminSagas;
