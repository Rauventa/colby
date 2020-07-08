import {
    AUTH_FALSE,
    AUTH_LOGOUT,
    AUTH_SUCCESS,
    REG_FALSE,
    REG_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    token: null,
    message: '',
    isReg: false
};

export default function userAuthReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                message: ''
            };
        case AUTH_FALSE:
            return {
                ...state,
                message: action.message
            };
        case REG_SUCCESS:
            return {
                ...state,
                isReg: action.isReg,
                message: ''
            };
        case REG_FALSE:
            return {
                ...state,
                message: action.message
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null
            };
        default:
            return state
    }
}