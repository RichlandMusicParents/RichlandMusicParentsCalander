import axios from "axios";
import {put, takeLatest} from "redux-saga/effects";

function* fetchOrder() {
    try {
        const response = yield axios.get("/api/orders");
        const order = response.data;
        console.log("get all ", order);

        yield put({ type: "SET_ORDER", paylaod: order})
    } catch (error) {
        console.log("User get order failed", error);
    }
}