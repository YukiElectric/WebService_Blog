const initState = {};

export default (state = initState, action) => {
    switch(action.type) {
        case "ADD_ACCOUNT" :
            return {...state, ...action.payload};
        case "DELETE_ACCOUNT" :
            return state = {};
        default: return state;
    }
}