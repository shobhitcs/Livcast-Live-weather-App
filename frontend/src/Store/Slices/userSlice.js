import { createSlice } from '@reduxjs/toolkit';

const initstate = { user: null }
const userSlice = createSlice({
    name: "user",
    initialState: initstate,
    reducers: {
        userLogin(state, action) {
            state.user = action.payload;
        },
        userLogout(state, action) {
            state.user = null;
        }
    }
});

export { userSlice };
export const { userLogin, userLogout } = userSlice.actions;

    