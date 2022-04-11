import ACTIONS from "./actionTypes";
import axios from "axios";

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async(token) => {
    const res = await axios.get('/api/user/userinfos', {
        headers: { Authorization: token }
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
        }
    }
}