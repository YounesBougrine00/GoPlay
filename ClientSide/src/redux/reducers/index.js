import { combineReducers } from 'redux'
import auth from './loginReducer'
import token from './tokenReducer'
import stade from './stadiumReducer'
import booking from './bookingReducer'

export default combineReducers({
    auth,
    token,
    stade,
    booking
})