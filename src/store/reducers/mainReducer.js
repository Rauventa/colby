import {
    ADD_TO_CART, DELETE_CART_ITEM, LOAD_IMG_SUCCESS, LOAD_PROGRESS_SUCCESS, LOAD_URL_SUCCESS,
    RENDER_DATA_SUCCESS,
    RENDER_ITEMS_SUCCESS,
    RENDER_ORDERS
} from "../actions/actionTypes";

const initialState = {
    items: [],
    personId: '',
    personData: {},
    orders: [],
    cart: [],
    image: null,
    url: '',
    progress: 0
};

export default function mainReducer(state = initialState, action) {
    switch(action.type) {
        case RENDER_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.items
            };
        case RENDER_DATA_SUCCESS:
            return {
                ...state,
                personId: action.personId,
                personData: action.personData
            };
        case RENDER_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: action.cart
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                cart: action.cart
            };
        case LOAD_IMG_SUCCESS:
            return {
                ...state,
                image: action.image
            };
        case LOAD_PROGRESS_SUCCESS:
            return {
                ...state,
                progress: action.progress
            };
        case LOAD_URL_SUCCESS:
            return {
                ...state,
                url: action.url
            };
        default:
            return state;
    }
}