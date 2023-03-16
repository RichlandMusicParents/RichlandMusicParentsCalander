import { combineReducers } from "redux";

// loginMessage holds the string that will display
// on the login screen if there's an error
const allEvents = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_EVENTS":
      return action.payload;
    default:
      return state;
  }
};

const allOrders = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_ORDERS":
      return action.payload;
    default:
      return state;
  }
};

const specificEvents = (state = [], action) => {
  switch (action.type) {
    case "SET_SPECIFIC_EVENTS":
      return action.payload;
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  allEvents,
  allOrders,
  specificEvents,
});
