import ACTIONS from "../actions/actionTypes";

const initialState = {
    reservations: [],
    loading: true
}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.PULL_RESERVATIONS_BY_ID:
            return {
                ...state,
                reservations: action.payload.reservations,
                loading: false
            }
        case ACTIONS.CLEAR_PULL_STATE:
            return {
                ...state,
                reservations: [],
                loading: true
            }
        default:
            return state
    }
}

export default bookingReducer;