import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import adminSagas from "./admin.saga";
import orderSaga from "./order.saga";
import productSaga from "./product.saga";
import orderItemsSaga from "./orderitems.saga";
import calendarSaga from "./calendar.saga";
import eventSaga from "./events.saga";
import googleSaga from "./google-spreadsheet";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    adminSagas(),
    orderSaga(),
    productSaga(),
    calendarSaga(),
    eventSaga(),
    orderItemsSaga(),
    googleSaga(),
  ]);
}
