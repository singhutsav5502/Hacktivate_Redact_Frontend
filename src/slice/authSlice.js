import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    username: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        clearAll: (state, action) => {
            state.username = ""
            state.token = null
        },
        clearToken: (state) => {
            state.token = null;
        },
    },
});

export const { setToken, clearToken, setUsername, clearAll } = authSlice.actions;
export default authSlice.reducer;
