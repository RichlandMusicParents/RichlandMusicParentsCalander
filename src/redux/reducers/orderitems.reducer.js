const orderItemsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ORDERITEMS":
          return action.payload;
        case "ADD_ORDERITEMS":
          return [...state, action.payload];
        default:
          return state;
    }
  };
  
  export default orderItemsReducer;
  