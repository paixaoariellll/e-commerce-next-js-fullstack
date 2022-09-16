import Cookies from 'js-cookie'
import { useReducer } from 'react'

const initialState = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [] }
}

export default function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return (
        <StoreProvider value={value}>{children}</StoreProvider>
    )
}
