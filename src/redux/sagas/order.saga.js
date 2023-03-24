import axios from "axios";
import { put, takeLatest, select, take } from "redux-saga/effects";

function* fetchOrder() {
  try {
    const response = yield axios.get("/api/orders");
    const order = response.data;
    console.log("get all ", order);

    yield put({ type: "SET_ORDER", payload: order });
  } catch (error) {
    console.log("User get order failed", error);
  }
}

function* getNewOrder(action) {
  let user = yield select((store) => store.user);
  if (!user.id) {
    yield put({ type: "FETCH_USER" });

    const userData = yield take("SET_USER");
    user = userData.payload;
  }
  try {
    const response = yield axios.get(`/api/orders/new-order/${user.id}`);
    yield put({ type: "SET_NEW_ORDER", payload: response.data });
  } catch (err) {
    console.log("Error in GETting new order", err);
  }
}

function* addOrder(action) {
  try {
    yield axios.post("/api/orders/add-order", action.payload);
    yield put({
      type: "GET_NEW_ORDER",
    });
  } catch (error) {
    console.log("User post order failed", error);
  }
}

// function* getSpecificOrder(action) {
//   try {
//     // passes the username and password from the payload to the server
//     const response = yield axios.get(
//       `/api/events/specific-orders/${Number(action.payload.id)}`
//     );
//     console.log("Specific Order Payload", action.payload);
//     yield put({ type: "SET_SPECIFIC_ORDER", payload: response.data });
//   } catch (err) {
//     console.log("Error with getting specific user events", err);
//   }
// }

function* orderSaga() {
  yield takeLatest("FETCH_ORDER", fetchOrder);
  yield takeLatest("ADD_ORDERS", addOrder);
  // yield takeLatest("GET_SPECIFIC_ORDER", getSpecificOrder);
  yield takeLatest("GET_NEW_ORDER", getNewOrder);
}

export default orderSaga;
