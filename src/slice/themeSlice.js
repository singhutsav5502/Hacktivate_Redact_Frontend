import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: true // dark
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        switchTheme: (state) => {
            state.theme = !state.theme;
        }
    },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
