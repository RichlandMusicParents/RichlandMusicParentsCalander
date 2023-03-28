const orderItemsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDER_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

export default orderItemsReducer;
