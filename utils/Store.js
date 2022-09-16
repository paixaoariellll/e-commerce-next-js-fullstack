import Cookies from 'js-cookie'
import { useReducer } from 'react'

const initialState = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [] }
}
function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newItem = action.payload
            const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug)
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem ? newItem : item) : [...state.cart.cartItems, newItem]
            Cookies.set('cart', JSON.stringify)
        }
    }
}

export default function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return (
        <StoreProvider value={value}>{children}</StoreProvider>
    )
}
