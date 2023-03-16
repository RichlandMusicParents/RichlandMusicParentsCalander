const orderReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_ORDER":
            return action.payload;
            case "ADD_ORDER":
                return [...state, action.payload];
                default:
                    return state;
    }
};


export default orderReducer;