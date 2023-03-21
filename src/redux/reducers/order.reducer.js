import { combineReducers } from "redux";

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDER":
      return action.payload;
    case "ADD_ORDER":
      return [...state, action.payload];
    default:
      return state;
  }
};

const specificOrder = (state = [], action) => {
  switch (action.type) {
    case "SET_SPECIFIC_ORDER":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  orderReducer,
  specificOrder,
});
