import ACTIONS from "./actionTypes";
import axios from "axios";



export const dispatchGetStadium = (sid) => async(dispatch) => {
    dispatch(clearStadiumStates())
    const res = await axios.get(`/api/stadiums/get-stadium/${sid}`)
    return {
        type: ACTIONS.GET_STADIUM,
        payload: {
            stadium: res.data,
        }
    }
}

export const dispatchGetStadiumBySelect = (city, sportType) => async(dispatch) => {
    dispatch(clearStadiumStates())
    try {
        const result = await axios.post('/api/stadiums/get-stadiums', { city, sportType })
        console.log(result)
        dispatch({
            type: ACTIONS.GET_STADIUMS_BY_SELECT,
            payload: {
                stadiumsSelect: result.data,
            }
        })
    } catch (error) {
        console.log(error)
        error.response.data.message &&
            dispatch({
                type: ACTIONS.CATCH_STADIUMS_SEARCH,
                payload: {
                    noresult: error.response.data.message
                }
            })
    }

}

export const dispatchGetStadiumBySearch = (query) => async(dispatch) => {
    dispatch(clearStadiumStates())
    try {
        const result = await axios.post('/api/stadiums/get-stadiums-search', { query })
        console.log(result)
        dispatch({
            type: ACTIONS.GET_STADIUMS_BY_SEARCH,
            payload: {
                stadiumsSearch: result.data,
            }
        })
    } catch (error) {
        error.response.data.message &&
            dispatch({
                type: ACTIONS.CATCH_STADIUMS_SEARCH,
                payload: {
                    noresult: error.response.data.message
                }
            })
    }

}

export const clearStadiumStates = () => {
    return {
        type: ACTIONS.CLEAR_STADIUMS_STATE
    }
}