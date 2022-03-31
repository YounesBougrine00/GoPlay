import ACTIONS from "./actionTypes";
import axios from "axios";

export const pullReservations = (time, _id) => async(dispatch) => {
    dispatch(clearPullStates())
    const reservations = await axios.post('/api/reservations/pull-reservations', { time, _id })
    dispatch({
        type: ACTIONS.PULL_RESERVATIONS_BY_ID,
        payload: {
            reservations: reservations.data
        }
    })
}

export const clearPullStates = () => {
    return {
        type: ACTIONS.CLEAR_PULL_STATE
    }
}