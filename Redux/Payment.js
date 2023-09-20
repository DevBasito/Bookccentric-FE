import { createSlice } from "@reduxjs/toolkit";

export const PaymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paystack: [],
        pmtdetails: []
    },
    reducers: {
        setPaystack: (state, action) => {
            state.paystack = action.payload;          
        },
        setPmtdetails: (state, action) => {
            state.pmtdetails = action.payload;          
        },
        resetPayment: (state, action) => {
            initialState
        }

    },
})

// Action creators are generated for each case reducer function
export const {setPaystack, setPmtdetails, resetPayment} = PaymentSlice.actions

export default PaymentSlice.reducer