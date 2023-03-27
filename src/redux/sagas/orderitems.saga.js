import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchOrderItems() {
  try {
    const response = yield axios.get("/api/orderitems");
    const orderItems = response.data;
    yield put({ type: "SET_ORDER_ITEMS", payload: orderItems });
  } catch (error) {
    console.log("Error fetching order_items", error);
  }
}


function* addOrderItems(action) {
  try {
    

    const response = yield axios.post("/api/orderitems/", action.payload);
    yield put({
      type: "FETCH_ORDER_ITEMS",
     
    });
  } catch (error) {
    console.log("Error adding order_items", error);
  }
}

function* orderItemsSaga() {
  yield takeLatest("FETCH_ORDER_ITEMS", fetchOrderItems)
  yield takeLatest("ADD_ORDER_ITEMS", addOrderItems);
}

export default orderItemsSaga;