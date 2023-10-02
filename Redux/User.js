import { createSlice } from "@reduxjs/toolkit";

const data = window.sessionStorage.getItem('User');

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(data),
        dashboard: ""
    },
    reducers: {
        setData: (state, action) => {
            state.user = action.payload;
            window.sessionStorage.setItem('User', JSON.stringify(action.payload));
            
          },
          setDashboardData: (state, action) => {
            state.dashboard = action.payload;

        },       
    },
})

// Action creators are generated for each case reducer function
export const { setData, setDashboardData } = UserSlice.actions

export default UserSlice.reducer