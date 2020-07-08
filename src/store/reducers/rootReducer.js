import {combineReducers} from 'redux';
import mainReducer from "./mainReducer";
import authReducer from "./authReducer";

export default combineReducers({
    mainReducer: mainReducer,
    authReducer: authReducer
})