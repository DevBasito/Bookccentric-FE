import { createSlice } from "@reduxjs/toolkit";

export const BookSlice = createSlice({
    name: 'books',
    initialState: {
        books: "",
        bookById: ""
    },
    reducers: {
        setData: (state, action) => {
            state.books = action.payload;

        },   
        setBookById: (state, action) => {
            state.bookById = action.payload;

        },

    },
})

// Action creators are generated for each case reducer function
export const { setData, setBookById, fetchBooks } = BookSlice.actions

export default BookSlice.reducer