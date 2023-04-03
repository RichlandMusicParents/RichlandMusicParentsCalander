import { combineReducers } from "redux";

const productReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.payload;
    case "ADD_PRODUCT":
      return [...state, action.payload];
    default:
      return state;
  }
};

const adminProductReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ADMIN_PRODUCTS":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  productReducer,
  adminProductReducer,
});
