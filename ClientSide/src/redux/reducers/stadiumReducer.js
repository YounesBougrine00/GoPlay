import ACTIONS from "../actions/actionTypes";

const initialState = {
    stadium: [],
    stadiums: [],
    noResult: "",
    loading: true,
};

const stadiumReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_STADIUM:
            return {
                ...state,
                stadium: action.payload.stadium,
                loading: false
            };
        case ACTIONS.GET_STADIUMS_BY_SELECT:
            return {
                ...state,
                stadiums: action.payload.stadiumsSelect,
                loading: false
            };
        case ACTIONS.CATCH_STADIUMS_SEARCH:
            return {
                ...state,
                noResult: action.payload.noresult,
                loading: false
            }
        case ACTIONS.GET_STADIUMS_BY_SEARCH:
            return {
                ...state,
                stadiums: action.payload.stadiumsSearch,
                loading: false
            };
        case ACTIONS.CLEAR_STADIUMS_STATE:
            return {
                ...state,
                stadiums: [],
                stadium: [],
                noResult: "",
                loading: true
            }
        default:
            return state;
    }
};

export default stadiumReducer;