import { put, select, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET
function* fetchOrderItems() {
  let user = yield select((store) => store.user);

  // Check if the user.id is not defined
  if (!user.id) {
    // Dispatch an action to fetch user data
    yield put({ type: "FETCH_USER" });

    // Wait for the user data to be fetched
    const userDataAction = yield take("SET_USER");

    // Update the user object with the fetched data
    user = userDataAction.payload;
  }
  try {
    const response = yield axios.get(`/api/orderitems/${user.id}`);
    const orderItems = response.data;
    yield put({ type: "SET_ORDER_ITEMS", payload: orderItems });
  } catch (error) {
    console.log("Error fetching order_items", error);
  }
}

//POST
function* addOrderItems(action) {
  const eventObj = {
    quantity: action.payload.quantity,
    price: action.payload.price,
    product_id: action.payload.product_id,
    order_id: Number(action.payload.order_id),
    user_id: Number(action.payload.user_id),
  };

  try {
    const response = yield axios.post("/api/orderitems/", eventObj);
    yield put({
      type: "FETCH_ORDER_ITEMS",
    });
  } catch (error) {
    console.log("Error adding order_items", error);
  }
}

//DELETE
function* deleteOrderItems(action) {
  try {
    yield axios.delete(`/api/orderitems/delete-order-item/${action.payload}`);
    yield put({
      type: "FETCH_ORDER_ITEMS",
    });
  } catch (err) {
    console.log("Error in DELETE order items SAGA", err);
  }
}

//PUT
function* editOrderItems(action) {
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
      type: "FETCH_ORDER_ITEMS",
    });
  } catch (error) {
    console.log("deleting venue request failed", error);
  }
}

function* orderItemsSaga() {
  yield takeLatest("FETCH_ORDER_ITEMS", fetchOrderItems);
  yield takeLatest("ADD_ORDER_ITEMS", addOrderItems);
  yield takeLatest("DELETE_ORDER_ITEMS", deleteOrderItems);
  yield takeLatest("EDIT_ORDER_ITEMS", editOrderItems);
}

export default orderItemsSaga;
