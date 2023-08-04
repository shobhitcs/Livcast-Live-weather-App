import {createSlice} from '@reduxjs/toolkit';

const initstate={person: null}
const personSlice=createSlice({
    name:"person",
    initialState:initstate,
    reducers:{
        personLogin(state,action){
            state.person = action.payload;
        },
        personLogout(state,action){
            state.person = null;
        }
        // userLogin(state,action){
        //     state.user=action.payload;
        // },
        // userLogout(state,action){
        //     state.user=null;
        // }
    }
});
export {personSlice};
export const {personLogin,personLogout}=personSlice.actions;