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

export default productReducer;
