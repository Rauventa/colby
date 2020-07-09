import {combineReducers} from 'redux';
import authReducer from '../reducers/authReducer';
import mainReducer from '../reducers/mainReducer'

export default combineReducers({
    authReducer: authReducer,
    mainReducer: mainReducer
})