import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Slices/userSlice.js";
import { personSlice } from "./Slices/personSlice.js";


const store =configureStore({
    reducer:{
        users:userSlice.reducer,
        persons: personSlice.reducer,
    },
});
export default store;