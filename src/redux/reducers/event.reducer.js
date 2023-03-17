const eventReducer = (state= [],action) =>{
    switch (action.type){
        case "SET_EVENTS":
            return [...state, action.payload]
            case "ADD_EVENTS":
                return [...state,action.payload];
                default: return state;
    }
}

export default eventReducer;