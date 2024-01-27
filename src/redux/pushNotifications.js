import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  userId: "",
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userId=action.payload.userId,
            state.email=action.payload.email,
            state.name=action.payload.name
        }
    }
})

export const {setUser}=userSlice.actions
export default userSlice.reducer