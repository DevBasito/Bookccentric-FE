import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./Books";
import userReducer from "./User";
import cartReducer from "./cart";
import payReducer from "./Payment"


export default configureStore({
    reducer: {
        books: bookReducer,
        user: userReducer,
        cart: cartReducer,
        payment: payReducer

    }
})