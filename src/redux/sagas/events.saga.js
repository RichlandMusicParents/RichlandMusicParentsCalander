import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";

function* viewEvent(action) {
  try {
    const response = yield axios.get(`/api/events/${action.payload}`);
  } catch (error) {
    console.log("Error in fetching events", error);
  }
}

function* addEvent(action) {
  try {
    const response = yield axios.post("/api/user-add-events", action.payload);
    yield put({ type: "ADD_EVENT", payload: response.data });
  } catch (error) {
    console.log("Error in adding event", error);
  }
}

function* eventSaga() {
  yield takeLatest(`GET_USER_EVENT`, viewEvent);
  yield takeLatest(`USER_ADD_EVENT`, addEvent);
}

export default eventSaga;
