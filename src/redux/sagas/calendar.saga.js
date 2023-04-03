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

function* addCalendar(action) {
  try {
    yield axios.post("/api/calendar/add-calendar", action.payload);
    yield put({ type: "FETCH_CALENDAR" });
  } catch (err) {
    console.log("Error POSTING calendar", err);
  }
}

function* editCalendar(action) {
  try {
    yield axios.put(
      `/api/calendar/edit-calendar/${Number(action.payload.id)}`,
      {
        calendar_name: action.payload.calendar_name,
      }
    );
    yield put({ type: "FETCH_CALENDAR" });
  } catch (err) {
    console.log("Error in PUTTING calendar", err);
  }
}

function* calendarSaga() {
  yield takeLatest("FETCH_CALENDAR", fetchCalendar);
  yield takeLatest("ADD_CALENDAR", addCalendar);
  yield takeLatest("EDIT_CALENDAR", editCalendar);
}

export default calendarSaga;
