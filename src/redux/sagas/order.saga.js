import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

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

function* addOrder(action) {
  try {
    yield axios.post("/api/orders/add-order", action.payload);
    // yield put({
    //   type: "FETCH_ORDER",
    // });
  } catch (error) {
    console.log("User post order failed", error);
  }
}

function* orderSaga() {
  yield takeLatest("FETCH_ORDER", fetchOrder);
  yield takeLatest("ADD_ORDER", addOrder);
}

export default orderSaga;
