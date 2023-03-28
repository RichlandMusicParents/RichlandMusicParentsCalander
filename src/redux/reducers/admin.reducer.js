import { combineReducers } from "redux";

// loginMessage holds the string that will display
// on the login screen if there's an error
const allEvents = (state = [], action) => {
  switch (action.type) {
    case "ADMIN_SET_ALL_EVENTS":
      return action.payload;
    default:
      return state;
  }
};

const allOrders = (state = [], action) => {
  switch (action.type) {
    case "ADMIN_SET_ALL_ORDERS":
      return action.payload;
    default:
      return state;
  }
};

const specificEvents = (state = [], action) => {
  switch (action.type) {
    case "ADMIN_SET_SPECIFIC_EVENTS":
      return action.payload;
    default:
      return state;
  }
};

const specificUser = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_SET_SPECIFIC_USERS":
      return action.payload;
    default:
      return state;
  }
};

const allUsers = (state = [], action) => {
  switch (action.type) {
    case "ADMIN_SET_ALL_USERS":
      return action.payload;
    default:
      return state;
  }
};
const specificOrderItems = (state = [], action) => {
  switch (action.type) {
    case "ADMIN_SET_ORDER_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

const specificOrderItemsByOrder = (state = [], action) => {
  switch (action.type) {
    case "ADMIN_SET_ORDER_ITEMS-BY_ORDER":
      return action.payload;
    default:
      return state;
  }
};

const specificOrder = (state = [], action) => {
  switch (action.type) {
    case "ADMIN_SET_SPECIFIC_ORDER":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  allEvents,
  allOrders,
  specificEvents,
  allUsers,
  specificUser,
  specificOrderItems,
  specificOrder,
  specificOrderItemsByOrder,
});
