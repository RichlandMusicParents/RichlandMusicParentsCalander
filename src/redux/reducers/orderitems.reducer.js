const orderItemsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ORDER_ITEMS":
          return action.payload;
        case "ADD_ORDER_ITEMS":
          return [...state, action.payload];
        default:
          return state;
    }
  };
  
  export default orderItemsReducer;
  