import axios from "axios";
import { takeLatest } from "redux-saga/effects";

function* exportEvents() {
  try {
    yield axios.get("/api/google-sheets/");
  } catch (err) {
    console.log("Error in EXPORTING ");
  }
}

function* googleSaga() {
  yield takeLatest(`EXPORT_EVENTS`, exportEvents);
}

export default googleSaga;
