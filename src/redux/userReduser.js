import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "userdata",

  initialState: {
    userprofile: []
  },


  reducers: {
    setData: (state, action) => {
      state.userprofile = action.payload
     
    },
}
    
});



export const { setUser,setData } =
userSlice.actions;
const usersReducer = userSlice.reducer;
export default usersReducer;


