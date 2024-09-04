import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   isUserAuthenticated: false,
   userAccessToken: null,
   userRefreshToken: null
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login(state, action) {
         state.isUserAuthenticated = true
         state.userAccessToken = action.payload.access
         state.userRefreshToken = action.payload.refresh
      },
      logout(state) {
         state.isUserAuthenticated = false
         state.userAccessToken = null
         state.userRefreshToken = null
      }
   }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer