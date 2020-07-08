import axios from "axios";
import {
    ADD_TO_CART, DELETE_CART_ITEM, LOAD_IMG_SUCCESS, LOAD_PROGRESS_SUCCESS, LOAD_URL_SUCCESS,
    RENDER_DATA_SUCCESS,
    RENDER_ITEMS_SUCCESS,
    RENDER_ORDERS
} from "./actionTypes";
import {storage} from "../../firebase";

export function renderItems() {
    return async dispatch => {
        try {
            const response = await axios.get('https://colby-16cd8.firebaseio.com/items.json');
            const items = Object.entries(response.data).map((item) => {
                return {
                    name: item[1].name,
                    type: item[1].type,
                    color: item[1].color,
                    size: item[1].size,
                    price: item[1].price,
                    sale: item[1].sale,
                    url: item[1].url,
                    id: item[0],
                    key: item[0],
                }
            });
            return dispatch(renderItemsSuccess(items));
        } catch (e) {
            console.log(e)
        }
    }
}

export function renderData() {
    return async dispatch => {
        try {
            const response = await axios.get(`https://colby-16cd8.firebaseio.com/persons/${localStorage.userId}.json`);
            Object.entries(response.data).map((personData) => {
                return dispatch(renderDataSuccess(personData[0], personData[1]))
            });
            Object.entries(response.data).map((userData) => {
                const orders = Object.entries(userData[1].orders).map((order) => {
                    return {
                        orderId: order[0],
                        orderData: order[1].orderData,
                        totalPrice: order[1].totalPrice
                    }
                });
                return dispatch(renderOrders(orders));
            });
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleChange(event) {
    return (dispatch) => {
        const image = event.target.files[0];
        console.log(image)
        if (image) {

            dispatch(loadImgSuccess(image));

            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    dispatch(loadProgressSuccess(progress))
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            dispatch(loadUrlSuccess(url))
                        });
                }
            );
        }
    }
}

export function loadImgSuccess(image) {
    return {
        type: LOAD_IMG_SUCCESS,
        image
    }
}
export function loadProgressSuccess(progress) {
    return {
        type: LOAD_PROGRESS_SUCCESS,
        progress
    }
}
export function loadUrlSuccess(url) {
    return {
        type: LOAD_URL_SUCCESS,
        url
    }
}

export function addToCart(data, cart) {
    cart.push(data);
    return {
        type: ADD_TO_CART,
        cart
    }
}

export function deleteCartItem(cart, data) {
    for(let i = cart.length - 1; i >= 0; i--) {
        if(cart[i].name === data) {
            cart.splice(i, 1);
        }
    }
    return {
        type: DELETE_CART_ITEM,
        cart
    }

}

export function renderItemsSuccess(items) {
    return {
        type: RENDER_ITEMS_SUCCESS,
        items
    }
}

export function renderDataSuccess(personId, personData) {
    return {
        type: RENDER_DATA_SUCCESS,
        personId,
        personData
    }
}

export function renderOrders(orders) {
    return {
        type: RENDER_ORDERS,
        orders
    }
}