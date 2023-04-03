import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchProducts() {
  try {
    const response = yield axios.get("/api/products/all-products");
    const product = response.data;
    yield put({ type: "SET_ADMIN_PRODUCTS", payload: product });
  } catch (error) {
    console.log("Error fetching products", error);
  }
}

function* deleteProduct(action) {
  try {
    axios.delete(`/api/products/remove-products/${action.payload}`);
    yield put({
      type: "FETCH_PRODUCTS",
    });
  } catch (err) {
    console.log("Error in DELETING product", err);
  }
}

function* fetchUserProducts() {
  try {
    const response = yield axios.get("/api/products/");
    const product = response.data;
    yield put({ type: "SET_PRODUCTS", payload: product });
  } catch (error) {
    console.log("Error fetching products", error);
  }
}

function* addProduct(action) {
  try {
    yield axios.post("/api/products/add-products", action.payload);
    yield put({
      type: "FETCH_PRODUCTS",
    });
  } catch (error) {
    console.log("Error adding product", error);
  }
}

function* editProduct(action) {
  const prodObj = {
    name: action.payload.name,
    sku: action.payload.sku,
    calendar_id: action.payload.calendar_id,
    price: action.payload.price,
  };
  try {
    yield axios.put(
      `/api/products/edit-products/${action.payload.id}`,
      prodObj
    );
    yield put({
      type: "FETCH_PRODUCTS",
    });
  } catch (err) {
    console.log("Error in PUTing product", err);
  }
}

function* productSaga() {
  yield takeLatest("FETCH_USER_PRODUCTS", fetchUserProducts);
  yield takeLatest("FETCH_PRODUCTS", fetchProducts);
  yield takeLatest("ADD_PRODUCT", addProduct);
  yield takeLatest("ADMIN_DELETE_PRODUCTS", deleteProduct);
  yield takeLatest("ADMIN_EDIT_PRODUCTS", editProduct);
}

export default productSaga;
