import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// ------ EVENTS SAGA ---------------------------------------------------------------------------------------

function* adminGetAllEvents() {
  try {
    const response = yield axios.get("/api/events/all-events");
    yield put({ type: "ADMIN_SET_ALL_EVENTS", payload: response.data });
  } catch (err) {
    console.log("Error in getting all events", err);
  }
}

function* adminGetSpecificEvents(action) {
  try {
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
    event_type: action.payload.event_type,
    event_date: action.payload.event_date,
    event_name: action.payload.event_name,
    user_id: action.payload.user_id,
    calendar_id: action.payload.calendar_id,
  };
  try {
    yield axios.post("/api/events/admin-add-event", eventObj);
    yield put({
      type: "GET_SPECIFIC_EVENTS",
      payload: action.payload.user_id,
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
      `/api/events/admin-edit-event/${action.payload.id}`,
      eventObj
    );
    yield put({
      type: "GET_SPECIFIC_EVENTS",
      payload: action.payload.user_id,
    });
  } catch (err) {
    console.log("Error in PUTing event by admin", err);
  }
}

function* deleteEvent(action) {
  try {
    console.log(action.payload);
    yield axios.delete(`/api/events/admin-delete-event/${action.payload.id}`);
    yield put({ type: "GET_ALL_EVENTS" });
    yield put({
      type: "GET_SPECIFIC_EVENTS",
      payload: action.payload.user_id.id,
    });
  } catch (error) {
    console.log("DELETEing event failed", error);
  }
}

// ---------------- END EVENTS SAGA ---------------------------------------------------------------------------------------

// ---------------- USER SAGA ------------------------------------------------------------------------------------------------

function* getAllUsers() {
  try {
    const response = yield axios.get("/api/user/all-users");
    yield put({ type: "ADMIN_SET_ALL_USERS", payload: response.data });
  } catch (err) {
    console.log("Error in admin GET all users", err);
  }
}

function* getSpecificUser(action) {
  try {
    const response = yield axios.get(
      `/api/user/specific/${Number(action.payload.id)}`
    );
    yield put({ type: "ADMIN_SET_SPECIFIC_USERS", payload: response.data });
  } catch (err) {
    console.log("Error in admin GET all users", err);
  }
}

// ---------------- END USER SAGA ------------------------------------------------------------------------------------------------

// ---------------- ORDER ITEMS SAGA ------------------------------------------------------------------------------------------------

// Saga to Add an order item

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
    console.log(action.payload.user_id);
    yield put({
      type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
      payload: action.payload.user_id,
    });
  } catch (err) {
    console.log("Error in PUTing event by admin", err);
  }
}

// Saga to GET specific orders, order items

function* adminGetSpecificOrderItems(action) {
  try {
    console.log(action.payload);
    const response = yield axios.get(
      `/api/orders/specific-order-items/${action.payload}`
    );
    yield put({ type: "ADMIN_SET_ORDER_ITEMS", payload: response.data });
  } catch (err) {
    console.log(
      "error in GETting the specific order items for this order",
      err
    );
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
      payload: action.payload.user_id,
    });
  } catch (error) {
    console.log("deleting venue request failed", error);
  }
}

// ---------------- END ORDER ITEMS SAGA ------------------------------------------------------------------------------------------------

// ---------------- ORDERS SAGA ------------------------------------------------------------------------------------------------

// Get specific order

function* adminGetSpecificOrder(action) {
  try {
    const response = yield axios.get(
      `/api/orders/new-order/${Number(action.payload.id)}`
    );
    yield put({ type: "ADMIN_SET_SPECIFIC_ORDER", payload: response.data });
  } catch (err) {
    console.log(
      "error in GETting the specific order items for this order",
      err
    );
  }
}

// Get all orders

function* adminGetAllOrders() {
  try {
    // passes the username and password from the payload to the server
    const response = yield axios.get(`/api/orders/all-orders`);
    yield put({ type: "ADMIN_SET_ALL_ORDERS", payload: response.data });
  } catch (err) {
    console.log("Error with getting specific user events", err);
  }
}

function* adminEditOrder(action) {
  const orderObj = {
    first_name: action.payload.first_name,
    last_name: action.payload.last_name,
    address: action.payload.address,
    city: action.payload.city,
    state: action.payload.state,
    zip: action.payload.zip,
    phone: action.payload.phone,
    email: action.payload.email,
    total: action.payload.total,
    payment_type: action.payload.payment_type,
    is_payed: action.payload.is_payed,
    is_delivered: action.payload.is_delivered,
    user_id: action.payload.user_id,
  };
  try {
    yield axios.put(
      `/api/orders/edit-order/${action.payload.id}`,
      orderObj,
      action.payload
    );
    // yield put({
    //   type: "FETCH_ORDER",
    // });
  } catch (error) {
    console.log("User post order failed", error);
  }
}

// ---------------- END ORDERS SAGA ------------------------------------------------------------------------------------------------

// ---------------- EXPORT SAGAS ------------------------------------------------------------------------------------------------

function* adminSagas() {
  // EVENTS
  yield takeLatest("GET_ALL_EVENTS", adminGetAllEvents);
  yield takeLatest("GET_SPECIFIC_EVENTS", adminGetSpecificEvents);
  yield takeLatest("ADMIN_ADD_EVENTS", adminAddEvent);
  yield takeLatest("ADMIN_EDIT_EVENTS", adminEditEvent);
  yield takeLatest("ADMIN_DELETE_EVENT", deleteEvent);
  // ORDERS
  yield takeLatest("ADMIN_GET_ALL_ORDERS", adminGetAllOrders);
  yield takeLatest("ADMIN_EDIT_ORDER", adminEditOrder);
  yield takeLatest("ADMIN_GET_SPECIFIC_ORDER", adminGetSpecificOrder);
  // ORDER ITEMS
  yield takeLatest("ADMIN_ADD_ORDER_ITEMS", adminAddOrderItems);
  yield takeLatest("ADMIN_EDIT_ORDER_ITEMS", editOrderItem);
  yield takeLatest(
    "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
    adminGetSpecificOrderItems
  );
  // USER
  yield takeLatest("ADMIN_GET_ALL_USERS", getAllUsers);
  yield takeLatest("ADMIN_GET_SPECIFIC_USER", getSpecificUser);
}

export default adminSagas;
