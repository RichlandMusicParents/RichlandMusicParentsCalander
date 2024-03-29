import axios from "axios";
import { put, select, take, takeLatest } from "redux-saga/effects";

// User views an event.
function* viewEvent(action) {
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
    const response = yield axios.get(`/api/events/user-events/${user.id}`);
    yield put({ type: "SET_EVENTS", payload: response.data });
  } catch (error) {
    console.log("Error in fetching events", error);
  }
}

// function* viewEvent(action) {
//   try {
//     const response = yield axios.get(
//       `/api/events/user-events/${action.payload}`
//     );
//     yield put({ type: "SET_EVENTS", payload: response.data });
//   } catch (err) {
//     console.log("Error with getting specific user events", err);
//   }
// }

//END HERE

//User adds an event.
function* addEvent(action) {
  const eventObj = {
    event_type: action.payload.event_type,
    event_date: action.payload.event_date,
    event_name: action.payload.event_name,
    user_id: action.payload.user_id,
    calendar_id: action.payload.calendar_id,
  };

  try {
    const response = yield axios.post("/api/events/user-add-events", eventObj);
    yield put({
      type: "GET_USER_EVENT",
    });
  } catch (error) {
    console.log("Error in adding event", error);
  }
}

//user Deletes an event
function* deleteUserEvent(action) {
  try {
    yield axios.delete(`/api/events/delete-events/${Number(action.payload)}`);
    yield put({
      type: "GET_USER_EVENT",
    });
  } catch (error) {
    console.log("Error in deleting an event", error);
  }
}
// allows user to edit events on the invoice page.
function* editUserEvent(action) {
  const eventObj = {
    event_type: action.payload.event_type,
    event_date: action.payload.event_date,
    event_name: action.payload.event_name,
    user_id: Number(action.payload.user_id),
    calendar_id: Number(action.payload.calendar_id),
  };
  try {
    yield axios.put(
      `/api/events/user-edit-event/${Number(action.payload.id)}`,
      eventObj
    );
    yield put({
      type: "GET_USER_EVENT",
    });
  } catch (error) {
    console.log("error in updating event saga", error);
  }
}

function* eventSaga() {
  yield takeLatest(`GET_USER_EVENT`, viewEvent);
  yield takeLatest(`USER_ADD_EVENT`, addEvent);
  yield takeLatest("USER_DELETE_EVENT", deleteUserEvent);
  yield takeLatest("EDIT_USER_EVENT", editUserEvent);
}

export default eventSaga;
