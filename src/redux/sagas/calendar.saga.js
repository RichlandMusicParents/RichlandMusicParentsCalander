import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchCalendar() {
  try {
    const response = yield axios.get("/api/calendar");
    const calendar = response.data;
    console.log("Get all", calendar);

    yield put({ type: "SET_CALENDAR", payload: calendar });
  } catch (error) {
    console.log("Error fetching products", error);
  }
}

function* calendarSaga() {
  yield takeLatest("FETCH_CALENDAR", fetchCalendar);
}

export default calendarSaga;
